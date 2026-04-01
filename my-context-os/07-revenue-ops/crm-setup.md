---
title: "CRM Configuration"
domain: "07-revenue-ops"
status: template
last_validated: 2026-01-01
confidence: low
depends_on:
  - 02-outbound-systems/pipeline-stages.md
---

# CRM Configuration

> Your CRM is the system of record for all customer relationships and revenue data.
> This document defines the object model, custom fields, automation rules, and data
> hygiene practices that keep it reliable.

---

## CRM Platform

**Platform:** <!-- TODO: e.g., Salesforce, HubSpot, Pipedrive, Close.io, Attio -->
**Plan:** <!-- TODO: e.g., Professional, Enterprise -->
**Admin(s):** <!-- TODO: Who manages the CRM -->

---

## Object Model

<!-- TODO: Define the core objects and their relationships -->

```
Accounts (Companies)
   |
   +-- Contacts (People)
   |      |
   |      +-- Activities (Emails, Calls, Meetings)
   |
   +-- Deals / Opportunities
   |      |
   |      +-- Pipeline Stages (see pipeline-stages.md)
   |      |
   |      +-- Products / Line Items
   |
   +-- Tasks
```

---

## Custom Fields

### Account (Company) Fields

| Field Name | Type | Required? | Purpose | Source |
|-----------|------|-----------|---------|-------|
| ICP Tier | Picklist (1/2/3/Disqualified) | Yes | ICP classification per [icp.md](../01-gtm-strategy/icp.md) | Manual or Clay enrichment |
| Employee Count | Number | Yes | Firmographic qualification | Clay / Clearbit |
| Industry | Picklist | Yes | ICP matching | Clay / Clearbit |
| Annual Revenue | Currency | No | Qualification | Clay / Clearbit |
| Tech Stack | Multi-select or Text | No | Technology signals | BuiltWith / Clay |
| Funding Stage | Picklist | No | Timing signal | Crunchbase / Clay |
| Last Enrichment Date | Date | No | Data freshness tracking | Clay automation |
| <!-- TODO: Add your custom account fields --> | | | | |

### Contact Fields

| Field Name | Type | Required? | Purpose | Source |
|-----------|------|-----------|---------|-------|
| Persona | Picklist | Yes | Maps to ICP personas | Manual |
| Lead Score | Number | Yes | Composite score from [lead-scoring.md](./lead-scoring.md) | Automated |
| Lead Status | Picklist | Yes | New / Contacted / Engaged / Qualified / Disqualified | Automated + Manual |
| Lead Source | Picklist | Yes | Inbound / Outbound / Referral / Event / etc. | Manual or automated |
| LinkedIn URL | URL | Yes | Multi-channel outreach | Clay / Manual |
| Sequence Status | Picklist | No | Active / Completed / Paused / Opted Out | Outbound tool sync |
| Last Activity Date | Date | No | Engagement recency | Automated |
| <!-- TODO: Add your custom contact fields --> | | | | |

### Deal / Opportunity Fields

| Field Name | Type | Required? | Purpose | Source |
|-----------|------|-----------|---------|-------|
| Pipeline Stage | Picklist | Yes | See [pipeline-stages.md](../02-outbound-systems/pipeline-stages.md) | Manual |
| Deal Value | Currency | Yes | Expected ACV | Manual |
| Close Date | Date | Yes | Expected close | Manual |
| Champion | Lookup (Contact) | Yes | Who's selling internally | Manual |
| Economic Buyer | Lookup (Contact) | No | Who signs the check | Manual |
| Qualification Score | Number | No | MEDDIC/BANT score | Manual |
| Loss Reason | Picklist | Required on Closed-Lost | Price / Timing / Competition / No Decision / Bad Fit | Manual |
| Competitor | Picklist or Text | No | Who we're competing against | Manual |
| Next Step | Text | Yes | What happens next + date | Manual |
| <!-- TODO: Add your custom deal fields --> | | | | |

