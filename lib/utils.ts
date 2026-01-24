import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatting functions (NO Intl)
export function formatMoney(n: number): string {
  const whole = Math.round(n);
  const sign = whole < 0 ? "-" : "";
  const abs = Math.abs(whole);
  const parts: string[] = [];
  let remaining = abs;
  
  while (remaining > 0) {
    const chunk = remaining % 1000;
    remaining = Math.floor(remaining / 1000);
    if (remaining > 0) {
      parts.unshift(chunk.toString().padStart(3, "0"));
    } else {
      parts.unshift(chunk.toString());
    }
  }
  
  if (parts.length === 0) return "$0";
  return `${sign}$${parts.join(",")}`;
}

export function formatPercent(n: number): string {
  const rounded = Math.round(n * 10000) / 10000;
  const whole = Math.floor(rounded);
  const decimals = Math.round((rounded - whole) * 100);
  
  if (decimals === 0) {
    return `${whole}%`;
  }
  
  const decStr = decimals.toString().padStart(2, "0");
  if (decStr.length > 2) {
    return `${whole}.${decStr.slice(0, 2)}%`;
  }
  return `${whole}.${decStr}%`;
}

export function formatMonthly(n: number): string {
  return formatMoney(n);
}

// Utility functions
export function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function clamp(n: number, min: number, max: number): number {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

export function safeNumber(x: unknown, fallback: number): number {
  if (typeof x === "number" && !isNaN(x) && isFinite(x)) {
    return x;
  }
  if (typeof x === "string") {
    const parsed = parseFloat(x);
    if (!isNaN(parsed) && isFinite(parsed)) {
      return parsed;
    }
  }
  return fallback;
}

// Parse formatted number (for input handling)
export function parseFormattedNumber(value: string): number {
  const cleaned = value.replace(/,/g, "").replace(/\$/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
