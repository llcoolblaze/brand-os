---
title: "Pipeline Stage Definitions"
domain: "02-outbound-systems"
status: template
last_validated: 2026-01-01
confidence: low
depends_on:
  - 03-sales-execution/deal-playbook.md
---

# Pipeline Stage Definitions

> Clear pipeline stages eliminate ambiguity about where a deal actually stands. Each
> stage has objective entry/exit criteria -- no "gut feel" stage assignments. This
> document defines stages, conversion targets, and red flags.

---

## Stage Definitions

<!-- TODO: Customize stages and criteria for your sales process -->

### Stage 0: Lead / Prospect
| Attribute | Details |
|-----------|---------|
| **Definition** | Identified as potential ICP fit but no engagement yet |
| **Entry Criteria** | Meets minimum ICP criteria (see [icp.md](../01-gtm-strategy/icp.md)) |
| **Exit Criteria** | Responds positively to outreach OR requests information |
| **Owner** | SDR / BDR |
| **Probability** | 5% |
| **Expected Duration** | 0-21 days (outbound sequence length) |

### Stage 1: Discovery / Qualification
| Attribute | Details |
|-----------|---------|
| **Definition** | Engaged prospect; discovery meeting scheduled or completed |
| **Entry Criteria** | Positive reply + meeting booked, OR inbound request |
| **Exit Criteria** | Discovery complete: pain confirmed, authority identified, timeline exists |
| **Owner** | AE |
| **Probability** | 15% |
| **Expected Duration** | <!-- TODO: e.g., 3-7 days --> |
| **Required Activities** | Complete discovery call using [discovery-questions.md](../03-sales-execution/discovery-questions.md) |

### Stage 2: Evaluation / Demo
| Attribute | Details |
|-----------|---------|
| **Definition** | Qualified opportunity; prospect is actively evaluating your solution |
| **Entry Criteria** | Pain confirmed, budget range discussed, demo scheduled |
| **Exit Criteria** | Demo delivered, positive feedback, next steps agreed |
| **Owner** | AE |
| **Probability** | 30% |
| **Expected Duration** | <!-- TODO: e.g., 7-14 days --> |
| **Required Activities** | Deliver tailored demo, identify champion, map decision process |

### Stage 3: Proposal / Negotiation
| Attribute | Details |
|-----------|---------|
| **Definition** | Proposal sent; terms being discussed |
| **Entry Criteria** | Prospect requests proposal or pricing, decision maker engaged |
| **Exit Criteria** | Verbal agreement on terms, or clear objections being resolved |
| **Owner** | AE |
| **Probability** | 60% |
| **Expected Duration** | <!-- TODO: e.g., 7-14 days --> |
| **Required Activities** | Send proposal (see [deal-playbook.md](../03-sales-execution/deal-playbook.md)), handle objections |

### Stage 4: Verbal Commit / Contract
| Attribute | Details |
|-----------|---------|
| **Definition** | Verbal yes; contract in review or signature pending |
| **Entry Criteria** | Decision maker says "yes, let's move forward" |
| **Exit Criteria** | Signed contract + payment method collected |
| **Owner** | AE + Legal |
| **Probability** | 85% |
| **Expected Duration** | <!-- TODO: e.g., 3-10 days --> |
| **Required Activities** | Send contract, confirm legal review timeline, prep onboarding |

### Stage 5: Closed Won
| Attribute | Details |
|-----------|---------|
| **Definition** | Contract signed, payment confirmed |
| **Entry Criteria** | Fully executed agreement |
| **Owner** | Transitions to CS / Onboarding |

### Stage X: Closed Lost
| Attribute | Details |
|-----------|---------|
| **Definition** | Deal is dead for now |
| **Required Fields** | Loss reason (see categories below), competitor (if applicable), reopen date |
| **Loss Reason Categories** | Price, Timing, Competition, No Decision, Bad Fit, Champion Left, Budget Cut |

---

## Conversion Targets

<!-- TODO: Fill in with your actual targets and current performance -->

