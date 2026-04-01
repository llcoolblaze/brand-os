import { Router } from "express";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export function skillsRoutes(skillsDir: string) {
  const router = Router();

  router.get("/skills", async (_req, res) => {
    const skills = [];

    try {
      const entries = await readdir(skillsDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const skillFile = join(skillsDir, entry.name, "SKILL.md");
        try {
          const content = await readFile(skillFile, "utf-8");
          const descMatch = content.match(
            /description:\s*"([^"]+)"/
          );
          const description = descMatch?.[1] || "";

          // Extract trigger words from description
          const triggerMatch = description.match(/Trigger:\s*(.+)/i);
          const triggers = triggerMatch
            ? triggerMatch[1]
                .split(",")
                .map((t) => t.trim().replace(/^'|'$/g, ""))
            : [];

          // Categorize
          let category = "other";
          if (entry.name.startsWith("setup-")) category = "setup";
          else if (entry.name === "guided-setup") category = "setup";
          else if (entry.name === "content-review") category = "quality";
          else category = "gtm";

          skills.push({
            name: entry.name,
            description: description.split("Trigger:")[0].trim(),
            triggers,
            category,
          });
        } catch {
          // Skip directories without SKILL.md
        }
      }
    } catch {
      // Skills directory doesn't exist
    }

    skills.sort((a, b) => a.name.localeCompare(b.name));
    res.json(skills);
  });

  return router;
}
