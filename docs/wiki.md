# Vincent AI Wiki

## What this repo is

This repo contains the first local MVP for Vincent AI:

- landing page
- assessment flow
- scoring engine
- results UI
- product/design docs

## Who it is for

- product review
- story review
- design direction review
- local demo

## Runbook

### Start locally

```bash
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo run
```

### Open

- `http://127.0.0.1:3000/`
- `http://127.0.0.1:3000/assessment`

### Run tests

```bash
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo test
```

## Current product decisions

- no auth in MVP
- no persistence
- deterministic scoring
- one-question-at-a-time assessment flow
- premium editorial tone
- explicit non-clinical framing

## Suggested next work items

1. Add result sharing and social cards.
2. Add saved session history.
3. Add post-result reflection prompts.
4. Add analytics for completion and share intent.
5. Run user interviews on tone calibration.
6. Decide whether the product should remain consumer-facing or evolve toward coach tooling.
