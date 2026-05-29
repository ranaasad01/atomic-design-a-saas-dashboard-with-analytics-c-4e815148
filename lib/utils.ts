import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number, compact = false): string {
  if (compact && value >= 1000000) {
    return "$" + (value / 1000000).toFixed(1) + "M";
  }
  if (compact && value >= 1000) {
    return "$" + (value / 1000).toFixed(1) + "K";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, compact = false): string {
  if (compact && value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (compact && value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number): string {
  return value.toFixed(1) + "%";
}

export function getChangeColor(change: number, inverse = false): string {
  if (inverse) {
    return change < 0 ? "text-emerald-400" : "text-red-400";
  }
  return change >= 0 ? "text-emerald-400" : "text-red-400";
}

export function getChangeBg(change: number, inverse = false): string {
  if (inverse) {
    return change < 0 ? "bg-emerald-400/10" : "bg-red-400/10";
  }
  return change >= 0 ? "bg-emerald-400/10" : "bg-red-400/10";
}
