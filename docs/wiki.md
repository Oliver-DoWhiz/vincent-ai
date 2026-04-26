# Vincent ADHD Wiki

## What this repo is

This repo contains the v0 local-first Vincent ADHD product:

- landing page
- browser-only adult ADHD screening flow
- deterministic frontend scoring
- local clinician-summary generation
- privacy and safety documentation
- Rust static server for compatibility

## Local runbook

### Start locally

```bash
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo run
```

### Open

- `http://127.0.0.1:3000/`
- `http://127.0.0.1:3000/screening`

### Validate

```bash
node scripts/test_scoring.mjs
PATH=/usr/local/cargo/bin:$PATH CARGO_HOME=$PWD/.cargo-home cargo test
```

## Current product decisions

- adult-only
- local-first and privacy-first
- no diagnosis or treatment claims
- no account system
- no backend scoring
- no tracking that captures answers

## Suggested next work items

1. Accessibility polish for keyboard navigation and screen readers.
2. Content review by a licensed clinician.
3. User testing on clarity of the report and safety language.
4. Translation workflow only after safety-reviewed copy exists.
