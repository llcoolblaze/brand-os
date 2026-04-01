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

interface RawHealthResponse {
  healthScore: number;
  totalFiles: number;
  active: number;
  template: number;
  draft: number;
  needsReview: number;
  domainCoverage: Record<
    string,
    { total: number; active: number; template: number; draft: number; needsReview: number }
  >;
  errors: string[];
  warnings: string[];
}

export async function getHealth(): Promise<HealthData> {
  const raw = await api.get<RawHealthResponse>("/api/health");
  return {
    score: raw.healthScore,
    totalFiles: raw.totalFiles,
    activeFiles: raw.active,
    templateFiles: raw.template,
    draftFiles: raw.draft,
    needsReviewFiles: raw.needsReview,
    domains: Object.entries(raw.domainCoverage).map(([domain, stats]) => ({
      domain,
      ...stats,
    })),
  };
}
