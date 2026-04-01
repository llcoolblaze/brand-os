---
title: "Prompt Library"
domain: "06-ai-tooling"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---

# Prompt Library

> Reusable prompts that encode your best thinking. Instead of writing a new prompt
> every time, use these tested templates. Each prompt includes the use case,
> variables to customize, and expected output format.

---

## Prompt Template Format

Every prompt in this library follows this structure:

```
### Prompt Name
- **Category:** Research | Writing | Analysis | Outreach | Strategy
- **Use case:** When to use this prompt
- **Variables:** {{variable_name}} -- what to fill in
- **Model:** Which AI model works best (GPT-4, Claude, etc.)
- **Prompt:**
  [The actual prompt text]
- **Expected output:** What good output looks like
```

---

## Category: Research

### ICP Company Research

- **Category:** Research
- **Use case:** Before outreach to a new prospect, gather context for personalization
- **Variables:** `{{company_name}}`, `{{industry}}`, `{{your_product_category}}`
- **Model:** Claude or GPT-4 (with web access)
- **Prompt:**
```
Research {{company_name}} in the {{industry}} space. I need:

1. Company overview (what they do, who they serve, approximate size)
2. Recent news or announcements (last 6 months)
3. Key leadership team members (C-suite and VP level)
4. Likely pain points related to {{your_product_category}}
5. Technology stack (if discoverable)
6. Competitive landscape they operate in
7. Potential conversation starters for a sales outreach

Format as a structured brief I can scan in 2 minutes.
```
- **Expected output:** A 1-page structured brief with actionable insights

---

### Competitive Analysis

- **Category:** Research
- **Use case:** Preparing for a deal where a competitor is mentioned
- **Variables:** `{{competitor_name}}`, `{{your_product_name}}`
- **Model:** Claude or GPT-4
- **Prompt:**
```
Compare {{competitor_name}} to {{your_product_name}}. Analyze:

1. Positioning: How do they describe themselves vs. how we describe ourselves?
2. Strengths: Where are they genuinely better?
3. Weaknesses: Where do they fall short?
4. Pricing: What's their pricing model and range?
5. Customer sentiment: What do reviews say (G2, Capterra)?
6. Key differentiators: What would make a prospect choose them over us?
7. Our counter-narrative: How should we position against them?

Be honest about their strengths -- I need truth, not cheerleading.
```

---

## Category: Writing

### LinkedIn Post Draft

- **Category:** Writing
- **Use case:** Draft a LinkedIn post from a topic/idea
- **Variables:** `{{topic}}`, `{{key_insight}}`, `{{target_audience}}`, `{{post_structure}}`
- **Model:** Claude
- **Prompt:**
```
Write a LinkedIn post about {{topic}} for {{target_audience}}.

Key insight to convey: {{key_insight}}

Structure: {{post_structure}} (options: story, insight, contrarian, how-to, data-driven)

Requirements:
- Hook must be compelling in < 150 characters
- Total length: 800-1,300 characters
- Use short paragraphs (1-3 lines each)
- End with a discussion question
- Tone: [reference brand-voice.md guidelines]
- No emojis / [or specify emoji usage]
- No hashtags in the body; add 3-5 at the end

Give me 2 versions to choose from.
```

---

### Cold Email Personalization

- **Category:** Writing
- **Use case:** Generate personalized opening lines for outbound emails
- **Variables:** `{{prospect_name}}`, `{{company}}`, `{{role}}`, `{{recent_activity}}`, `{{pain_hypothesis}}`
- **Model:** Claude or GPT-4
- **Prompt:**
```
Write 3 personalized opening lines for a cold email to {{prospect_name}},
{{role}} at {{company}}.

Context: {{recent_activity}}
Pain hypothesis: {{pain_hypothesis}}

Rules:
- Each line must be < 20 words
- Reference something specific to them (not generic flattery)
- Connect naturally to a pain point
- Sound human, not salesy
- No "I hope this finds you well" or similar filler
```

---

## Category: Analysis

### Deal Review Analysis

- **Category:** Analysis
- **Use case:** Analyze a deal before a pipeline review or forecast
- **Variables:** `{{deal_context}}` (paste CRM notes, call transcripts, etc.)
- **Model:** Claude
- **Prompt:**
```
Analyze this deal and give me an honest assessment:

{{deal_context}}

Evaluate:
1. Deal health (1-10 scale with explanation)
2. Risks: What could kill this deal?
3. Gaps: What don't we know that we should?
4. Champion strength: Is our champion real?
5. Next best action: What should the rep do next?
6. Forecast recommendation: Commit, Best Case, or Pipeline?

Be direct. I'd rather hear hard truths now than be surprised later.
```

---

### Win/Loss Pattern Analysis

- **Category:** Analysis
- **Use case:** Analyze a batch of closed deals to find patterns
- **Variables:** `{{deal_data}}` (structured data of recent wins and losses)
- **Model:** Claude
- **Prompt:**
```
Analyze these {{N}} closed deals (wins and losses) and identify:

{{deal_data}}

1. Common patterns in wins (ICP fit, persona, deal size, timing, process)
2. Common patterns in losses (reason, stage lost, competitor, objection)
3. Surprising findings that contradict our assumptions
4. Recommendations for ICP refinement
5. Recommendations for sales process improvement

Format as an executive summary + detailed findings.
```

---

## Category: Outreach

### Sequence Generation

- **Category:** Outreach
- **Use case:** Generate a multi-touch outbound sequence
- **Variables:** `{{icp_description}}`, `{{persona}}`, `{{value_prop}}`, `{{num_touches}}`
- **Model:** Claude
- **Prompt:**
```
Create a {{num_touches}}-touch outbound sequence for:

ICP: {{icp_description}}
Persona: {{persona}}
Value proposition: {{value_prop}}

For each touch, provide:
- Day number
- Channel (email, LinkedIn, phone)
- Subject line (for emails)
- Full message text
- Personalization variables to fill in

Rules:
- First email must be < 100 words
- Every touch adds new value (no "just following up")
- Include at least 2 channels
- End with a breakup email
- Tone: professional but human
```

---

## Category: Strategy

### Market Opportunity Analysis

- **Category:** Strategy
- **Use case:** Evaluate a new market segment or expansion opportunity
- **Variables:** `{{market_segment}}`, `{{current_positioning}}`
- **Model:** Claude or GPT-4
- **Prompt:**
```
Evaluate the opportunity for us to expand into {{market_segment}}.

Our current positioning: {{current_positioning}}

Analyze:
1. Market size and growth rate
2. Key players already serving this segment
3. Unmet needs we could address
4. Required product/service changes
5. Go-to-market adjustments needed
6. Risks and cannibalization concerns
7. Recommendation: pursue, deprioritize, or monitor (with reasoning)
```

---

## How to Add New Prompts

1. Test the prompt at least 3 times with different inputs
2. Refine until output is consistently useful
3. Add it to the appropriate category above using the standard format
4. Include at least one example of expected output
5. Note which model works best

---

### Cross-References
- Brand voice for writing prompts: [.claude/voice-dna/brand-voice.md](../../.claude/voice-dna/brand-voice.md)
- ICP for research prompts: [01-gtm-strategy/icp.md](../01-gtm-strategy/icp.md)
- Post templates for LinkedIn prompts: [04-linkedin-content/post-templates.md](../04-linkedin-content/post-templates.md)
- Agent catalog: [06-ai-tooling/agent-catalog.md](./agent-catalog.md)
- Sequence templates: [02-outbound-systems/sequences.md](../02-outbound-systems/sequences.md)
