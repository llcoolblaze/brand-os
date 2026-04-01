# Brand Safety Hooks

GTM-specific guardrails that protect brand integrity. These can be implemented as Claude Code hooks or applied as mental checklists during content generation.

## Safety Checks

### 1. Unknown Persona Warning
**Trigger:** Generating content for a persona not defined in `icp.md`
**Action:** Warn before proceeding
```
This persona isn't defined in your ICP. Content may not resonate.
Options:
1. Add this persona to your ICP first (recommended)
2. Proceed with best-guess targeting
3. Cancel
```

### 2. Voice-DNA Not Loaded
**Trigger:** Generating external-facing content without reading `brand-voice.md`
**Action:** Block and load voice first
```
Voice-DNA must be loaded before generating external content.
Reading .claude/voice-dna/brand-voice.md...
```

### 3. Ungrounded Claims
**Trigger:** Content includes specific metrics, percentages, or statistics
**Action:** Check against `_evidence/research-log.md`
```
This content claims "[specific stat]".
- Found in evidence log: YES/NO
- If NO: Flag as unverified. Add "based on our estimates" or remove.
```

### 4. Unknown Competitor Reference
**Trigger:** Content mentions a company not in `competitive-intel.md`
**Action:** Warn
```
"[Company]" isn't in your competitive intel file.
Referencing undocumented competitors can lead to inaccurate claims.
Options:
1. Add them to competitive-intel.md first
2. Remove the reference
3. Proceed (at your risk)
```

### 5. Banned Vocabulary Detection
**Trigger:** Content uses words from the "avoid" list in `brand-voice.md`
**Action:** Auto-suggest replacements
```
Found banned vocabulary:
- "leverage" → use "use" or "apply"
- "synergy" → be specific about the benefit
- "cutting-edge" → describe the specific innovation
```

### 6. Client Data Isolation
**Trigger:** Accessing `09-consulting-clients/[client-a]/` while context includes `[client-b]`
**Action:** Hard block
```
BLOCKED: Cannot access Client A's data while working on Client B.
Client data must never cross-contaminate.
```

## Implementing as Claude Code Hooks

To make these active hooks, add to your Claude Code settings:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Brand safety: Check persona, voice, evidence, competitor refs, vocabulary'"
          }
        ]
      }
    ]
  }
}
```

For more sophisticated enforcement, create check scripts in `scripts/` that parse content and validate against the knowledge base programmatically.

## Severity Levels

| Check | Severity | Action |
|-------|----------|--------|
| Unknown persona | Warning | Advise, don't block |
| Voice not loaded | Blocking | Must load before proceeding |
| Ungrounded claims | Warning | Flag and suggest qualification |
| Unknown competitor | Warning | Advise, don't block |
| Banned vocabulary | Auto-fix | Suggest replacements inline |
| Client data isolation | Hard block | Cannot override |
