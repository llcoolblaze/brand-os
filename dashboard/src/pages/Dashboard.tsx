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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your brand knowledge at a glance
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Domain Coverage</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">File Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
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
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/settings">
            <Play className="size-4" />
            Start Setup
          </Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            healthQ.refetch();
            progressQ.refetch();
          }}
        >
          <RefreshCw className="size-4" />
          Run Health Check
        </Button>
      </div>
    </div>
  );
}
