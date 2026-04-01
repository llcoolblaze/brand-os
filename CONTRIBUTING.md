# Contributing to Brand OS

Thanks for wanting to contribute. Brand OS is an open-source GTM operating system for Claude Code. Here's how to help.

## Quick Start

```bash
git clone https://github.com/llcoolblaze/brand-os.git
cd brand-os
./setup
```

## What to Contribute

### High Impact
- **New skills** — GTM skills that solve real problems (see Adding a Skill below)
- **Knowledge base templates** — Better templates for the 12 domains
- **Dashboard features** — New pages, charts, or improvements

### Always Welcome
- Bug fixes with reproduction steps
- Script improvements (error handling, new flags)
- Documentation improvements
- Voice-DNA examples for different industries

### Before You Start
- Check existing issues to avoid duplicate work
- For large changes, open an issue first to discuss the approach

## Project Structure

```
my-context-os/    → Knowledge base templates (markdown + YAML frontmatter)
.claude/skills/   → Claude Code skills (SKILL.md files)
.claude/voice-dna → Brand voice configuration
scripts/          → Automation scripts (zero-dependency Node.js)
workspace/        → Runtime state (config, progress, learnings)
dashboard/        → React + Express local dashboard
```

See `ARCHITECTURE.md` for the full system design.

## Adding a Skill

1. Create a directory: `.claude/skills/your-skill/`
2. Create `SKILL.md` with this structure:

```yaml
---
description: "What it does. Trigger: 'keyword1', 'keyword2', 'keyword3'"
---

# Skill Name

[Instructions for Claude — what to read, what to generate, quality checks]
```

3. Test by opening Claude Code and saying one of the trigger words
4. Submit a PR

### Skill Guidelines
- Keep skills focused — one job per skill
- Always reference knowledge base files by path
- Include a quality checklist at the end
- Apply voice-DNA for any external-facing content

## Adding a Knowledge Base Template

1. Create a markdown file in the appropriate domain directory
2. Include YAML frontmatter:

```yaml
---
title: "Your Template Title"
domain: "01-gtm-strategy"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---
```

3. Add `<!-- TODO: Fill in -->` markers for sections users should customize
4. Run `node scripts/health-check.mjs` to validate
5. Submit a PR

## Development

### Scripts
Scripts use zero dependencies (pure Node.js). Test changes with:
```bash
node scripts/health-check.mjs
node scripts/config.mjs list
```

### Dashboard
```bash
cd dashboard
npm install
npm run dev    # Vite HMR on :5174, Express on :3200
```

## Code Style

- Scripts: ES modules (`.mjs`), zero external dependencies
- Dashboard: TypeScript, React 19, Tailwind CSS 4
- All files: UTF-8, LF line endings
- Commits: imperative mood ("Add feature" not "Added feature")

## Pull Requests

1. Fork the repo and create a branch
2. Make your changes
3. Run `node scripts/health-check.mjs` to validate
4. Write a clear PR description explaining what and why
5. Submit

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
