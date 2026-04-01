#!/usr/bin/env node

/**
 * test.mjs — Brand OS Test Suite
 *
 * Runs basic validation tests on all scripts and project structure.
 * Zero dependencies. Exit code 0 = all pass, 1 = failures.
 *
 * Usage: node scripts/test.mjs
 */

import { readFile, readdir, stat, access } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { execSync } from 'node:child_process';

const PROJECT_ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname);
const KB_ROOT = join(PROJECT_ROOT, 'my-context-os');

let passed = 0;
let failed = 0;

function ok(name) {
  console.log(`  ✓ ${name}`);
  passed++;
}

function fail(name, reason) {
  console.log(`  ✗ ${name} — ${reason}`);
  failed++;
}

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

// ─── Structure Tests ─────────────────────────────────────

async function testProjectStructure() {
  console.log('\n─── Project Structure ───');

  const requiredFiles = [
    'CLAUDE.md', 'ETHOS.md', 'README.md', 'LICENSE',
    'VERSION', 'CHANGELOG.md', 'ARCHITECTURE.md', 'CONTRIBUTING.md',
    'package.json', '.gitignore', 'setup',
  ];
  for (const f of requiredFiles) {
    if (await fileExists(join(PROJECT_ROOT, f))) ok(`${f} exists`);
    else fail(`${f} exists`, 'file not found');
  }

  const requiredDirs = [
    'my-context-os', '.claude/skills', '.claude/voice-dna',
    '.claude/rules', '.claude/protocols', '.claude/hooks',
    'scripts', 'workspace', 'dashboard',
  ];
  for (const d of requiredDirs) {
    try {
      const s = await stat(join(PROJECT_ROOT, d));
      if (s.isDirectory()) ok(`${d}/ exists`);
      else fail(`${d}/ exists`, 'not a directory');
    } catch { fail(`${d}/ exists`, 'directory not found'); }
  }
}

// ─── Knowledge Base Tests ────────────────────────────────

async function testKnowledgeBase() {
  console.log('\n─── Knowledge Base ───');

  const domains = await readdir(KB_ROOT, { withFileTypes: true });
  const domainDirs = domains.filter(d => d.isDirectory());
  if (domainDirs.length >= 10) ok(`${domainDirs.length} domains found`);
  else fail('domains', `expected >= 10, found ${domainDirs.length}`);

  // Count total files
  let totalFiles = 0;
  let filesWithFrontmatter = 0;
  let filesWithValidStatus = 0;

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) { await walk(full); continue; }
      if (!entry.name.endsWith('.md')) continue;
      totalFiles++;

      const content = await readFile(full, 'utf-8');
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (fmMatch) {
        filesWithFrontmatter++;
        if (/status:\s*(template|draft|active|needs-review)/.test(fmMatch[1])) {
          filesWithValidStatus++;
        }
      }
    }
  }
  await walk(KB_ROOT);

  if (totalFiles >= 29) ok(`${totalFiles} knowledge base files`);
  else fail('file count', `expected >= 29, found ${totalFiles}`);

  if (filesWithFrontmatter === totalFiles) ok('all files have frontmatter');
  else fail('frontmatter', `${totalFiles - filesWithFrontmatter} files missing frontmatter`);

  if (filesWithValidStatus === totalFiles) ok('all files have valid status');
  else fail('status', `${totalFiles - filesWithValidStatus} files have invalid status`);
}

// ─── Skills Tests ────────────────────────────────────────

