import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getConfig, updateConfig } from "@/api/config";
import { getVoice } from "@/api/voice";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { VoiceRadarChart } from "@/components/VoiceRadarChart";
import { EmptyState } from "@/components/EmptyState";
import { Save } from "lucide-react";

const CHANNEL_OPTIONS = ["email", "linkedin", "twitter", "blog", "slack"];
const CONTENT_LENGTH_OPTIONS = ["short", "medium", "long"];
const VOICE_STRICTNESS_OPTIONS = ["relaxed", "moderate", "strict"];

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure Brand OS and manage your brand voice
        </p>
      </div>

      <Tabs defaultValue="config">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="voice">Brand Voice</TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <ConfigurationTab />
        </TabsContent>
        <TabsContent value="voice">
          <VoiceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ConfigurationTab() {
  const queryClient = useQueryClient();
  const configQ = useQuery({
    queryKey: queryKeys.config,
    queryFn: getConfig,
  });

  const mutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: unknown }) =>
      updateConfig(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.config });
    },
  });

  const [localValues, setLocalValues] = useState<Record<string, unknown>>({});

  const config = configQ.data;

  function getVal(key: string) {
    return key in localValues ? localValues[key] : config?.[key];
  }

  function setLocal(key: string, value: unknown) {
    setLocalValues((prev) => ({ ...prev, [key]: value }));
  }

  function saveField(key: string) {
    const value = getVal(key);
    mutation.mutate({ key, value });
  }

  if (configQ.isLoading) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 mt-4 max-w-2xl">
      {/* Company name */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company_name">Company Name</Label>
            <div className="flex gap-2">
              <Input
                id="company_name"
                value={(getVal("company_name") as string) ?? ""}
                onChange={(e) => setLocal("company_name", e.target.value)}
              />
              <Button size="sm" onClick={() => saveField("company_name")}>
                <Save className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="default_persona">Default Persona</Label>
            <div className="flex gap-2">
              <Input
                id="default_persona"
                value={(getVal("default_persona") as string) ?? ""}
                onChange={(e) => setLocal("default_persona", e.target.value)}
              />
              <Button size="sm" onClick={() => saveField("default_persona")}>
                <Save className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Channels</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Active Channels</Label>
            <div className="flex flex-wrap gap-2">
              {CHANNEL_OPTIONS.map((ch) => {
                const channels = (getVal("active_channels") as string[]) ?? [];
                const active = channels.includes(ch);
                return (
                  <button
                    key={ch}
                    onClick={() => {
                      const next = active
                        ? channels.filter((c) => c !== ch)
                        : [...channels, ch];
                      setLocal("active_channels", next);
                    }}
                    className="capitalize"
                  >
                    <Badge variant={active ? "default" : "outline"}>{ch}</Badge>
                  </button>
                );
              })}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-fit mt-1"
              onClick={() => saveField("active_channels")}
            >
              <Save className="size-4" />
              Save Channels
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content prefs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content Preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="content_length">Content Length</Label>
            <div className="flex gap-2">
              <select
                id="content_length"
                value={(getVal("content_length") as string) ?? "medium"}
                onChange={(e) => {
                  setLocal("content_length", e.target.value);
                  mutation.mutate({ key: "content_length", value: e.target.value });
                }}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {CONTENT_LENGTH_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o.charAt(0).toUpperCase() + o.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="voice_strictness">Voice Strictness</Label>
            <div className="flex gap-2">
              <select
                id="voice_strictness"
                value={(getVal("voice_strictness") as string) ?? "moderate"}
                onChange={(e) => {
                  setLocal("voice_strictness", e.target.value);
                  mutation.mutate({
                    key: "voice_strictness",
                    value: e.target.value,
                  });
                }}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {VOICE_STRICTNESS_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o.charAt(0).toUpperCase() + o.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="auto_learnings"
              checked={(getVal("auto_learnings") as boolean) ?? false}
              onChange={(e) => {
                setLocal("auto_learnings", e.target.checked);
                mutation.mutate({
                  key: "auto_learnings",
                  value: e.target.checked,
                });
              }}
              className="size-4 rounded border-input"
            />
            <Label htmlFor="auto_learnings">
              Auto-capture learnings from conversations
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VoiceTab() {
  const voiceQ = useQuery({
    queryKey: queryKeys.voice,
    queryFn: getVoice,
  });

  if (voiceQ.isLoading) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        <Skeleton className="h-64 w-full max-w-md mx-auto" />
      </div>
    );
  }

  const voice = voiceQ.data;

  if (!voice || voice.status === "template") {
    return (
      <div className="mt-4">
        <EmptyState
          title="Brand voice not configured"
          description="Run the guided setup to define your brand voice dimensions and vocabulary."
          action={{ label: "Go to Setup", to: "/settings" }}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6 mt-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Voice Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <VoiceRadarChart dimensions={voice.dimensions} />
        </CardContent>
      </Card>

      {voice.vocabulary && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-emerald-600 dark:text-emerald-400">
                Words to Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              {voice.vocabulary.use.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {voice.vocabulary.use.map((w, i) => (
                    <Badge key={i} variant="secondary">
                      {w}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No preferred words defined yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-red-600 dark:text-red-400">
                Words to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              {voice.vocabulary.avoid.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {voice.vocabulary.avoid.map((w, i) => (
                    <Badge key={i} variant="destructive">
                      {w}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No words to avoid defined yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
