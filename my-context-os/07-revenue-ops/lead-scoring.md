---
title: "Lead Scoring Model"
domain: "07-revenue-ops"
status: template
last_validated: 2026-01-01
confidence: low
depends_on:
  - 01-gtm-strategy/icp.md
---

# Lead Scoring Model

> Lead scoring separates signal from noise. It ensures sales spends time on leads
> most likely to convert, and marketing knows which leads need more nurturing.
> This model combines demographic, firmographic, behavioral, and engagement data
> into a single actionable score.

---

## Scoring Dimensions

### Dimension 1: Demographic (Contact-Level Fit)

How well does this person match your buyer persona?

| Attribute | Criteria | Points | Max |
|-----------|---------|--------|-----|
| **Job title** | Exact match to target persona (e.g., VP Sales) | +20 | 20 |
| | Related title (e.g., Director of Sales) | +15 | |
| | Adjacent role (e.g., Head of Revenue) | +10 | |
| | Unrelated role | +0 | |
| **Seniority** | C-level / VP | +15 | 15 |
| | Director | +10 | |
| | Manager | +5 | |
| | Individual contributor | +0 | |
| **Department** | Target department | +10 | 10 |
| | Adjacent department | +5 | |
| <!-- TODO: Add your demographic criteria --> | | | |

**Demographic subtotal: /45**

---

### Dimension 2: Firmographic (Company-Level Fit)

How well does their company match your ICP? (See [icp.md](../01-gtm-strategy/icp.md))

| Attribute | Criteria | Points | Max |
|-----------|---------|--------|-----|
| **Employee count** | ICP Tier 1 range (e.g., 50-200) | +20 | 20 |
| | ICP Tier 2 range (e.g., 200-500) | +15 | |
| | ICP Tier 3 range (e.g., 30-50) | +10 | |
| | Outside ICP | +0 | |
| **Industry** | Target industry | +15 | 15 |
| | Adjacent industry | +10 | |
| | Non-target | +0 | |
| **Revenue** | Sweet spot (e.g., $5M-$50M) | +10 | 10 |
| | Acceptable range | +5 | |
| **Tech stack** | Uses complementary tools | +5 | 5 |
| **Geography** | Primary market | +5 | 5 |
| <!-- TODO: Add your firmographic criteria --> | | | |

**Firmographic subtotal: /55**

---

### Dimension 3: Behavioral (Intent Signals)

What actions indicate buying intent?

| Behavior | Points | Decay? |
|----------|--------|--------|
| Visited pricing page | +15 | Decays after 14 days |
| Requested a demo | +25 | No decay |
| Downloaded gated content | +10 | Decays after 30 days |
| Attended webinar | +10 | Decays after 30 days |
| Visited 3+ pages in one session | +5 | Decays after 7 days |
| Returned to site within 7 days | +10 | Decays after 14 days |
| Viewed case study page | +8 | Decays after 14 days |
| Used free tool / calculator | +12 | Decays after 21 days |
| <!-- TODO: Add your behavioral signals --> | | |

**Behavioral subtotal: uncapped (activity-based)**

---

### Dimension 4: Engagement (Interaction with Your Team)

| Engagement | Points | Decay? |
|-----------|--------|--------|
| Replied to outbound email (positive) | +20 | No decay |
| Replied to outbound email (neutral/info request) | +10 | Decays after 30 days |
| Connected on LinkedIn | +5 | No decay |
| Engaged with LinkedIn content (comment) | +8 | Decays after 14 days |
| Attended a meeting / call | +25 | No decay |
| Referred by existing customer | +30 | No decay |
| <!-- TODO: Add your engagement signals --> | | |

**Engagement subtotal: uncapped**

---

## Score Thresholds

<!-- TODO: Set thresholds based on your data -->

| Score Range | Classification | Action | Routing |
|------------|---------------|--------|---------|
| **80+** | **SQL** (Sales Qualified Lead) | Immediate sales follow-up (within 4 hours) | Direct to AE |
| **50-79** | **MQL** (Marketing Qualified Lead) | Sales development outreach (within 24 hours) | SDR queue |
| **25-49** | **Nurture** | Add to nurture sequence, continue scoring | Marketing automation |
| **0-24** | **Cold / Unqualified** | Low-touch nurture or disqualify | Marketing drip |

### PQL (Product Qualified Lead) Criteria

If you have a free tier or trial:

| Product Behavior | Points | Threshold |
|-----------------|--------|-----------|
| Completed onboarding | +15 | |
| Used core feature 3+ times | +20 | |
| Invited team members | +25 | |
| Hit usage limit | +20 | |
| **PQL threshold** | | **60+ (product score)** |

---

## Decay Rules

Scores should decrease over time if the lead isn't actively engaging.

| Score Type | Decay Rate | Rationale |
|-----------|-----------|-----------|
| Behavioral scores | -50% after decay period | Interest fades if not acted on |
| Engagement scores | No decay on meetings/replies | Real interactions don't lose value |
| Fit scores (demographic + firmographic) | No decay | Company characteristics don't change often |
| Overall score floor | Never below fit score | A great-fit company is always worth tracking |

**Decay schedule:** Run decay calculations weekly (automated in CRM/MAP).

---

## Negative Scoring

Some signals should REDUCE the score.

| Signal | Points | Reason |
|--------|--------|--------|
| Unsubscribed from email | -20 | Active disengagement |
| Bounced email (invalid) | -30 | Bad data |
| Competitor employee | -50 | Not a real prospect |
| Student / .edu email | -30 | Not a buyer (usually) |
| Job title: Intern / Student | -20 | No buying authority |
| No engagement in 90 days | -15 | Going cold |
| <!-- TODO: Add your negative signals --> | | |

---

## Model Calibration

Review and calibrate the scoring model quarterly.

### Calibration Process
1. Export all leads that reached SQL threshold in the last quarter
2. Check: What % actually became opportunities? (should be >30%)
3. Export all leads that stayed below MQL
4. Check: Did any close that we missed? (should be <5%)
5. Adjust point values and thresholds based on findings
6. Log changes in [_evidence/research-log.md](../_evidence/research-log.md)

### Calibration Log

| Date | Change Made | Reason | Impact |
|------|-----------|--------|--------|
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

---

### Cross-References
- ICP criteria (foundation for fit scoring): [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Clay enrichment (data source for scoring): [02-outbound-systems/clay-enrichment.md](../02-outbound-systems/clay-enrichment.md)
- Pipeline stages (where scored leads enter): [02-outbound-systems/pipeline-stages.md](../02-outbound-systems/pipeline-stages.md)
- CRM setup (where scoring lives): [07-revenue-ops/crm-setup.md](./crm-setup.md)
- Metrics (scoring effectiveness tracking): [07-revenue-ops/metrics-dashboard.md](./metrics-dashboard.md)
- Sequences (how scored leads get outreach): [02-outbound-systems/sequences.md](../02-outbound-systems/sequences.md)
