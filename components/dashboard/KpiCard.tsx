"use client";

import { cn, getChangeColor, getChangeBg } from "@/lib/utils";
import { ArrowUp, ArrowDown } from 'lucide-react';
import GlassCard from "@/components/ui/GlassCard";

interface KpiCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
  inverse?: boolean;
}

export default function KpiCard({
  label,
  value,
  change,
  changeLabel = "vs last month",
  icon,
  iconBg = "bg-indigo-500/20",
  inverse = false,
}: KpiCardProps) {
  const isPositive = inverse ? change < 0 : change >= 0;
  const colorClass = getChangeColor(change, inverse);
  const bgClass = getChangeBg(change, inverse);

  return (
    <GlassCard className="p-5 hover:border-indigo-500/30 transition-all duration-200 hover:bg-white/8">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
          {icon}
        </div>
        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", bgClass, colorClass)}>
          {isPositive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
          {Math.abs(change)}{typeof change === "number" && change % 1 !== 0 ? "" : ""}%
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-xs text-slate-600 mt-1">{changeLabel}</p>
      </div>
    </GlassCard>
  );
}
