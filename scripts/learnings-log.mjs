#!/usr/bin/env node

/**
 * learnings-log.mjs — GTM Learnings Logger
 *
 * Append-only JSONL logger for GTM insights discovered during work.
 * Knowledge compounds across sessions instead of evaporating.
 *
 * Usage:
 *   node scripts/learnings-log.mjs '{"skill":"outbound-copywriter","type":"pattern","key":"subject-lines","learning":"Questions get 2x open rate","confidence":7}'
 *
 * Required fields: skill, type, key, learning, confidence
 * Optional fields: source, domain, files
 *
 * Types: pattern, pitfall, preference, insight, win
 * Confidence: 1-10 (1=guess, 5=observed once, 7=repeated pattern, 10=user-stated)
 *
 * Zero dependencies — uses only Node.js built-ins.
 */

import { appendFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';

const PROJECT_ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname);
const LEARNINGS_FILE = join(PROJECT_ROOT, 'workspace', 'learnings.jsonl');

const VALID_TYPES = ['pattern', 'pitfall', 'preference', 'insight', 'win'];
const REQUIRED_FIELDS = ['skill', 'type', 'key', 'learning', 'confidence'];

async function main() {
  const input = process.argv.slice(2).join(' ');

  if (!input) {
    console.log('Usage: node scripts/learnings-log.mjs \'{"skill":"...","type":"...","key":"...","learning":"...","confidence":N}\'');
    console.log('');
    console.log('Types: pattern, pitfall, preference, insight, win');
    console.log('Confidence: 1-10');
    process.exit(1);
  }

  let entry;
  try {
    entry = JSON.parse(input);
  } catch {
    console.error('Invalid JSON. Wrap your input in single quotes and use double quotes inside.');
    process.exit(1);
  }

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    if (!entry[field]) {
      console.error(`Missing required field: ${field}`);
      process.exit(1);
    }
  }

  // Validate type
  if (!VALID_TYPES.includes(entry.type)) {
    console.error(`Invalid type: "${entry.type}". Must be one of: ${VALID_TYPES.join(', ')}`);
    process.exit(1);
  }

  // Validate confidence
  const conf = Number(entry.confidence);
  if (isNaN(conf) || conf < 1 || conf > 10) {
    console.error('Confidence must be a number between 1 and 10');
    process.exit(1);
  }
  entry.confidence = conf;

  // Add timestamp if missing
  if (!entry.ts) {
    entry.ts = new Date().toISOString();
  }

  // Add source default
  if (!entry.source) {
    entry.source = 'observed';
  }

  // Ensure directory exists
  await mkdir(dirname(LEARNINGS_FILE), { recursive: true });

  // Append to JSONL
  await appendFile(LEARNINGS_FILE, JSON.stringify(entry) + '\n', 'utf-8');

  console.log(`Logged ${entry.type}: "${entry.key}" (confidence: ${entry.confidence}/10)`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
