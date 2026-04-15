# Vincent Psychometric Redesign

## Status

Implemented baseline instrument plus ongoing validation roadmap.

The 28-item, 7-construct version described here is now the main Vincent
assessment experience in the product. This document does **not** claim that the
instrument is already validated. It defines the research-aligned path for
turning the current construct-first implementation into a more defensible
reflective assessment over time.

## Why this redesign exists

The current MVP is explicit about its position:

- reflective, not diagnostic
- not psychometrically validated
- archetype assignment is editorial, not scientific truth

That positioning should stay. What changes in the next phase is the
measurement layer underneath the narrative layer.

The redesign goal is:

- trait-first measurement
- narrative-second interpretation
- continuous scores in the core model
- archetypes as presentation logic, not as the primary psychometric output

## Research anchors

The redesign is informed by the following broad findings from established work:

1. A defensible questionnaire needs evidence for content, response processes,
   internal structure, relations to other variables, and appropriate use.
2. Big Five style trait models remain the most practical default structure for
   broad personality assessment.
3. Adult attachment is more defensibly measured on two dimensions
   (anxiety and avoidance) than on a single axis.
4. Short scales can work, but only after item pools are generated, reviewed,
   piloted, and reduced.
5. Three-option forced-choice formats are product-friendly but are a weak default
   for psychometric score quality unless they are designed and scored with a
   modern forced-choice model.
6. Binning continuous scores into coarse categories should be treated as a UI
   choice, not as the core scoring method.

See the reference list at the end of this document.

## Product stance

The product should continue to describe itself as:

- a reflective personality mirror
- a coaching-adjacent self-inquiry tool
- non-clinical
- not a diagnostic or treatment instrument

The redesign is meant to improve:

- construct clarity
- interpretability
- score stability
- bilingual comparability

The redesign is **not** meant to convert Vincent into:

- a clinical screener
- a hiring or admissions assessment
- a diagnostic tool

## Recommended construct model

### Preferred model: 28 items

Recommended structure:

- 7 constructs
- 4 items per construct
- 28 total items
- 5-point agreement response scale

The 7 constructs are:

1. Assertive Extraversion
2. Trusting Agreeableness
3. Productive Conscientiousness
4. Negative Emotionality
5. Open-Mindedness
6. Attachment Anxiety
7. Attachment Avoidance

### Fallback model: 24 items

If a strict 24-item cap is non-negotiable, use:

- 6 constructs
- 4 items per construct
- 24 total items

In that case, drop `Open-Mindedness` first and state clearly that the product is
measuring a narrower reflective profile rather than a broad personality structure.

## Mapping from current Vincent dimensions

| Current dimension | Action | Replace with | Reason |
|---|---|---|---|
| `DRIVE` | Merge | Assertive Extraversion + Productive Conscientiousness | Current items mix ambition, hierarchy sensitivity, and achievement striving. |
| `BOUNDARY` | Split/retire | Trusting Agreeableness + Attachment Avoidance + Assertive Extraversion | Current items mix accommodation, conflict style, and interpersonal distance. |
| `EXPOSURE` | Merge | Assertive Extraversion | Current items mix privacy preference, self-presentation, and social presence. |
| `VOLATILITY` | Keep and rename | Negative Emotionality | This is already close to a defensible trait domain. |
| `DISCIPLINE` | Keep and rename | Productive Conscientiousness | This is already close to conscientiousness/productiveness. |
| `INTERPRETATION` | Retire | Trusting Agreeableness or Open-Mindedness | Current items mix suspicion, subtext reading, and power sensitivity. |
| `ATTACHMENT` | Split | Attachment Anxiety + Attachment Avoidance | One axis is not enough for adult attachment. |
| `INITIATIVE` | Merge | Assertive Extraversion + Productive Conscientiousness | Current items mix action bias, execution, and decisiveness. |

## Item format changes

### Replace current response design

Current MVP format:

- one scenario
- three editorial options
- direct score of `1..3`

Recommended next format:

- one first-person statement per item
- one shared response scale across all items
- responses:
  - `1` Strongly disagree
  - `2` Disagree
  - `3` Neither / unsure
  - `4` Agree
  - `5` Strongly agree

### Why this change

- it separates item wording from scoring logic
- it increases score resolution
- it is easier to test for reliability and factor structure
- it makes bilingual translation and invariance testing more manageable

### Item writing rules

All new items should:

- express one idea only
- avoid metaphor-heavy phrasing
- avoid moral loading and aesthetic flattery
- avoid two constructs in one sentence
- be answerable from ordinary lived experience
- avoid direct clinical language

Draft guidance for keying:

