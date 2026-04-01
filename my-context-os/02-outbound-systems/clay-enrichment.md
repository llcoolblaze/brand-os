---
title: "Clay Enrichment Workflows"
domain: "02-outbound-systems"
status: template
last_validated: 2026-01-01
confidence: low
depends_on:
  - 01-gtm-strategy/icp.md
---

# Clay Enrichment Workflows

> Clay is your data enrichment engine. It takes raw prospect lists and layers on the
> firmographic, technographic, and behavioral data you need to personalize outreach
> and qualify leads. This document defines what data to collect, from where, and how
> to pipe it into your sequences.

---

## Enrichment Sources

<!-- TODO: Define which data providers and sources you use in Clay -->

| Source | Data Type | Cost | Reliability | Use Case |
|--------|-----------|------|-------------|----------|
| <!-- TODO: e.g., Apollo --> | Contact info, firmographics | <!-- $X/mo --> | <!-- High/Med --> | Initial prospecting |
| <!-- TODO: e.g., Clearbit --> | Technographics, company data | <!-- $X/mo --> | <!-- High --> | ICP scoring |
| <!-- TODO: e.g., LinkedIn Sales Nav --> | Role, connections, activity | <!-- $X/mo --> | <!-- High --> | Personalization |
| <!-- TODO: e.g., BuiltWith --> | Tech stack detection | <!-- $X/mo --> | <!-- Med --> | Technology signals |
| <!-- TODO: e.g., Crunchbase --> | Funding, growth signals | <!-- $X/mo --> | <!-- High --> | Timing signals |
| <!-- TODO: e.g., G2 --> | Intent signals, reviews | <!-- $X/mo --> | <!-- Med --> | Buyer intent |
| <!-- TODO: e.g., Google News API --> | Company news, press | <!-- Free --> | <!-- Med --> | Personalization |

---

## Data Points to Collect

### Company-Level Data

| Data Point | Source | Used For | Priority |
|-----------|--------|---------|----------|
| Employee count | Apollo/Clearbit | ICP qualification (see [icp.md](../01-gtm-strategy/icp.md)) | Must-have |
| Industry / sub-vertical | Clearbit | ICP tier assignment | Must-have |
| Annual revenue | Clearbit/Crunchbase | ICP qualification | Must-have |
| Funding stage & amount | Crunchbase | Timing signal | High |
| Tech stack | BuiltWith/Clearbit | Technology signal matching | High |
| Recent hiring | LinkedIn | Growth signal | Medium |
| Recent news | Google News | Personalization hook | Medium |
| G2 reviews written | G2 | Intent signal | Medium |
| Job postings | LinkedIn | Pain signal detection | Medium |
| <!-- TODO: Add your custom data points --> | | | |

### Contact-Level Data

| Data Point | Source | Used For | Priority |
|-----------|--------|---------|----------|
| Work email (verified) | Apollo/Hunter | Sequence delivery | Must-have |
| Title / role | LinkedIn/Apollo | Persona matching | Must-have |
| LinkedIn URL | Apollo | Multi-channel sequence | Must-have |
| Phone number | Apollo/ZoomInfo | Cold calling | High |
| Tenure in role | LinkedIn | Timing signal (new in role = more open) | Medium |
| Recent LinkedIn posts | LinkedIn | Personalization | Medium |
| Shared connections | LinkedIn | Warm intro paths | Medium |
| Podcast appearances | Google | Personalization + authority signal | Low |
| <!-- TODO: Add your custom fields --> | | | |

---

## Workflow Templates

### Workflow 1: New Prospect Enrichment

**Trigger:** New contact added to Clay table (manual upload, CSV, or CRM sync)

**Steps:**
1. **Verify email** -- Use email verification to remove bounces
2. **Enrich company** -- Pull firmographics from Clearbit/Apollo
3. **Score ICP fit** -- Apply ICP criteria from [icp.md](../01-gtm-strategy/icp.md)
   - Tier 1: All must-haves met + 3+ nice-to-haves
   - Tier 2: All must-haves met + 1-2 nice-to-haves
   - Tier 3: All must-haves met
   - Disqualify: Any must-have missing
4. **Enrich contact** -- Pull role, LinkedIn, phone
5. **Detect signals** -- Check for timing signals (funding, hiring, news)
6. **Generate personalization** -- AI-generated opening line based on enrichment data
7. **Route** -- Push to appropriate sequence in your outbound tool

**Clay Table Columns:**
```
| First Name | Last Name | Email | Email Verified | Company | Employee Count |
| Industry | Revenue | Funding Stage | Tech Stack | ICP Tier | ICP Score |
| LinkedIn URL | Phone | Title | Tenure | Signal Type | Signal Detail |
| Personalized Line | Sequence | Status |
```

### Workflow 2: Signal-Based Re-Enrichment

**Trigger:** Weekly cron job on existing prospect database

**Steps:**
1. Check for new funding events (Crunchbase)
2. Check for leadership changes (LinkedIn)
3. Check for new job postings matching relevant roles
4. Check for news mentions
5. Flag prospects with new signals for re-engagement sequence

### Workflow 3: Inbound Lead Enrichment

**Trigger:** New form submission / inbound lead

**Steps:**
1. Enrich with all available company + contact data
2. Score ICP fit
3. Check for existing outbound touches (dedup)
4. Route: High-fit to sales, Low-fit to nurture

<!-- TODO: Build out your specific workflows -->

---

## Integration with Sequences

### Data Flow

```
Clay Enrichment ──> CRM (contact + company records)
                ──> Outbound Tool (sequence enrollment)
                ──> Lead Scoring (enrichment data feeds score)
```

### Personalization Field Mapping

| Clay Column | Sequence Variable | Example Output |
|------------|------------------|---------------|
| `personalized_line` | `{{personalized_opening_line}}` | "Saw your recent Series B -- congrats!" |
| `pain_signal` | `{{pain_point}}` | "scaling your sales team" |
| `company_name` | `{{company}}` | "Acme Corp" |
| `icp_tier` | (routing logic) | Determines which sequence |
| `signal_type` | `{{trigger_event}}` | "new VP Sales hire" |
| <!-- TODO: Map your fields --> | | |

---

## Quality & Maintenance

### Data Quality Rules
- Email verification must show "valid" (reject "catch-all" for cold outreach)
- Phone numbers must be direct dials, not main lines
- Company data must be <6 months old
- <!-- TODO: Add your quality rules -->

### Enrichment Refresh Cadence
| Data Type | Refresh Frequency | Reason |
|-----------|------------------|--------|
| Contact email | Every 90 days | People change jobs |
| Company firmographics | Every 180 days | Slower to change |
| Signals (funding, hiring) | Weekly | Time-sensitive |
| Tech stack | Every 90 days | Tools change periodically |

---

### Cross-References
- ICP criteria for scoring: [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Sequences that consume this data: [02-outbound-systems/sequences.md](./sequences.md)
- Lead scoring model: [07-revenue-ops/lead-scoring.md](../07-revenue-ops/lead-scoring.md)
- CRM field mapping: [07-revenue-ops/crm-setup.md](../07-revenue-ops/crm-setup.md)
- Tool stack: [10-tools/tool-stack.md](../10-tools/tool-stack.md)
