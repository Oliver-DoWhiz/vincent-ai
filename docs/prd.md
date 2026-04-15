# Vincent AI PRD

## Document intent

This PRD follows a concise product-requirements format: problem, goals, users,
requirements, metrics, risks, and launch direction.

## Product name

Vincent AI

## One-line product thesis

Vincent AI is a premium reflective personality mirror that gives users a sharp,
memorable read on their current self-report pattern without pretending to be a
clinical instrument.

## Problem

Most personality products fail in one of two ways:

1. They are too soft and generic, so users feel mildly seen but not clarified.
2. They overclaim scientific authority without building real psychometric or
   safety discipline.

TMTi demonstrates the demand for a sharper, more discussable personality
product. The opportunity is to keep the memorable sharpness while upgrading:

- construct clarity
- design quality
- interpretability
- trust
- long-term extensibility into coaching or guided reflection

## Opportunity

Vincent can occupy a premium lane between:

- meme-forward shareable quizzes
- soft self-help personality content
- formal psychometric tools that feel dry, expensive, or inaccessible

The wedge is not more psychology jargon. The wedge is:

- better aesthetic taste
- sharper but more emotionally intelligent writing
- clearer dimensional logic
- a product architecture that can evolve into journaling, coaching, or guided reflection

## Target users

### Primary

- self-observant adults who like personality tools but want clearer language
- aesthetically sensitive users who respond to editorial product packaging
- users who want a reflective result they can revisit or discuss

### Secondary

- coaches, creators, and communities that use personality language as conversation fuel
- users interested in self-inquiry but not ready for therapy products

### Not for initial MVP

- minors
- users in acute crisis
- any use case requiring diagnosis, treatment, or clinical claims

## Jobs to be done

- Help me see my recurring pattern faster than journaling alone.
- Give me language that feels specific enough to remember.
- Give me a result I can discuss without pretending it is a diagnosis.
- Make the experience feel elevated, not gimmicky.

## Experience principles

1. High-end, not cute.
2. Sharp, not cruel.
3. Reflective, not diagnostic.
4. Construct-first, narrative-second.
5. Short enough to complete, rich enough to revisit.

## MVP scope

### In scope

- landing page
- 28-item assessment
- 7 reflective constructs
- 5-point agreement response format
- result page with:
  - construct breakdown
  - highest and lowest current signals
  - brief interpretive copy
  - clear non-diagnostic disclaimer
- docs and local run workflow

### Out of scope

- accounts and persistence beyond local browser state
- payments
- share card generation
- analytics stack
- LLM chat follow-up
- clinician workflows
- crisis escalation
- formal psychometric validation pipeline
- probabilities or percentiles without calibration data

## User flow

1. User lands on Vincent homepage.
2. User understands the product promise quickly.
3. User starts the 28-item reflective check-in.
4. User answers one statement at a time using a consistent 5-point scale.
5. Vincent returns a continuous construct profile with brief explanation.
6. User can restart, reflect, or return to the landing page.

## Functional requirements

### Assessment

- system must load 28 questions quickly
- each question must have exactly 5 response options
- each response must map to a construct and a score from `1` to `5`
- reverse-keyed items must be explicitly marked in the question catalog
- assessment must reject incomplete or invalid payloads

### Scoring

- system must aggregate 7 constructs
- system must reverse-score flagged items before aggregation
- result must expose per-construct:
  - raw total
  - mean score
  - display band
  - short interpretation
- display bands must be treated as presentation labels, not as diagnoses,
  probabilities, or population percentiles

### Presentation

- landing page must establish premium tone
- assessment UI must work on desktop and mobile
- result page must clearly distinguish reflective content from diagnosis
- copy must make clear that the output is a self-report summary, not a clinical conclusion

## Non-functional requirements

- local-first developer workflow
- fast page loads
- explainable scoring
- testable API
- modular code structure for future growth

## Success metrics for MVP

### Product

- completion rate
- retake rate
- self-reported clarity or usefulness
- willingness to discuss or revisit the result

### Quality

- no broken route or scoring flow in local test
- sub-second API response locally
- no invalid state on incomplete answers

## Risks

- sharp copy can still drift into overclaim or overidentification
- users may infer clinical legitimacy where none exists
- attachment language can feel higher-stakes than broad personality language
- bilingual wording can drift if translation is treated as a cosmetic pass

## Launch recommendation

Launch Vincent as:

- a reflective identity product
- a premium personality and attachment mirror
- coaching-adjacent, not therapy-adjacent

Avoid launching with claims like:

- accurate mental health detection
- trauma diagnosis
- attachment disorder diagnosis
- anxiety or depression screening
- probabilities or percentile rankings without normative evidence

## Next versions

### v1.1

- saved results
- richer reflective prompts
- improved bilingual wording review

### v1.2

- optional editorial summaries layered on top of construct scores
- journaling layer
- optional AI-guided explanation

### v2

- evidence program for reliability and validity
- calibration for percentiles only if justified by data
- safety workflows
- coach-facing tooling if justified
- deeper measurement notes in [docs/psychometric-redesign.md](./psychometric-redesign.md)
