# Skill Preamble Protocol

Every Brand OS skill should follow this standardized startup sequence before doing any work. This ensures consistent behavior, leverages past learnings, and catches configuration issues early.

## Preamble Checklist

### 1. Load Configuration
Read `workspace/config.yaml` for user preferences:
- `company_name` — use in generated content
- `default_persona` — default target if user doesn't specify
- `content_length` — concise, standard, or detailed
- `voice_strictness` — how strictly to enforce voice-DNA
- `auto_learnings` — whether to log learnings after generation

### 2. Check Setup Status
Read `workspace/setup-progress.json` and verify:
- Is the foundation complete? (ICP, voice, narrative)
- If foundation files are still `template`, warn the user:
  ```
  Your ICP hasn't been customized yet. The output will be generic.
  Run "setup" to personalize your knowledge base first.
  ```
- Skip this warning if the user explicitly asked for template/example output.

### 3. Load Context Files
Read the relevant upstream files for your skill:

| Skill Type | Must Read |
|-----------|-----------|
| Content-producing (outbound, linkedin, campaigns) | ICP + voice-DNA + positioning |
| Analysis (deal-analyst, competitive-intel) | ICP + positioning + relevant domain file |
| Research (icp-researcher) | Current ICP + evidence log |
| Planning (campaign-planner) | ICP + positioning + channel files |

### 4. Search Learnings
Run a learnings search for relevant past insights:
```bash
node scripts/learnings-search.mjs --skill [current-skill] --min-confidence 5
```
Also search by domain:
```bash
node scripts/learnings-search.mjs --domain [relevant-domain] --min-confidence 5
```

If relevant learnings exist, apply them:
- **Patterns:** Reuse approaches that worked
- **Pitfalls:** Avoid approaches that failed
- **Preferences:** Honor user-stated preferences
- **Insights:** Incorporate market/customer insights

### 5. Apply Ethos
Read `ETHOS.md` principles and keep them active:
- ICP-First: Confirm which persona before writing
- Voice Non-Negotiable: Load voice-DNA before generating
- Evidence Over Assumptions: Flag confidence levels
- Cross-Domain Coherence: Check for consistency

## After Skill Execution

### Log Learnings (if auto_learnings is true)
If the session produced a notable insight, pattern, or pitfall, log it:
```bash
node scripts/learnings-log.mjs '{"skill":"[skill-name]","type":"[pattern|pitfall|insight]","key":"[short-key]","learning":"[what was learned]","confidence":[1-10],"domain":"[domain]"}'
```

### Update Session Context
Note what was generated in `workspace/current-session.md` for session continuity.
