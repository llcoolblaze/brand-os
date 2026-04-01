---
title: "Validation Framework"
domain: "08-startup-ops"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---

# Validation Framework

> Every assumption is a risk. This framework provides a systematic way to validate
> ideas before investing significant time or money. Move through the stages in order
> -- each builds confidence and reduces risk.

---

## Validation Stages

### Stage 1: Problem Validation

**Goal:** Confirm that the problem you think exists actually exists, and people care enough to solve it.

**Key questions:**
- Do real people experience this problem?
- How do they currently solve it (or cope with it)?
- How painful is it? (inconvenience vs. critical)
- Are they actively looking for a solution?

**Experiments:**

| Experiment | Method | Signal Threshold | Timeline |
|-----------|--------|-----------------|----------|
| Problem interviews | Talk to 15-20 potential users | 10+ describe the same pain unprompted | 2 weeks |
| Online research | Forums, Reddit, Quora, G2 reviews | Multiple threads discussing the pain | 3 days |
| Survey | Short survey (5 questions) to target audience | >60% rate the problem as "very" or "extremely" painful | 1 week |
| Search demand | Google Trends, keyword research | >1,000 monthly searches for problem-related terms | 1 day |

**Go/No-Go:** Proceed to Stage 2 if 10+ interviews confirm the pain AND there's evidence of active solution-seeking.

---

### Stage 2: Solution Validation

**Goal:** Confirm that your proposed solution actually solves the problem in a way people value.

**Key questions:**
- Does the proposed solution address the root cause?
- Would people use this specific solution?
- Is it significantly better than current alternatives?
- What's the minimum feature set needed?

**Experiments:**

| Experiment | Method | Signal Threshold | Timeline |
|-----------|--------|-----------------|----------|
| Solution interviews | Show mockup/prototype to 10 prospects | 7+ say "I would use this" with specifics on how | 2 weeks |
| Landing page test | Build landing page, drive traffic, measure signup rate | >5% email signup rate from cold traffic | 1-2 weeks |
| Concierge MVP | Deliver the solution manually to 3-5 users | 3+ would pay to continue | 2-4 weeks |
| Wizard of Oz test | Simulate the product with human-powered backend | Users can't tell it's manual + they get value | 2-4 weeks |

**Go/No-Go:** Proceed to Stage 3 if landing page converts >5% AND concierge users would pay.

---

### Stage 3: Market Validation

**Goal:** Confirm that the market is large enough and accessible enough to build a business.

**Key questions:**
- How big is the addressable market?
- Can you reach these customers efficiently?
- What will they pay?
- Is the market growing?

**Experiments:**

| Experiment | Method | Signal Threshold | Timeline |
|-----------|--------|-----------------|----------|
| TAM/SAM/SOM analysis | Bottom-up market sizing | SAM > $100M (or your threshold) | 1 week |
| Willingness-to-pay | Van Westendorp pricing survey or direct asks | Clear price point with >50% "acceptable" | 1-2 weeks |
| Pre-sales | Sell before building (LOIs, pre-orders, pilot agreements) | 3+ signed LOIs or pre-orders | 2-4 weeks |
| Competitive analysis | Map existing solutions and their traction | Gap exists OR your approach is 10x better | 1 week |

**Go/No-Go:** Proceed to Stage 4 if TAM is sufficient AND you have pre-sales or strong willingness-to-pay signals.

---

### Stage 4: Channel Validation

**Goal:** Confirm that you can acquire customers profitably at scale.

**Key questions:**
- Which channels reach your ICP?
- What does it cost to acquire a customer through each channel?
- Can you achieve the unit economics needed?
- Does the channel scale?

**Experiments:**

| Experiment | Method | Signal Threshold | Timeline |
|-----------|--------|-----------------|----------|
| Paid ads test | $500-$1,000 test on 2-3 channels | CAC < 1/3 of first-year value | 2-4 weeks |
| Outbound test | 200 cold emails to ICP | >2% positive reply rate | 2 weeks |
| Content test | 10 LinkedIn posts on topic | Above-average engagement from ICP followers | 4 weeks |
| Partnership test | 2-3 partnership conversations | 1+ partner willing to pilot | 2-4 weeks |

**Go/No-Go:** Full investment if at least ONE channel demonstrates profitable unit economics at testable scale.

---

## Experiment Templates

### Experiment Brief

```
Experiment Name: <!-- TODO -->
Stage: Problem / Solution / Market / Channel
Hypothesis: "We believe [assumption]. We'll test this by [method].
             We'll know we're right if [signal threshold]."
Duration: <!-- TODO -->
Budget: <!-- TODO -->
Owner: <!-- TODO -->
Success metric: <!-- TODO -->
Minimum sample: <!-- TODO -->
```

### Experiment Result Log

| Experiment | Date | Hypothesis | Result | Signal vs. Threshold | Decision |
|-----------|------|-----------|--------|---------------------|----------|
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- Go / Pivot / Kill --> |

---

## Signal Thresholds Summary

| Stage | Minimum Signal | Confidence Level |
|-------|---------------|-----------------|
| Problem | 10/15 interviews confirm pain | Medium |
| Solution | 5% landing page conversion + concierge users pay | Medium-High |
| Market | TAM >$100M + 3 pre-sales | High |
| Channel | 1 channel with CAC < 1/3 LTV | High |

---

## Pivot Triggers

When to change direction vs. persist:

| Signal | Diagnosis | Response |
|--------|----------|----------|
| Problem exists but solution doesn't resonate | Right problem, wrong solution | Pivot solution approach |
| Solution works but market is too small | Right solution, wrong market | Expand market definition or adjacent segment |
| Market exists but channels are too expensive | Right product, wrong GTM | Test different channels, consider product-led growth |
| Nothing is working after 2 full cycles | Fundamental issue | Major pivot or kill the idea |
| Users love it but won't pay | Value perception gap | Reposition, repackage, or find the real buyer |

---

### Cross-References
- ICP (who you're validating for): [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Positioning (how you frame the solution): [01-gtm-strategy/positioning.md](../01-gtm-strategy/positioning.md)
- Evidence log (record all validation findings): [_evidence/research-log.md](../_evidence/research-log.md)
- Metrics (track validation metrics): [07-revenue-ops/metrics-dashboard.md](../07-revenue-ops/metrics-dashboard.md)
- Fundraising (validation de-risks the raise): [08-startup-ops/fundraising-prep.md](./fundraising-prep.md)
