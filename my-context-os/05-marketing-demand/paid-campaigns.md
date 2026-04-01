---
title: "Paid Campaign Strategy"
domain: "05-marketing-demand"
status: template
last_validated: 2026-01-01
confidence: low
depends_on:
  - 01-gtm-strategy/icp.md
  - 01-gtm-strategy/positioning.md
---

# Paid Campaign Strategy

> Paid campaigns accelerate what organic builds slowly. This document defines
> channel selection, targeting, creative templates, budgets, and measurement.
> Every dollar spent should be traceable to pipeline.

---

## Channel Selection

<!-- TODO: Choose channels based on where your ICP spends time -->

| Channel | ICP Presence | Best For | Monthly Budget | Priority |
|---------|-------------|----------|---------------|----------|
| LinkedIn Ads | <!-- TODO: High/Med/Low --> | B2B targeting, ABM, thought leadership | <!-- TODO --> | <!-- TODO --> |
| Google Ads (Search) | <!-- TODO --> | High-intent capture, competitor terms | <!-- TODO --> | <!-- TODO --> |
| Google Ads (Display) | <!-- TODO --> | Retargeting, awareness | <!-- TODO --> | <!-- TODO --> |
| Meta (Facebook/Instagram) | <!-- TODO --> | Retargeting, B2C-style B2B | <!-- TODO --> | <!-- TODO --> |
| Twitter/X Ads | <!-- TODO --> | Tech audiences, developer communities | <!-- TODO --> | <!-- TODO --> |
| Reddit Ads | <!-- TODO --> | Niche communities, authentic engagement | <!-- TODO --> | <!-- TODO --> |
| YouTube Ads | <!-- TODO --> | Demo videos, thought leadership | <!-- TODO --> | <!-- TODO --> |
| <!-- TODO: Other channels --> | | | | |

---

## Audience Targeting

### LinkedIn Targeting Layers

<!-- TODO: Build audiences from your ICP -->

| Audience Name | Targeting Criteria | Estimated Size | Use Case |
|--------------|-------------------|---------------|----------|
| ICP Tier 1 | <!-- TODO: Job titles + company size + industry --> | <!-- TODO --> | Cold campaigns |
| ICP Tier 2 | <!-- TODO --> | <!-- TODO --> | Awareness |
| Website Retarget | Site visitors, last 90 days | <!-- TODO --> | Retargeting |
| Engaged Audience | Video viewers + ad engagers | <!-- TODO --> | Warm nurture |
| Lookalike - Customers | Based on customer list upload | <!-- TODO --> | Expansion |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

### Google Search Targeting

| Campaign | Keywords | Match Type | Negative Keywords |
|----------|---------|-----------|-----------------|
| Brand | <!-- TODO: Your brand name + variations --> | Exact + Phrase | <!-- TODO --> |
| Competitor | <!-- TODO: Competitor names + "alternative" --> | Exact | <!-- TODO --> |
| Category | <!-- TODO: Category keywords from SEO strategy --> | Phrase | <!-- TODO: Irrelevant modifiers --> |
| Problem | <!-- TODO: Problem-based keywords --> | Broad Match Modified | <!-- TODO --> |

---

## Ad Copy Templates

### LinkedIn Sponsored Content

**Format:** Single image or carousel

**Headline (< 70 chars):** <!-- TODO: e.g., "Stop guessing your forecast. Start knowing." -->

**Body (< 150 words):**
```
[Pain point hook -- 1 sentence]

[How you solve it -- 1-2 sentences]

[Social proof -- 1 sentence]

[CTA]
```

**Example:**
```
Your sales forecast is wrong. Again.

[Product] uses buyer behavior signals -- not rep guesses -- to predict
revenue with 90%+ accuracy. Companies like [Logo] saw results in 14 days.

See how it works -->
```

### Google Search Ads

**Headline options (30 chars each):**
1. <!-- TODO: e.g., "Accurate Sales Forecasting" -->
2. <!-- TODO: e.g., "90% Forecast Accuracy" -->
3. <!-- TODO: e.g., "Free 14-Day Trial" -->

**Description options (90 chars each):**
1. <!-- TODO -->
2. <!-- TODO -->

---

## Budget Allocation

<!-- TODO: Define your monthly/quarterly budget -->

### Monthly Budget Breakdown

| Channel | Budget | % of Total | Expected Leads | Target CPL |
|---------|--------|-----------|---------------|-----------|
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| **Total** | <!-- TODO --> | 100% | <!-- TODO --> | <!-- TODO --> |

### Budget Rules
- <!-- TODO: e.g., "No channel gets less than $500/mo (not enough data to optimize)" -->
- <!-- TODO: e.g., "Shift 20% of underperforming budget to winning channels monthly" -->
- <!-- TODO: e.g., "Retargeting gets 20-30% of total budget" -->

---

## Conversion Tracking

<!-- TODO: Define your conversion events and attribution model -->

| Conversion Event | Value | Tracking Method | Attribution |
|-----------------|-------|----------------|-------------|
| Form submission | <!-- TODO --> | Google Tag / LinkedIn Insight | First-touch + last-touch |
| Demo booked | <!-- TODO --> | CRM + UTM | Multi-touch |
| Free trial start | <!-- TODO --> | Product analytics | Multi-touch |
| Closed-won deal | <!-- TODO --> | CRM | Multi-touch |

### UTM Convention
```
utm_source = [channel] (linkedin, google, meta)
utm_medium = [ad type] (cpc, social, display)
utm_campaign = [campaign name] (format: YYYY-MM_audience_offer)
utm_content = [ad variation] (for A/B testing)
```

---

## Retargeting Flows

<!-- TODO: Define your retargeting audiences and sequences -->

| Audience | Trigger | Ad Message | Duration | Goal |
|----------|---------|-----------|----------|------|
| Site visitors (no conversion) | Visited any page | Social proof + CTA | 30 days | Return to site |
| Pricing page visitors | Visited /pricing | Case study + demo CTA | 14 days | Book demo |
| Blog readers | Read 2+ blog posts | Relevant resource offer | 60 days | Download gated content |
| Demo no-shows | Booked but didn't attend | Reschedule + value remind | 7 days | Reschedule |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

---

## Campaign Performance Review

Review weekly; optimize monthly.

| Campaign | Spend | Impressions | Clicks | CTR | Leads | CPL | Opps | CPA | ROAS |
|----------|-------|------------|--------|-----|-------|-----|------|-----|------|
| <!-- TODO --> | | | | | | | | | |

---

### Cross-References
- ICP for targeting: [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Positioning for messaging: [01-gtm-strategy/positioning.md](../01-gtm-strategy/positioning.md)
- SEO (paid + organic synergy): [05-marketing-demand/seo-strategy.md](./seo-strategy.md)
- Campaign calendar: [05-marketing-demand/campaign-calendar.md](./campaign-calendar.md)
- Lead scoring (how paid leads get scored): [07-revenue-ops/lead-scoring.md](../07-revenue-ops/lead-scoring.md)
- Metrics dashboard: [07-revenue-ops/metrics-dashboard.md](../07-revenue-ops/metrics-dashboard.md)