- use mostly positively keyed items
- allow at most one clearly reverse-keyed item per construct in early pilots
- explicitly inspect reverse-keyed items for method effects before retaining them

## Baseline item pool

These stems are now the implemented product baseline.
They are theory-aligned items for current use and future validation work, not a
claim of completed psychometric validation.

### Assertive Extraversion

- I speak up quickly when a group needs direction.
- I find it easy to start conversations with unfamiliar people.
- I usually hold back even when I have something useful to add. `(R)`
- Being visible in a group tends to energize me.

### Trusting Agreeableness

- I usually assume good intent until I see evidence otherwise.
- I try to stay considerate even when I disagree strongly.
- I expect people to exploit softness if they get the chance. `(R)`
- I can be direct without becoming harsh.

### Productive Conscientiousness

- I make concrete plans before important work begins.
- I finish routine tasks even when I am bored.
- My priorities change faster than my follow-through. `(R)`
- I keep promises to myself even when nobody is watching.

### Negative Emotionality

- Small setbacks can stay with me longer than I want.
- My mood shifts quickly when I am under pressure.
- I recover quickly after an upsetting interaction. `(R)`
- I start worrying about problems before they fully arrive.

### Open-Mindedness

- New ideas energize me even before I know whether they will work.
- I like approaching the same problem from several different angles.
- I prefer familiar methods over experimentation. `(R)`
- Art, language, or design often changes how I think.

### Attachment Anxiety

- When someone I care about goes quiet, I start to worry about what it means.
- I need a lot of reassurance to feel secure in close relationships.
- I worry that people I love may pull away without warning.
- Uncertainty in a close relationship does not unsettle me much. `(R)`

### Attachment Avoidance

- I get uncomfortable when someone wants more emotional closeness than I do.
- Depending on other people feels risky to me.
- I keep important feelings to myself even in close relationships.
- Letting someone see my emotional needs feels difficult.

## Scoring redesign

### Core scoring

Core scoring should move from categorical signature logic to continuous scale logic.

Recommended per-construct outputs:

- `raw_total`
- `mean_score`
- `answered_items`
- `reverse_keyed_count`
- optional `z_score` after calibration data exist
- optional `percentile` after calibration data exist

### What should change in the algorithm

Current core scoring:

1. sum three items
2. collapse into `L / M / H`
3. concatenate bands
4. nearest-match archetype

Recommended core scoring:

1. reverse-score marked items
2. compute a mean score for each construct
3. standardize scores only after calibration data exist
4. generate narrative copy from continuous score patterns

### UI bands

UI bands can still exist, but only as a presentation layer.

If needed, derive display-only language such as:

- lower than your typical range
- around your typical range
- higher than your typical range

Do not use coarse bins as the primary scoring engine.

### Archetypes

Archetypes have been removed from the main production scoring flow.

If Vincent reintroduces them later, their role should be explicitly secondary:

- editorial summaries built from continuous score patterns
- clearly labeled as non-diagnostic overlays
- never the primary measurement output
- empirically revisited only after enough data exist to compare narrative
  clusters with measured construct patterns

### Similarity score

The old `similarity` field has been removed from the main score payload.

That is the correct direction. It expressed distance from a hand-authored
signature, not confidence, probability, or psychometric precision, and should
not return unless it can be justified with a very different meaning.

## Validation program

The redesign should follow a staged evidence program.

### Phase 0: construct definition

Deliverables:

- one-page definition for each construct
- item specification table
- predicted correlation matrix against anchor measures

Rules:

- define what belongs in the construct
- define what does not belong in the construct
- document expected overlaps between constructs

### Phase 1: content review

Run:

- expert review for construct fit
- product review for tone
- safety review for mental-health-adjacent claims

Output:

- keep / revise / delete decision for each draft item

### Phase 2: cognitive interviewing

Run cognitive interviews separately for English and Chinese.

Pragmatic target:

- 12 to 20 interviews per language
- recruit participants from the intended user population

Inspect:

- comprehension
- recall process
- judgment process
- response mapping
- unintended emotional reactions

Exit rule:

- no item moves to pilot if repeated misunderstanding appears in interviews

### Phase 3: pilot field test

Recommended pilot target:

- English sample: `n >= 300`
- Chinese sample: `n >= 300`

Use the pilot for:

- item distributions
- missingness
- floor/ceiling checks
- inter-item correlations
- omega / alpha
- exploratory factor analysis or ESEM
- item trimming

### Phase 4: confirmatory validation

Recommended validation target:

- English sample: `n >= 500`
- Chinese sample: `n >= 500`

Use the validation sample for:

