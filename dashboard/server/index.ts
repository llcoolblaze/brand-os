import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { healthRoutes } from "./routes/health.js";
import { progressRoutes } from "./routes/progress.js";
import { configRoutes } from "./routes/config.js";
import { filesRoutes } from "./routes/files.js";
import { skillsRoutes } from "./routes/skills.js";
import { voiceRoutes } from "./routes/voice.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BRAND_OS_ROOT = path.resolve(__dirname, "..", "..");
const KNOWLEDGE_BASE = path.join(BRAND_OS_ROOT, "my-context-os");
const WORKSPACE = path.join(BRAND_OS_ROOT, "workspace");
const SKILLS_DIR = path.join(BRAND_OS_ROOT, ".claude", "skills");
const VOICE_DNA_DIR = path.join(BRAND_OS_ROOT, ".claude", "voice-dna");

const PORT = process.env.PORT || 3200;

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", healthRoutes(KNOWLEDGE_BASE));
app.use("/api", progressRoutes(WORKSPACE));
app.use("/api", configRoutes(WORKSPACE));
app.use("/api", filesRoutes(KNOWLEDGE_BASE));
app.use("/api", skillsRoutes(SKILLS_DIR));
app.use("/api", voiceRoutes(VOICE_DNA_DIR));

// Serve static files in production
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));
app.get("/{*path}", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n  Brand OS Dashboard`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Root:    ${BRAND_OS_ROOT}\n`);
});
