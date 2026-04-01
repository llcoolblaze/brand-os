import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const WEEK = 604800;
const MONTH = 2592000;
const YEAR = 31536000;

export function relativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = Date.now();
  const diff = Math.floor((now - d.getTime()) / 1000);

  if (diff < 10) return "just now";
  if (diff < MINUTE) return `${diff}s ago`;
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h ago`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)} day${Math.floor(diff / DAY) === 1 ? "" : "s"} ago`;
  if (diff < MONTH) return `${Math.floor(diff / WEEK)} week${Math.floor(diff / WEEK) === 1 ? "" : "s"} ago`;
  if (diff < YEAR) return `${Math.floor(diff / MONTH)} month${Math.floor(diff / MONTH) === 1 ? "" : "s"} ago`;
  return `${Math.floor(diff / YEAR)} year${Math.floor(diff / YEAR) === 1 ? "" : "s"} ago`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
