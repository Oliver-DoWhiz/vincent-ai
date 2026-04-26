# Archived TMTi Reverse-Engineering Notes

This document is historical reference material from the earlier personality-product phase. It is not part of the active Vincent ADHD product definition.

## What was inspected

- forwarded email description
- live public site at `https://v.tmti.dev`
- shipped frontend bundle

## Concrete implementation findings

### Core assessment

- 24 base questions
- 8 dimensions
- 3 options per question
- values scored `1..3`

The dimensions implemented in the shipped bundle are:

- `ATT`
- `WRK`
- `EMO`
- `SOC`
- `REL`
- `DEC`
- `EXE`
- `COG`

### Result engine

The scoring logic in the live bundle:

1. sum per dimension
2. bucket scores into `L / M / H`
3. produce an 8-part signature
4. assign the nearest archetype signature by distance

This is a lightweight nearest-profile classifier, not a deep adaptive test.

### Archetype table

The shipped code includes **18 total result codes**, with **2 marked hidden**.

That means the implementation currently looks closer to:

- 16 standard archetypes
- 2 hidden archetypes

This is worth noting because the marketing language can be read as “18 visible + 2 hidden.”

### Upsell structure

The bundle contains additional question sets beyond the free 24:

- 4 `pro_*` questions
- 10 `max_*` questions

This suggests a monetization structure layered on top of the base archetype reveal.

### Hidden-type observation

A weighted answer-space simulation based on the live scoring buckets suggests the hidden types are rare but not impossible:

- one hidden type appears around `2.49%`
- the other around `0.15%`
- combined hidden outcomes are roughly `2.64%` under the modeled answer space

So the “rare hidden archetype” idea is directionally plausible, but it is still a product mechanic, not proof of psychometric rarity.

## Product lessons worth borrowing

- short tests convert better
- sharp archetype writing increases recall
- layered monetization can sit on top of the base reveal
- a coherent aesthetic matters almost as much as the scoring logic

## Product lessons worth improving

- clearer explanation of what the model actually does
- stronger distinction between reflective writing and scientific claim
- more premium visual direction
- more emotionally mature copy

## Implication for Vincent

Vincent should borrow the structure:

- short completion
- memorable archetypes
- dimensional scoring

Vincent should upgrade:

- tone
- design
- interpretability
- trust language
- long-term extensibility into reflection or coaching
