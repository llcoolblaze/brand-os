---
description: "Phase 7 of Brand OS setup — synthesize all completed knowledge base files into a coherent system. Updates master narrative, populates AI tooling docs, and creates your prompt library. Trigger: 'setup synthesis', 'setup phase 7', 'finalize setup', 'complete setup'"
---

# Phase 7: Synthesis (Final Phase)

You are running Phase 7 of the Brand OS guided setup — the final phase. This phase connects everything together by:
- Updating `my-context-os/_synthesis/master-narrative.md`
- Populating `my-context-os/_evidence/research-log.md`
- Populating `my-context-os/06-ai-tooling/agent-catalog.md`
- Populating `my-context-os/06-ai-tooling/mcp-integrations.md`
- Populating `my-context-os/06-ai-tooling/prompt-library.md`

## Context Loading

This phase requires reading ALL completed files across the knowledge base. Read every file that has been populated during setup. This is the phase that connects dots across domains.

Start by reading `setup-progress.json` to identify which files were completed, which were skipped, and which phases were run.

Then read all completed files. At minimum, read:
- All files in `my-context-os/01-gtm-strategy/`
- All files in `my-context-os/02-brand-voice/` and `.claude/voice-dna/`
- All files in `my-context-os/03-sales-execution/`
- All files in `my-context-os/04-linkedin-content/`
- All files in `my-context-os/05-operations/`
- Any completed files in `my-context-os/07-specialized/`
- `my-context-os/_synthesis/master-narrative.md`

## Tasks

This phase is mostly automated with light user input. Walk through each task, show the user what you've generated, and ask for approval before writing.

### Task 1: Update Master Narrative (_synthesis/master-narrative.md)

Re-read the master narrative written in Phase 1. Now that all domains are populated, update:

**Domain Connection Map** — Fill in specific connections with real data. For example:
- "ICP Tier 1 ([specific tier]) maps to pipeline stage [X] with [Y]% win rate"
- "Content pillar '[pillar name]' directly addresses [Persona 1]'s pain point about [pain point]"
- "Lead scoring dimension [X] correlates with deal playbook qualification criteria [Y]"

**Key Themes** — Refine with evidence from all domains. Identify 3-5 themes that emerged across multiple files. For example:
- "Speed-to-value is a recurring theme: positioning emphasizes it, sales playbook leads with it, content pillars teach it"
- "Trust through transparency: brand voice uses direct language, pricing is published, case studies show real numbers"

**Contradictions to Resolve** — Flag any inconsistencies discovered across files. For example:
- "ICP says target company size is 50-500, but pipeline stages assume enterprise-length sales cycles"
- "Brand voice says 'casual and direct' but cold email templates use formal language"
- "Pricing targets $50K ACV but lead scoring weights SMB signals heavily"

**Show the user what changed and ask for approval:**
"I've updated your master narrative with cross-domain connections. Here are the key updates: [summary]. And I found these potential contradictions: [list]. Should I update the narrative with these findings, and do you want to resolve any of the contradictions now?"

### Task 2: Populate Research Log (_evidence/research-log.md)

Scan all completed files. Extract any evidence, data points, or claims made during setup. Create research log entries with:

| Date | Source | Finding | Confidence | Domain |
|------|--------|---------|------------|--------|
| [today] | Brand OS setup interview | [specific claim] | Medium | [domain] |

Examples of what to extract:
- Market size claims from positioning
- Win rate estimates from deal playbook
- Conversion rate assumptions from pipeline stages
- CAC/LTV targets from metrics dashboard
- Competitor pricing from competitive intel

Mark all entries as "Medium" confidence since they come from user interview, not validated data.

**Show the user:** "I extracted [N] data points and claims from your setup interviews. These are logged with 'Medium' confidence since they came from our conversation, not validated data sources. Want to review them or adjust any confidence levels?"

### Task 3: Populate Agent Catalog (06-ai-tooling/agent-catalog.md)

Document all existing skills as agents. For each skill, capture:

| Agent | Purpose | Trigger Words | Knowledge Base Files Read | When to Use |
|-------|---------|---------------|--------------------------|-------------|

Include these agents:
1. **outbound-copywriter** — Generates cold emails, sequences, and outreach copy
2. **deal-analyst** — Analyzes active deals against qualification frameworks
3. **linkedin-ghostwriter** — Writes LinkedIn posts in your brand voice
4. **icp-researcher** — Researches and qualifies potential accounts against ICP
5. **competitive-intel** — Analyzes competitors and generates battlecards
6. **campaign-planner** — Plans marketing campaigns across channels
7. **guided-setup** — The setup wizard itself (for future updates)

For each agent, list:
- Which knowledge base files it reads as context
- Example prompts that trigger it
- What output it produces
- Limitations or caveats

