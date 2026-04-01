import { api } from "./client";

export interface DomainHealth {
  domain: string;
  total: number;
  active: number;
  template: number;
  draft: number;
  needsReview: number;
}

export interface HealthData {
  score: number;
  totalFiles: number;
  activeFiles: number;
  templateFiles: number;
  draftFiles: number;
  needsReviewFiles: number;
  domains: DomainHealth[];
}

export function getHealth() {
  return api.get<HealthData>("/api/health");
}
