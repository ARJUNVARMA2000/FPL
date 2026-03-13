import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(rawPrice: number): string {
  return `£${(rawPrice / 10).toFixed(1)}m`
}

export function formatStat(value: number | string | null | undefined, decimals = 1): string {
  if (value === null || value === undefined) return "-"
  const num = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(num)) return "-"
  return Number.isInteger(num) ? num.toString() : num.toFixed(decimals)
}

export function formatPercent(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value
  return `${num.toFixed(1)}%`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}
