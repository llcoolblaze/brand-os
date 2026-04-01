---
description: "Phase 1 of Brand OS setup — establish your core narrative, ideal customer profile, and brand voice. These 3 files are the foundation everything else builds on. Trigger: 'setup foundation', 'setup phase 1'"
---

# Phase 1: Foundation Setup

You are running the Brand OS Foundation Setup — the most important phase of the entire system. You will conduct a structured but conversational interview to populate 4 files:

1. `my-context-os/_synthesis/master-narrative.md`
2. `my-context-os/01-gtm-strategy/icp.md`
3. `.claude/voice-dna/brand-voice.md`
4. `.claude/voice-dna/tone-examples.md`

**Interview style:** Conversational and warm, NOT a form. Ask 2-3 questions at a time max. Use follow-ups. Reference earlier answers in later questions to show you're listening. Never dump all questions at once.

---

## Section 1: Core Narrative Interview

**Target file:** `my-context-os/_synthesis/master-narrative.md`

### Opening

Start with:

> "Let's start with the big picture. Tell me about your company like you're explaining it to a smart friend who knows nothing about your industry."

### Questions (asked conversationally with follow-ups, not as a list)

1. What does your company do in one sentence?
2. Why did you start this? What did you see that others missed?
3. What does the world look like for your customers before they find you?
4. What changes for them after?
5. What proof do you have that this works? Numbers, logos, milestones?
6. If you had to distill your company's worldview into 3 recurring themes, what would they be?

### Follow-up prompts for vague answers

Use these when the user gives generic or abstract responses:

- "When you say 'help companies grow' — grow what specifically? Revenue? Team? Market share?"
- "Can you give me a concrete example of a customer who experienced that transformation?"
- "What would a skeptic say about that claim? How would you respond?"
- "Is that a nice-to-have or a hair-on-fire problem?"

### Output

After collecting answers, generate the full `master-narrative.md` replacing ALL TODO sections. Preserve the document structure:

- **Core Narrative** — origin story, mission, vision
- **Domain Connection Map** — how concepts link together
- **Key Themes** — the 3 recurring themes with supporting evidence
- **Contradictions to Resolve** — tensions in the narrative to address
- **Version History** — initial entry with today's date

---

## Section 2: ICP Interview

**Target file:** `my-context-os/01-gtm-strategy/icp.md`

This is the longest interview. Conduct it in 4 conversational blocks, NOT as a 20-question form.

### Opening

> "Now the most important part — who exactly are you selling to? This drives everything else in Brand OS."

### Block A — Company Profile

Ask as a flowing conversation:

- What industry are your best customers in? Any specific sub-verticals?
- What company size is the sweet spot? Employee count? Revenue range?
- What funding stage are these companies? Geography?
- What technology in their stack signals they're a good fit?
- What events or behaviors tell you they're ready to buy NOW?

**Smart defaults to suggest:** "For B2B SaaS at Series A-B, the typical sweet spot is 50-200 employees, $5M-$50M ARR. Does that match?"

### Block B — Buyer Personas (the most critical block)

- Who is your primary buyer — what's their title?
- Who do they report to? What size team do they manage?
- What keeps them up at night? Top 3 pain points?
- How would THEY describe the problem in their own words? (Critical for copywriting — get exact phrases)
- What are they evaluated on — what metrics define their success?
- Where do they hang out professionally? LinkedIn groups, podcasts, conferences?
- Is there a second buyer persona? What about blockers or influencers in the deal?

**Follow-up if answers are vague:**
- "If I overheard your buyer complaining to a colleague at lunch, what exact words would they use?"
- "What's the difference between what they SAY the problem is and what it ACTUALLY is?"

### Block C — Anti-Personas & Qualification

- Who should you NOT sell to? What makes someone a bad fit?
- What's a non-negotiable — if this is missing, you walk away?
- What are instant disqualifiers?
- How would you define your Tier 1 (dream) vs Tier 2 (good) vs Tier 3 (acceptable) customers?

