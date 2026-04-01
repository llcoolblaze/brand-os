---
description: "Review content for brand voice, ICP alignment, factual grounding, competitive positioning, and CTA clarity. Runs 5 parallel quality checks. Trigger: 'review content', 'review this', 'content review', 'check this draft', 'quality check', 'review email', 'review post'"
---

# Content Quality Review

You review GTM content (emails, posts, proposals, campaigns) through 5 parallel specialist lenses before delivery. Adapted from gstack's multi-specialist code review pattern.

## When to Activate

- User says "review this" with content attached
- After any content-producing skill generates output (if voice_strictness is "high")
- Before publishing or sending any external-facing content
- User explicitly asks for a quality check

## Before Reviewing

1. Read `.claude/voice-dna/brand-voice.md` — the voice contract
2. Read `.claude/voice-dna/tone-examples.md` — calibration examples
3. Read `my-context-os/01-gtm-strategy/icp.md` — persona definitions
4. Read `my-context-os/01-gtm-strategy/positioning.md` — differentiators and messaging
5. Read `_evidence/research-log.md` — available evidence

## The 5 Specialist Checks

Run all 5 checks against the content. For each, output PASS, NEEDS_REVISION, or FAIL with specific findings.

### 1. Voice Check
Does the content match `brand-voice.md`?

Check:
- [ ] Tone matches the rated dimensions (formal↔casual, etc.)
- [ ] Uses preferred vocabulary, avoids banned words
- [ ] Sentence structure matches guidelines (length, paragraph size)
- [ ] Doesn't use AI tells ("In today's fast-paced world", "leverage", "synergy")
- [ ] Channel-specific adjustments applied (email vs LinkedIn vs blog)

If NEEDS_REVISION: Quote the specific phrase that breaks voice and suggest a rewrite.

### 2. ICP Alignment
Is this targeted at the right persona?

Check:
- [ ] Content addresses a specific persona from ICP (not "everyone")
- [ ] Pain points referenced match that persona's documented pain points
- [ ] Language matches how the persona describes the problem (their words, not ours)
- [ ] Appropriate for their seniority level (VP gets strategy, IC gets tactics)
- [ ] Relevant to their buying stage (awareness vs evaluation vs decision)

If NEEDS_REVISION: Identify which persona this seems targeted at and what's misaligned.

### 3. Factual Grounding
Are all claims backed by evidence?

Check:
- [ ] No fabricated metrics, percentages, or statistics
- [ ] No invented case studies or testimonials
- [ ] Claims can be traced to `_evidence/research-log.md` or user-provided context
- [ ] Confidence-qualified language used for unverified claims
- [ ] No "our research shows" without actual research

If NEEDS_REVISION: Flag each ungrounded claim and suggest how to either ground it or qualify it.

### 4. Competitive Positioning
Does this reinforce our differentiation?

Check:
- [ ] Messaging aligns with positioning differentiators
- [ ] Doesn't accidentally validate competitor strengths
- [ ] Value prop is clear and specific (not generic "we're better")
- [ ] Category framing matches our positioning strategy
- [ ] If mentioning competitors, references are accurate per competitive-intel.md

If NEEDS_REVISION: Identify where positioning is weak or contradicted.

### 5. CTA Clarity
Is there one clear next step?

Check:
- [ ] Exactly ONE call-to-action (not multiple competing asks)
- [ ] CTA is specific ("Book a 15-min call" not "Learn more")
- [ ] CTA is appropriate for the funnel stage
- [ ] CTA friction matches the relationship stage (don't ask for a meeting in email 1 of 5)
- [ ] Next step is clear to the reader

If NEEDS_REVISION: Suggest a stronger, more specific CTA.

## Output Format

```
## Content Review Results

### Overall: [PASS | NEEDS_REVISION | FAIL]

| Check | Result | Finding |
|-------|--------|---------|
| Voice | [PASS/NEEDS_REVISION/FAIL] | [one-line summary] |
| ICP Alignment | [PASS/NEEDS_REVISION/FAIL] | [one-line summary] |
| Factual Grounding | [PASS/NEEDS_REVISION/FAIL] | [one-line summary] |
| Competitive Positioning | [PASS/NEEDS_REVISION/FAIL] | [one-line summary] |
| CTA Clarity | [PASS/NEEDS_REVISION/FAIL] | [one-line summary] |

### Detailed Findings

[For each NEEDS_REVISION or FAIL, provide:]
- **What:** The specific issue
- **Where:** Quote the problematic text
- **Fix:** Suggested revision

### Revised Version
[If any checks failed, provide a revised version of the content with all issues fixed]
```

## After Review

If `auto_learnings` is enabled in config, log notable findings:
- Pattern: "Voice check catches [specific AI tell] — worth adding to banned phrases"
- Pitfall: "Claimed [stat] without evidence — need to verify before using"
