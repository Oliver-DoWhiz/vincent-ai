# Vincent ADHD Technical Design

## Overview

Vincent ADHD v0 is a frontend screening experience served by a lightweight Rust app.

The assessment, scoring, and report generation happen entirely in the browser. Rust is used only as a static file server and route shell for local development and simple deployment.

## Goals

- keep the assessment fully client-side
- avoid backend handling of health-related answers
- keep scoring deterministic and explainable
- support export without server storage
- preserve a simple no-build-step workflow

## Non-goals

- backend persistence
- auth
- user accounts
- analytics pipelines for answers
- LLM interpretation
- server-side scoring

## Runtime architecture

```text
Browser
  -> GET /               -> landing.html
  -> GET /screening      -> screening.html
  -> GET /assessment     -> screening.html
  -> GET /privacy        -> privacy.html
  -> GET /how-it-works   -> how-it-works.html
  -> GET /static/*       -> CSS + frontend modules

Frontend modules
  -> adhd-data.mjs       -> question catalog and product copy
  -> adhd-scoring.mjs    -> deterministic scoring logic
  -> adhd-report.mjs     -> local Markdown report generation
  -> app.mjs             -> UI rendering, storage, actions
```

## Data flow

1. User opens `/screening`.
2. User completes the scope gate.
3. Browser stores responses in memory.
4. If the user opts in, browser mirrors state into `localStorage`.
5. Browser computes the screening signal with deterministic logic.
6. Browser renders the result and clinician-prep checklist.
7. Browser generates a Markdown report locally for copy, download, or print.

No health-related answers are posted to the server.

## Scoring model

Inputs:

- current attention and executive-function responses
- restlessness or impulsivity responses
- impairment responses
- childhood-history responses
- cross-setting count
- overlapping-factor count
- safety flag

Output bands:

- Elevated ADHD-related screening signal
- Moderate ADHD-related screening signal
- Low ADHD-related screening signal
- Inconclusive / more context needed

Key rule:

- Vincent can surface an elevated screening signal only when current patterns, impairment, cross-setting evidence, and childhood-history evidence all move in the same direction.

## Safety handling

- safety prompt is required
- if immediate danger is reported, the browser interrupts the assessment flow
- crisis guidance replaces the normal result flow

## Rust server responsibilities

- serve the landing page
- serve the screening page and legacy `/assessment` alias
- serve privacy and explanation pages
- serve static assets from `static/`

The Rust layer does not store, inspect, or score user responses.

## Frontend responsibilities

- render each screening step
- manage local state and optional persistence
- compute scoring output
- generate exportable Markdown
- handle copy, download, print, and clear actions

## Testing strategy

- `scripts/test_scoring.mjs` validates browser scoring and report generation
- `tests/http.rs` validates the Rust routes
- legacy API routes are expected to return `404`

## Privacy posture

- no backend answer storage
- no user accounts
- no hidden answer analytics
- optional local persistence only when the user enables it