| Stage Transition | Target Conversion | Current | Benchmark |
|-----------------|-------------------|---------|-----------|
| Lead -> Discovery | <!-- TODO: e.g., 15% --> | <!-- TODO --> | 10-20% |
| Discovery -> Evaluation | <!-- TODO: e.g., 50% --> | <!-- TODO --> | 40-60% |
| Evaluation -> Proposal | <!-- TODO: e.g., 60% --> | <!-- TODO --> | 50-70% |
| Proposal -> Verbal | <!-- TODO: e.g., 70% --> | <!-- TODO --> | 60-80% |
| Verbal -> Closed Won | <!-- TODO: e.g., 90% --> | <!-- TODO --> | 85-95% |
| **Overall Lead -> Won** | <!-- TODO: e.g., 3% --> | <!-- TODO --> | 1-5% |

---

## Stage Duration Benchmarks

<!-- TODO: Set benchmarks based on your historical data -->

| Stage | Target Duration | Max Duration (red flag) | Current Avg |
|-------|----------------|----------------------|-------------|
| Discovery | <!-- TODO: 5 days --> | <!-- 14 days --> | <!-- TODO --> |
| Evaluation | <!-- TODO: 10 days --> | <!-- 21 days --> | <!-- TODO --> |
| Proposal | <!-- TODO: 10 days --> | <!-- 21 days --> | <!-- TODO --> |
| Verbal/Contract | <!-- TODO: 5 days --> | <!-- 14 days --> | <!-- TODO --> |
| **Total Cycle** | <!-- TODO: 30 days --> | <!-- 60 days --> | <!-- TODO --> |

---

## Red Flag Indicators

These signals indicate a deal is at risk. When detected, escalate or re-qualify.

| Red Flag | Stage(s) | What It Means | Action |
|----------|---------|---------------|--------|
| Deal stuck > max duration | Any | Stalled deal, likely no decision | Re-engage champion, create urgency |
| Champion goes dark | Evaluation+ | Lost internal momentum | Find another thread, send value content |
| New stakeholder appears late | Proposal+ | Buying process wasn't fully mapped | Reset discovery on new stakeholder |
| "Let me check with my team" | Any | No real champion or authority | Qualify harder on decision process |
| Request to extend eval/trial | Evaluation | Not seeing enough value | Diagnose what's missing |
| Legal redlines > 5 items | Contract | Procurement friction | Align with their legal early |
| Competitor mentioned for first time late | Proposal+ | Was evaluating others in parallel | Address competitive positioning (see [objection-handling.md](../03-sales-execution/objection-handling.md)) |
| <!-- TODO: Add your specific red flags --> | | | |

---

## Pipeline Hygiene Rules

1. **Update stages within 24 hours** of any customer interaction
2. **Every deal must have a next step** with a date -- no exceptions
3. **Deals at max duration** get reviewed in weekly pipeline meeting
4. **Close date accuracy:** Close date can only move twice before requiring re-qualification
5. **Monthly pipeline scrub:** Remove all deals with no activity in 30+ days
6. <!-- TODO: Add your specific hygiene rules -->

---

### Cross-References
- Deal management through stages: [03-sales-execution/deal-playbook.md](../03-sales-execution/deal-playbook.md)
- Discovery questions (Stage 1): [03-sales-execution/discovery-questions.md](../03-sales-execution/discovery-questions.md)
- Objection handling (Stage 2-4): [03-sales-execution/objection-handling.md](../03-sales-execution/objection-handling.md)
- Lead scoring feeding Stage 0: [07-revenue-ops/lead-scoring.md](../07-revenue-ops/lead-scoring.md)
- CRM pipeline configuration: [07-revenue-ops/crm-setup.md](../07-revenue-ops/crm-setup.md)
- Pipeline metrics: [07-revenue-ops/metrics-dashboard.md](../07-revenue-ops/metrics-dashboard.md)
- Outbound sequences feeding Stage 0-1: [02-outbound-systems/sequences.md](./sequences.md)
