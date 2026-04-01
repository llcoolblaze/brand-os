---
description: "Phase 2 of Brand OS setup — define your market positioning and pricing strategy. Builds on your ICP and narrative from Phase 1. Trigger: 'setup strategy', 'setup phase 2', 'setup positioning', 'setup pricing'"
---

# Phase 2: Strategy Setup

You are running the Brand OS Strategy Setup. This phase populates 2 files:

1. `my-context-os/01-gtm-strategy/positioning.md`
2. `my-context-os/01-gtm-strategy/pricing.md`

**Prerequisite:** Phase 1 (Foundation) must be complete. If the foundation files are missing or still contain TODO markers, stop and direct the user to run Phase 1 first.

---

## Context Loading

**Before asking any questions**, read these completed files:

1. `my-context-os/01-gtm-strategy/icp.md` — persona names, pain points, language, tiers
2. `my-context-os/_synthesis/master-narrative.md` — core story, themes, worldview
3. `.claude/voice-dna/brand-voice.md` — tone parameters, vocabulary

Use specific details from these files in your questions. Instead of generic questions, reference their actual personas, pain points, and language. This makes the interview feel personalized and reduces redundant questions.

---

## Positioning Interview

**Target file:** `my-context-os/01-gtm-strategy/positioning.md`

### Opening

> "I've read your ICP — you're targeting [persona names from ICP] at [company profile from ICP]. Now let's nail down how you position against the market."

Use actual persona titles and company descriptions from the ICP file.

### Questions

1. What market category do you compete in? Are you creating a new one, or repositioning within an existing one?
2. If your [Persona 1 title from ICP] had to describe your product category to their boss, what would they say?
3. The problem you solve — state it so crisply that your [Persona 1 title] would say "yes, that's my exact problem."
4. Why is this problem hard to solve? What's been tried before?
5. What are your top 3 differentiators — things you do that competitors genuinely cannot?
6. Who are your 2-4 direct competitors? What do they do well? Where do they fall short?
7. What's the "do nothing" alternative? Why do some prospects stay with spreadsheets/manual processes/status quo?

### Follow-ups for weak answers

- "If [Persona 1] Googled for a solution, what would they type?"
- "Your competitor does [X] well — why would someone pick you over them despite that?"
- "What would you say if a prospect told you 'we're fine with our current process'?"

### Output — positioning.md

Generate all sections:

- **Category definition** with maturity assessment (new category, emerging, established)
- **Problem statement** with business impact (use ICP pain points and their exact language)
- **Unique Value Proposition** using the framework template in the file
- **Key differentiators table** with defensibility ratings (high/medium/low) and evidence
- **Competitive alternatives** — direct competitors AND status quo alternatives
- **Positioning statements** for multiple contexts:
  - Elevator pitch (30 seconds)
  - Website hero copy (under 10 words)
  - Sales intro (60 seconds)
  - Investor pitch (2 minutes)
  - LinkedIn bio
- **Messaging hierarchy** (L1 Category -> L2 Problem -> L3 Solution -> L4 Differentiator -> L5 Proof)

**Before writing the file:** Show the user the elevator pitch, website hero, and UVP statement. Ask for refinement. These are the most visible pieces and should feel right before committing.

---

## Pricing Interview

**Target file:** `my-context-os/01-gtm-strategy/pricing.md`

### Opening

> "Now let's talk money. Based on your [ICP tier structure from icp.md], I need to understand how pricing maps to each tier."

Reference the actual tier names and descriptions from the ICP.

### Questions

1. What's your pricing model — per-seat, usage-based, flat-rate, tiered, hybrid?
2. Why that model? How does it align with how your [Persona 1 title] budgets?
3. Walk me through your tiers — for each: name, price, who it's for (which ICP tier), what's included, what's excluded?
4. What's the primary value metric — what unit of value correlates with what they pay?
5. What should the ROI be? Can you walk me through the math? (e.g., "saves X hours/week at $Y/hour = Z ROI")
6. How does your pricing compare to [competitors named in positioning]?
7. What's your discount policy? Annual prepay? Volume? Startup program? Maximum discount floor?

### Follow-ups

- "If your [Persona 1] had to justify this spend to their CFO, what's the one-line ROI argument?"
- "What happens when a Tier 3 customer wants Tier 1 pricing?"
- "Is there a self-serve option or is everything sales-led?"

### Output — pricing.md

Populate all sections:

- **Pricing model** with rationale
- **Tier table** — name, price, target ICP tier, features included, features excluded, ideal use case
- **Value metrics** with ROI calculation (show the math)
- **Competitive pricing landscape** — how your pricing compares to named competitors
- **Discount policy** with approval matrix (who can approve what level of discount)
- **Packaging notes** — what drives upgrades, what's included in each tier

---

## Cross-Referencing & Caching

After EACH file is written:

1. **Update frontmatter** in the written file:
   - `status` -> `active`
   - `last_validated` -> today's date
   - `confidence` -> `medium`

2. **Update `workspace/setup-progress.json`**:
   - Mark each file as "complete" under `completed_files`
   - Add any new data points to `intake_answers` (competitors, pricing model, etc.)

---

## Completion

After both files are written, display:

```
Phase 2: Strategy — COMPLETE

What you now have:
- Positioning: [category] with [N] differentiators and 5 messaging versions
- Pricing: [N] tiers from $[X] to $[Y], with discount policy

This unlocked Phase 3: Execution (outbound, sales, content).
Ready to continue?
```

Replace bracketed values with actual data from what was generated.
