"use client";

import GlassCard from "@/components/ui/GlassCard";
import { mrrData } from "@/lib/mock-data";
import React from "react";

export default function MrrLineChart() {
  const maxMrr = Math.max(...mrrData.map((d) => d.mrr));
  const maxNew = Math.max(...mrrData.map((d) => d.newMrr));
  const maxVal = Math.max(maxMrr, maxNew);
  const height = 200;
  const width = 600;
  const pad = { top: 10, right: 10, bottom: 30, left: 50 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const mrrPoints = mrrData.map((d, i) => ({
    x: (i / (mrrData.length - 1)) * chartW + pad.left,
    y: chartH - (d.mrr / maxVal) * chartH + pad.top,
  }));

  const newMrrPoints = mrrData.map((d, i) => ({
    x: (i / (mrrData.length - 1)) * chartW + pad.left,
    y: chartH - (d.newMrr / maxVal) * chartH + pad.top,
  }));

  const toPolyline = (pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(" ");

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: chartH - t * chartH + pad.top,
    label: "$" + ((maxVal * t) / 1000).toFixed(0) + "K",
  }));

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">MRR Growth</h3>
        <p className="text-sm text-slate-500">Monthly recurring revenue over time</p>
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-indigo-500 inline-block" />
          <span className="text-xs text-slate-400">MRR</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 inline-block" style={{ background: "repeating-linear-gradient(to right, #10B981 0, #10B981 4px, transparent 4px, transparent 7px)" }} />
          <span className="text-xs text-slate-400">New MRR</span>
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
          {mrrData.map((d, i) => (
            <text
              key={i}
              x={(i / (mrrData.length - 1)) * chartW + pad.left}
              y={height - 5}
              textAnchor="middle"
              fill="#64748b"
              fontSize={10}
            >
              {d.month}
            </text>
          ))}
          <polyline points={toPolyline(mrrPoints)} fill="none" stroke="#6366F1" strokeWidth={2.5} />
          <polyline points={toPolyline(newMrrPoints)} fill="none" stroke="#10B981" strokeWidth={2} strokeDasharray="5 3" />
        </svg>
      </div>
    </GlassCard>
  );
}
