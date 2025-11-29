import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getYear(dateString: string): string {
  if (!dateString) return "";
  if (/^\d{4}$/.test(dateString)) return dateString;
  return new Date(dateString).getFullYear().toString();
}

export function getShortMonth(dateString: string): string {
  if (!dateString) return "";
  if (/^\d{4}$/.test(dateString)) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short" });
}

export function formatDateRange(start: string, end?: string | null): string {
  const startMonth = getShortMonth(start);
  const startYear = getYear(start);
  const startStr = startMonth ? `${startMonth} ${startYear}` : startYear;

  if (!end) return `${startStr} - Present`;

  const endMonth = getShortMonth(end);
  const endYear = getYear(end);
  const endStr = endMonth ? `${endMonth} ${endYear}` : endYear;

  return `${startStr} - ${endStr}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
