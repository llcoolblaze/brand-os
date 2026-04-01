#!/usr/bin/env node

/**
 * auto-process-all.mjs — Daily Pipeline Runner
 *
 * Scans the knowledge base and generates a prioritized daily digest:
 * - Documents needing review (stale or needs-review status)
 * - Active items requiring attention
 * - Cross-domain gaps (synthesis opportunities)
 * - Template files still needing customization
 *
 * Usage: node scripts/auto-process-all.mjs
 * Output: Prints digest to stdout (pipe to file or use in automation)
 *
 * Zero dependencies — uses only Node.js built-ins.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = decodeURIComponent(new URL('../my-context-os', import.meta.url).pathname);

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fields = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w[\w_-]*)\s*:\s*(.+)/);
    if (kv) {
      let value = kv[2].trim();
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

async function main() {
  const mdFiles = await walkMarkdown(ROOT);
  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  const buckets = {
    needsReview: [],
    stale: [],
    templates: [],
    lowConfidence: [],
    active: [],
  };

  const domainCoverage = {};

  for (const file of mdFiles) {
    const rel = relative(ROOT, file);
    const content = await readFile(file, 'utf-8');
    const fm = parseFrontmatter(content);

    // Track domain coverage
    const domain = rel.split('/')[0];
    if (!domainCoverage[domain]) domainCoverage[domain] = { total: 0, active: 0, template: 0 };
    domainCoverage[domain].total++;

    if (!fm) {
      buckets.needsReview.push({ file: rel, reason: 'Missing frontmatter' });
      continue;
    }

    if (fm.status === 'needs-review') {
      buckets.needsReview.push({ file: rel, reason: 'Flagged for review' });
    }

    if (fm.status === 'template') {
      buckets.templates.push(rel);
      domainCoverage[domain].template++;
    }

    if (fm.status === 'active') {
      buckets.active.push(rel);
      domainCoverage[domain].active++;
    }

    if (fm.confidence === 'low' && fm.status !== 'template') {
      buckets.lowConfidence.push(rel);
    }

    if (fm.last_validated) {
      const daysSince = (now - new Date(fm.last_validated).getTime()) / day;
      if (daysSince > 90 && fm.status !== 'template') {
        buckets.stale.push({ file: rel, days: Math.round(daysSince) });
      }
    }
  }

  // ── Generate Digest ─────────────────────────────────────────────

  const date = new Date().toISOString().slice(0, 10);
  console.log(`# Daily Digest — ${date}\n`);

  // Priority 1: Needs immediate attention
  if (buckets.needsReview.length > 0) {
    console.log('## 🔴 Needs Review\n');
    for (const item of buckets.needsReview) {
      console.log(`- **${item.file}** — ${item.reason}`);
    }
    console.log('');
  }

  // Priority 2: Stale documents
  if (buckets.stale.length > 0) {
    console.log('## 🟡 Stale Documents (>90 days)\n');
    for (const item of buckets.stale.sort((a, b) => b.days - a.days)) {
      console.log(`- **${item.file}** — ${item.days} days since validation`);
    }
    console.log('');
  }

  // Priority 3: Low confidence
  if (buckets.lowConfidence.length > 0) {
    console.log('## 🟠 Low Confidence (needs evidence)\n');
    for (const file of buckets.lowConfidence) {
      console.log(`- ${file}`);
    }
    console.log('');
  }

  // Domain coverage report
  console.log('## 📊 Domain Coverage\n');
  console.log('| Domain | Files | Active | Template | Health |');
  console.log('|--------|-------|--------|----------|--------|');
  for (const [domain, stats] of Object.entries(domainCoverage).sort()) {
    const health = stats.template === stats.total ? '🔴 Empty'
      : stats.active === stats.total ? '🟢 Complete'
      : '🟡 Partial';
    console.log(`| ${domain} | ${stats.total} | ${stats.active} | ${stats.template} | ${health} |`);
  }
  console.log('');

  // Templates remaining
  if (buckets.templates.length > 0) {
    console.log(`## 📝 Templates Remaining (${buckets.templates.length}/${mdFiles.length})\n`);
    for (const file of buckets.templates) {
      console.log(`- [ ] ${file}`);
    }
    console.log('');
  }

  // Summary
  const pct = mdFiles.length > 0
    ? Math.round((buckets.active.length / mdFiles.length) * 100)
    : 0;
  console.log(`## Summary\n`);
  console.log(`- **Total files:** ${mdFiles.length}`);
  console.log(`- **Active:** ${buckets.active.length} (${pct}%)`);
  console.log(`- **Templates remaining:** ${buckets.templates.length}`);
  console.log(`- **Needs review:** ${buckets.needsReview.length}`);
  console.log(`- **Stale:** ${buckets.stale.length}`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
