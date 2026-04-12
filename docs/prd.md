# Vincent AI PRD

## Document intent

This PRD follows a concise product-requirements format influenced by strong public templates from Atlassian-style PRD guidance: problem, goals, users, requirements, metrics, risks, and launch plan.

## Product name

Vincent AI

## One-line product thesis

Vincent AI is a premium personality mirror that gives users a memorable, shareable, emotionally sharp read on their behavior patterns without pretending to be a clinical instrument.

## Problem

Most personality products fail in one of two ways:

1. They are too soft and generic, so users feel mildly seen but not changed.
2. They overclaim scientific authority without building real psychometric or safety discipline.

TMTi demonstrates the demand for a sharper, more discussable personality product. The opportunity is to keep the memorable sharpness while upgrading:

- design quality
- language quality
- interpretability
- trust
- long-term extensibility into coaching or mental-wellness workflows

## Opportunity

Vincent can occupy a premium lane between:

- meme-forward shareable quizzes
- soft self-help personality content
- formal psychometric tools that feel dry, expensive, or inaccessible

The wedge is not “more psychology jargon.” The wedge is:

- better aesthetic taste
- sharper but more emotionally intelligent writing
- clearer dimensional logic
- a product architecture that can evolve into journaling, coaching, or guided reflection

## Target users

### Primary

- self-observant adults who like personality tools but want sharper language
- aesthetically sensitive users who respond to editorial/luxury product packaging
- social sharers who want identity language with discussion value

### Secondary

- coaches, creators, and communities that use personality language as conversation fuel
- users interested in emotional self-inquiry but not ready for therapy products

### Not for initial MVP

- minors
- users in acute crisis
- any use case requiring diagnosis, treatment, or clinical claims

## Jobs to be done

- Help me see my recurring pattern faster than journaling alone.
- Give me language that feels specific enough to remember.
- Give me something I can send to a friend and talk about.
- Make the experience feel elevated, not gimmicky.

## Experience principles

1. High-end, not cute.
2. Sharp, not cruel.
3. Reflective, not diagnostic.
4. Explainable underneath the mood.
5. Short enough to complete, rich enough to discuss.

## MVP scope

### In scope

- landing page
- 24-question assessment
- 8 behavioral dimensions
- 14 archetypes including 2 shadow archetypes
- result page with:
  - archetype
  - signature
  - similarity score
  - per-dimension readout
  - gifts / fracture / support language
- docs and local run workflow

### Out of scope

- accounts and persistence
- payments
- share card generation
- analytics stack
- LLM chat follow-up
- clinician workflows
- crisis escalation
- psychometric validation pipeline

## User flow

1. User lands on Vincent homepage.
2. User understands the mood and promise quickly.
3. User starts the 24-question mirror.
4. User answers one question at a time with visible progress.
5. Vincent returns a primary archetype and reflective explanation.
6. User can restart, discuss, or return to the landing page.

## Functional requirements

### Assessment

- system must load 24 questions quickly
- each question must have exactly 3 options
- each answer must map to one dimension and a score from 1 to 3
- assessment must reject incomplete or invalid payloads

### Scoring

- system must aggregate 8 dimensions
- system must bucket each dimension into low / medium / high
- system must match the user signature to the nearest archetype signature
- result must expose an explainable dimensional breakdown

### Presentation

- landing page must establish premium tone
- assessment UI must work on desktop and mobile
- result page must clearly distinguish reflective content from diagnosis

## Non-functional requirements

- local-first developer workflow
- fast page loads
- explainable scoring
- testable API
- modular code structure for future growth

## Success metrics for MVP

### Product

- completion rate
- result share intent
- self-reported “felt specific” rating
- revisit / retake rate

### Quality

- no broken route or scoring flow in local test
- sub-second API response locally
- no invalid state on incomplete answers

## Risks

- “brutal honesty” can drift into empty cruelty
- users may infer clinical legitimacy where none exists
- sharp copy can go viral for the wrong reasons
- mental-health adjacency raises regulatory and trust expectations quickly

## Launch recommendation

Launch Vincent as:

- a reflective identity product
- premium personality mirror
- coaching-adjacent, not therapy-adjacent

Avoid launching with claims like:

- accurate mental health detection
- trauma diagnosis
- attachment disorder diagnosis
- depression / anxiety screening

## Next versions

### v1.1

- result sharing
- saved sessions
- expanded archetype library

### v1.2

- reflective follow-up prompts
- journaling layer
- optional AI-guided explanation

### v2

- evidence program for reliability / validity
- crisis and safety flows
- clinician or coach tools if justified
