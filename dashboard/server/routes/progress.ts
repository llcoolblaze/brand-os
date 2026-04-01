import { Router } from "express";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export function progressRoutes(workspace: string) {
  const router = Router();

  router.get("/progress", async (_req, res) => {
    try {
      const content = await readFile(
        join(workspace, "setup-progress.json"),
        "utf-8"
      );
      res.json(JSON.parse(content));
    } catch (err: any) {
      if (err.code === "ENOENT") {
        res.json({ version: 1, mode: null, current_phase: null, phases: {} });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  });

  return router;
}
