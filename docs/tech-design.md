# Vincent AI Technical Design

## Document intent

This design doc follows a compact engineering-design pattern influenced by common technical design templates: context, goals, architecture, data model, APIs, testing, and future evolution.

## Context

The MVP needs to be:

- local-first
- easy to review
- fast to iterate
- consistent with the existing DoWhiz preference for Rust-friendly stacks

## Goals

- ship a working local product with a polished landing page and assessment
- keep the scoring logic explainable
- make the codebase modular enough for future persistence and AI layers

## Non-goals

- production auth
- payments
- analytics
- multi-tenant storage
- LLM orchestration

## Architecture overview

Vincent AI is a small Rust web app built with:

- `axum` for routing and JSON APIs
- `tower-http` for static asset serving
- static HTML/CSS/JS for the frontend
- pure Rust domain logic for assessment scoring

### Why this stack

- simple deployment shape
- strong local developer ergonomics
- fast startup
- no frontend build step required for the MVP
- scoring logic remains easy to test and reason about

## System diagram

```text
Browser
  -> GET /               -> landing.html
  -> GET /assessment     -> assessment.html
  -> GET /api/questions  -> question catalog JSON
  -> POST /api/score     -> scoring engine
  -> GET /static/*       -> app.css / app.js
```

## Modules

### `src/domain.rs`

Contains:

- question catalog
- archetype catalog
- score request / response types
- signature and nearest-match logic
- per-dimension interpretations

### `src/web.rs`

Contains:

- app router
- landing / assessment route handlers
- question API
- score API
- static serving

### `static/`

Contains:

- landing page
- assessment page
- CSS theme
- assessment interaction logic

## Data model

### Question

- `id`
- `dimension`
- `prompt`
- `options[3]`

### ScoreRequest

- `answers: BTreeMap<String, u8>`

### ScoreResponse

- `archetype`
- `similarity`
- `signature`
- `shadow_triggered`
- `dimensions[]`
- `narrative`

### Archetype

- `slug`
- `name`
- `subtitle`
- `tone`
- `signature`
- `shadow`
- `essence`
- `gifts`
- `fracture`
- `support`

## Scoring design

### Pipeline

1. Validate all 24 answers exist and are in `1..=3`.
2. Sum scores by dimension.
3. Bucket each dimension into `L`, `M`, or `H`.
4. Join the 8 bands into a signature.
5. Compute nearest archetype via Manhattan distance over the 8-band signature.
6. Return archetype + dimensional explanation.

### Why this design

- explainable enough for a premium consumer product
- easy to unit test
- easy to add or remove archetypes
- easy to tune copy independent of the algorithm

### Tradeoffs

- not psychometrically validated
- archetype assignment is authorial and editorial, not scientific truth
- nearest-signature methods compress nuance

## Frontend design

### Landing page

- editorial hero
- premium palette and typography
- clear articulation of the system and guardrails

### Assessment

- single-question flow
- progress bar
- dimension completion chips
- result card with dimensional bars and narrative sections

## Error handling

- incomplete answer payloads return `400`
- invalid answer values return `400`
- frontend handles fetch failure with a graceful message

## Testing strategy

### Unit tests

- incomplete payload rejection
- invalid answer rejection
- normal scoring returns an archetype

### Integration tests

- landing route returns `200`
- question API returns the full catalog
- score API accepts a valid payload

## Security / privacy posture

For the MVP:

- no persistence
- no accounts
- no PII storage
- no hidden background tracking in code

For future versions:

- explicit consent for storage
- retention rules
- deletion controls
- high care around any mental-health-adjacent data

## Future evolution

### Near term

- saved results
- archetype share cards
- richer copy variants

### Medium term

- user accounts
- history view
- AI-guided follow-up interpretation

### Long term

- psychometric validation program
- safety workflows
- clinician-reviewed content if the product moves closer to wellness or care
