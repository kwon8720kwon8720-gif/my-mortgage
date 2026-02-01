import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency without using Intl.NumberFormat
 * Returns string in format: $1,234,567.89
 */
export function formatCurrency(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return "$0.00";
  }

  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const cents = Math.round(absValue * 100);
  const dollars = Math.floor(cents / 100);
  const centsRemainder = cents % 100;

  const dollarsStr = dollars.toString();
  let formatted = "";

  for (let i = dollarsStr.length - 1, count = 0; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) {
      formatted = "," + formatted;
    }
    formatted = dollarsStr[i] + formatted;
    count++;
  }

  const centsStr = centsRemainder.toString().padStart(2, "0");
  return (isNegative ? "-$" : "$") + formatted + "." + centsStr;
}

/**
 * Format a number as a percentage
 * Returns string in format: 3.50%
 */
export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) {
    return "0.00%";
  }

  const multiplier = Math.pow(10, decimals);
  const rounded = Math.round(value * multiplier) / multiplier;
  const parts = rounded.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  const paddedDecimal = decimalPart.padEnd(decimals, "0").slice(0, decimals);
  return integerPart + "." + paddedDecimal + "%";
}

/**
 * Format a number with thousand separators
 * Returns string in format: 1,234,567
 */
export function formatNumber(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return "0";
  }

  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const rounded = Math.round(absValue);
  const str = rounded.toString();
  let formatted = "";

  for (let i = str.length - 1, count = 0; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) {
      formatted = "," + formatted;
    }
    formatted = str[i] + formatted;
    count++;
  }

  return (isNegative ? "-" : "") + formatted;
}

/**
 * Parse a string to a number, handling currency and number formats
 */
export function parseNumericString(str: string): number {
  if (!str || str.trim() === "") {
    return 0;
  }

  // Remove currency symbols, commas, and whitespace
  const cleaned = str.replace(/[$,\s]/g, "");
  const parsed = parseFloat(cleaned);

  if (isNaN(parsed) || !isFinite(parsed)) {
    return 0;
  }

  return parsed;
}

/**
 * Format duration string (e.g., "30 years", "15 years")
 */
export function formatDuration(years: number): string {
  if (isNaN(years) || !isFinite(years) || years <= 0) {
    return "0 years";
  }

  const rounded = Math.round(years);
  return rounded === 1 ? "1 year" : `${rounded} years`;
}
