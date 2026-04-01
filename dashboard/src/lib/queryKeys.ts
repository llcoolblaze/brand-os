export const queryKeys = {
  health: ["health"],
  progress: ["progress"],
  config: ["config"],
  files: {
    list: ["files"],
    detail: (domain: string, name: string) => ["files", domain, name],
  },
  skills: ["skills"],
  voice: ["voice"],
  learnings: (filters?: Record<string, string>) => ["learnings", filters],
};
