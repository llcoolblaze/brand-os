/**
 * YAML frontmatter parser — extracted from health-check.mjs
 * Handles flat key: value pairs and simple arrays.
 */

export interface Frontmatter {
  title?: string;
  domain?: string;
  status?: string;
  last_validated?: string;
  confidence?: string;
  depends_on?: string[];
  [key: string]: string | string[] | undefined;
}

export function parseFrontmatter(content: string): Frontmatter | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fields: Frontmatter = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w[\w_-]*)\s*:\s*(.+)/);
    if (kv) {
      let value: string | string[] = kv[2].trim();
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
      } else {
        value = value.replace(/^["']|["']$/g, "");
      }
      fields[kv[1]] = value;
    }
  }
  return fields;
}

export function getContentWithoutFrontmatter(content: string): string {
  return content.replace(/^---\n[\s\S]*?\n---\n*/, "");
}
