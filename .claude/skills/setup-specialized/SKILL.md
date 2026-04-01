---
description: "Phase 6 of Brand OS setup — optional specialized modules: Clay enrichment, tool stack, competitive intel, startup validation, fundraising, and consulting client workspaces. Trigger: 'setup specialized', 'setup phase 6', 'setup clay', 'setup competitive', 'setup fundraising', 'setup consulting'"
---

# Phase 6: Specialized Setup (Optional Modules)

You are running Phase 6 of the Brand OS guided setup. ALL files in this phase are OPTIONAL — the user picks which apply to their business. This phase can populate:
- `my-context-os/07-specialized/clay-enrichment.md`
- `my-context-os/07-specialized/tool-stack.md`
- `my-context-os/07-specialized/competitive-intel.md`
- `my-context-os/07-specialized/validation-framework.md`
- `my-context-os/07-specialized/fundraising-prep.md`
- `my-context-os/07-specialized/client-template.md`

## Entry — Module Selection

Present this menu at the start:

```
Phase 6 is optional — pick which modules apply to your business:

1. Clay/Enrichment workflows (if you do outbound at scale)
2. Tool stack documentation (document your marketing/sales tools)
3. Competitive intelligence (detailed competitor battlecards)
4. Startup validation (pre-PMF? experiment frameworks)
5. Fundraising prep (raising or planning to raise?)
6. Consulting client workspaces (agency/consulting model?)

Which ones? (e.g., "1, 3, 5" or "all" or "skip")
```

If the user says "skip", mark Phase 6 as skipped in `setup-progress.json` and proceed to Phase 7.

For each selected module, run the corresponding interview below. Skip unselected modules entirely — leave their template files untouched.

## Module Interviews

### Module 1: Clay Enrichment (clay-enrichment.md)

**Context Loading:** Read `my-context-os/01-gtm-strategy/icp.md` first.

**Questions (ask one at a time):**

1. "What enrichment sources do you use or want to use? (Clay, Apollo, Clearbit, ZoomInfo, Lusha, etc.)"
2. "What data points do you need to personalize outreach? (I'd suggest these based on your ICP: [list from ICP — e.g., tech stack, funding stage, hiring signals, company size])"
3. "Walk me through your ideal enrichment workflow — what happens from the moment you get a lead name to when outreach fires?"
4. "What enrichment signals would auto-qualify or auto-disqualify a lead? (e.g., uses [competitor tool] = disqualify, recently raised funding = qualify)"
5. "How do you handle enrichment failures? (incomplete data, conflicting sources)"

**Populate:**
- Enrichment source inventory with data points per source
- Enrichment workflow (step-by-step with tools and triggers)
- Data point priority list tied to ICP scoring
- Waterfall enrichment logic (primary source, fallback source)
- Personalization variable mapping (enrichment field to outreach variable)
- Quality rules and failure handling
- Cost tracking per enrichment source

After writing: "Clay/enrichment workflow saved with [N] data sources and [N]-step enrichment pipeline."

### Module 2: Tool Stack (tool-stack.md)

**Questions (ask one at a time):**

1. "Let's document your full marketing/sales/ops tool stack. List every tool you use — I'll organize them by category."
2. For each tool mentioned, ask: "What's [tool] for, roughly what does it cost monthly, and how does it integrate with your other tools?"
3. "Any tools you're evaluating or want to replace? What's driving the change?"
4. "Any critical integrations or data flows between tools I should document? (e.g., HubSpot syncs to Salesforce, Stripe webhooks trigger Slack alerts)"

**Populate:**
- Tool inventory table (tool name, category, purpose, cost, status)
- Categories: CRM, Marketing Automation, Sales Engagement, Enrichment, Analytics, Content, Communication, Billing, Dev/Product
- Integration map (which tools connect to which, and how — API, Zapier, native, etc.)
- Data flow diagram (text-based)
- Evaluation pipeline (tools being considered)
- Total monthly/annual spend summary

After writing: "Tool stack documented with [N] tools across [N] categories, $[total] monthly spend."

### Module 3: Competitive Intelligence (competitive-intel.md)

**Context Loading:** Read `my-context-os/01-gtm-strategy/positioning.md` first.

**Questions (ask one at a time):**

1. "Who are your top 3-5 competitors? (Direct competitors first, then adjacent/indirect.)"
2. For each competitor: "What does [competitor] do well? Where are they weak? How do they price?"
3. "When you win deals against [competitor], what's usually the deciding factor?"
4. "When you lose deals to [competitor], what's usually the reason?"
5. "Are there any emerging competitors or market shifts I should capture?"