async function testSkills() {
  console.log('\n─── Skills ───');

  const skillsDir = join(PROJECT_ROOT, '.claude', 'skills');
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skillDirs = entries.filter(d => d.isDirectory());

  if (skillDirs.length >= 14) ok(`${skillDirs.length} skills found`);
  else fail('skill count', `expected >= 14, found ${skillDirs.length}`);

  let withDescription = 0;
  let withTriggers = 0;

  for (const dir of skillDirs) {
    const skillFile = join(skillsDir, dir.name, 'SKILL.md');
    if (!(await fileExists(skillFile))) {
      fail(`${dir.name}/SKILL.md`, 'missing');
      continue;
    }
    const content = await readFile(skillFile, 'utf-8');
    if (/description:\s*"/.test(content)) withDescription++;
    if (/[Tt]rigger/.test(content)) withTriggers++;
  }

  if (withDescription === skillDirs.length) ok('all skills have descriptions');
  else fail('descriptions', `${skillDirs.length - withDescription} skills missing description`);

  if (withTriggers >= 6) ok(`${withTriggers} skills have trigger words`);
  else fail('triggers', `only ${withTriggers} skills have trigger words`);
}

// ─── Script Tests ────────────────────────────────────────

async function testScripts() {
  console.log('\n─── Scripts ───');

  const scripts = [
    'health-check.mjs',
    'learnings-log.mjs',
    'learnings-search.mjs',
    'config.mjs',
    'session-summary.mjs',
    'auto-process-all.mjs',
    'post-ingest.mjs',
  ];

  for (const script of scripts) {
    if (await fileExists(join(PROJECT_ROOT, 'scripts', script))) {
      ok(`scripts/${script} exists`);
    } else {
      fail(`scripts/${script}`, 'not found');
    }
  }

  // Test health-check runs without error
  try {
    execSync('node scripts/health-check.mjs', { cwd: PROJECT_ROOT, timeout: 10000, stdio: 'pipe' });
    ok('health-check.mjs runs successfully');
  } catch (e) {
    fail('health-check.mjs', `exit code ${e.status}`);
  }

  // Test config list runs
  try {
    execSync('node scripts/config.mjs list', { cwd: PROJECT_ROOT, timeout: 5000, stdio: 'pipe' });
    ok('config.mjs list runs successfully');
  } catch (e) {
    fail('config.mjs list', `exit code ${e.status}`);
  }
}

// ─── Workspace Tests ─────────────────────────────────────

async function testWorkspace() {
  console.log('\n─── Workspace ───');

  const files = ['setup-progress.json', 'config.yaml', 'current-session.md', 'handoff-log.md'];
  for (const f of files) {
    if (await fileExists(join(PROJECT_ROOT, 'workspace', f))) ok(`workspace/${f} exists`);
    else fail(`workspace/${f}`, 'not found');
  }

  // Validate setup-progress.json is valid JSON
  try {
    const content = await readFile(join(PROJECT_ROOT, 'workspace', 'setup-progress.json'), 'utf-8');
    const data = JSON.parse(content);
    if (data.phases && Object.keys(data.phases).length >= 7) ok('setup-progress.json has 7 phases');
    else fail('setup-progress.json', `expected 7 phases, found ${Object.keys(data.phases || {}).length}`);
  } catch (e) {
    fail('setup-progress.json', `invalid JSON: ${e.message}`);
  }

  // Validate config.yaml parses
  try {
    const content = await readFile(join(PROJECT_ROOT, 'workspace', 'config.yaml'), 'utf-8');
    if (content.includes('company_name') && content.includes('voice_strictness')) {
      ok('config.yaml has expected keys');
    } else {
      fail('config.yaml', 'missing expected keys');
    }
  } catch (e) {
    fail('config.yaml', e.message);
  }
}

// ─── Dashboard Tests ─────────────────────────────────────

async function testDashboard() {
  console.log('\n─── Dashboard ───');

  const requiredFiles = [
    'package.json', 'vite.config.ts', 'tsconfig.json', 'index.html',
    'server/index.ts', 'src/main.tsx', 'src/App.tsx',
    'src/pages/Dashboard.tsx', 'src/pages/KnowledgeBase.tsx', 'src/pages/Settings.tsx',
  ];
  for (const f of requiredFiles) {
    if (await fileExists(join(PROJECT_ROOT, 'dashboard', f))) ok(`dashboard/${f}`);
    else fail(`dashboard/${f}`, 'not found');
  }

  // Check API routes exist
  const routes = ['health.ts', 'progress.ts', 'config.ts', 'files.ts', 'skills.ts', 'voice.ts'];
  for (const r of routes) {
    if (await fileExists(join(PROJECT_ROOT, 'dashboard', 'server', 'routes', r))) ok(`route: ${r}`);
    else fail(`route: ${r}`, 'not found');
  }
}

// ─── Run All ─────────────────────────────────────────────

async function main() {
  console.log('\n  Brand OS Test Suite\n  ═══════════════════');

  await testProjectStructure();
  await testKnowledgeBase();
  await testSkills();
  await testScripts();
  await testWorkspace();
  await testDashboard();

  console.log(`\n─── Results ───`);
  console.log(`  ${passed} passed, ${failed} failed`);
  console.log(`  ${failed === 0 ? '✓ ALL TESTS PASS' : '✗ SOME TESTS FAILED'}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(2);
});
