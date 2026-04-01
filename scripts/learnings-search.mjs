#!/usr/bin/env node

/**
 * learnings-search.mjs — GTM Learnings Search
 *
 * Search the learnings JSONL with confidence decay, dedup, and filtering.
 * Markets change fast — confidence decays 1 point per 30 days.
 *
 * Usage:
 *   node scripts/learnings-search.mjs                          # Show all
 *   node scripts/learnings-search.mjs --type pattern           # Filter by type
 *   node scripts/learnings-search.mjs --query "subject line"   # Keyword search
 *   node scripts/learnings-search.mjs --skill outbound-copywriter
 *   node scripts/learnings-search.mjs --domain 02-outbound-systems
 *   node scripts/learnings-search.mjs --min-confidence 5       # Minimum confidence
 *   node scripts/learnings-search.mjs --limit 10               # Limit results
 *
 * Zero dependencies — uses only Node.js built-ins.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const PROJECT_ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname);
const LEARNINGS_FILE = join(PROJECT_ROOT, 'workspace', 'learnings.jsonl');
const DECAY_RATE = 1; // points per 30 days
const DECAY_PERIOD = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

function parseArgs(args) {
  const opts = { type: null, query: null, skill: null, domain: null, minConfidence: 0, limit: 50 };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--type': opts.type = args[++i]; break;
      case '--query': opts.query = args[++i]?.toLowerCase(); break;
      case '--skill': opts.skill = args[++i]; break;
      case '--domain': opts.domain = args[++i]; break;
      case '--min-confidence': opts.minConfidence = Number(args[++i]) || 0; break;
      case '--limit': opts.limit = Number(args[++i]) || 50; break;
    }
  }
  return opts;
}

function decayConfidence(entry) {
  const age = Date.now() - new Date(entry.ts).getTime();
  const periods = Math.floor(age / DECAY_PERIOD);
  // Only decay observed/inferred sources (user-stated preferences don't decay)
  if (entry.source === 'user-stated' || entry.type === 'preference') {
    return entry.confidence;
  }
  return Math.max(1, entry.confidence - (periods * DECAY_RATE));
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  let content;
  try {
    content = await readFile(LEARNINGS_FILE, 'utf-8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No learnings recorded yet. Use learnings-log.mjs to add your first one.');
      process.exit(0);
    }
    throw err;
  }

  const lines = content.trim().split('\n').filter(Boolean);
  if (lines.length === 0) {
    console.log('No learnings recorded yet.');
    process.exit(0);
  }

  // Parse all entries
  let entries = [];
  for (const line of lines) {
    try {
      entries.push(JSON.parse(line));
    } catch {
      // Skip malformed lines silently
    }
  }

  // Dedup by key+type (latest wins)
  const deduped = new Map();
  for (const entry of entries) {
    const dedupKey = `${entry.key}::${entry.type}`;
    deduped.set(dedupKey, entry);
  }
  entries = Array.from(deduped.values());

  // Apply confidence decay
  entries = entries.map(e => ({
    ...e,
    current_confidence: decayConfidence(e),
    original_confidence: e.confidence,
  }));

  // Apply filters
  if (opts.type) {
    entries = entries.filter(e => e.type === opts.type);
  }
  if (opts.skill) {
    entries = entries.filter(e => e.skill === opts.skill);
  }
  if (opts.domain) {
    entries = entries.filter(e => e.domain === opts.domain);
  }
  if (opts.query) {
    entries = entries.filter(e =>
      e.key.toLowerCase().includes(opts.query) ||
      e.learning.toLowerCase().includes(opts.query)
    );
  }
  if (opts.minConfidence) {
    entries = entries.filter(e => e.current_confidence >= opts.minConfidence);
  }

  // Sort by current confidence (highest first)
  entries.sort((a, b) => b.current_confidence - a.current_confidence);

  // Limit results
  entries = entries.slice(0, opts.limit);

  if (entries.length === 0) {
    console.log('No matching learnings found.');
    process.exit(0);
  }

  // Group by type for display
  const grouped = {};
  for (const entry of entries) {
    if (!grouped[entry.type]) grouped[entry.type] = [];
    grouped[entry.type].push(entry);
  }

  console.log(`# GTM Learnings (${entries.length} results)\n`);

  for (const [type, items] of Object.entries(grouped)) {
    const emoji = { pattern: 'o', pitfall: 'x', preference: '*', insight: '>', win: '+' }[type] || '-';
    console.log(`## ${type.charAt(0).toUpperCase() + type.slice(1)}s\n`);

    for (const item of items) {
      const decay = item.current_confidence < item.original_confidence
        ? ` (was ${item.original_confidence}, decayed)`
        : '';
      const age = Math.round((Date.now() - new Date(item.ts).getTime()) / (24 * 60 * 60 * 1000));
      const domain = item.domain ? ` [${item.domain}]` : '';

      console.log(`${emoji} **${item.key}** (confidence: ${item.current_confidence}/10${decay})${domain}`);
      console.log(`  ${item.learning}`);
      console.log(`  _${item.skill} | ${age}d ago | ${item.source}_`);
      console.log('');
    }
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
