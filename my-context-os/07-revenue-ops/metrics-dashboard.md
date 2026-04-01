---
title: "Metrics Dashboard"
domain: "07-revenue-ops"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---

# Metrics Dashboard

> What gets measured gets managed. This document defines every metric that matters,
> organized by function. It's the single reference for what to track, what targets
> to hit, and how often to review.

---

## North Star Metric

<!-- TODO: Define the ONE metric that best represents value delivery to customers -->

**Metric:** <!-- TODO: e.g., "Monthly Recurring Revenue (MRR)" or "Active Customers" or "Net Revenue Retention" -->

**Why this metric:** <!-- TODO: Explain why this metric matters most -->

**Current value:** <!-- TODO -->

**Target (this quarter):** <!-- TODO -->

**Target (this year):** <!-- TODO -->

---

## Pipeline Metrics

| Metric | Definition | Target | Current | Frequency |
|--------|-----------|--------|---------|-----------|
| Pipeline value | Total value of active opportunities | <!-- TODO --> | <!-- TODO --> | Weekly |
| Pipeline coverage | Pipeline / quota ratio | <!-- TODO: e.g., 3x --> | <!-- TODO --> | Weekly |
| New pipeline created | New opps created this period | <!-- TODO --> | <!-- TODO --> | Weekly |
| Pipeline velocity | (# opps x win rate x avg deal size) / sales cycle length | <!-- TODO --> | <!-- TODO --> | Monthly |
| Win rate | Closed-won / (closed-won + closed-lost) | <!-- TODO: e.g., 25% --> | <!-- TODO --> | Monthly |
| Average deal size | Average ACV of closed-won deals | <!-- TODO --> | <!-- TODO --> | Monthly |
| Sales cycle length | Avg days from first touch to close | <!-- TODO: e.g., 35 days --> | <!-- TODO --> | Monthly |
| Stage conversion rates | % moving from each stage to next | See [pipeline-stages.md](../02-outbound-systems/pipeline-stages.md) | <!-- TODO --> | Monthly |

---

## Marketing Metrics

| Metric | Definition | Target | Current | Frequency |
|--------|-----------|--------|---------|-----------|
| Website traffic | Unique visitors | <!-- TODO --> | <!-- TODO --> | Weekly |
| Organic traffic | Visitors from SEO | <!-- TODO --> | <!-- TODO --> | Monthly |
| Lead volume | Total new leads | <!-- TODO --> | <!-- TODO --> | Weekly |
| MQL volume | Marketing qualified leads | <!-- TODO --> | <!-- TODO --> | Weekly |
| MQL-to-SQL conversion | % of MQLs accepted by sales | <!-- TODO: e.g., 30% --> | <!-- TODO --> | Monthly |
| Cost per lead (CPL) | Total marketing spend / leads | <!-- TODO --> | <!-- TODO --> | Monthly |
| Cost per MQL | Total marketing spend / MQLs | <!-- TODO --> | <!-- TODO --> | Monthly |
| Content engagement | Avg engagement rate on LinkedIn | <!-- TODO: e.g., 3%+ --> | <!-- TODO --> | Weekly |
| Email open rate | Across all campaigns | <!-- TODO: e.g., 35%+ --> | <!-- TODO --> | Weekly |
| Email click rate | Across all campaigns | <!-- TODO: e.g., 5%+ --> | <!-- TODO --> | Weekly |

---

## Sales Metrics

| Metric | Definition | Target | Current | Frequency |
|--------|-----------|--------|---------|-----------|
| Quota attainment | Revenue closed / quota | <!-- TODO: 100%+ --> | <!-- TODO --> | Monthly |
| Activities per rep | Calls + emails + meetings per day | <!-- TODO --> | <!-- TODO --> | Weekly |
| Meetings booked | Discovery meetings scheduled | <!-- TODO --> | <!-- TODO --> | Weekly |
| Meeting show rate | % of booked meetings that happen | <!-- TODO: e.g., 80%+ --> | <!-- TODO --> | Weekly |
| Demos delivered | Product demos completed | <!-- TODO --> | <!-- TODO --> | Weekly |
| Proposals sent | Proposals/quotes sent | <!-- TODO --> | <!-- TODO --> | Weekly |
| Forecast accuracy | Actual vs. predicted revenue | <!-- TODO: e.g., +/- 10% --> | <!-- TODO --> | Monthly |

---

## Customer Metrics

| Metric | Definition | Target | Current | Frequency |
|--------|-----------|--------|---------|-----------|
| MRR / ARR | Monthly/Annual recurring revenue | <!-- TODO --> | <!-- TODO --> | Monthly |
| Net Revenue Retention (NRR) | Revenue retained + expansion - churn | <!-- TODO: e.g., 110%+ --> | <!-- TODO --> | Quarterly |
| Gross churn rate | Revenue lost / starting revenue | <!-- TODO: e.g., < 5% annual --> | <!-- TODO --> | Monthly |
| Logo churn rate | Customers lost / starting customers | <!-- TODO --> | <!-- TODO --> | Monthly |
| Customer Acquisition Cost (CAC) | Total sales+marketing spend / new customers | <!-- TODO --> | <!-- TODO --> | Quarterly |
| LTV:CAC ratio | Lifetime value / CAC | <!-- TODO: e.g., 3:1+ --> | <!-- TODO --> | Quarterly |
| Time to value | Days from sign to first value moment | <!-- TODO --> | <!-- TODO --> | Monthly |
| NPS / CSAT | Customer satisfaction score | <!-- TODO --> | <!-- TODO --> | Quarterly |

---

## Reporting Cadence

| Cadence | What's Reviewed | Audience | Format |
|---------|----------------|----------|--------|
| **Daily** | Pipeline changes, meetings booked, leads generated | Sales team | Slack digest or CRM dashboard |
| **Weekly** | Pipeline review, marketing performance, activity metrics | Sales + Marketing | 30-min meeting + dashboard |
| **Monthly** | Full funnel metrics, forecast, MRR, churn | Leadership | Slide deck + detailed dashboard |
| **Quarterly** | QBR: all metrics, LTV:CAC, NRR, strategic review | Leadership + Board | Detailed report |

---

## Dashboard Tools

<!-- TODO: Document where these metrics live -->

| Metric Category | Dashboard Tool | URL | Owner |
|----------------|---------------|-----|-------|
| Pipeline & Sales | <!-- TODO: e.g., Salesforce dashboard --> | <!-- TODO --> | <!-- TODO --> |
| Marketing | <!-- TODO: e.g., HubSpot / GA4 --> | <!-- TODO --> | <!-- TODO --> |
| Revenue / Finance | <!-- TODO: e.g., ChartMogul, Baremetrics --> | <!-- TODO --> | <!-- TODO --> |
| Product / Usage | <!-- TODO: e.g., Amplitude, Mixpanel --> | <!-- TODO --> | <!-- TODO --> |

---

### Cross-References
- Pipeline stage conversion targets: [02-outbound-systems/pipeline-stages.md](../02-outbound-systems/pipeline-stages.md)
- Lead scoring thresholds: [07-revenue-ops/lead-scoring.md](./lead-scoring.md)
- CRM configuration: [07-revenue-ops/crm-setup.md](./crm-setup.md)
- Pricing (ACV targets): [01-gtm-strategy/pricing.md](../01-gtm-strategy/pricing.md)
- Fundraising metrics: [08-startup-ops/fundraising-prep.md](../08-startup-ops/fundraising-prep.md)
- Campaign performance: [05-marketing-demand/campaign-calendar.md](../05-marketing-demand/campaign-calendar.md)
- Outbound sequence benchmarks: [02-outbound-systems/sequences.md](../02-outbound-systems/sequences.md)
