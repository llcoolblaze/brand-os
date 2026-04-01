---
title: "MCP Integrations"
domain: "06-ai-tooling"
status: template
last_validated: 2026-01-01
confidence: low
depends_on: []
---

# MCP Server Integrations

> Model Context Protocol (MCP) servers extend your AI agents' capabilities by giving
> them access to external tools and data sources. This document catalogs active
> integrations, configurations, and use cases.

---

## Active MCP Servers

<!-- TODO: Document each MCP server you have configured -->

### Server 1: <!-- TODO: Server Name, e.g., "Slack MCP" -->

| Attribute | Details |
|-----------|---------|
| **Server Name** | <!-- TODO --> |
| **Package / Source** | <!-- TODO: npm package or GitHub repo --> |
| **Purpose** | <!-- TODO: What does this server enable? --> |
| **Capabilities** | <!-- TODO: List available tools/functions --> |
| **Auth Method** | <!-- TODO: API key, OAuth, token --> |
| **Status** | <!-- TODO: Active / Configured / Planned --> |

**Configuration:**
```json
{
  "mcpServers": {
    "<!-- TODO: server-name -->": {
      "command": "<!-- TODO -->",
      "args": ["<!-- TODO -->"],
      "env": {
        "<!-- TODO: ENV_VAR -->": "<!-- TODO: value or reference to secret -->"
      }
    }
  }
}
```

**Use Cases:**
1. <!-- TODO: e.g., "Send notifications to #sales channel when deals close" -->
2. <!-- TODO -->

---

### Server 2: <!-- TODO: Server Name -->

| Attribute | Details |
|-----------|---------|
| **Server Name** | <!-- TODO --> |
| **Package / Source** | <!-- TODO --> |
| **Purpose** | <!-- TODO --> |
| **Capabilities** | <!-- TODO --> |
| **Status** | <!-- TODO --> |

**Configuration:**
```json
{
  "mcpServers": {
    "<!-- TODO -->": {
      "command": "<!-- TODO -->",
      "args": ["<!-- TODO -->"]
    }
  }
}
```

---

### Example: Supabase MCP (delete or replace)

| Attribute | Details |
|-----------|---------|
| **Server Name** | supabase |
| **Package / Source** | @anthropic/mcp-supabase |
| **Purpose** | Database access for dashboards, analytics, and data operations |
| **Capabilities** | execute_sql, list_tables, apply_migration, get_logs |
| **Auth Method** | Project API key |
| **Status** | Active |

**Configuration:**
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-supabase", "--project-ref", "your-project-ref"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

**Use Cases:**
1. Query pipeline data for real-time metrics
2. Run ad-hoc analysis on customer data
3. Apply database migrations for new features

---

## Use Cases per Server

<!-- TODO: Map business needs to MCP servers -->

| Business Need | MCP Server | Specific Tools Used | Example |
|--------------|-----------|-------------------|---------|
| Send Slack notifications | Slack MCP | slack_send_message | Notify sales team of new leads |
| Query database | Supabase MCP | execute_sql | Pull pipeline metrics for review |
| Browse and test web pages | Browser MCP | navigate, screenshot | QA landing pages before launch |
| Manage deployments | Fly.io MCP | fly-apps-list, fly-logs | Monitor production health |
| <!-- TODO --> | <!-- TODO --> | <!-- TODO --> | <!-- TODO --> |

---

## Setup Instructions

### Adding a New MCP Server

1. **Find the server:** Check [MCP server registry](https://github.com/modelcontextprotocol/servers) or build your own
2. **Install dependencies:** `npm install -g <package>` or ensure `npx` can access it
3. **Configure in settings:** Add to `.claude/settings.json` or project MCP config
4. **Set secrets:** Store API keys/tokens securely (environment variables, not hardcoded)
5. **Test:** Verify the server responds with `npx <package> --help` or test in Claude
6. **Document:** Add to this catalog with configuration and use cases

### Security Notes
- Never commit API keys or tokens to version control
- Use environment variables for all secrets
- Rotate keys regularly (quarterly recommended)
- Audit MCP server permissions -- grant minimum necessary access
- <!-- TODO: Add your security policies -->

### Troubleshooting Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Server not connecting | Missing dependency | Run `npx -y <package>` to verify installation |
| Auth failure | Expired or invalid token | Regenerate API key and update env variable |
| Timeout errors | Server overloaded or network issue | Check server health, increase timeout |
| Tools not appearing | Server config syntax error | Validate JSON in settings file |

---

## MCP Server Evaluation Criteria

When considering a new MCP server:

- [ ] Does it solve a real, recurring need?
- [ ] Is it from a trusted source (official, well-maintained)?
- [ ] What permissions does it require? (principle of least privilege)
- [ ] Does it overlap with an existing server?
- [ ] What's the cost? (API usage, hosting, etc.)
- [ ] Is there documentation and community support?

---

### Cross-References
- Agents that use MCP servers: [06-ai-tooling/agent-catalog.md](./agent-catalog.md)
- Prompts that leverage MCP tools: [06-ai-tooling/prompt-library.md](./prompt-library.md)
- Tool stack overview: [10-tools/tool-stack.md](../10-tools/tool-stack.md)
- CRM integration: [07-revenue-ops/crm-setup.md](../07-revenue-ops/crm-setup.md)
