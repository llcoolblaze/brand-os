import { Router } from "express";
import { readFile } from "node:fs/promises";
import { relative } from "node:path";
import { walkMarkdown } from "../lib/file-walker.js";
import { parseFrontmatter } from "../lib/frontmatter.js";

const VALID_STATUSES = ["template", "draft", "active", "needs-review"];
const VALID_CONFIDENCE = ["low", "medium", "high"];
const STALE_DAYS = 90;

export function healthRoutes(knowledgeBase: string) {
  const router = Router();

  router.get("/health", async (_req, res) => {
    const mdFiles = await walkMarkdown(knowledgeBase);
    const domainCoverage: Record<string, { total: number; active: number; template: number; draft: number; needsReview: number }> = {};
    const errors: string[] = [];
    const warnings: string[] = [];
    let activeCount = 0;
    let templateCount = 0;
    let draftCount = 0;
    let needsReviewCount = 0;

    for (const file of mdFiles) {
      const rel = relative(knowledgeBase, file);
      const domain = rel.split("/")[0];

      if (!domainCoverage[domain]) {
        domainCoverage[domain] = { total: 0, active: 0, template: 0, draft: 0, needsReview: 0 };
      }
      domainCoverage[domain].total++;

      const content = await readFile(file, "utf-8");
      const fm = parseFrontmatter(content);

      if (!fm) {
        errors.push(`${rel}: Missing YAML frontmatter`);
        continue;
      }

      if (fm.status === "active") {
        activeCount++;
        domainCoverage[domain].active++;
      } else if (fm.status === "template") {
        templateCount++;
        domainCoverage[domain].template++;
      } else if (fm.status === "draft") {
        draftCount++;
        domainCoverage[domain].draft++;
      } else if (fm.status === "needs-review") {
        needsReviewCount++;
        domainCoverage[domain].needsReview++;
      }

      if (fm.status && !VALID_STATUSES.includes(fm.status)) {
        errors.push(`${rel}: Invalid status "${fm.status}"`);
      }

      if (fm.last_validated) {
        const daysSince = (Date.now() - new Date(fm.last_validated).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSince > STALE_DAYS && fm.status !== "template") {
          warnings.push(`${rel}: Stale (${Math.round(daysSince)} days since validation)`);
        }
      }
    }

    const totalFiles = mdFiles.length;
    const healthScore = totalFiles > 0 ? Math.round((activeCount / totalFiles) * 100) : 0;

    res.json({
      totalFiles,
      active: activeCount,
      template: templateCount,
      draft: draftCount,
      needsReview: needsReviewCount,
      errors,
      warnings,
      healthScore,
      domainCoverage,
    });
  });

  return router;
}