**Generate a battlecard for each competitor** containing:
- Company overview (size, funding, market position)
- Product comparison (features, strengths, weaknesses)
- Pricing comparison
- Their typical customer profile vs. yours
- Win themes (when/why you beat them)
- Loss themes (when/why they beat you)
- Landmines to set (questions to ask prospects that expose competitor weaknesses)
- Objection handling (when a prospect brings up this competitor)

**Populate:**
- Competitor overview table
- Individual battlecards per competitor
- Competitive positioning matrix
- Win/loss pattern analysis
- Market landscape notes
- Monitoring strategy (how to track competitor moves)

After writing: "Competitive intel saved with [N] competitor battlecards and positioning matrix."

### Module 4: Validation Framework (validation-framework.md)

**Questions (ask one at a time):**

1. "What stage of validation are you at? (Problem validation, solution validation, market validation, channel validation, scale)"
2. "What hypotheses are you currently testing or need to test?"
3. "What experiments are you running or planning? (landing page tests, founder-led sales, beta programs, etc.)"
4. "What signal thresholds define 'validated' for you? (e.g., 10 paying customers, 40% email response rate, 5% landing page conversion)"
5. "What have you already validated? What evidence do you have?"

**Populate:**
- Current validation stage with evidence
- Hypothesis backlog (prioritized)
- Active experiments with success criteria
- Validation evidence log (what's been proven/disproven)
- Signal thresholds by stage
- Next validation milestones
- Kill criteria (when to pivot or stop)

After writing: "Validation framework saved at [stage] stage with [N] active experiments and [N] hypotheses queued."

### Module 5: Fundraising Prep (fundraising-prep.md)

**Context Loading:** Read `my-context-os/01-gtm-strategy/positioning.md` and `my-context-os/05-operations/metrics-dashboard.md` first.

**Questions (ask one at a time):**

1. "Are you actively raising or preparing to raise? What's the timeline?"
2. "What's your target raise amount and stage? (Pre-seed, Seed, Series A, etc.)"
3. "What metrics do investors ask about most in your conversations? (I'll make sure these are front and center.)"
4. "What's your narrative arc for the pitch? (Problem you discovered, why now, why you, unfair advantage)"
5. "Who are your target investors? (Firms, specific partners, angels)"
6. "What materials do you need? (Deck, memo, data room, one-pager)"

**Populate:**
- Fundraising timeline and milestones
- Target raise details (amount, stage, valuation expectations)
- Key metrics summary with current values and growth rates
- Narrative arc framework
- Target investor list with thesis alignment notes
- Materials checklist with status
- FAQ / objection handling for common investor questions
- Data room checklist

After writing: "Fundraising prep saved for [stage] raise of $[amount] targeting [N] investors."

### Module 6: Client Template (client-template.md)

**Questions (ask one at a time):**

1. "How do you structure client engagements? (Project-based, retainer, sprint-based, etc.)"
2. "What information do you track per client? (Goals, deliverables, contacts, timeline, budget)"
3. "What's your typical engagement lifecycle? (Discovery, proposal, kickoff, delivery, review, renewal)"
4. "How many active clients do you typically manage at once?"
5. "What does your handoff/onboarding look like for new clients?"

**Populate:**
- Client workspace template (copy-and-fill for each new client)
- Engagement lifecycle stages with checklists
- Client information schema (what to capture)
- Deliverable tracking template
- Communication cadence template
- Engagement health scoring criteria
- Renewal/upsell triggers

After writing: "Client template saved with [N]-stage engagement lifecycle and workspace template."

## Completion

After all selected modules are complete, display:

```
Phase 6: Specialized — COMPLETE

Modules completed:
- [List only selected/completed modules with summary stats]

Modules skipped:
- [List skipped modules]

This unlocked Phase 7: Synthesis (final phase — connects everything together).
Say "setup synthesis" or "setup phase 7" to finalize your Brand OS.
```

Update `setup-progress.json` to mark selected Phase 6 files as complete, skipped files as "skipped", and set Phase 7 as unlocked.

## Important Guidelines

- Present the module menu FIRST. Do not start any interviews until the user selects modules.
- Ask questions ONE AT A TIME within each module.
- Only run interviews for selected modules — leave unselected template files untouched.
- Pre-generate content from existing context where possible (especially competitive intel from positioning).
- If the user says "skip" mid-module, mark it as skipped and move to the next selected module.
- Write each file immediately after completing its interview section.
- "all" means run all 6 modules. "skip" means skip the entire phase.
