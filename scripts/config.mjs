#!/usr/bin/env node

/**
 * config.mjs — Brand OS Configuration Manager
 *
 * Simple get/set/list for persistent user preferences.
 *
 * Usage:
 *   node scripts/config.mjs get <key>           # Read a value
 *   node scripts/config.mjs set <key> <value>    # Write a value
 *   node scripts/config.mjs list                  # Show all config
 *
 * Zero dependencies — uses only Node.js built-ins.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';

const PROJECT_ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname);
const CONFIG_FILE = join(PROJECT_ROOT, 'workspace', 'config.yaml');

const DEFAULT_CONFIG = `# Brand OS Configuration
# Managed by: node scripts/config.mjs set <key> <value>

company_name: ""
default_persona: ""
active_channels: [email, linkedin]
content_length: standard
auto_learnings: true
voice_strictness: high
setup_mode: full
`;

// Simple YAML parser (handles flat key: value and simple arrays)
function parseYaml(content) {
  const config = {};
  for (const line of content.split('\n')) {
    if (line.startsWith('#') || !line.trim()) continue;
    const match = line.match(/^(\w[\w_-]*)\s*:\s*(.+)/);
    if (match) {
      let value = match[2].trim();
      // Handle arrays [a, b, c]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
      }
      // Handle booleans
      else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      // Handle quoted strings
      else if ((value.startsWith('"') && value.endsWith('"')) ||
               (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      config[match[1]] = value;
    }
  }
  return config;
}

function serializeYaml(config) {
  const lines = [
    '# Brand OS Configuration',
    '# Managed by: node scripts/config.mjs set <key> <value>',
    '',
  ];
  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.join(', ')}]`);
    } else if (typeof value === 'string' && value.includes(' ')) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  return lines.join('\n') + '\n';
}

async function readConfig() {
  try {
    const content = await readFile(CONFIG_FILE, 'utf-8');
    return { content, config: parseYaml(content) };
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdir(dirname(CONFIG_FILE), { recursive: true });
      await writeFile(CONFIG_FILE, DEFAULT_CONFIG, 'utf-8');
      return { content: DEFAULT_CONFIG, config: parseYaml(DEFAULT_CONFIG) };
    }
    throw err;
  }
}

async function main() {
  const [command, key, ...valueParts] = process.argv.slice(2);

  if (!command || !['get', 'set', 'list'].includes(command)) {
    console.log('Usage:');
    console.log('  node scripts/config.mjs get <key>');
    console.log('  node scripts/config.mjs set <key> <value>');
    console.log('  node scripts/config.mjs list');
    process.exit(1);
  }

  if (command === 'list') {
    const { config } = await readConfig();
    console.log('# Brand OS Configuration\n');
    for (const [k, v] of Object.entries(config)) {
      const display = Array.isArray(v) ? `[${v.join(', ')}]` : v;
      console.log(`  ${k}: ${display}`);
    }
    return;
  }

  if (command === 'get') {
    if (!key) { console.error('Usage: config.mjs get <key>'); process.exit(1); }
    const { config } = await readConfig();
    if (key in config) {
      const v = config[key];
      console.log(Array.isArray(v) ? v.join(', ') : v);
    } else {
      console.error(`Key not found: ${key}`);
      process.exit(1);
    }
    return;
  }

  if (command === 'set') {
    if (!key || valueParts.length === 0) {
      console.error('Usage: config.mjs set <key> <value>');
      process.exit(1);
    }
    const value = valueParts.join(' ');
    const { config } = await readConfig();

    // Parse value type
    if (value === 'true') config[key] = true;
    else if (value === 'false') config[key] = false;
    else if (value.startsWith('[') && value.endsWith(']')) {
      config[key] = value.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    } else {
      config[key] = value;
    }

    await writeFile(CONFIG_FILE, serializeYaml(config), 'utf-8');
    const display = Array.isArray(config[key]) ? `[${config[key].join(', ')}]` : config[key];
    console.log(`Set ${key}: ${display}`);
    return;
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
