---
title: "Outbound Sequences"
domain: "02-outbound-systems"
status: template
last_validated: 2026-01-01
confidence: low
depends_on:
  - 01-gtm-strategy/icp.md
  - .claude/voice-dna/brand-voice.md
---

# Outbound Sequences

> This document defines your outbound sequence architecture -- the systematic way you
> reach your ICP through multi-channel touchpoints. Every sequence should be built on
> your ICP definition and delivered in your brand voice.

---

## Sequence Architecture

### Core Principles
1. **ICP-first:** Every sequence targets a specific ICP tier and persona (see [icp.md](../01-gtm-strategy/icp.md))
2. **Multi-channel:** Combine email, LinkedIn, phone, and other channels
3. **Value-led:** Every touchpoint delivers value, not just asks for time
4. **Personalization at scale:** Use enrichment data to personalize (see [clay-enrichment.md](./clay-enrichment.md))

### Sequence Overview

<!-- TODO: Define your active sequences -->

| Sequence Name | Target (ICP Tier + Persona) | Channels | Touchpoints | Duration | Goal |
|--------------|---------------------------|----------|-------------|----------|------|
| <!-- TODO: e.g., "Cold Outbound - VP Sales" --> | <!-- Tier 1, Persona 1 --> | <!-- Email, LinkedIn, Phone --> | <!-- 12 --> | <!-- 21 days --> | <!-- Book meeting --> |
| <!-- TODO: e.g., "Warm Inbound Follow-up" --> | <!-- All tiers --> | <!-- Email, LinkedIn --> | <!-- 6 --> | <!-- 10 days --> | <!-- Qualify + book --> |
| <!-- TODO: e.g., "Re-engagement" --> | <!-- Previous no-reply --> | <!-- Email --> | <!-- 4 --> | <!-- 14 days --> | <!-- Restart conversation --> |

### Touchpoint Cadence

<!-- TODO: Define the rhythm for your primary sequence -->

**Primary Cold Sequence:**

| Day | Channel | Type | Purpose |
|-----|---------|------|---------|
| 1 | Email | Cold open | Pattern interrupt + relevance |
| 2 | LinkedIn | Connection request | Warm with personalized note |
| 4 | Email | Value-add | Share insight relevant to their pain |
| 6 | LinkedIn | Engage with content | Comment on their post or share something relevant |
| 8 | Email | Case study | Social proof from similar company |
| 11 | Phone | Cold call | Direct conversation attempt |
| 13 | Email | Follow-up | Reference call attempt + new angle |
| 16 | LinkedIn | DM | Casual, direct message |
| 19 | Email | Breakup | Final attempt with soft close |
| 21 | LinkedIn | Engage | Continue passive engagement (no hard ask) |

---

## Email Templates

<!-- TODO: Write your actual templates. Use {{variables}} for personalization fields. -->

### Template 1: Cold Open

**Subject line options:**
- <!-- TODO: e.g., "{{pain_point}} at {{company}}?" -->
- <!-- TODO: e.g., "Quick question about {{initiative}}" -->
- <!-- TODO: e.g., "{{mutual_connection}} suggested I reach out" -->

**Body:**
```
Hi {{first_name}},

{{personalized_opening_line}}

<!-- TODO: 1-2 sentences connecting their situation to your value prop -->

<!-- TODO: Social proof (one line) -->

<!-- TODO: Clear, low-friction CTA -->

{{signature}}
```

**Example (delete or adapt):**
```
Hi Sarah,

Noticed {{company}} just opened 3 new AE roles -- congrats on the growth.

When teams scale from 10 to 20+ reps, forecast accuracy usually drops by 30%
because the old "gut feel" approach breaks. We've helped companies like [Similar Co]
maintain 90%+ forecast accuracy through that growth phase.

Worth a 15-min chat to see if this is relevant to your planning?

Best,
[Name]
```

### Template 2: Value-Add Follow-Up

**Subject line:** Re: previous subject (keep thread)

**Body:**
```
Hi {{first_name}},

<!-- TODO: Reference previous email without being passive-aggressive -->

<!-- TODO: Share a genuinely useful insight, stat, or resource -->

<!-- TODO: Tie it back to their specific situation -->

<!-- TODO: Soft CTA or question -->
```

