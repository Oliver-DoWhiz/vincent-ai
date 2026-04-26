# Vincent ADHD

Vincent ADHD is a private, local-first adult ADHD screening and clinician-prep tool.

It helps adults organize:

- attention and executive-function concerns
- restlessness or impulsivity patterns
- functional impairment
- childhood-history evidence
- cross-setting patterns
- overlapping factors worth discussing with a licensed clinician
- notes to bring to an appointment

## What it is not

Vincent ADHD is not:

- a diagnosis
- a treatment plan
- medication guidance
- therapy
- crisis support
- a clinically validated screening instrument in this version

It does not claim that a user meets DSM-5 criteria or that they do or do not have ADHD.

## Product behavior

- The active assessment runs fully in the browser.
- Question catalog, scoring, and report generation live in frontend modules under `static/`.
- Answers are kept in memory by default.
- `localStorage` is used only when the user explicitly enables `Save progress on this device`.
- Assessment answers are not posted to the server.
- There is no account system or database for screening answers.
- There is no LLM API usage in the product flow.

## Local run

```bash
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo run
```

Open:

- `http://127.0.0.1:3000/`
- `http://127.0.0.1:3000/screening`

## Validation

Run the browser scoring tests:

```bash
node scripts/test_scoring.mjs
```

Run Rust route tests:

```bash
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo test
```

Recommended static checks:

```bash
rg -n "/screening|/privacy|/how-it-works" static src
rg -n -i "diagnosis|DSM|medication|therapy|crisis" static src docs
```

## Scoring model at a high level

Vincent uses transparent deterministic logic based on self-report:

1. Current attention and executive-function signals
2. Restlessness or impulsivity signals
3. Functional impairment
4. Childhood-history evidence
5. Cross-setting pattern count
6. Overlapping factors that may complicate interpretation
7. Safety flag

Possible result bands:

- Elevated ADHD-related screening signal
- Moderate ADHD-related screening signal
- Low ADHD-related screening signal
- Inconclusive / more context needed

Every result includes the reminder that it is a self-report screening summary, not a diagnosis.

## Repo structure

- `static/landing.html`: home page
- `static/screening.html`: adult ADHD screening flow
- `static/privacy.html`: privacy and scope page
- `static/how-it-works.html`: scoring and limitation overview
- `static/adhd-data.mjs`: question catalog and copy constants
- `static/adhd-scoring.mjs`: deterministic scoring
- `static/adhd-report.mjs`: local Markdown report generation
- `static/app.mjs`: browser interaction logic
- `src/web.rs`: static file server and route handlers
- `tests/http.rs`: route coverage
- `scripts/test_scoring.mjs`: frontend scoring and report validation

## Documentation

- [docs/prd.md](/Users/yegaoyang/Desktop/workspace/vincent-ai-main/docs/prd.md)
- [docs/safety-and-scope.md](/Users/yegaoyang/Desktop/workspace/vincent-ai-main/docs/safety-and-scope.md)
- [docs/privacy.md](/Users/yegaoyang/Desktop/workspace/vincent-ai-main/docs/privacy.md)
- [docs/tech-design.md](/Users/yegaoyang/Desktop/workspace/vincent-ai-main/docs/tech-design.md)
