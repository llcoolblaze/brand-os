# Quality Gate Hook

This document describes the pre-output quality gate. It can be implemented as a Claude Code hook to automatically validate outputs before delivery.

## Checklist

Every external-facing output must pass these checks:

1. **Voice Applied** — Content matches `.claude/voice-dna/brand-voice.md`
2. **Sources Cited** — Claims reference knowledge base files or user-provided data
3. **ICP-Aligned** — Content targets the right persona from `01-gtm-strategy/icp.md`
4. **No Fabricated Data** — No invented metrics, case studies, or quotes
5. **Single CTA** — One clear call-to-action, not multiple competing asks
6. **Appropriate Length** — Matches guidelines in `.claude/rules/quality-standards.md`

## Implementing as a Claude Code Hook

To enforce this automatically, add to your Claude Code settings:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Quality gate: verify voice, sources, ICP alignment, no fabrication, clear CTA, appropriate length'"
          }
        ]
      }
    ]
  }
}
```

This is a lightweight reminder hook. For more sophisticated validation, create a script in `scripts/` that parses the output and checks against the knowledge base.

## Manual Application

When not using hooks, apply this checklist mentally before delivering any:
- Email draft
- LinkedIn post
- Sales talk track
- Campaign brief
- Competitive battlecard
- Proposal content
