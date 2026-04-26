# Vincent ADHD v0 PRD

## Product

Vincent ADHD is a private, local-first adult ADHD screening and visit-preparation tool.

## One-line thesis

Vincent ADHD helps adults organize self-report evidence before deciding whether to seek a formal evaluation.

## Product boundary

Vincent ADHD is:

- a self-report screening summary
- a visit-preparation tool
- an adult-only product for users 18+

Vincent ADHD is not:

- a diagnosis
- a way to confirm or rule out DSM-5 criteria
- therapy
- crisis support
- medication guidance
- a clinically validated or licensed screening instrument in v0

## Primary goal

Reduce friction for adults who suspect ADHD by helping them understand whether it may be worth seeking a formal evaluation and by generating a clinician-ready summary they can copy, download, print, or bring to an appointment.

## Target users

- adults 18+ who suspect ADHD and want a structured first step
- adults preparing for a licensed clinician visit and wanting clearer examples
- adults who care about privacy and do not want to submit answers to a server

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

## v0 scope

### In scope

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

## Assessment structure

1. Safety and scope gate
2. Current attention and executive-function signals
3. Restlessness and impulsivity signals
4. Functional impairment
5. Childhood history
6. Cross-setting pattern
7. Other factors to discuss with a clinician
8. Visit-preparation notes

## Result design

Required result bands:

- Elevated ADHD-related screening signal
- Moderate ADHD-related screening signal
- Low ADHD-related screening signal
- Inconclusive / more context needed

Required result sections:

- clear non-diagnostic headline
- reasoned breakdown of the main factors that influenced the signal
- reminder about overlap factors worth discussing with a clinician
- clinician-ready exportable summary

## Privacy posture

- answers stay in memory by default
- optional `localStorage` save is explicit opt-in
- no answer payloads are posted to the server
- no account system exists in v0

## Launch bar

- local routing works for landing, screening, privacy, and explanation pages
- in-browser scoring is deterministic and tested
- exported report is useful enough to bring to an appointment
- copy is careful about not over-claiming medical certainty
