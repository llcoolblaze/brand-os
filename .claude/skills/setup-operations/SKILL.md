---
description: "Phase 4 of Brand OS setup — configure your lead scoring model, metrics dashboard, pipeline stages, and CRM setup. Builds on your ICP and sales playbook. Trigger: 'setup operations', 'setup phase 4', 'setup scoring', 'setup metrics', 'setup pipeline', 'setup crm'"
---

# Phase 4: Operations Setup

You are running Phase 4 of the Brand OS guided setup. This phase populates:
- `my-context-os/05-operations/lead-scoring.md`
- `my-context-os/05-operations/metrics-dashboard.md`
- `my-context-os/05-operations/pipeline-stages.md`
- `my-context-os/05-operations/crm-setup.md`

## Context Loading

Before starting, read these completed files to inform the interview:
1. `my-context-os/01-gtm-strategy/icp.md` — ICP tiers, persona details
2. `my-context-os/01-gtm-strategy/pricing.md` — deal sizes, tiers
3. `my-context-os/03-sales-execution/deal-playbook.md` — deal stages, qualification framework

If any of these files are missing or still contain only template content, warn the user:
"Phase 4 depends on your ICP, pricing, and deal playbook. It looks like [missing file] hasn't been completed yet. Would you like to go back and complete Phase 3 first, or proceed with what we have?"

## File Order

Complete files in this order (each builds on the previous):
1. **lead-scoring.md** — most directly derived from ICP
2. **metrics-dashboard.md** — standalone, needs target setting
3. **pipeline-stages.md** — derived from deal-playbook
4. **crm-setup.md** — depends on pipeline-stages

## Interview Flow

### 1. Lead Scoring Interview

**Opening:** "I'm going to generate a scoring model based on your ICP tiers. Your Tier 1 is [Tier 1 definition from ICP], Tier 2 is [Tier 2], Tier 3 is [Tier 3]. Let me map these to point values."

**Pre-generate the scoring model from ICP data:**
- Demographic scoring from persona titles, seniority levels, departments
- Firmographic scoring from ICP tier ranges (company size, industry, revenue, tech stack, geography)
- Behavioral scoring suggestions (pricing page visits, content downloads, demo requests)
- Engagement scoring (email responses, meeting attendance, referrals)

**Then ask these questions one at a time, waiting for each response:**

1. "Does this scoring model match your intuition about what makes a hot lead?"
2. "What behavioral signals on your website/product indicate buying intent?"
3. "If you have a free trial/product, what in-product signals indicate high intent?"
4. "What score threshold should trigger a sales outreach? (I'd suggest 80+ for SQL, 50-79 for MQL based on your model.)"
5. "Any specific negative signals beyond the defaults? (competitors, students, bounced emails)"

**Populate all sections** including:
- Scoring dimensions with point values
- PQL (Product Qualified Lead) criteria if the user has a free trial/product
- Score decay rules (e.g., -5 points per week of inactivity)
- Negative scoring (competitor domains, generic emails, etc.)
- Calibration log section with today's date as initial calibration

After writing the file, confirm: "Lead scoring model saved. Here's the summary: [N] scoring dimensions, SQL threshold at [X], MQL threshold at [Y]. Moving to metrics dashboard."

### 2. Metrics Dashboard Interview

**Opening:** "Let's set targets for your key metrics. I'll walk through each category."

**Ask these questions:**

1. "What's your north star metric? (MRR, ARR, active customers, NRR)" — suggest based on their stage from earlier context
2. "What are your current values and targets for: pipeline value, win rate, avg deal size, sales cycle length?"
3. "What are your marketing targets: lead volume, MQL conversion, CAC, content engagement?"
4. "What are your customer targets: churn rate, NRR, LTV:CAC, NPS?"
5. "What tools generate this data? (Salesforce, HubSpot, Stripe, Mixpanel, etc.)"
6. "How often does your team review each metric category? (weekly, monthly, quarterly)"

**Suggest smart defaults based on stage:**
"For Series A B2B SaaS, typical targets are: 3x pipeline coverage, 20-30% win rate, <90 day sales cycle, <5% annual churn, 3:1+ LTV:CAC."

**Populate all metric tables** with current values (if provided) and targets. Include:
- North star metric with tracking cadence
- Pipeline metrics table
- Marketing metrics table
- Sales metrics table
- Customer success metrics table
- Data sources and review cadence

After writing: "Metrics dashboard saved with [N] KPIs across [N] categories. Moving to pipeline stages."

### 3. Pipeline Stages Interview

**Opening:** "Based on your deal playbook, I'm going to translate your deal stages into formal pipeline stages with entry/exit criteria."

**Pre-generate pipeline stages** from deal-playbook.md stages, mapping each deal stage to a pipeline stage with:
- Stage name and number
- Entry criteria
- Exit criteria
- Expected conversion rate
- Typical time in stage

**Then ask:**

1. "Does this stage mapping look right? Here's what I derived from your deal playbook: [show mapping]"
2. "What conversion rate do you expect between each stage?"
3. "How long should a deal stay in each stage before it's flagged as stalled? (I'd suggest [X] days for [stage] based on your sales cycle.)"
4. "Any red flag indicators at specific stages? (e.g., no champion identified by Stage 3, no technical validation by Stage 4)"

**Populate:** Stage definitions, conversion targets, stall thresholds, red flag indicators, stage-specific actions, and a visual pipeline diagram.

After writing: "Pipeline stages saved with [N] stages, stall alerts at [thresholds]. Moving to CRM setup."

### 4. CRM Setup Interview

**Questions:**

1. "What CRM do you use? (Salesforce, HubSpot, Pipedrive, Close, etc.)"
2. "What custom fields matter most for your workflow? (I'd suggest these based on your scoring model and pipeline: [suggestions])"
3. "What automations are running today? (lead assignment, stage updates, notifications)"
4. "Any integration points? (enrichment tools like Clay/Apollo, email platforms, billing like Stripe)"

**Populate CRM setup with:**
- Object model (Leads, Contacts, Accounts, Opportunities, custom objects)
- Custom fields with field types and purposes
- Pipeline configuration matching the pipeline-stages.md
- Automation rules (lead routing, stage change triggers, task creation, notifications)
- Integration map (which tools connect and how)
- Data hygiene practices (dedup rules, required fields, validation rules)

After writing: "CRM configuration saved for [CRM name] with [N] custom fields, [N] automation rules."

## Completion

After all four files are written, display:

```
Phase 4: Operations — COMPLETE

What you now have:
- Lead scoring model: [N] scoring dimensions, [threshold] SQL threshold
- Metrics dashboard: [N] KPIs tracked across pipeline/marketing/sales/customer
- Pipeline: [N] stages with conversion targets and stall alerts
- CRM config: [CRM name] setup with [N] custom fields

This unlocked Phase 5: Growth (SEO, paid, campaigns).
Ready to continue? Say "setup growth" or "setup phase 5".
```

Update `setup-progress.json` to mark Phase 4 files as complete and set Phase 5 as unlocked.

## Important Guidelines

- Ask questions ONE AT A TIME. Do not dump all questions at once.
- Pre-generate as much as possible from existing context, then ask the user to validate/adjust.
- Use specific data from their ICP, pricing, and deal playbook — never use generic placeholders.
- If the user says "skip" for any file, mark it as skipped and move to the next.
- If the user seems unsure, offer smart defaults and let them accept or modify.
- Write each file immediately after completing its interview section — do not wait until the end.
