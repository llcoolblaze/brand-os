import { Router } from "express";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseFrontmatter } from "../lib/frontmatter.js";

export function voiceRoutes(voiceDnaDir: string) {
  const router = Router();

  router.get("/voice", async (_req, res) => {
    const voicePath = join(voiceDnaDir, "brand-voice.md");

    try {
      const content = await readFile(voicePath, "utf-8");
      const fm = parseFrontmatter(content);

      // Parse voice dimensions from the table
      const dimensions = [
        { name: "Tone", leftLabel: "Formal", rightLabel: "Casual", value: null as number | null },
        { name: "Depth", leftLabel: "Technical", rightLabel: "Accessible", value: null as number | null },
        { name: "Stance", leftLabel: "Measured", rightLabel: "Bold", value: null as number | null },
        { name: "Evidence", leftLabel: "Data-driven", rightLabel: "Story-driven", value: null as number | null },
        { name: "Pace", leftLabel: "Dense/detailed", rightLabel: "Punchy/concise", value: null as number | null },
      ];

      // Try to extract values from the dimensions table
      for (const dim of dimensions) {
        const regex = new RegExp(
          `\\|\\s*${dim.name}\\s*\\|[^|]*\\|\\s*(\\d+)\\s*\\|`,
          "i"
        );
        const match = content.match(regex);
        if (match) {
          dim.value = parseInt(match[1], 10);
        }
      }

      // Extract vocabulary
      const useWords: string[] = [];
      const avoidWords: string[] = [];

      // Parse avoid table
      const avoidSection = content.match(
        /### Words & Phrases to AVOID[\s\S]*?\|[\s\S]*?\n((?:\|[\s\S]*?\n)*)/
      );
      if (avoidSection) {
        const rows = avoidSection[1].split("\n").filter((l) => l.startsWith("|"));
        for (const row of rows) {
          const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
          if (cells[0] && !cells[0].includes("---") && !cells[0].includes("Avoid")) {
            avoidWords.push(cells[0].replace(/^"/, "").replace(/"$/, ""));
          }
        }
      }

      res.json({
        status: fm?.status || "unknown",
        dimensions,
        vocabulary: { use: useWords, avoid: avoidWords },
      });
    } catch (err: any) {
      if (err.code === "ENOENT") {
        res.json({
          status: "missing",
          dimensions: [],
          vocabulary: { use: [], avoid: [] },
        });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  });

  return router;
}