### Block D — Market Sizing (lighter touch)

- Roughly how many companies fit your Tier 1 profile? Tier 2? Tier 3?
- Do you have TAM/SAM/SOM estimates?

### Output

After collecting all answers, generate the full `icp.md`. Replace ALL TODO markers and example placeholders with real data. Populate every table:

- Firmographic criteria (industry, size, stage, geography, tech stack)
- Technology signals and growth signals
- Buyer personas (primary + secondary) with titles, pain points, goals, channels, exact language
- Anti-personas with disqualification criteria
- Qualification criteria (must-have, nice-to-have, disqualifiers)
- ICP tiers (Tier 1 dream, Tier 2 good, Tier 3 acceptable) with criteria for each
- TAM/SAM/SOM estimates

---

## Section 3: Brand Voice Interview

**Target files:** `.claude/voice-dna/brand-voice.md` AND `.claude/voice-dna/tone-examples.md`

### Opening

> "Last foundation piece — how should your brand sound? This controls the tone of every email, post, and piece of content the system generates."

### Questions

1. Who is the voice? A seasoned operator? A nerdy expert? A provocative thinker? A friendly guide?
2. What's the relationship with the audience — peer-to-peer, mentor-mentee, expert-learner?
3. Rate yourself on these 5 spectrums (I'll suggest defaults based on what I've learned so far):
   - Formal <-> Casual (1-10)
   - Technical <-> Accessible (1-10)
   - Measured <-> Bold (1-10)
   - Data-driven <-> Story-driven (1-10)
   - Dense/detailed <-> Punchy/concise (1-10)
4. Any words or phrases that are very "you"? Signature language?
5. Anything that makes you cringe? Words you never want to see?
6. What are your top 3 writing DO's? Top 3 DON'Ts?
7. OPTIONAL: Paste a piece of writing that sounds like you (email, post, anything). I'll analyze it to calibrate the voice parameters.

### Smart Default Suggestion

Based on earlier answers, proactively suggest:

> "Based on what you've told me — [industry], [stage], [persona] — many similar founders go for: casual 7/10, accessible 6/10, bold 8/10, story-driven 7/10, punchy 8/10. Does that feel right?"

### Output — brand-voice.md

Populate all sections:
- Voice identity and archetype
- All 5 dimension scores with descriptions of what each score means in practice
- Vocabulary guide: preferred words, banned words, signature phrases
- Writing DO's and DON'Ts
- Channel adjustments (how voice shifts for LinkedIn vs email vs docs vs sales)

### Output — tone-examples.md

Generate 5 before/after pairs:
- Each pair shows a "generic/bland" version and a "in your voice" version
- Use the user's actual voice parameters, industry context, and persona language
- Cover different content types: LinkedIn post, cold email opening, product description, objection response, thought leadership hook

---

## Cross-Referencing & Caching

After EACH file is written:

1. **Update frontmatter** in the written file:
   - `status` -> `active`
   - `last_validated` -> today's date
   - `confidence` -> `medium`

2. **Cache key intake answers** in `workspace/setup-progress.json` under `intake_answers`:
   - `company_name`
   - `industry`
   - `stage`
   - `product_description`
   - `business_model`
   - `team_size`
   - `primary_channel`
   - `has_existing_customers`

3. **Mark the file as "complete"** in `setup-progress.json` under `completed_files`

---

## Completion

After all 4 files (master-narrative, icp, brand-voice, tone-examples) are written, display:

```
Phase 1: Foundation — COMPLETE

What you now have:
- Core narrative that captures your company's story and themes
- ICP with [N] personas, [N] tiers, and qualification criteria
- Brand voice calibrated across 5 dimensions with vocabulary guide

This unlocked Phase 2: Strategy (positioning + pricing).
Ready to continue?
```

Replace `[N]` with actual counts from what was generated.
