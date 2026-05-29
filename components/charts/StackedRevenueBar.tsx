"use client";

import { mrrData } from "@/lib/mock-data";
import GlassCard from "@/components/ui/GlassCard";
import React from "react";

export default function StackedRevenueBar() {
  const maxStack = Math.max(...mrrData.map((d) => d.newMrr + d.expansion));
  const height = 220;
  const width = 600;
  const pad = { top: 10, right: 10, bottom: 30, left: 50 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const barW = (chartW / mrrData.length) * 0.6;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: chartH - t * chartH + pad.top,
    label: "$" + ((maxStack * t) / 1000).toFixed(0) + "K",
  }));

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Revenue Breakdown</h3>
        <p className="text-sm text-slate-500">New and expansion MRR by month</p>
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />
          <span className="text-xs text-slate-400">New MRR</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" />
          <span className="text-xs text-slate-400">Expansion</span>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 300 }}>
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={pad.left} y1={t.y} x2={pad.left + chartW} y2={t.y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <text x={pad.left - 6} y={t.y + 4} textAnchor="end" fill="#64748b" fontSize={11}>{t.label}</text>
            </g>
          ))}
          {mrrData.map((d, i) => {
            const gx = pad.left + i * (chartW / mrrData.length) + (chartW / mrrData.length - barW) / 2;
            const newH = (d.newMrr / maxStack) * chartH;
            const expH = (d.expansion / maxStack) * chartH;
            const totalH = newH + expH;
            return (
              <g key={i}>
                <rect x={gx} y={pad.top + chartH - totalH} width={barW} height={expH} fill="#8B5CF6" rx={2} />
                <rect x={gx} y={pad.top + chartH - newH} width={barW} height={newH} fill="#6366F1" />
                <text
                  x={gx + barW / 2}
                  y={height - 5}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={10}
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </GlassCard>
  );
}
