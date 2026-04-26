# Vincent ADHD Feasibility

## Bottom line

Vincent ADHD is feasible as a narrow, privacy-first self-report screening and clinician-prep tool.

It is not feasible to market this version as a diagnosis product, treatment product, or clinically validated screener.

## Why this version is feasible

- the product can run entirely in the browser
- the scope can stay narrow and understandable
- deterministic scoring is simple to inspect and test
- report generation does not require backend infrastructure
- privacy posture is stronger because answers do not leave the browser by default

## Where the limits are

### Clinical validity

Low for v0. There is no validation program, licensing program, or clinician-reviewed evidence base strong enough to justify clinical claims.

### Safety support

Intentionally limited. Vincent can screen for immediate danger and redirect to crisis resources, but it does not provide crisis support itself.

### Differential interpretation

Limited by design. Vincent can remind users about overlapping factors, but it cannot determine causation or rule conditions in or out.

## Appropriate positioning

Position Vincent ADHD as:

- an adult ADHD-related screening summary
- a private visit-preparation tool
- a browser-only tool that helps users organize information for a licensed clinician

Do not position it as:

- a diagnosis tool
- medication guidance
- treatment planning
- a replacement for professional evaluation

## Key risks

- users may still overread the result as a diagnosis unless the disclaimers stay prominent
- scoring thresholds will need tuning through user testing and clinician review
- optional local save can expose data to other people using the same device if the user is not careful
- English-only wording may limit accessibility until translations are reviewed properly

## Recommended next work

1. Content review by a licensed clinician for wording safety.
2. Usability testing with adults seeking evaluation.
3. Accessibility review of the screening flow and report actions.
4. Stronger validation around thresholds before making any stronger claim.
