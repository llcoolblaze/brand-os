#!/usr/bin/env node

/**
 * post-ingest.mjs — Frontmatter Auto-Fixer
 *
 * Takes a markdown file (or scans all of my-context-os/) and ensures
 * proper YAML frontmatter exists with all required fields.
 *
 * Usage:
 *   node scripts/post-ingest.mjs path/to/file.md       # Fix one file
 *   node scripts/post-ingest.mjs --all                  # Fix all files
 *   node scripts/post-ingest.mjs --dry-run --all        # Preview changes
 *
 * Zero dependencies — uses only Node.js built-ins.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, basename, dirname } from 'node:path';

const PROJECT_ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname);
const KB_ROOT = decodeURIComponent(join(PROJECT_ROOT, 'my-context-os'));

// Help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
  Post Ingest — Frontmatter auto-fixer

  Takes a markdown file (or scans all of my-context-os/) and ensures
  proper YAML frontmatter exists with all required fields.
  Missing fields are populated with sensible defaults.

  Usage:
    node scripts/post-ingest.mjs <file>
    node scripts/post-ingest.mjs --all
    node scripts/post-ingest.mjs --dry-run --all

  Examples:
    node scripts/post-ingest.mjs my-context-os/01-gtm-strategy/icp.md
    node scripts/post-ingest.mjs --all
    node scripts/post-ingest.mjs --dry-run --all
    node scripts/post-ingest.mjs --dry-run my-context-os/03-voice/tone-guide.md

  Flags:
    --help, -h    Show this help message
    --all         Process all markdown files in my-context-os/
    --dry-run     Preview changes without modifying files
  `);
  process.exit(0);
}

const REQUIRED_FIELDS = {
  title: (filePath) => {
    // Derive title from filename: "my-file.md" → "My File"
    return basename(filePath, '.md')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  },
  domain: (filePath) => {
    const rel = relative(KB_ROOT, filePath);
    return rel.split('/')[0] || 'unknown';
  },
  status: () => 'draft',
  last_validated: () => new Date().toISOString().slice(0, 10),
  confidence: () => 'low',
  depends_on: () => '[]',
};

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { fields: {}, body: content, raw: null };

  const fields = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w[\w_-]*)\s*:\s*(.+)/);
    if (kv) {
      fields[kv[1]] = kv[2].trim();
    }
  }

  const body = content.slice(match[0].length).trimStart();
  return { fields, body, raw: match[1] };
}

function buildFrontmatter(fields) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(fields)) {
    lines.push(`${key}: ${value}`);
  }
  lines.push('---');
  return lines.join('\n');
}

async function walkMarkdown(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkMarkdown(full));
    } else if (entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

async function processFile(filePath, dryRun = false) {
  const content = await readFile(filePath, 'utf-8');
  const { fields, body, raw } = parseFrontmatter(content);
  const rel = relative(PROJECT_ROOT, filePath);

  let changed = false;
  const finalFields = { ...fields };

  for (const [key, defaultFn] of Object.entries(REQUIRED_FIELDS)) {
    if (!finalFields[key]) {
      const defaultValue = typeof defaultFn === 'function' ? defaultFn(filePath) : defaultFn;
      finalFields[key] = defaultValue.startsWith?.('"') ? defaultValue : `"${defaultValue}"`;
      // Don't quote arrays or simple values
      if (defaultValue === '[]' || !isNaN(defaultValue)) {
        finalFields[key] = defaultValue;
      }
      changed = true;
    }
  }

  if (!changed) {
    return { file: rel, status: 'ok', changes: [] };
  }

  const changes = Object.keys(REQUIRED_FIELDS).filter(k => !fields[k]);

  if (dryRun) {
    return { file: rel, status: 'would-fix', changes };
  }

  const newContent = buildFrontmatter(finalFields) + '\n\n' + (body || content);
  await writeFile(filePath, newContent, 'utf-8');
  return { file: rel, status: 'fixed', changes };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const fixAll = args.includes('--all');
  const targetFiles = args.filter(a => !a.startsWith('--'));

  console.log('🔧 Brand OS — Post-Ingest Frontmatter Fixer\n');

  if (dryRun) {
    console.log('  Mode: DRY RUN (no files will be modified)\n');
  }

  let files;
  if (fixAll) {
    files = await walkMarkdown(KB_ROOT);
    console.log(`  Scanning all files in my-context-os/ (${files.length} found)\n`);
  } else if (targetFiles.length > 0) {
    files = targetFiles.map(f => {
      // Resolve relative to project root
      return f.startsWith('/') ? f : join(PROJECT_ROOT, f);
    });
  } else {
    console.log('Usage:');
    console.log('  node scripts/post-ingest.mjs path/to/file.md');
    console.log('  node scripts/post-ingest.mjs --all');
    console.log('  node scripts/post-ingest.mjs --dry-run --all');
    process.exit(1);
  }

  const results = [];
  for (const file of files) {
    try {
      results.push(await processFile(file, dryRun));
    } catch (err) {
      results.push({ file: relative(PROJECT_ROOT, file), status: 'error', changes: [err.message] });
    }
  }

  // Report
  const fixed = results.filter(r => r.status === 'fixed' || r.status === 'would-fix');
  const ok = results.filter(r => r.status === 'ok');
  const errors = results.filter(r => r.status === 'error');

  if (fixed.length > 0) {
    console.log(dryRun ? '── Would Fix ───────────────────────────────────' : '── Fixed ───────────────────────────────────────');
    for (const r of fixed) {
      console.log(`  ✅ ${r.file} — added: ${r.changes.join(', ')}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.log('── Errors ──────────────────────────────────────');
    for (const r of errors) {
      console.log(`  ❌ ${r.file} — ${r.changes[0]}`);
    }
    console.log('');
  }

  console.log(`Done: ${fixed.length} ${dryRun ? 'would be fixed' : 'fixed'}, ${ok.length} already OK, ${errors.length} errors`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
