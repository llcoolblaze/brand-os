import { api } from "./client";

export interface VoiceDimension {
  name: string;
  leftLabel: string;
  rightLabel: string;
  value: number | null;
}

export interface VoiceData {
  status: string;
  dimensions: VoiceDimension[];
  vocabulary: {
    use: string[];
    avoid: string[];
  };
}

export function getVoice() {
  return api.get<VoiceData>("/api/voice");
}
