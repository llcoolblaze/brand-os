import { api } from "./client";

export interface Phase {
  name: string;
  status: "pending" | "locked" | "in-progress" | "complete" | "skippable";
  files: Record<string, string>;
}

export interface ProgressData {
  phases: Phase[];
  currentPhase: number | null;
  mode: string | null;
}

interface RawProgressResponse {
  version: number;
  mode: string | null;
  current_phase: number | null;
  phases: Record<string, { name: string; status: string; files: Record<string, string> }>;
}

export async function getProgress(): Promise<ProgressData> {
  const raw = await api.get<RawProgressResponse>("/api/progress");
  const phases = Object.values(raw.phases).map((p) => ({
    name: p.name,
    status: p.status as Phase["status"],
    files: p.files,
  }));
  return {
    phases,
    currentPhase: raw.current_phase,
    mode: raw.mode,
  };
}
