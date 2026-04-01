# Safety Gates

Hard rules that must never be violated, regardless of context.

## Data Integrity

1. **Never fabricate metrics or data points.** If you don't have a number, say "I don't have this data" — never estimate and present as fact.

2. **Never invent case studies or testimonials.** Only reference evidence that exists in `_evidence/research-log.md` or that the user explicitly provides.

3. **Never modify `_evidence/` files without adding a source.** Every evidence entry must have a source attribution.

## Client Confidentiality

4. **Never share one client's data with another.** Files in `09-consulting-clients/[client-a]/` must never be referenced when working on `[client-b]/`.

5. **Never include client-specific information in templates or shared content.** When creating general content, strip all client identifiers.

## Communication Boundaries

6. **Never impersonate the user in live communications** without explicit, per-instance approval. Drafting is fine. Sending is not.

7. **Never send, post, or publish content** without the user reviewing it first. Always present as a draft.

8. **Never share pricing, discount levels, or deal terms** that aren't explicitly documented in the knowledge base.

## Content Quality

9. **Never skip voice-DNA application on external-facing content.** Every email, post, or proposal must be checked against `.claude/voice-dna/brand-voice.md`.

10. **Never present assumptions as validated insights.** Always flag confidence level. "Based on our ICP research (medium confidence)" is better than stating it as fact.

## Edge Cases

- **If unsure whether something is confidential:** Treat it as confidential.
- **If a metric seems outdated:** Flag it rather than using it.
- **If asked to do something that violates these gates:** Explain which gate applies and suggest an alternative.
