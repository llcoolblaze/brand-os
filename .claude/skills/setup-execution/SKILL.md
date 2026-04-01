---
description: "Phase 3 of Brand OS setup — build your outbound sequences, sales playbook, and content strategy. Uses your ICP, positioning, pricing, and voice. Trigger: 'setup execution', 'setup phase 3', 'setup outbound', 'setup sales', 'setup content'"
---

# Phase 3: Execution Setup

You are running the Brand OS Execution Setup. This phase populates 5 files:

1. `my-context-os/02-content-strategy/content-pillars.md`
2. `my-context-os/03-outbound/sequences.md`
3. `my-context-os/04-sales-enablement/discovery-questions.md`
4. `my-context-os/04-sales-enablement/objection-handling.md`
5. `my-context-os/04-sales-enablement/deal-playbook.md`

**Prerequisite:** Phases 1 and 2 must be complete. If foundation or strategy files are missing or still contain TODO markers, stop and direct the user to the appropriate phase first.

---

## Context Loading

**Before asking any questions**, read these completed files:

1. `my-context-os/01-gtm-strategy/icp.md` — persona names, pain points, language, tiers, qualification criteria
2. `my-context-os/01-gtm-strategy/positioning.md` — category, differentiators, competitive landscape, messaging hierarchy
3. `my-context-os/01-gtm-strategy/pricing.md` — tiers, value metrics, ROI math, discount policy
4. `.claude/voice-dna/brand-voice.md` — tone parameters, vocabulary, DO's/DON'Ts

Use persona names, pain points, differentiators, voice parameters, and pricing data throughout. Pre-fill sections from upstream data wherever possible to minimize redundant questions.

---

## File Processing Order

Process files in this order (minimizes re-asking and builds context progressively):

1. **content-pillars.md** (depends only on positioning)
2. **sequences.md** (depends on ICP + voice)
3. **discovery-questions.md** (depends on ICP)
4. **objection-handling.md** (depends on positioning)
5. **deal-playbook.md** (depends on ICP + pricing)

---

## File 1: Content Pillars Interview

**Target file:** `my-context-os/02-content-strategy/content-pillars.md`

### Opening

> "Based on your positioning around [category from positioning] and your [Persona 1 title]'s pain points of [pain points from ICP], let me suggest some content pillars."

### Pre-Suggest Pillars

Before asking questions, propose 3-4 content pillars based on the intersection of:
- Positioning category and differentiators
- ICP persona pain points
- Key themes from the master narrative

Format each suggestion as: Pillar name + one-sentence description + why it maps to their audience.

### Questions

1. Which of these resonate? What would you change?
2. What topics could you talk about endlessly where you have genuine expertise?
3. How often do you want to post on LinkedIn? (suggest 3-5x/week as default)
4. What's the split between educational vs. personal vs. promotional content? (suggest 60/25/15 as default)

### Output — content-pillars.md

Populate all sections:
- **Pillar definitions** — for each: theme, subtopics (5-8), target audience segment, unique angle, recommended formats, 5 example post topics
- **Content mix ratio** — educational / personal / promotional with percentages
- **Weekly rotation schedule** — which pillar on which day, with format suggestions

---

## File 2: Sequences Interview

**Target file:** `my-context-os/03-outbound/sequences.md`

### Opening

> "Let's build your outbound sequences. I'll use your [Persona 1 title]'s language and pain points."

### Questions

1. What channels do you use — email, LinkedIn, phone, other?
2. How many touchpoints in a typical sequence? Over what time frame? (suggest 8-10 over 21 days as default)
3. What's worked in cold emails before? Best subject line? Best opening line?
4. Or should I draft templates entirely from scratch based on your ICP and voice?

### Output — sequences.md

Generate all sections:
- **Sequence architecture** — visual flow of touchpoints with timing and channel
- **Email templates** in brand voice using ICP persona language:
  - Cold outreach (first touch)
  - Value-add follow-up (2-3 variations)
  - Social proof / case study touch
  - Breakup email
- **LinkedIn message templates** — connection request, follow-up, InMail
- **Personalization variables** — what to customize per prospect and where to find that data
- **A/B testing framework** — what to test first, how to measure
- **Performance benchmarks** — target open rates, reply rates, meeting rates by channel

All templates must use the brand voice parameters and incorporate the persona's exact language from the ICP.

