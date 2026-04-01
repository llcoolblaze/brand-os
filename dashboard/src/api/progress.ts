import { api } from "./client";

export interface Phase {
  name: string;
  status: "pending" | "locked" | "in-progress" | "complete" | "skippable";
  files: Record<string, string>;
}

export interface ProgressData {
  phases: Phase[];
  currentPhase: number;
  completedPhases: number;
}

export function getProgress() {
  return api.get<ProgressData>("/api/progress");
}
