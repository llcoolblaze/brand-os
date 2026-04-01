import { api } from "./client";

export interface Skill {
  name: string;
  description: string;
  trigger: string;
}

export function getSkills() {
  return api.get<Skill[]>("/api/skills");
}
