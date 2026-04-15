# Vincent AI Technical Design

## Document intent

This design doc follows a compact engineering format: context, goals,
architecture, data model, APIs, testing, and future evolution.

## Context

The MVP needs to be:

- local-first
- easy to review
- fast to iterate
- consistent with a Rust-friendly stack

## Goals

- ship a working local product with a polished landing page and assessment
- keep the scoring logic explainable
- make the codebase modular enough for future persistence and AI layers
- replace the old archetype-first scoring path with a construct-first model

## Non-goals

- production auth
- payments
- analytics
- multi-tenant storage
- formal validation tooling inside the app
- percentile or probability estimation without calibration data

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
  -> POST /api/score     -> construct scoring engine
  -> GET /static/*       -> app.css / app.js
```

## Modules

### `src/domain.rs`

Contains:

- 28-item question catalog
- 7 construct definitions
- reverse-keying metadata
- score request and response types
- continuous construct scoring
- short interpretation logic

### `src/web.rs`

Contains:

- app router
- landing and assessment route handlers
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
- `reverse_keyed`
- `options[5]`

### ScoreRequest

- `answers: BTreeMap<String, u8>`

### ConstructScore

- `key`
- `label`
- `raw_total`
- `mean_score`
- `display_band`
- `interpretation`

### ScoreResponse

- `constructs[]`
- `item_count`
- `response_scale`
- `note`

## Scoring design

### Pipeline

1. Validate that all 28 answers exist and are in `1..=5`.
2. Reverse-score any item marked `reverse_keyed`.
3. Sum scores by construct.
4. Compute each construct mean score.
5. Derive a display-only response band from the mean.
6. Return construct scores plus a non-diagnostic note.

### Why this design

- more defensible than a direct archetype matcher
- explainable enough for a premium consumer product
- easy to unit test
- easier to align with future validation work

### Tradeoffs

- still a self-report MVP, not a validated instrument
- display bands are descriptive, not normative
- short scales improve usability but reduce precision until validation work exists

## Frontend design

### Landing page

- editorial hero
- premium palette and typography
- clear articulation of the reflective, non-clinical stance

### Assessment

- single-question flow
- progress bar
- shared 5-point response scale
- bilingual copy support
- result card with construct bars and brief interpretations

## Error handling

- incomplete answer payloads return `400`
- invalid answer values return `400`
- frontend handles fetch failure with a graceful retry state

## Testing strategy

### Unit tests

- incomplete payload rejection
- invalid answer rejection
- construct scoring returns the expected shape
- reverse-keyed items score correctly

### Integration tests

- landing route returns `200`
- question API returns the full 28-item catalog
- score API accepts a valid payload
- score API rejects incomplete and invalid payloads

## Security and privacy posture

For the MVP:

- no persistence on the server
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
- richer interpretive copy
- bilingual wording review

### Medium term

- user accounts
- history view
- AI-guided follow-up interpretation

### Long term

- psychometric validation program
- calibration for percentiles if justified by data
- safety workflows
- coach- or clinician-reviewed content only if the product moves closer to wellness or care
- research notes in [docs/psychometric-redesign.md](./psychometric-redesign.md)
