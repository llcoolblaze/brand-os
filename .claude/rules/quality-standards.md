# Quality Standards

Minimum quality bar for all outputs.

## Content Length Guidelines

| Content Type | Target Length | Max Length |
|-------------|-------------|------------|
| Cold email | 50-120 words | 150 words |
| Follow-up email | 30-80 words | 100 words |
| LinkedIn post | 150-500 words | 700 words |
| Blog post | 800-1500 words | 2500 words |
| Deal analysis | 200-500 words | 800 words |
| Campaign brief | 300-600 words | 1000 words |
| Battlecard | 200-400 words | 600 words |

## Required Sections by Output Type

### Outbound Email
- [ ] Subject line
- [ ] Personalization hook
- [ ] Value proposition (one sentence)
- [ ] Social proof or evidence (if available)
- [ ] Single CTA

### LinkedIn Post
- [ ] Scroll-stopping hook
- [ ] Body with one clear idea
- [ ] CTA or engagement prompt
- [ ] Hashtags (3-5, relevant)

### Deal Analysis
- [ ] Health score with rationale
- [ ] Risk identification
- [ ] Recommended actions with timelines
- [ ] Preparation notes for next interaction

### Campaign Brief
- [ ] Clear objective with metric
- [ ] Target audience mapped to ICP
- [ ] Channel mix with rationale
- [ ] Timeline
- [ ] Success metrics defined before launch

## Review Checklist (Apply to Everything)

1. **Voice match** — Would this pass a blind test against the brand voice guide?
2. **ICP alignment** — Is this speaking to the right person about their real problems?
3. **Factual grounding** — Can every claim be traced to evidence or user-provided context?
4. **CTA clarity** — Is there exactly one clear next step?
5. **Conciseness** — Can any sentence be cut without losing meaning? Cut it.
6. **Specificity** — Are there vague phrases that could be replaced with specifics?

## When to Flag for Human Review

- Content that names specific people or companies
- Pricing or discount discussions
- Legal or compliance-adjacent language
- Content that will be published (not just drafted)
- Anything where confidence is "low" on a key input

## Automated Review

For a comprehensive quality check, use the content-review skill (say "review this" or "content review"). It runs 5 parallel specialist checks:
1. Voice Check — matches brand-voice.md
2. ICP Alignment — targeted at the right persona
3. Factual Grounding — claims backed by evidence
4. Competitive Positioning — reinforces differentiators
5. CTA Clarity — one clear next step

See `.claude/skills/content-review/SKILL.md` for the full review protocol.
