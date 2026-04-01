# Knowledge Update Protocol

How to add new information to the knowledge base correctly.

## When to Update

- You learned something new about the ICP, market, or competitors
- A deal provided new objection handling insights
- Campaign results revealed new data
- The user provides new research or evidence
- A document's status changes (validated, outdated, etc.)

## Update Process

### Step 1: Identify the Right File

Match the information to a domain:
- Customer insights → `01-gtm-strategy/`
- Sales learnings → `03-sales-execution/`
- Market data → `_evidence/research-log.md`
- Cross-domain insight → `_synthesis/master-narrative.md`

### Step 2: Update the File

- Add the new information in the appropriate section
- Update the frontmatter:
  ```yaml
  last_validated: [today's date]
  confidence: [adjust if evidence supports it]
  ```
- If adding evidence, include source attribution

### Step 3: Run Post-Ingest

```bash
node scripts/post-ingest.mjs path/to/updated/file.md
```

This validates frontmatter and fixes any missing fields.

### Step 4: Check Cross-Domain Impact

Ask yourself:
- Does this change affect other documents? (Check `depends_on` references)
- Should `_synthesis/master-narrative.md` be updated?
- Does this invalidate any existing content (sequences, posts, battlecards)?

### Step 5: Validate

```bash
node scripts/health-check.mjs
```

Ensure no broken cross-references or missing fields.

## Adding a Brand New File

1. Create the file in the appropriate domain directory
2. Add full frontmatter (or run `node scripts/post-ingest.mjs path/to/file.md` to auto-generate)
3. Add `depends_on` references to related files
4. Update the domain's existing files to reference the new one if relevant
5. Run health check

## Evidence Standards

When adding to `_evidence/research-log.md`:
- Always include the source (URL, interview, data export, etc.)
- Rate confidence: low (anecdotal), medium (small sample), high (statistically significant)
- Include the date the evidence was collected
- Tag which domain(s) it applies to
