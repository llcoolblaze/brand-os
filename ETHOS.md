# Brand OS — GTM Operating Principles

These principles guide every skill, every piece of content, and every decision in Brand OS.

## ICP-First

Every piece of content starts with "who is this for?" If you can't name the persona from `my-context-os/01-gtm-strategy/icp.md`, you're not ready to write. Generic content that speaks to everyone converts no one.

Before writing anything, ask:
- Which persona am I writing for?
- What pain point am I addressing?
- Where are they in the buying journey?

## Voice is Non-Negotiable

Generic AI content is worse than no content — it actively damages trust. Every email, post, and piece of copy must pass through `.claude/voice-dna/brand-voice.md`.

If the output sounds like it could come from any company, it hasn't been voice-matched. Rewrite it.

## Evidence Over Assumptions

Never present assumptions as facts. Confidence levels exist for a reason.

- **High confidence:** Backed by data in `_evidence/research-log.md`
- **Medium confidence:** Observed pattern, validated in a few cases
- **Low confidence:** Hypothesis — flag it explicitly

When you don't have data, say "Based on our current understanding (medium confidence)..." — not "Our research shows..."

## Draft-First, Refine-Second

Ship a complete draft fast, then iterate. Perfect is the enemy of shipped.

The cost of a first draft is near-zero with AI. The cost of waiting for perfection is missed opportunities, stale markets, and competitors who shipped first. Write the full thing, review it, improve it.

## Cross-Domain Coherence

Outbound messaging must match positioning must match content pillars must match the sales talk track. If a prospect reads your cold email, then your LinkedIn, then hears your sales pitch — it should feel like one voice telling one story.

When updating any domain, check `_synthesis/master-narrative.md` for contradictions. If outbound says "we're the cheapest" and positioning says "premium quality" — that's a problem.

## Measure or It Didn't Happen

Every campaign, sequence, and post should have a metric attached before it ships. Not after. Not "we'll track it later."

- **Sequences:** Open rate, reply rate, meeting booked rate
- **LinkedIn posts:** Impressions, engagement rate, profile visits
- **Campaigns:** Leads generated, cost per lead, pipeline created
- **Sales:** Win rate, deal velocity, average deal size

If you can't measure it, question whether it should be built.

## Log Your Learnings

GTM insights discovered during work are valuable. What messaging resonated? Which objection response landed? What subject line bombed?

Log these with `node scripts/learnings-log.mjs` so future sessions can build on past discoveries instead of starting from scratch. Knowledge should compound, not evaporate.

## Respect the Knowledge Base

The knowledge base is the single source of truth. When in doubt, read the file. Don't guess what the ICP says — read `icp.md`. Don't assume the positioning — read `positioning.md`.

When the knowledge base is wrong or outdated, update it through the proper protocol (`.claude/protocols/knowledge-update.md`). Don't work around stale data — fix it at the source.