### Template 3: Breakup Email

**Subject line options:**
- <!-- TODO: e.g., "Should I close your file?" -->
- <!-- TODO: e.g., "Not the right time?" -->

**Body:**
```
Hi {{first_name}},

<!-- TODO: Acknowledge they're busy, no guilt trip -->

<!-- TODO: Quick summary of what you could help with -->

<!-- TODO: Leave the door open, give them an easy way back in -->
```

---

## Personalization Variables

<!-- TODO: Define what data points you use for personalization and where they come from -->

| Variable | Source | Example | Used In |
|----------|--------|---------|---------|
| `{{first_name}}` | CRM | "Sarah" | All |
| `{{company}}` | CRM | "Acme Corp" | All |
| `{{personalized_opening_line}}` | Manual research or AI | "Saw your talk at SaaStr..." | Cold open |
| `{{pain_point}}` | Clay enrichment | "forecast accuracy" | Cold open, follow-up |
| `{{initiative}}` | LinkedIn / press | "your new enterprise push" | Cold open |
| `{{mutual_connection}}` | LinkedIn | "John from Sequoia" | Cold open |
| `{{similar_company}}` | Case study match | "Datadog" | Value-add |
| `{{relevant_metric}}` | Industry research | "30% forecast miss rate" | Value-add |
| <!-- TODO: Add your custom variables --> | | | |

**Personalization tiers:**
- **Tier 1 (Tier 1 ICP):** Fully custom first line + company-specific pain point
- **Tier 2 (Tier 2 ICP):** Industry-specific personalization + role-based pain
- **Tier 3 (Tier 3 ICP):** Role-based template with company name swap

---

## A/B Testing Framework

### What to Test

| Element | Variation A | Variation B | Metric | Min Sample |
|---------|------------|------------|--------|------------|
| Subject line | Question format | Statement format | Open rate | 100 sends each |
| Opening line | Personalized compliment | Pain point lead | Reply rate | 100 sends each |
| CTA | Meeting ask | Question ask | Reply rate | 100 sends each |
| Sequence length | 8 touchpoints | 12 touchpoints | Meeting booked rate | 50 completions each |
| Send time | 8-9am local | 4-5pm local | Open rate | 100 sends each |

### Testing Rules
1. <!-- TODO: Only test one variable at a time -->
2. <!-- TODO: Minimum sample size before declaring a winner -->
3. <!-- TODO: Run tests for at least 2 weeks -->
4. <!-- TODO: Log results in [_evidence/research-log.md](../_evidence/research-log.md) -->

### Test Log

| Date | Test | Winner | Lift | Sample Size | Notes |
|------|------|--------|------|-------------|-------|
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

---

## Sequence Performance Benchmarks

| Metric | Target | Current | Industry Avg |
|--------|--------|---------|-------------|
| Open rate | <!-- TODO: e.g., 45%+ --> | <!-- TODO --> | 25-35% |
| Reply rate | <!-- TODO: e.g., 8%+ --> | <!-- TODO --> | 3-5% |
| Positive reply rate | <!-- TODO: e.g., 4%+ --> | <!-- TODO --> | 1-2% |
| Meeting booked rate | <!-- TODO: e.g., 3%+ --> | <!-- TODO --> | 1-2% |
| Sequence completion rate | <!-- TODO --> | <!-- TODO --> | N/A |
| Unsubscribe rate | <!-- TODO: <1% --> | <!-- TODO --> | <2% |

---

### Cross-References
- Who we're targeting: [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Voice and tone: [.claude/voice-dna/brand-voice.md](../../.claude/voice-dna/brand-voice.md)
- Enrichment data for personalization: [02-outbound-systems/clay-enrichment.md](./clay-enrichment.md)
- Where meetings go after booking: [02-outbound-systems/pipeline-stages.md](./pipeline-stages.md)
- Discovery questions for booked meetings: [03-sales-execution/discovery-questions.md](../03-sales-execution/discovery-questions.md)
- LinkedIn DM integration: [04-linkedin-content/engagement-strategy.md](../04-linkedin-content/engagement-strategy.md)
