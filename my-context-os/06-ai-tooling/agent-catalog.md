---
title: "Agent Catalog"
domain: "06-ai-tooling"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---

# Agent Catalog

> This catalog documents every AI agent in your workflow -- what it does, when it
> triggers, what tools it uses, and how agents interact with each other. As you
> build more automation, this becomes your map of the AI layer.

---

## Agent Inventory

<!-- TODO: Document each AI agent you use or plan to build -->

### Agent 1: <!-- TODO: Agent Name, e.g., "Prospect Research Agent" -->

| Attribute | Details |
|-----------|---------|
| **Name** | <!-- TODO --> |
| **Purpose** | <!-- TODO: What job does this agent do? --> |
| **Trigger** | <!-- TODO: What kicks it off? (manual, cron, event, webhook) --> |
| **Inputs** | <!-- TODO: What data does it need? --> |
| **Tools / APIs** | <!-- TODO: What MCP servers, APIs, or tools does it use? --> |
| **Outputs** | <!-- TODO: What does it produce? Where does the output go? --> |
| **Frequency** | <!-- TODO: How often does it run? --> |
| **Owner** | <!-- TODO: Who maintains it? --> |
| **Status** | <!-- TODO: Active / In Development / Planned --> |

**Example workflow:**
1. <!-- TODO: Step 1 -->
2. <!-- TODO: Step 2 -->
3. <!-- TODO: Step 3 -->

---

### Agent 2: <!-- TODO: Agent Name, e.g., "Content Draft Agent" -->

| Attribute | Details |
|-----------|---------|
| **Name** | <!-- TODO --> |
| **Purpose** | <!-- TODO --> |
| **Trigger** | <!-- TODO --> |
| **Inputs** | <!-- TODO --> |
| **Tools / APIs** | <!-- TODO --> |
| **Outputs** | <!-- TODO --> |
| **Frequency** | <!-- TODO --> |
| **Owner** | <!-- TODO --> |
| **Status** | <!-- TODO --> |

---

### Agent 3: <!-- TODO: Agent Name, e.g., "Deal Analysis Agent" -->

| Attribute | Details |
|-----------|---------|
| **Name** | <!-- TODO --> |
| **Purpose** | <!-- TODO --> |
| **Trigger** | <!-- TODO --> |
| **Inputs** | <!-- TODO --> |
| **Tools / APIs** | <!-- TODO --> |
| **Outputs** | <!-- TODO --> |
| **Status** | <!-- TODO --> |

---

### Example Agent (delete or replace)

| Attribute | Details |
|-----------|---------|
| **Name** | Prospect Research Agent |
| **Purpose** | Automatically research new prospects added to CRM and generate a briefing doc |
| **Trigger** | New contact created in CRM with status "Research Needed" |
| **Inputs** | Company name, contact name, LinkedIn URL |
| **Tools / APIs** | Clay API, LinkedIn (via MCP), web search, Claude API |
| **Outputs** | Structured prospect brief saved to CRM notes + Slack notification |
| **Frequency** | Event-driven (real-time) |
| **Owner** | RevOps |
| **Status** | Planned |

**Workflow:**
1. CRM webhook fires on new contact creation
2. Agent pulls company + contact data from Clay
3. Agent searches recent news and LinkedIn activity
4. Agent generates a 1-page prospect brief using prompt from [prompt-library.md](./prompt-library.md)
5. Brief is saved to CRM contact record
6. Slack notification sent to assigned rep

---

## Agent Interaction Patterns

How agents work together (or should stay independent).

```
<!-- TODO: Map your agent interactions -->

[Prospect Research Agent]
        |
        v (prospect brief)
[Sequence Personalization Agent]
        |
        v (personalized emails)
[Outbound Tool] ──> [Reply Detection Agent]
                            |
                            v (positive reply)
                    [Meeting Scheduler Agent]
```

### Interaction Rules
- <!-- TODO: e.g., "No agent should trigger another agent without human review in the loop" -->
- <!-- TODO: e.g., "All agent outputs are drafts until approved" -->
- <!-- TODO: e.g., "Agents share context via CRM fields, not direct communication" -->

---

## When to Use Which Agent

| Task | Agent | Manual Alternative | When to Use Agent |
|------|-------|-------------------|------------------|
| Research a prospect | Prospect Research Agent | Manual research (30 min) | Always -- for any outbound target |
| Draft a LinkedIn post | Content Draft Agent | Write from scratch | When you have the idea but need a first draft |
| Analyze a deal | Deal Analysis Agent | Manual review | Before pipeline reviews |
| Personalize a sequence | Personalization Agent | Write each email manually | For Tier 2-3 prospects (Tier 1 = manual) |
| <!-- TODO: Add your agent use cases --> | | | |

---

## Agent Development Backlog

| Priority | Agent Name | Purpose | Complexity | Status |
|----------|-----------|---------|-----------|--------|
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- Low/Med/High --> | <!-- Planned / In Dev --> |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

---

### Cross-References
- Prompts used by agents: [06-ai-tooling/prompt-library.md](./prompt-library.md)
- MCP servers available: [06-ai-tooling/mcp-integrations.md](./mcp-integrations.md)
- Tool stack: [10-tools/tool-stack.md](../10-tools/tool-stack.md)
- Sequences agents support: [02-outbound-systems/sequences.md](../02-outbound-systems/sequences.md)
- CRM integration: [07-revenue-ops/crm-setup.md](../07-revenue-ops/crm-setup.md)