**Show the user:** "Here's your agent catalog with [N] agents documented. Any agents you want to add or modify?"

### Task 4: Populate MCP Integrations (06-ai-tooling/mcp-integrations.md)

Based on the tools mentioned during setup (CRM, enrichment tools, analytics platforms, etc.), document:

**For each relevant tool, suggest MCP server integration:**
- Server name and purpose
- Configuration snippet (if a known MCP server exists)
- Use cases in the Brand OS workflow
- Data that flows through the integration

**Ask the user:** "During setup you mentioned using [list tools from tool-stack and CRM setup]. Are any of these connected as MCP servers in your Claude Code setup? I can document the integrations and suggest new ones."

Common MCP integrations to suggest:
- Slack MCP (for notifications, channel monitoring)
- GitHub MCP (for content publishing, project management)
- Database MCP (for CRM data access)
- Browser MCP (for competitive monitoring, SEO checks)

**Populate:**
- Active MCP integrations (currently configured)
- Recommended MCP integrations (not yet configured, with setup instructions)
- Integration use cases mapped to Brand OS workflows

### Task 5: Curate Prompt Library (06-ai-tooling/prompt-library.md)

Generate 10-15 reusable prompts based on the completed knowledge base. Each prompt should reference specific knowledge base files to read.

**Categories and example prompts:**

**Research Prompts:**
- "Research [company name] as a potential [Tier X] account" (reads: icp.md, lead-scoring.md)
- "Analyze [competitor name]'s latest moves" (reads: competitive-intel.md, positioning.md)
- "Find [N] companies matching our Tier 1 ICP in [industry]" (reads: icp.md)

**Writing Prompts:**
- "Write a cold email to [persona name] at [company]" (reads: icp.md, cold-email-templates.md, brand-voice.md)
- "Write a LinkedIn post about [topic] using the [template type] format" (reads: content-pillars.md, post-templates.md, brand-voice.md)
- "Draft a blog intro targeting the keyword [keyword]" (reads: seo-strategy.md, brand-voice.md)

**Analysis Prompts:**
- "Review this deal: [deal details]" (reads: deal-playbook.md, lead-scoring.md, pipeline-stages.md)
- "Analyze this month's campaign performance: [data]" (reads: metrics-dashboard.md, campaign-calendar.md)
- "Score this lead: [lead details]" (reads: lead-scoring.md, icp.md)

**Operations Prompts:**
- "Review our pipeline health this week" (reads: pipeline-stages.md, metrics-dashboard.md)
- "Suggest this week's LinkedIn engagement targets" (reads: engagement-strategy.md, icp.md)
- "Plan next month's campaign calendar" (reads: campaign-calendar.md, content-pillars.md)

**Customize each prompt** to use the user's actual persona names, content pillars, competitor names, and terminology.

**Show the user:** "Here are [N] reusable prompts organized by category. Which ones are most useful? Any prompts you'd add for your specific workflow?"

## Final Completion

After all five tasks are complete, calculate completion stats and display:

```
Brand OS Setup — COMPLETE

Your knowledge base is fully customized:
- [X]/[total] files active ([Y]% complete)
- [N] personas defined
- [N] content pillars
- [N] competitors mapped
- [N] reusable prompts created

Your system is now live. Here's what you can do:
- "Write a cold email to [actual persona name]" — outbound-copywriter
- "Analyze this deal" — deal-analyst
- "Write a LinkedIn post about [actual pillar topic]" — linkedin-ghostwriter
- "Research [actual competitor name]" — competitive-intel
- "Plan a campaign for [upcoming event]" — campaign-planner

Run `node scripts/health-check.mjs` to verify everything.
Say "setup progress" anytime to see your dashboard.

To refine anything later, say "update my [file name]".
```

Update `setup-progress.json` to mark Phase 7 and overall setup as complete. Set:
- `phase7.status`: "complete"
- `phase7.completedAt`: today's date
- `overall.status`: "complete"
- `overall.completedAt`: today's date
- `overall.completionPercentage`: calculated from completed vs total files

## Important Guidelines

- This phase is mostly AUTOMATED — generate content from existing files, then ask for approval.
- Show the user what you've generated before writing each file. Get explicit approval.
- Be specific when documenting cross-domain connections — use actual data from their files, not generic examples.
- Flag genuine contradictions, not trivial differences. Only raise issues worth resolving.
- The prompt library should use the user's ACTUAL names, terms, and context — not placeholder examples.
- If any earlier phases are incomplete, note this in the completion summary and suggest which to revisit.
- Write each file after the user approves it — do not batch all writes at the end.
- The final completion message should use actual values from their knowledge base (real persona names, real pillar names, real competitor names).
