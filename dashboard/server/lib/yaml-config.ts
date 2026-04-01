/**
 * Simple YAML config reader/writer — extracted from config.mjs
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export interface ConfigData {
  [key: string]: string | boolean | string[];
}

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

export function parseYaml(content: string): ConfigData {
  const config: ConfigData = {};
  for (const line of content.split("\n")) {
    if (line.startsWith("#") || !line.trim()) continue;
    const match = line.match(/^(\w[\w_-]*)\s*:\s*(.+)/);
    if (match) {
      let value: string | boolean | string[] = match[2].trim();
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      } else if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      config[match[1]] = value;
    }
  }
  return config;
}

export function serializeYaml(config: ConfigData): string {
  const lines = [
    "# Brand OS Configuration",
    '# Managed by: node scripts/config.mjs set <key> <value>',
    "",
  ];
  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.join(", ")}]`);
    } else if (typeof value === "string" && value.includes(" ")) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  return lines.join("\n") + "\n";
}

export async function readConfig(configPath: string): Promise<ConfigData> {
  try {
    const content = await readFile(configPath, "utf-8");
    return parseYaml(content);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await mkdir(dirname(configPath), { recursive: true });
      await writeFile(configPath, DEFAULT_CONFIG, "utf-8");
      return parseYaml(DEFAULT_CONFIG);
    }
    throw err;
  }
}

export async function writeConfig(
  configPath: string,
  config: ConfigData
): Promise<void> {
  await writeFile(configPath, serializeYaml(config), "utf-8");
}
