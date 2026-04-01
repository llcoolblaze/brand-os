/**
 * Recursive markdown file walker — extracted from health-check.mjs
 */

import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function walkMarkdown(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdown(full)));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}
