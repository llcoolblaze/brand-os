import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { queryKeys } from "@/lib/queryKeys";
import { getFiles, getFile, type FileEntry } from "@/api/files";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { FileStatusBadge } from "@/components/FileStatusBadge";
import { MarkdownPreview } from "@/components/MarkdownPreview";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = ["All", "Active", "Template", "Draft"] as const;

export default function KnowledgeBase() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{
    domain: string;
    name: string;
  } | null>(null);

  const filesQ = useQuery({
    queryKey: queryKeys.files.list,
    queryFn: getFiles,
  });

  const fileDetailQ = useQuery({
    queryKey: selectedFile
      ? queryKeys.files.detail(selectedFile.domain, selectedFile.name)
      : ["files", "none"],
    queryFn: () =>
      selectedFile ? getFile(selectedFile.domain, selectedFile.name) : null,
    enabled: !!selectedFile,
  });

  const files = filesQ.data ?? [];

  // Domain list with counts
  const domains = useMemo(() => {
    const map = new Map<string, number>();
    for (const f of files) {
      map.set(f.domain, (map.get(f.domain) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([domain, count]) => ({ domain, count }));
  }, [files]);

  // Filtered files
  const filtered = useMemo(() => {
    return files.filter((f) => {
      if (domainFilter && f.domain !== domainFilter) return false;
      if (statusFilter !== "All" && f.status.toLowerCase() !== statusFilter.toLowerCase())
        return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !f.title.toLowerCase().includes(q) &&
          !f.name.toLowerCase().includes(q) &&
          !f.domain.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [files, domainFilter, statusFilter, search]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse and preview your brand files
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1.5">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[180px_1fr_1fr]">
        {/* Domain filter list */}
        <div className="hidden lg:block">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Domains
          </div>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => setDomainFilter(null)}
              className={cn(
                "flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors text-left",
                !domainFilter
                  ? "bg-accent font-medium"
                  : "hover:bg-accent/50 text-muted-foreground"
              )}
            >
              <span>All</span>
              <span className="text-xs tabular-nums">{files.length}</span>
            </button>
            {domains.map((d) => (
              <button
                key={d.domain}
                onClick={() =>
                  setDomainFilter(domainFilter === d.domain ? null : d.domain)
                }
                className={cn(
                  "flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors text-left",
                  domainFilter === d.domain
                    ? "bg-accent font-medium"
                    : "hover:bg-accent/50 text-muted-foreground"
                )}
              >
                <span className="truncate">{d.domain}</span>
                <span className="text-xs tabular-nums">{d.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* File list */}
        <ScrollArea className="h-[calc(100vh-280px)] min-h-[300px] rounded-lg border">
          {filesQ.isLoading ? (
            <div className="flex flex-col gap-2 p-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No files found"
              description="Adjust your filters or run guided setup to create files."
            />
          ) : (
            <div className="flex flex-col">
              {filtered.map((f) => (
                <button
                  key={`${f.domain}/${f.name}`}
                  onClick={() =>
                    setSelectedFile({ domain: f.domain, name: f.name })
                  }
                  className={cn(
                    "flex items-start gap-3 border-b px-4 py-3 text-left transition-colors hover:bg-accent/50",
                    selectedFile?.domain === f.domain &&
                      selectedFile?.name === f.name &&
                      "bg-accent"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">
                        {f.title || f.name}
                      </span>
                      <FileStatusBadge status={f.status} />
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-[10px] mr-1">
                        {f.domain}
                      </Badge>
                      {f.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Preview panel */}
        <ScrollArea className="hidden h-[calc(100vh-280px)] min-h-[300px] rounded-lg border lg:block">
          <div className="p-5">
            {!selectedFile ? (
              <EmptyState
                title="Select a file"
                description="Choose a file from the list to preview its content."
              />
            ) : fileDetailQ.isLoading ? (
              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : fileDetailQ.data ? (
              <MarkdownPreview content={fileDetailQ.data.content} />
            ) : (
              <EmptyState title="Error loading file" />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
