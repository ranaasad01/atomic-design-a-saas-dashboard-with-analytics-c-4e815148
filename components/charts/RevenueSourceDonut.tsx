"use client";

import GlassCard from "@/components/ui/GlassCard";
import { revenueSourceData } from "@/lib/mock-data";
import React from "react";

export default function RevenueSourceDonut() {
  const total = revenueSourceData.reduce((s, d) => s + d.value, 0);

  // Build SVG donut arcs
  const cx = 80;
  const cy = 80;
  const r = 60;
  const innerR = 38;
  const gap = 2; // degrees gap between segments

  let currentAngle = -90;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (startDeg: number, endDeg: number) => {
    const s = { x: cx + r * Math.cos(toRad(startDeg)), y: cy + r * Math.sin(toRad(startDeg)) };
    const e = { x: cx + r * Math.cos(toRad(endDeg)), y: cy + r * Math.sin(toRad(endDeg)) };
    const si = { x: cx + innerR * Math.cos(toRad(startDeg)), y: cy + innerR * Math.sin(toRad(startDeg)) };
    const ei = { x: cx + innerR * Math.cos(toRad(endDeg)), y: cy + innerR * Math.sin(toRad(endDeg)) };
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return [
      `M ${s.x} ${s.y}`,
      `A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`,
      `L ${ei.x} ${ei.y}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${si.x} ${si.y}`,
      "Z",
    ].join(" ");
  };

  const segments = revenueSourceData.map((d) => {
    const sweep = (d.value / total) * 360 - gap;
    const start = currentAngle;
    const end = currentAngle + sweep;
    currentAngle += sweep + gap;
    return { ...d, path: arcPath(start, end) };
  });

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Revenue by Plan</h3>
        <p className="text-sm text-slate-500">MRR breakdown across pricing tiers</p>
      </div>
      <div className="flex items-center gap-4">
        <svg width={160} height={160} viewBox="0 0 160 160" className="flex-shrink-0">
          {segments.map((seg) => (
            <path key={seg.name} d={seg.path} fill={seg.color} />
          ))}
          <text x={cx} y={cy - 4} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight="bold">
            ${(total / 1000).toFixed(0)}K
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fill="#64748b" fontSize={9}>
            Total MRR
          </text>
        </svg>
        <div className="flex-1 space-y-3">
          {revenueSourceData.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-white">
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: ((item.value / total) * 100) + "%",
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-slate-500">Total MRR</p>
            <p className="text-lg font-bold text-white">${(total / 1000).toFixed(0)}K</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
