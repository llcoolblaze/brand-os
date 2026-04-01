import { api } from "./client";

export interface ConfigData {
  company_name: string;
  default_persona: string;
  active_channels: string[];
  content_length: string;
  auto_learnings: boolean;
  voice_strictness: string;
  [key: string]: unknown;
}

export function getConfig() {
  return api.get<ConfigData>("/api/config");
}

export function updateConfig(key: string, value: unknown) {
  return api.put<ConfigData>("/api/config", { key, value });
}