- confirmatory factor analysis
- cross-language measurement invariance
- gender invariance where appropriate
- test-retest stability on a subset
- convergent and discriminant validity

### Phase 5: external validity

Anchor the redesigned scales against established measures.

Suggested anchors:

- Big Five domains and facets: BFI-2 or BFI-2-S
- Attachment Anxiety / Avoidance: ECR-R or ECR-R short form

Suggested checks:

- convergent validity with the expected anchor domains
- discriminant validity against weakly related domains
- known-groups or criterion checks only if theory is specified in advance

### Working decision rules

These are design targets, not universal laws.

- Internal consistency:
  - early pilot acceptable target: `omega >= .70`
  - preferred target for stable release: `omega >= .80`
- Test-retest:
  - target `r` or ICC around `>= .70`
- Invariance:
  - do not compare mean scores across languages unless scalar invariance is adequate
- Construct fit:
  - retire items that consistently cross-load or behave differently by language

## Bilingual design requirements

English must remain the source authoring language during item generation.

Chinese should not be treated as a surface localization pass. It needs a full
translation workflow:

1. forward translation
2. reconciliation
3. back translation or expert adjudication
4. cognitive interviewing in Chinese
5. field-test invariance checks

If full scalar invariance is not supported, cross-language comparisons should be
limited or disabled.

## Implementation impact on the codebase

### `src/domain.rs`

Implemented changes:

- replaced current `DIMENSIONS` with construct metadata
- replaced scenario triads with statement items
- added reverse-keying metadata
- replaced categorical signature scoring with continuous scale scoring
- removed archetype logic from the main scoring path

### `src/web.rs`

Implemented changes:

- API remains simple
- request shape remains `answers: BTreeMap<String, u8>`
- response shape returns construct scores first plus a cautionary note

### `static/app.js`

Implemented changes:

- shared Likert response UI
- revised copy for response labels
- revised result rendering for continuous scores
- no archetype rendering in the default result path

## Current API direction

Current score payload shape:

```json
{
  "constructs": [
    {
      "key": "ASSERTIVE_EXTRAVERSION",
      "label": "Assertive Extraversion",
      "raw_total": 14,
      "mean_score": 3.5,
      "display_band": "Somewhat agree",
      "interpretation": "You tend to move toward visibility, participation, and interpersonal impact."
    }
  ],
  "item_count": 28,
  "response_scale": "5-point agreement",
  "note": "Vincent now returns continuous construct scores first. Any profile label should be treated as a reflective summary rather than a diagnostic category."
}
```

## Next validation steps

1. Keep the current construct-first product live as the baseline implementation.
2. Run English and Chinese cognitive interviews on the implemented items.
3. Collect field data for item performance, internal structure, and reliability.
4. Only add percentiles, probabilities, or archetype overlays after evidence justifies them.
5. Continue to present Vincent as reflective, not clinical, even if validation work improves.

## References

- American Educational Research Association, American Psychological Association, and National Council on Measurement in Education. *Standards for Educational and Psychological Testing*.
- Soto, C. J., & John, O. P. (2017). *The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power*.
- Soto, C. J., & John, O. P. (2017). *Short and extra-short forms of the Big Five Inventory-2: The BFI-2-S and BFI-2-XS*.
- Van den Broeck, J., et al. (2019). *The Big Five Inventory-2: Replication of psychometric properties in a Dutch adaptation and first evidence for the discriminant predictive validity of the facet scales*.
- Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). *An item-response theory analysis of self-report measures of adult attachment*.
- Sibley, C. G., Fischer, R., & Liu, J. H. (2005). *Reliability and validity of the revised experiences in close relationships (ECR-R) self-report measure of adult romantic attachment*.
- Mokkink, L. B., et al. (2018). *COSMIN methodology for evaluating the content validity of patient-reported outcome measures: A Delphi study*.
- CDC National Center for Health Statistics. *Cognitive Interviewing* and CCQDER question evaluation guidance.
- Lozano, L. M., Garcia-Cueto, E., & Muniz, J. (2008). *Effect of the number of response categories on the reliability and validity of rating scales*.
- Kreitchmann, R. S., Abad, F. J., Ponsoda, V., Nieto, M. D., & Morillo, D. (2019). *Controlling for response biases in self-report scales: Forced-choice vs. psychometric modeling of Likert items*.
- MacCallum, R. C., Zhang, S., Preacher, K. J., & Rucker, D. D. (2002). *On the practice of dichotomization of quantitative variables*.
- Gerlach, M., Farb, B., Revelle, W., & Nunes Amaral, L. A. (2018). *A robust data-driven approach identifies four personality types across four large data sets*.
