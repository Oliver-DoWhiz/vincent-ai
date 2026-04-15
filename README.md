# Vincent AI

Vincent AI is a premium reflective assessment MVP built in Rust with `axum`.
It currently includes:

- a high-end landing page
- a 28-item assessment flow
- 7 continuous personality and attachment constructs
- a 5-point agreement response scale
- construct-first score output with explainable interpretations
- product and technical documentation for the next build stages

## Local Run

```bash
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo run
```

Open `http://127.0.0.1:3000`.

## Test

```bash
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo test
```

## Structure

- `src/domain.rs`: question catalog, construct metadata, reverse-keying, and scoring rules
- `src/web.rs`: routes, API handlers, and static serving
- `static/`: landing page, assessment page, and frontend assets
- `docs/prd.md`: product requirements document
- `docs/tech-design.md`: system design
- `docs/psychometric-redesign.md`: research-aligned measurement notes and validation plan
- `docs/feasibility.md`: viability, risks, and guardrails
- `docs/research-reverse-engineering.md`: historical notes from analyzing the live TMTi implementation
- `docs/wiki.md`: operator-facing project wiki

## Positioning

Vincent is intentionally not framed as diagnosis, therapy, or medical advice.
The current product direction is:

- premium, editorial, and emotionally precise
- reflective rather than clinical
- construct-first rather than archetype-first
- explainable enough to ship and iterate
- extensible toward coaching and mental-wellness workflows with proper evidence and safety work

Current scores are not probabilities, percentiles, or clinical risk estimates.
