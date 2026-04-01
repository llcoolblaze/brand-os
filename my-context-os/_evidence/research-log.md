---
title: "Research Log"
domain: "_evidence"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---

# Research & Evidence Log

> This log is the evidence backbone of your Brand OS. Every claim, assumption, or
> decision across all 10 domains should be traceable to an entry here. If you can't
> point to evidence, it's an assumption -- and assumptions should be validated.

---

## Log Format

Each entry follows this structure. Copy and paste the template below for new entries.

```markdown
### [YYYY-MM-DD] Entry Title

- **Source:** Where this came from (URL, interview, report, personal observation)
- **Source Type:** primary-research | secondary-research | anecdotal | quantitative | qualitative
- **Finding:** What you learned (2-3 sentences max)
- **Confidence:** high | medium | low
- **Domain(s):** Which domain(s) this evidence supports (e.g., 01-gtm-strategy/icp)
- **Action:** What this means for your strategy (or "None - filed for reference")
- **Tags:** #keyword #keyword
```

### Confidence Definitions

| Level | Meaning | Example |
|-------|---------|---------|
| **High** | Validated by multiple sources or direct quantitative data | CRM data showing 73% of closed-won deals are 50-200 employee companies |
| **Medium** | Single reliable source or consistent qualitative pattern | 5 of 7 discovery calls mentioned the same pain point |
| **Low** | Anecdotal, single observation, or untested hypothesis | One prospect mentioned they'd pay 2x for this feature |

---

## Research Entries

<!-- TODO: Replace these examples with your actual research findings -->

### [2026-01-15] Example: ICP Company Size Sweet Spot

- **Source:** CRM export analysis (Q4 2025 closed-won deals, n=47)
- **Source Type:** quantitative
- **Finding:** 68% of closed-won deals were companies with 50-200 employees. Win rate
  drops to 12% below 30 employees (can't afford) and 8% above 500 (too much procurement).
- **Confidence:** high
- **Domain(s):** 01-gtm-strategy/icp, 02-outbound-systems/clay-enrichment
- **Action:** Tighten ICP to 50-200 employees. Update Clay filters. Remove <30 from sequences.
- **Tags:** #icp #company-size #win-rate

---

### [2026-01-10] Example: Primary Objection Pattern

- **Source:** Gong call analysis (last 30 lost deals)
- **Source Type:** qualitative
- **Finding:** "We already have a solution" was the #1 objection (43% of losses), but
  in 80% of those cases the "solution" was a spreadsheet or manual process, not a
  competing product. The real objection is change management, not competition.
- **Confidence:** medium
- **Domain(s):** 03-sales-execution/objection-handling, 01-gtm-strategy/positioning
- **Action:** Reframe competitive positioning. Train reps on "spreadsheet displacement" talk track.
- **Tags:** #objections #competition #status-quo

---

### [YYYY-MM-DD] <!-- TODO: Your first real entry -->

- **Source:** <!-- TODO -->
- **Source Type:** <!-- TODO -->
- **Finding:** <!-- TODO -->
- **Confidence:** <!-- TODO -->
- **Domain(s):** <!-- TODO -->
- **Action:** <!-- TODO -->
- **Tags:** <!-- TODO -->

---

## How to Use This Log

### When to Add an Entry
- After every customer/prospect conversation that reveals something new
- When you find market research or competitor data
- After analyzing CRM, analytics, or usage data
- When a hypothesis is validated or invalidated
- After competitive intel gathering

### How to Reference Entries
Other documents in Brand OS should link back to specific entries here:
```markdown
> Evidence: See [research-log.md#2026-01-15-icp-company-size](../_evidence/research-log.md)
```

### Maintenance
- **Weekly:** Add any new findings from the past week
- **Monthly:** Review low-confidence entries -- can any be upgraded?
- **Quarterly:** Audit all high-confidence entries -- are they still valid?
- **After pivots:** Mark outdated entries as `[SUPERSEDED by YYYY-MM-DD entry]`

### Evidence Coverage Tracker

Use this table to track whether each domain has sufficient evidence backing.

| Domain | # of Entries | Last Updated | Coverage Quality |
|--------|-------------|--------------|-----------------|
| 01 GTM Strategy | <!-- TODO --> | <!-- TODO --> | <!-- TODO: strong/weak/none --> |
| 02 Outbound Systems | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 03 Sales Execution | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 04 LinkedIn Content | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 05 Marketing & Demand | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 06 AI Tooling | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 07 Revenue Ops | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 08 Startup Ops | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 09 Consulting Clients | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |
| 10 Tools | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

---

### Cross-References
- This log is referenced by virtually every document in Brand OS
- ICP (primary consumer): [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Positioning: [01-gtm-strategy/positioning.md](../01-gtm-strategy/positioning.md)
- Objection handling: [03-sales-execution/objection-handling.md](../03-sales-execution/objection-handling.md)
- Master narrative: [_synthesis/master-narrative.md](../_synthesis/master-narrative.md)
