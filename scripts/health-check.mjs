#!/usr/bin/env node

/**
 * health-check.mjs — Knowledge Base Integrity Validator
 *
 * Walks my-context-os/, parses YAML frontmatter, and reports:
 * - Missing required frontmatter fields
 * - Stale documents (not validated in >90 days)
 * - Broken depends_on cross-references
 * - Files still in "template" status
 * - Files with low confidence
 *
 * Usage: node scripts/health-check.mjs
 * Zero dependencies — uses only Node.js built-ins.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = decodeURIComponent(new URL('../my-context-os', import.meta.url).pathname);
const REQUIRED_FIELDS = ['title', 'domain', 'status', 'last_validated', 'confidence'];
const VALID_STATUSES = ['template', 'draft', 'active', 'needs-review'];
const VALID_CONFIDENCE = ['low', 'medium', 'high'];
const STALE_DAYS = 90;

// Help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
  Health Check — Knowledge base integrity validator

  Walks my-context-os/, parses YAML frontmatter, and reports:
    - Missing required frontmatter fields
    - Stale documents (not validated in >90 days)
    - Broken depends_on cross-references
    - Files still in "template" status
    - Files with low confidence

  Usage:
    node scripts/health-check.mjs

  Examples:
    node scripts/health-check.mjs
    node scripts/health-check.mjs --help

  Flags:
    --help, -h    Show this help message
  `);
  process.exit(0);
}

// ── Frontmatter parser ──────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fields = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w[\w_-]*)\s*:\s*(.+)/);
    if (kv) {
      let value = kv[2].trim();
      // Handle arrays like [a, b]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      } else {
        value = value.replace(/^["']|["']$/g, '');
      }
      fields[kv[1]] = value;
    }
  }
  return fields;
}

// ── Recursive file walker ───────────────────────────────────────────

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

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const issues = [];
  const allFiles = new Set();
  const fileData = new Map();

  console.log('🔍 Brand OS — Knowledge Base Health Check\n');
  console.log(`Scanning: ${ROOT}\n`);

  const mdFiles = await walkMarkdown(ROOT);

  if (mdFiles.length === 0) {
    console.log('⚠️  No markdown files found in my-context-os/');
    process.exit(1);
  }

  // Parse all files
  for (const file of mdFiles) {
    const rel = relative(ROOT, file);
    allFiles.add(rel);

    const content = await readFile(file, 'utf-8');
    const fm = parseFrontmatter(content);

    fileData.set(rel, { frontmatter: fm, file });

    if (!fm) {
      issues.push({ file: rel, severity: 'error', message: 'Missing YAML frontmatter' });
      continue;
    }

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!fm[field]) {
        issues.push({ file: rel, severity: 'error', message: `Missing required field: ${field}` });
      }
    }

    // Validate status
    if (fm.status && !VALID_STATUSES.includes(fm.status)) {
      issues.push({ file: rel, severity: 'error', message: `Invalid status: "${fm.status}" (expected: ${VALID_STATUSES.join(', ')})` });
    }

    // Validate confidence
    if (fm.confidence && !VALID_CONFIDENCE.includes(fm.confidence)) {
      issues.push({ file: rel, severity: 'error', message: `Invalid confidence: "${fm.confidence}" (expected: ${VALID_CONFIDENCE.join(', ')})` });
    }

    // Check staleness
    if (fm.last_validated) {
      const validated = new Date(fm.last_validated);
      const daysSince = (Date.now() - validated.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince > STALE_DAYS) {
        issues.push({ file: rel, severity: 'warn', message: `Stale: last validated ${Math.round(daysSince)} days ago` });
      }
    }

    // Track template status
    if (fm.status === 'template') {
      issues.push({ file: rel, severity: 'info', message: 'Still in template status — needs customization' });
    }

    // Track low confidence
    if (fm.confidence === 'low') {
      issues.push({ file: rel, severity: 'info', message: 'Low confidence — needs validation' });
    }
  }

  // Check cross-references (depends_on)
  for (const [rel, data] of fileData) {
    if (!data.frontmatter?.depends_on) continue;
    const deps = Array.isArray(data.frontmatter.depends_on)
      ? data.frontmatter.depends_on
      : [data.frontmatter.depends_on];

    for (const dep of deps) {
      if (dep && !allFiles.has(dep)) {
        // Also check if it's a path relative to project root (e.g., .claude/voice-dna/...)
        // These are valid but outside my-context-os
        if (!dep.startsWith('.claude/')) {
          issues.push({ file: rel, severity: 'warn', message: `Broken depends_on: "${dep}" not found` });
        }
      }
    }
  }

  // ── Report ──────────────────────────────────────────────────────

  const errors = issues.filter(i => i.severity === 'error');
  const warns = issues.filter(i => i.severity === 'warn');
  const infos = issues.filter(i => i.severity === 'info');

  console.log(`📁 Files scanned: ${mdFiles.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log(`⚠️  Warnings: ${warns.length}`);
  console.log(`ℹ️  Info: ${infos.length}`);
  console.log('');

  if (errors.length > 0) {
    console.log('── ERRORS ──────────────────────────────────────');
    for (const issue of errors) {
      console.log(`  ❌ ${issue.file}: ${issue.message}`);
    }
    console.log('');
  }

  if (warns.length > 0) {
    console.log('── WARNINGS ────────────────────────────────────');
    for (const issue of warns) {
      console.log(`  ⚠️  ${issue.file}: ${issue.message}`);
    }
    console.log('');
  }

  if (infos.length > 0) {
    console.log('── INFO ────────────────────────────────────────');
    for (const issue of infos) {
      console.log(`  ℹ️  ${issue.file}: ${issue.message}`);
    }
    console.log('');
  }

  // Summary
  const templateCount = issues.filter(i => i.message.includes('template status')).length;
  const activeCount = [...fileData.values()].filter(d => d.frontmatter?.status === 'active').length;

  console.log('── SUMMARY ─────────────────────────────────────');
  console.log(`  Total files:     ${mdFiles.length}`);
  console.log(`  Active:          ${activeCount}`);
  console.log(`  Still template:  ${templateCount}`);
  console.log(`  Health score:    ${errors.length === 0 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');

  if (templateCount === mdFiles.length) {
    console.log('💡 All files are still templates. Start customizing by editing');
    console.log('   my-context-os/01-gtm-strategy/icp.md first — it\'s the most');
    console.log('   cross-referenced document in the knowledge base.');
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(2);
});
