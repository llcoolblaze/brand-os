import { Router } from "express";
import { join } from "node:path";
import { readConfig, writeConfig } from "../lib/yaml-config.js";

export function configRoutes(workspace: string) {
  const router = Router();
  const configPath = join(workspace, "config.yaml");

  router.get("/config", async (_req, res) => {
    const config = await readConfig(configPath);
    res.json(config);
  });

  router.put("/config", async (req, res) => {
    const { key, value } = req.body;
    if (!key) {
      res.status(400).json({ error: "Missing key" });
      return;
    }
    const config = await readConfig(configPath);
    if (value === "true") config[key] = true;
    else if (value === "false") config[key] = false;
    else config[key] = value;
    await writeConfig(configPath, config);
    res.json(config);
  });

  return router;
}
