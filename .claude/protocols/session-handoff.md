# Session Handoff Protocol

How to maintain continuity across Claude Code sessions.

## Starting a Session

1. **Read the current session file:**
   ```
   workspace/current-session.md
   ```
   This tells you what happened last, what's in progress, and what needs attention.

2. **Check the handoff log** (if needed):
   ```
   workspace/handoff-log.md
   ```
   Scan recent entries for broader context.

3. **Orient yourself:**
   - What domain was the user working in?
   - Are there pending decisions?
   - What files were being modified?

## During a Session

Track as you go:
- **Decisions made** — What was decided and why
- **Files modified** — Key changes to knowledge base
- **Open questions** — Things that need follow-up
- **Insights discovered** — New information worth preserving

## Ending a Session

1. **Run the session summary script:**
   ```bash
   node scripts/session-summary.mjs "Brief description of what was accomplished"
   ```
   This updates both `workspace/current-session.md` and `workspace/handoff-log.md`.

2. **Or update manually** if the script isn't available:
   - Update `workspace/current-session.md` with current state
   - Append to `workspace/handoff-log.md`

## Handoff Entry Format

```markdown
## YYYY-MM-DD — Session Log

**Summary:** [1-2 sentences on what was accomplished]

### Decisions Made
- [decision]: [rationale]

### Open Items
- [item]: [context needed to pick it up]

### Files Modified
- [file path]: [what changed]
```
