# Vincent ADHD v0 PRD

## Product

<<<<<<< Updated upstream
This PRD follows a concise product-requirements format: problem, goals, users,
requirements, metrics, risks, and launch direction.
=======
Vincent ADHD
>>>>>>> Stashed changes

## One-line thesis

Vincent ADHD is a private, local-first adult ADHD screening and visit-preparation tool that helps adults organize self-report evidence before deciding whether to seek a formal evaluation.

## Product boundary

<<<<<<< Updated upstream
Vincent AI is a premium reflective personality mirror that gives users a sharp,
memorable read on their current self-report pattern without pretending to be a
clinical instrument.
=======
Vincent ADHD is:
>>>>>>> Stashed changes

- a self-report screening summary
- a visit-preparation tool
- an adult-only product for users 18+

Vincent ADHD is not:

<<<<<<< Updated upstream
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
=======
- a diagnosis
- a way to confirm or rule out DSM-5 criteria
- therapy
- crisis support
- medication guidance
- a clinically validated or licensed screening instrument in v0

## Primary goal

Reduce friction for adults who suspect ADHD by helping them understand whether it may be worth seeking a formal evaluation and by generating a clinician-ready summary they can copy, download, print, or bring to an appointment.
>>>>>>> Stashed changes

## Target users

- adults 18+ who suspect ADHD and want a structured first step
- adults preparing for a licensed clinician visit and wanting clearer examples
- adults who care about privacy and do not want to submit answers to a server

<<<<<<< Updated upstream
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
=======
## Core user jobs

- Help me organize whether my recent patterns look worth discussing with a clinician.
- Help me gather concrete examples instead of vague concern.
- Help me remember childhood and cross-setting evidence.
- Help me bring a cleaner summary to a formal evaluation.

## Experience principles

1. Serious, not playful.
2. Private by default.
3. Explicit about limits.
4. Transparent and deterministic.
5. Practical enough to bring to an appointment.
>>>>>>> Stashed changes

## v0 scope

### In scope

<<<<<<< Updated upstream
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
=======
- landing page with adult ADHD screening and visit-prep positioning
- adult-only scope gate with required acknowledgements
- structured browser-only screening
- safety interruption flow
- deterministic in-browser scoring
- clinician-ready local report generation
- copy, download, print, and clear actions
- privacy and scope documentation

### Out of scope

- diagnosis claims
- treatment or medication recommendations
- therapy features
- crisis workflow beyond immediate guidance
- clinician referral marketplace
- accounts
- backend persistence
- analytics that capture answers or free text
- LLM chat or server-side interpretation
>>>>>>> Stashed changes

## Assessment structure

<<<<<<< Updated upstream
1. User lands on Vincent homepage.
2. User understands the product promise quickly.
3. User starts the 28-item reflective check-in.
4. User answers one statement at a time using a consistent 5-point scale.
5. Vincent returns a continuous construct profile with brief explanation.
6. User can restart, reflect, or return to the landing page.
=======
1. Safety screen
2. Current attention and executive-function signals
3. Restlessness and impulsivity signals
4. Functional impairment
5. Childhood history
6. Cross-setting pattern
7. Other factors to discuss with a clinician
8. Visit-preparation notes
>>>>>>> Stashed changes

## Result design

Required result bands:

<<<<<<< Updated upstream
- system must load 28 questions quickly
- each question must have exactly 5 response options
- each response must map to a construct and a score from `1` to `5`
- reverse-keyed items must be explicitly marked in the question catalog
- assessment must reject incomplete or invalid payloads
=======
- Elevated ADHD-related screening signal
- Moderate ADHD-related screening signal
- Low ADHD-related screening signal
- Inconclusive / more context needed
>>>>>>> Stashed changes

Required result sections:

<<<<<<< Updated upstream
- system must aggregate 7 constructs
- system must reverse-score flagged items before aggregation
- result must expose per-construct:
  - raw total
  - mean score
  - display band
  - short interpretation
- display bands must be treated as presentation labels, not as diagnoses,
  probabilities, or population percentiles
=======
1. Screening signal
2. Why this signal appeared
3. What this does not mean
4. What to bring to a clinician
5. Other factors to discuss
6. Report actions
>>>>>>> Stashed changes

Every result must say that it is not a diagnosis and does not rule ADHD in or out.

<<<<<<< Updated upstream
- landing page must establish premium tone
- assessment UI must work on desktop and mobile
- result page must clearly distinguish reflective content from diagnosis
- copy must make clear that the output is a self-report summary, not a clinical conclusion
=======
## Privacy requirements
>>>>>>> Stashed changes

- answers stay in browser memory by default
- no server submission of assessment answers
- optional `localStorage` only when the user opts in
- clear local data control
- no third-party tracking on assessment pages

## Safety requirements

- adult-only gating
- explicit scope acknowledgements
- minimal safety question
- interrupt flow when immediate danger is reported
- show emergency and crisis guidance with 988 for U.S. users

## Success criteria for v0

<<<<<<< Updated upstream
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
=======
- user can complete screening without backend APIs
- user can generate a local clinician summary
- active product contains no persona or archetype positioning
- privacy and scope copy is obvious before and during screening
- validation passes for frontend scoring, reporting, route behavior, and forbidden-term scans
>>>>>>> Stashed changes
