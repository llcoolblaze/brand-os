import { Router } from "express";
import { readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { walkMarkdown } from "../lib/file-walker.js";
import {
  parseFrontmatter,
  getContentWithoutFrontmatter,
} from "../lib/frontmatter.js";

export function filesRoutes(knowledgeBase: string) {
  const router = Router();

  router.get("/files", async (_req, res) => {
    const mdFiles = await walkMarkdown(knowledgeBase);
    const files = [];

    for (const file of mdFiles) {
      const rel = relative(knowledgeBase, file);
      const content = await readFile(file, "utf-8");
      const fm = parseFrontmatter(content);
      const fstat = await stat(file);

      files.push({
        path: rel,
        domain: rel.split("/")[0],
        title: fm?.title || rel.split("/").pop()?.replace(".md", "") || rel,
        status: fm?.status || "unknown",
        confidence: fm?.confidence || "unknown",
        lastValidated: fm?.last_validated || null,
        dependsOn: fm?.depends_on || [],
        fileSize: fstat.size,
      });
    }

    files.sort((a, b) => a.path.localeCompare(b.path));
    res.json(files);
  });

  router.get("/files/:domain/:name", async (req, res) => {
    const { domain, name } = req.params;
    const filePath = join(knowledgeBase, domain, `${name}.md`);

    try {
      const content = await readFile(filePath, "utf-8");
      const fm = parseFrontmatter(content);
      res.json({
        path: `${domain}/${name}.md`,
        frontmatter: fm,
        content,
        contentWithoutFrontmatter: getContentWithoutFrontmatter(content),
      });
    } catch (err: any) {
      if (err.code === "ENOENT") {
        res.status(404).json({ error: "File not found" });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  });

  return router;
}
