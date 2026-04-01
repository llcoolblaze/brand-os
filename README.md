# Brand OS

**Your entire go-to-market in one Claude Code workspace.**

Brand OS turns Claude Code into a GTM copilot that knows your ICP, speaks your voice, and executes your playbook. 29 knowledge base templates, 15 auto-routing skills, a guided setup wizard, and a local dashboard — all open source, zero external dependencies.

> One founder with AI can now run the GTM motion that used to take a team of 5.
> Brand OS is the operating system that makes it possible.

## Who This Is For

- **Solo founders** who need to run outbound, content, and sales without a marketing team
- **GTM consultants** who want a repeatable system they can deploy for every client
- **Revenue leaders** who want Claude to draft in their voice, not generic AI slop

## Quick Start — 2 Minutes

**1.** Clone it

```bash
git clone https://github.com/llcoolblaze/brand-os.git
cd brand-os
```

**2.** Open Claude Code and say `setup`

```bash
claude
```

```
setup
```

**3.** Answer the questions. Brand OS populates your entire knowledge base.

**4.** Start using it:

```
write a cold email to [your persona]
```

Stop there. You'll know if this is for you.

## Install

**Requirements:** [Claude Code](https://claude.ai/code), Node.js 18+

```bash
git clone https://github.com/llcoolblaze/brand-os.git
cd brand-os
```

That's it. No `npm install` needed for the core system — all scripts are zero-dependency Node.js. The knowledge base is just markdown files.

For the visual dashboard (optional):
```bash
cd dashboard
npm install
npm run dashboard    # Opens http://localhost:3200
```

## The System

**Setup → Execute → Learn → Improve**

Brand OS works as a cycle. You set up your knowledge base once, then Claude uses it to generate personalized GTM content. Insights from each session compound through the learnings system.

### Guided Setup (7 Phases)

Say `setup` and the wizard walks you through everything conversationally. Quick Start mode takes 20 minutes. Full Setup covers all 29 files across multiple sessions.

| Phase | What You Build | Time |
|-------|---------------|------|
| 1. Foundation | Core narrative, ICP, brand voice | ~20 min |
| 2. Strategy | Positioning, pricing | ~15 min |
| 3. Execution | Outbound sequences, sales playbook, content pillars | ~30 min |
| 4. Operations | Lead scoring, metrics, pipeline, CRM | ~20 min |
| 5. Growth | SEO, paid campaigns, LinkedIn engagement | ~20 min |
| 6. Specialized | Competitive intel, fundraising, consulting (optional) | ~15 min |
| 7. Synthesis | Cross-domain connections, prompt library | ~10 min |

Say `setup progress` anytime to see your dashboard. Say `continue setup` to pick up where you left off.

### GTM Skills (Auto-Routing)

Say what you need. The right skill activates, reads your knowledge base, applies your voice.

| Skill | What It Does |
|-------|-------------|
| `outbound-copywriter` | Cold emails, sequences, follow-ups in your voice |
| `deal-analyst` | Deal health scores, risk analysis, call prep |
| `linkedin-ghostwriter` | Posts, comments, engagement content |
| `icp-researcher` | ICP refinement, market segment analysis |
| `competitive-intel` | Competitor battlecards, feature comparisons |
| `campaign-planner` | Campaign briefs with channel mix and timeline |
| `content-review` | 5-specialist quality review (voice, ICP, evidence, positioning, CTA) |

### Knowledge Base (12 Domains)

Every file has YAML frontmatter with `status`, `confidence`, and `depends_on` — so the health check can validate the entire system.

| Domain | What's In It |
|--------|-------------|
| `01-gtm-strategy/` | ICP, positioning, pricing |
| `02-outbound-systems/` | Sequences, Clay workflows, pipeline stages |
| `03-sales-execution/` | Deal playbook, objections, discovery |
| `04-linkedin-content/` | Content pillars, post templates, engagement |
| `05-marketing-demand/` | SEO, paid campaigns, calendar |
| `06-ai-tooling/` | Prompts, agent catalog, MCP integrations |
| `07-revenue-ops/` | Metrics, lead scoring, CRM |
| `08-startup-ops/` | Validation framework, fundraising prep |
| `09-consulting-clients/` | Per-client workspaces |
| `10-tools/` | Tool stack, competitive intel |
| `_synthesis/` | Cross-domain narrative |
| `_evidence/` | Research log, data |

### Automation Scripts

Zero-dependency Node.js. Run from the project root.

| Script | What It Does |
|--------|-------------|
| `health-check.mjs` | Validates frontmatter, flags stale docs, checks cross-references |
| `learnings-log.mjs` | Logs GTM insights with confidence scoring |
| `learnings-search.mjs` | Searches past insights with confidence decay |
| `config.mjs` | Persistent user preferences (get/set/list) |
| `session-summary.mjs` | Session continuity across conversations |
| `auto-process-all.mjs` | Daily priorities digest |
| `post-ingest.mjs` | Auto-fixes frontmatter on new files |

### Local Dashboard

A browser-based UI for non-technical users. No database — reads directly from your Brand OS files.

```bash
cd dashboard && npm install && npm run dashboard
```

**Pages:**
- **Dashboard** — Setup progress, health score, domain coverage charts
- **Knowledge Base** — Browse and preview all 29 files with status filtering
- **Settings** — Visual config editor and brand voice radar chart

## How It Works

```
my-context-os/           → Your GTM knowledge base (29 markdown files)
.claude/skills/          → 15 auto-routing skills with trigger words
.claude/voice-dna/       → Brand voice definition + tone examples
.claude/rules/           → Safety gates + quality standards
.claude/protocols/       → Session handoff + knowledge update protocols
.claude/hooks/           → Brand safety guardrails
scripts/                 → 7 zero-dependency automation scripts
workspace/               → Session state, config, learnings, setup progress
dashboard/               → React + Express local dashboard
CLAUDE.md                → Master config (Claude reads this first)
ETHOS.md                 → GTM operating principles
```

**The cycle:**
1. **Setup** populates your knowledge base through conversational interviews
2. **Skills** read your knowledge base and generate personalized GTM content
3. **Content Review** runs 5 parallel quality checks before delivery
4. **Learnings** capture what worked and what didn't — confidence decays over time
5. **Health Check** keeps everything validated and up to date

## Configuration

Persistent preferences in `workspace/config.yaml`:

```bash
node scripts/config.mjs list                          # Show all settings
node scripts/config.mjs set company_name "Acme Corp"  # Set a value
node scripts/config.mjs get company_name              # Read a value
```

| Key | Default | What It Controls |
|-----|---------|-----------------|
| `company_name` | `""` | Used in generated content |
| `default_persona` | `""` | Default target persona |
| `active_channels` | `[email, linkedin]` | Channels to optimize for |
| `content_length` | `standard` | Brief, standard, or detailed |
| `voice_strictness` | `high` | How strictly to enforce brand voice |
| `auto_learnings` | `true` | Auto-log insights after skill use |

## Customization

### Adding a Domain
```bash
mkdir my-context-os/11-your-domain/
# Add markdown files with frontmatter
node scripts/post-ingest.mjs --all    # Validate
```

### Adding a Skill
```bash
mkdir .claude/skills/your-skill/
# Create SKILL.md with description + trigger words
```

### Client Workspaces (Consulting/Agency)
```
09-consulting-clients/
├── acme-corp/
│   ├── overview.md
│   ├── deliverables.md
│   └── meeting-notes.md
└── engagement-tracker.md
```

Client data is isolated — safety gates prevent cross-contamination.

## Docs

| Document | What It Covers |
|----------|---------------|
| `CLAUDE.md` | Master config — routing rules, voice enforcement, quality gates |
| `ETHOS.md` | GTM operating principles — ICP-first, voice non-negotiable, evidence over assumptions |
| `.claude/voice-dna/brand-voice.md` | Voice definition — 5 dimensions, vocabulary, do's/don'ts |
| `.claude/rules/safety-gates.md` | What Claude must never do |
| `.claude/rules/quality-standards.md` | Output quality requirements |
| `.claude/protocols/session-handoff.md` | Session continuity protocol |
| `.claude/protocols/knowledge-update.md` | How to add new information |
| `.claude/protocols/skill-preamble.md` | Standard skill startup checklist |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Skills not showing in Claude Code | Ensure `.claude/skills/` exists and contains `SKILL.md` files |
| Health check fails | Run `node scripts/post-ingest.mjs --all` to fix frontmatter |
| Setup progress lost | Check `workspace/setup-progress.json` exists |
| Scripts fail on spaces in path | Already handled — scripts use `decodeURIComponent()` |
| Dashboard won't start | Run `cd dashboard && npm install` first |
| Config not saving | Check `workspace/config.yaml` is writable |

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run `node scripts/health-check.mjs` to validate
5. Submit a PR

## License

MIT. Free forever. Go build something.

---

Built by [llcoolblaze](https://x.com/llcoolblaze) for the Claude Code community.