---

## Pipeline Configuration

Map directly to [pipeline-stages.md](../02-outbound-systems/pipeline-stages.md):

| Stage | Probability | Rotting Period | Required Fields to Enter |
|-------|------------|---------------|------------------------|
| Lead / Prospect | 5% | 21 days | Lead source, ICP tier |
| Discovery | 15% | 14 days | Champion, pain identified |
| Evaluation | 30% | 21 days | Demo delivered, stakeholders mapped |
| Proposal | 60% | 21 days | Proposal sent, deal value confirmed |
| Verbal Commit | 85% | 14 days | Verbal yes from decision maker |
| Closed Won | 100% | N/A | Contract signed, payment method |
| Closed Lost | 0% | N/A | Loss reason (required) |

---

## Automation Rules

<!-- TODO: Define automations that keep the CRM accurate and actionable -->

| Rule Name | Trigger | Action | Purpose |
|-----------|---------|--------|---------|
| Lead score update | Any scoring event | Recalculate lead score | Keep scores current |
| MQL notification | Lead score crosses MQL threshold | Slack notification to SDR + create task | Fast follow-up |
| SQL notification | Lead score crosses SQL threshold | Assign to AE + notification | Immediate attention |
| Stale deal alert | Deal in stage > rotting period | Slack notification to deal owner | Pipeline hygiene |
| Activity logging | Email sent/received via integration | Log activity on contact | Activity tracking |
| Close date passed | Close date < today, deal still open | Notify rep to update | Forecast accuracy |
| Lead source attribution | New contact created | Set lead source based on UTM / referrer | Attribution |
| <!-- TODO: Add your automations --> | | | |

---

## Integration Points

| System | Integration Type | Data Flow | Frequency |
|--------|-----------------|-----------|-----------|
| <!-- TODO: e.g., Outbound tool (Apollo/Outreach) --> | Bi-directional sync | Sequence status, activities | Real-time |
| <!-- TODO: e.g., Clay --> | One-way (Clay -> CRM) | Enrichment data | On-demand + weekly |
| <!-- TODO: e.g., Marketing (HubSpot/Marketo) --> | Bi-directional | Leads, MQL status, campaigns | Real-time |
| <!-- TODO: e.g., Billing (Stripe/Chargebee) --> | One-way (Billing -> CRM) | Revenue data, subscriptions | Daily |
| <!-- TODO: e.g., Slack --> | One-way (CRM -> Slack) | Notifications | Real-time (event-driven) |
| <!-- TODO --> | | | |

---

## Data Hygiene Practices

### Daily
- All new leads have lead source set
- Activities logged on every contact interaction

### Weekly
- Review and resolve duplicate contacts/accounts
- Update stale deal close dates
- Clear out bounced/invalid emails

### Monthly
- Audit: Are required fields populated on all active deals?
- Review closed-lost reasons for patterns
- Verify integration syncs are working correctly

### Quarterly
- Full data quality audit (completeness, accuracy, freshness)
- Archive old leads with no engagement (>180 days)
- Review and update picklist values
- Validate lead scoring model (see [lead-scoring.md](./lead-scoring.md))

---

### Cross-References
- Pipeline stage definitions: [02-outbound-systems/pipeline-stages.md](../02-outbound-systems/pipeline-stages.md)
- Lead scoring model: [07-revenue-ops/lead-scoring.md](./lead-scoring.md)
- ICP tiers: [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Clay enrichment workflow: [02-outbound-systems/clay-enrichment.md](../02-outbound-systems/clay-enrichment.md)
- Metrics dashboard: [07-revenue-ops/metrics-dashboard.md](./metrics-dashboard.md)
- Tool stack: [10-tools/tool-stack.md](../10-tools/tool-stack.md)
- Agent integrations: [06-ai-tooling/agent-catalog.md](../06-ai-tooling/agent-catalog.md)
