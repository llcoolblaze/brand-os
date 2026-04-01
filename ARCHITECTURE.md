# Architecture

Brand OS is a file-based GTM operating system. No database, no external services. The filesystem is the data layer.

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLAUDE CODE                          │
│                                                             │
│  CLAUDE.md ──→ Routes queries to knowledge base + skills    │
│                                                             │
│  ┌─────────────────┐    ┌──────────────────────────┐       │
│  │  15 Skills       │    │  Knowledge Base           │       │
│  │                  │    │  my-context-os/            │       │
│  │  6 GTM skills    │───→│  29 markdown files         │       │
│  │  8 setup skills  │    │  12 domains                │       │
│  │  1 review skill  │    │  YAML frontmatter          │       │
│  └─────────────────┘    └──────────────────────────┘       │
│           │                         │                       │
│           ▼                         ▼                       │
│  ┌─────────────────┐    ┌──────────────────────────┐       │
│  │  Voice DNA       │    │  Workspace                │       │
│  │  .claude/        │    │  workspace/               │       │
│  │  voice-dna/      │    │  setup-progress.json      │       │
│  │  rules/          │    │  config.yaml              │       │
│  │  protocols/      │    │  learnings.jsonl           │       │
│  └─────────────────┘    └──────────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
         │                         │
         ▼                         ▼
┌─────────────────┐    ┌──────────────────────────┐
│  7 Scripts       │    │  Dashboard (optional)     │
│  scripts/        │    │  dashboard/               │
│  Node.js, 0 deps │    │  React + Express          │
│  health-check    │    │  Reads filesystem as API  │
│  learnings       │    │  localhost:3200            │
│  config          │    │                           │
└─────────────────┘    └──────────────────────────┘
```

## Data Flow

### Query Flow
1. User asks Claude a question ("write a cold email")
2. `CLAUDE.md` routing rules match the query type
3. The matching skill activates (e.g., `outbound-copywriter`)
4. Skill reads ICP, voice-DNA, and sequences from knowledge base
5. Claude generates content using the real business context
6. Content review can run 5 parallel quality checks

### Setup Flow
1. User says "setup" — `guided-setup` orchestrator activates
2. Orchestrator reads `workspace/setup-progress.json` for state
3. Routes to the correct phase skill (1 through 7)
4. Phase skill interviews user, generates content, writes to knowledge base
5. Updates frontmatter (`status: template` → `status: active`)
6. Updates progress JSON, advances to next phase

### Learnings Flow
1. During work, GTM insights are discovered
2. Skill logs to `workspace/learnings.jsonl` via `learnings-log.mjs`
3. Future sessions search learnings via `learnings-search.mjs`
4. Confidence decays 1 point per 30 days (markets change fast)
5. Deduplication by key+type (latest wins)

## File Conventions

### Knowledge Base Files
Every file in `my-context-os/` has YAML frontmatter:
```yaml
---
title: "Document Title"
domain: "01-gtm-strategy"
status: template | draft | active | needs-review
last_validated: YYYY-MM-DD
confidence: low | medium | high
depends_on: ["path/to/dependency.md"]
---
```

### Skills
Every skill in `.claude/skills/*/SKILL.md` has:
```yaml
---
description: "What it does. Trigger: 'keyword1', 'keyword2'"
---
```
The description's trigger words enable auto-routing in Claude Code.

### Dependency Chain
```
Phase 1: master-narrative + icp + brand-voice (no dependencies)
Phase 2: positioning → icp | pricing → icp + positioning
Phase 3: sequences → icp + voice | deal-playbook → icp + pricing
Phase 4: lead-scoring → icp | pipeline-stages → deal-playbook
Phase 5: seo-strategy → positioning | paid-campaigns → icp
Phase 6: competitive-intel → positioning (optional)
Phase 7: synthesis (reads everything)
```

## Dashboard Architecture

The dashboard is a self-contained app in `dashboard/`:
- **Express server** reads Brand OS files, serves JSON API
- **React frontend** (Vite + Tailwind) renders the data
- **No database** — API endpoints read markdown/JSON/YAML directly
- **Port 3200** in production, Vite dev proxy in development

## Design Decisions

**Why markdown?** Version-controllable, human-readable, works offline, no vendor lock-in. The knowledge base is just files — `cat`, `grep`, and `git diff` all work.

**Why YAML frontmatter?** Machine-readable metadata on human-readable content. Scripts can validate structure while humans edit content.

**Why zero dependencies for scripts?** One fewer thing to break. `node scripts/health-check.mjs` works on any machine with Node 18+. No `npm install` required for core functionality.

**Why not a database?** 29 files is not a scale problem. File reads are <1ms. Adding a database creates sync complexity with no benefit.

**Why separate dashboard?** The dashboard is optional. Brand OS works entirely through Claude Code CLI. The dashboard serves non-technical users who prefer a visual interface.
