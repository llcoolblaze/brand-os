import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Activity,
  FileCheck,
  FileStack,
  BookOpen,
  Play,
  RefreshCw,
} from "lucide-react";
import { queryKeys } from "@/lib/queryKeys";
import { getHealth } from "@/api/health";
import { getProgress } from "@/api/progress";
import { SetupPhaseBar } from "@/components/SetupPhaseBar";
import { MetricCard } from "@/components/MetricCard";
import { HealthChart } from "@/components/HealthChart";
import { DomainCoverageChart } from "@/components/DomainCoverageChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const healthQ = useQuery({
    queryKey: queryKeys.health,
    queryFn: getHealth,
  });

  const progressQ = useQuery({
    queryKey: queryKeys.progress,
    queryFn: getProgress,
  });

  const health = healthQ.data;
  const progress = progressQ.data;

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="border-b border-foreground pb-6">
        <h1 className="text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-none">
          Dashboard
        </h1>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3 font-mono">
          Knowledge Base Status / System Health
        </p>
      </div>

      {/* Setup phase bar */}
      {progressQ.isLoading ? (
        <Skeleton className="h-14 w-full" />
      ) : progress ? (
        <SetupPhaseBar phases={progress.phases} />
      ) : null}

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {healthQ.isLoading ? (
          <>
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </>
        ) : health ? (
          <>
            <MetricCard
              icon={<Activity className="size-5" />}
              label="Health Score"
              value={`${health.score}%`}
              color={health.score >= 70 ? "green" : health.score >= 40 ? "amber" : "red"}
            />
            <MetricCard
              icon={<FileCheck className="size-5" />}
              label="Files Active"
              value={health.activeFiles}
              subtitle={`of ${health.totalFiles} total`}
              color="green"
              to="/knowledge-base"
            />
            <MetricCard
              icon={<FileStack className="size-5" />}
              label="Templates Left"
              value={health.templateFiles}
              subtitle="waiting to customize"
              color="amber"
              to="/knowledge-base"
            />
            <MetricCard
              icon={<BookOpen className="size-5" />}
              label="Needs Review"
              value={health.needsReviewFiles}
              color={health.needsReviewFiles > 0 ? "amber" : "green"}
              to="/knowledge-base"
            />
          </>
        ) : (
          <div className="col-span-full text-sm text-muted-foreground">
            Unable to load health data. Is the server running?
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="border border-foreground p-6 lg:-mr-px">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Domain Coverage
          </div>
            {healthQ.isLoading ? (
              <div className="flex flex-col gap-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            ) : health ? (
              <DomainCoverageChart
                domains={health.domains.map((d) => ({
                  domain: d.domain,
                  total: d.total,
                  active: d.active,
                  template: d.template,
                  draft: d.draft,
                }))}
              />
            ) : null}
        </div>

        <div className="border border-foreground p-6 flex flex-col">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
            File Status Breakdown
          </div>
          <div className="flex-1 flex items-center justify-center">
            {healthQ.isLoading ? (
              <Skeleton className="size-40 rounded-full" />
            ) : health ? (
              <HealthChart
                active={health.activeFiles}
                template={health.templateFiles}
                draft={health.draftFiles}
                needsReview={health.needsReviewFiles}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-0">
        <Link
          to="/settings"
          className="border border-foreground px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
        >
          <Play className="size-3.5" />
          Start Setup
        </Link>
        <button
          className="border border-foreground -ml-px px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
          onClick={() => {
            healthQ.refetch();
            progressQ.refetch();
          }}
        >
          <RefreshCw className="size-3.5" />
          Health Check
        </button>
      </div>
    </div>
  );
}
