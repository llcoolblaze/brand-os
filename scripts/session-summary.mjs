#!/usr/bin/env node

/**
 * session-summary.mjs — Session Indexer
 *
 * Creates a timestamped summary entry in workspace/handoff-log.md
 * with session topics, decisions, and open items.
 *
 * Usage:
 *   node scripts/session-summary.mjs "Brief description of what was done"
 *   node scripts/session-summary.mjs  (interactive — reads from stdin)
 *
 * Zero dependencies — uses only Node.js built-ins.
 */

import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { join } from 'node:path';

const PROJECT_ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname);
const HANDOFF_LOG = join(PROJECT_ROOT, 'workspace', 'handoff-log.md');
const CURRENT_SESSION = join(PROJECT_ROOT, 'workspace', 'current-session.md');

function timestamp() {
  return new Date().toISOString().replace('T', ' ').replace(/\.\d+Z/, ' UTC');
}

function dateSlug() {
  return new Date().toISOString().slice(0, 10);
}

async function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  let summary = process.argv.slice(2).join(' ');

  if (!summary) {
    summary = await prompt('Session summary (what was accomplished): ');
  }

  if (!summary) {
    console.log('No summary provided. Exiting.');
    process.exit(1);
  }

  const entry = `
## ${dateSlug()} — Session Log

**Timestamp:** ${timestamp()}
**Summary:** ${summary}

### Decisions Made
<!-- List key decisions from this session -->
-

### Open Items
<!-- What needs attention next -->
-

### Files Modified
<!-- Key files that were changed -->
-

---
`;

  // Append to handoff log
  try {
    await appendFile(HANDOFF_LOG, entry, 'utf-8');
    console.log(`✅ Session entry added to workspace/handoff-log.md`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(HANDOFF_LOG, `# Handoff Log\n\nSession history for continuity across conversations.\n${entry}`, 'utf-8');
      console.log(`✅ Created workspace/handoff-log.md with session entry`);
    } else {
      throw err;
    }
  }

  // Update current session
  const currentSessionContent = `---
title: Current Session
last_updated: ${timestamp()}
---

# Current Session

## Last Activity
${summary}

## Active Context
<!-- What the next session should know -->
-

## Pending Decisions
<!-- Decisions that need to be made -->
-

## Quick Links
<!-- Files currently being worked on -->
-
`;

  await writeFile(CURRENT_SESSION, currentSessionContent, 'utf-8');
  console.log(`✅ Updated workspace/current-session.md`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
