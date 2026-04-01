import { api } from "./client";

export interface FileEntry {
  name: string;
  domain: string;
  status: string;
  title: string;
  updatedAt: string;
}

export interface FileDetail extends FileEntry {
  content: string;
  frontmatter: Record<string, unknown>;
}

export function getFiles() {
  return api.get<FileEntry[]>("/api/files");
}

export function getFile(domain: string, name: string) {
  return api.get<FileDetail>(`/api/files/${domain}/${name}`);
}
