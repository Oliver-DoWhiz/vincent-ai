# Vincent AI

Vincent AI is a premium personality-assessment MVP built in Rust with `axum`.
It combines:

- a high-end landing page
- a 24-question assessment flow
- an explainable scoring engine with 8 behavioral dimensions
- 14 editorial archetypes, including 2 shadow states
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

- `src/domain.rs`: assessment data, scoring rules, archetype catalog
- `src/web.rs`: routes, API handlers, static serving
- `static/`: landing page, assessment page, and frontend assets
- `docs/prd.md`: product requirements document
- `docs/tech-design.md`: system design
- `docs/feasibility.md`: viability, risks, and guardrails
- `docs/research-reverse-engineering.md`: notes from analyzing the live TMTi implementation
- `docs/wiki.md`: operator-facing project wiki

## Positioning

Vincent is intentionally not framed as diagnosis, therapy, or medical advice.
The product direction is:

- premium, editorial, emotionally sharp
- reflective rather than clinical
- explainable enough to ship and iterate
- extensible toward coaching and mental-wellness workflows with proper evidence and safety work
