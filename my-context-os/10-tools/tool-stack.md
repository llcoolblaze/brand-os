---
title: "Tool Stack"
domain: "10-tools"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---

# Tool Stack

> This is the canonical inventory of every tool in your stack -- what it does, what
> it costs, how it integrates, and whether you actually need it. Review quarterly
> to cut bloat and ensure every dollar spent delivers value.

---

## Tool Inventory

<!-- TODO: Fill in your actual tool stack -->

### Sales & Outbound

| Tool | Category | Purpose | Monthly Cost | Annual Cost | Users | Integration Points | Status |
|------|----------|---------|-------------|------------|-------|-------------------|--------|
| <!-- TODO: e.g., Apollo --> | Prospecting | Find contacts, verify emails | <!-- $X --> | <!-- $X --> | <!-- # --> | CRM, Clay | Active |
| <!-- TODO: e.g., Outreach/Salesloft --> | Sequences | Automated outbound sequences | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | CRM, email | Active |
| <!-- TODO: e.g., Clay --> | Enrichment | Data enrichment workflows | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | Apollo, CRM | Active |
| <!-- TODO: e.g., LinkedIn Sales Nav --> | Social selling | Prospect research, InMail | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | CRM | Active |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

### CRM & Revenue Ops

| Tool | Category | Purpose | Monthly Cost | Annual Cost | Users | Integration Points | Status |
|------|----------|---------|-------------|------------|-------|-------------------|--------|
| <!-- TODO: e.g., HubSpot --> | CRM | System of record | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | Everything | Active |
| <!-- TODO: e.g., Gong --> | Revenue intelligence | Call recording/analysis | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | CRM, calendar | Active |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

### Marketing

| Tool | Category | Purpose | Monthly Cost | Annual Cost | Users | Integration Points | Status |
|------|----------|---------|-------------|------------|-------|-------------------|--------|
| <!-- TODO: e.g., Webflow --> | Website | Marketing site | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | Analytics | Active |
| <!-- TODO: e.g., Mailchimp --> | Email | Newsletter, nurture | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | CRM | Active |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

### AI & Automation

| Tool | Category | Purpose | Monthly Cost | Annual Cost | Users | Integration Points | Status |
|------|----------|---------|-------------|------------|-------|-------------------|--------|
| <!-- TODO: e.g., Claude --> | AI assistant | Writing, analysis, agents | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | MCP servers | Active |
| <!-- TODO: e.g., Zapier --> | Automation | Connect tools, workflows | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | All tools | Active |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

### Infrastructure & Dev

| Tool | Category | Purpose | Monthly Cost | Annual Cost | Users | Integration Points | Status |
|------|----------|---------|-------------|------------|-------|-------------------|--------|
| <!-- TODO: e.g., Supabase --> | Database | Backend / data | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | MCP, API | Active |
| <!-- TODO: e.g., Vercel --> | Hosting | App deployment | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | GitHub | Active |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

### Analytics & Reporting

| Tool | Category | Purpose | Monthly Cost | Annual Cost | Users | Integration Points | Status |
|------|----------|---------|-------------|------------|-------|-------------------|--------|
| <!-- TODO: e.g., Google Analytics --> | Web analytics | Traffic, conversions | Free | Free | <!-- TODO --> | Website | Active |
| <!-- TODO: e.g., Ahrefs --> | SEO | Keyword tracking, backlinks | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | N/A | Active |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

---

## Cost Summary

| Category | Monthly Total | Annual Total | % of Total |
|----------|-------------|-------------|-----------|
| Sales & Outbound | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| CRM & RevOps | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| Marketing | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| AI & Automation | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| Infrastructure | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| Analytics | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| **Total** | **<!-- TODO -->** | **<!-- TODO -->** | 100% |

---

## Evaluation Criteria

When considering a new tool, score it on these dimensions:

| Criterion | Weight | Score (1-5) | Weighted Score |
|-----------|--------|------------|---------------|
| Solves a real, recurring pain point | 25% | <!-- TODO --> | <!-- TODO --> |
| Integrates with existing stack | 20% | <!-- TODO --> | <!-- TODO --> |
| ROI is clear and measurable | 20% | <!-- TODO --> | <!-- TODO --> |
| Easy to adopt (low learning curve) | 15% | <!-- TODO --> | <!-- TODO --> |
| Replaces / consolidates existing tool(s) | 10% | <!-- TODO --> | <!-- TODO --> |
| Scales with our growth | 10% | <!-- TODO --> | <!-- TODO --> |
| **Total** | 100% | | **<!-- TODO: /5 -->** |

**Threshold:** Score >3.5 to proceed with trial. Score >4.0 to purchase.

---

## Stack Architecture

<!-- TODO: Describe how your tools connect -->

```
[Prospecting: Apollo/Clay]
        |
        v (enriched contacts)
[CRM: HubSpot/Salesforce] <──> [Sequences: Outreach/Salesloft]
        |                              |
        v                              v
[Analytics: GA4]              [Call Recording: Gong]
        |
        v
[Reporting: Dashboard tool]

[AI Layer: Claude + MCP] ──> connects to all via APIs/MCP
[Automation: Zapier] ──> glue between everything
```

---

## Quarterly Tool Audit

- [ ] Is every tool being actively used? (check last login dates)
- [ ] Is every tool delivering measurable value?
- [ ] Are there overlapping tools that could be consolidated?
- [ ] Are we on the right tier/plan for each tool? (downgrade bloat)
- [ ] Any new tools needed based on current bottlenecks?
- [ ] Are all integrations working correctly?
- [ ] Are we using all features we're paying for?

---

### Cross-References
- MCP integrations: [06-ai-tooling/mcp-integrations.md](../06-ai-tooling/mcp-integrations.md)
- CRM configuration: [07-revenue-ops/crm-setup.md](../07-revenue-ops/crm-setup.md)
- Agent catalog (AI tools): [06-ai-tooling/agent-catalog.md](../06-ai-tooling/agent-catalog.md)
- Clay workflows: [02-outbound-systems/clay-enrichment.md](../02-outbound-systems/clay-enrichment.md)
- Sequence tools: [02-outbound-systems/sequences.md](../02-outbound-systems/sequences.md)
- Competitive intel (competitor tools): [10-tools/competitive-intel.md](./competitive-intel.md)