---

## File 3: Discovery Questions Interview

**Target file:** `my-context-os/04-sales-enablement/discovery-questions.md`

### Opening

> "Based on your ICP, here are the key things you need to learn in discovery with a [Persona 1 title]."

### Pre-Generate Questions

Before asking the user, pre-generate a draft set of discovery questions organized by category:
- Current state / status quo
- Pain points and impact
- Decision process and timeline
- Budget and authority
- Success criteria

Base these on ICP pain points, qualification criteria, and anti-persona signals.

### Questions

1. What question consistently gets prospects to open up?
2. What's the ONE thing you need to learn before the call ends?
3. Any questions that have backfired or felt too aggressive?

### Output — discovery-questions.md

Populate all sections:
- **Discovery framework** — organized by stage (opening, current state, pain, impact, decision, close)
- **For each question:** the question itself, why you're asking it, what a good answer sounds like, what a red flag sounds like
- **Persona-specific variations** — adjust questions for each buyer persona
- **Questions to avoid** — based on user's "backfired" answers

---

## File 4: Objection Handling Interview

**Target file:** `my-context-os/04-sales-enablement/objection-handling.md`

### Opening

> "Your positioning says you differentiate on [differentiators from positioning]. What pushback do you get?"

### Pre-Fill Common Objections

Before asking, pre-populate objections common to their category:
- **Price** — "It's too expensive" / "We don't have budget"
- **Timing** — "Not right now" / "Maybe next quarter"
- **Competition** — "We're looking at [competitor]" / "We already use [competitor]"
- **Status quo** — "We're fine with our current process"
- **Authority** — "I need to check with my boss" / "We have a committee"

### Questions

1. What are the top 5 objections you hear?
2. For each: what's the real concern behind the stated objection?
3. What response has worked? What hasn't?

### Output — objection-handling.md

Populate all sections using the LAER framework (Listen, Acknowledge, Explore, Respond):
- **For each objection:**
  - The objection as stated
  - The real concern underneath
  - LAER response framework with specific language
  - Supporting proof point or data from positioning
  - What to do if the objection persists
- **Objection prevention** — how to preempt common objections earlier in the conversation
- **Competitive responses** — specific talk tracks for each named competitor

---

## File 5: Deal Playbook Interview

**Target file:** `my-context-os/04-sales-enablement/deal-playbook.md`

### Opening

> "Let's define your deal stages. Based on your [pricing tiers from pricing.md] and [ICP tiers from icp.md], I'll suggest a framework."

### Questions

1. Walk me through your deal stages from first touch to close.
2. Do you prefer MEDDIC or BANT? Or a custom qualification framework? (suggest MEDDIC for enterprise, BANT for SMB based on their ICP)
3. What's a typical deal size and timeline for each ICP tier?
4. What are the most common ways deals stall or die?
5. What does multi-threading look like at different deal sizes?

### Output — deal-playbook.md

Populate all sections:
- **Deal stages** — for each stage: definition, entry criteria, exit criteria, key activities, required artifacts
- **Qualification framework** (MEDDIC or BANT) with company-specific notes for each criterion
- **Deal sizing matrix** — ICP tier x pricing tier x typical timeline x win rate
- **Champion building** — how to identify, develop, and arm internal champions
- **Multi-threading strategy** — when to go wide, who to bring in, how to map the org
- **Stall recovery playbook** — for each common stall pattern, a recovery sequence
- **Close plan** — mutual action plan template with timeline, milestones, and owner assignments

---

## Cross-Referencing & Caching

After EACH file is written:

1. **Update frontmatter** in the written file:
   - `status` -> `active`
   - `last_validated` -> today's date
   - `confidence` -> `medium`

2. **Update `workspace/setup-progress.json`**:
   - Mark each file as "complete" under `completed_files`

---

## Completion

After all 5 files are written, display:

```
Phase 3: Execution — COMPLETE

What you now have:
- [N] content pillars with weekly rotation
- [N]-touch outbound sequence with email templates in your voice
- Discovery framework with [N] questions
- Objection handling for [N] common objections
- Deal playbook with [MEDDIC/BANT] qualification

This unlocked Phase 4: Operations (scoring, metrics, pipeline, CRM).
Ready to continue?
```

Replace all bracketed values with actual counts and data from what was generated.
