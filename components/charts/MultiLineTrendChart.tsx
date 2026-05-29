"use client";

import GlassCard from "@/components/ui/GlassCard";
import { multiLineTrendData } from "@/lib/mock-data";
import React from "react";

export default function MultiLineTrendChart() {
  const data = multiLineTrendData;
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const maxUsers = Math.max(...data.map((d) => d.users));
  const maxSignups = Math.max(...data.map((d) => d.signups));
  const maxRight = Math.max(maxUsers, maxSignups);

  const height = 240;
  const width = 600;
  const pad = { top: 10, right: 50, bottom: 30, left: 55 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const pts = (arr: number[], maxVal: number) =>
    arr
      .map(
        (v, i) =>
          `${(i / (arr.length - 1)) * chartW + pad.left},${
            chartH - (v / maxVal) * chartH + pad.top
          }`
      )
      .join(" ");

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: chartH - t * chartH + pad.top,
    left: "$" + ((maxRevenue * t) / 1000).toFixed(0) + "K",
    right: ((maxRight * t) / 1000).toFixed(0) + "K",
  }));

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Key Metrics Trend</h3>
        <p className="text-sm text-slate-500">Revenue, MAU, and signups over 12 months</p>
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-indigo-500 inline-block" />
          <span className="text-xs text-slate-400">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-violet-500 inline-block" />
          <span className="text-xs text-slate-400">MAU</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 inline-block" style={{ background: "repeating-linear-gradient(to right, #10B981 0, #10B981 4px, transparent 4px, transparent 7px)" }} />
          <span className="text-xs text-slate-400">Signups</span>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 300 }}>
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={pad.left} y1={t.y} x2={pad.left + chartW} y2={t.y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <text x={pad.left - 6} y={t.y + 4} textAnchor="end" fill="#64748b" fontSize={11}>{t.left}</text>
              <text x={pad.left + chartW + 6} y={t.y + 4} textAnchor="start" fill="#64748b" fontSize={11}>{t.right}</text>
            </g>
          ))}
          {data.map((d, i) => (
            <text
              key={i}
              x={(i / (data.length - 1)) * chartW + pad.left}
              y={height - 5}
              textAnchor="middle"
              fill="#64748b"
              fontSize={10}
            >
              {d.month}
            </text>
          ))}
          <polyline points={pts(data.map((d) => d.revenue), maxRevenue)} fill="none" stroke="#6366F1" strokeWidth={2.5} />
          <polyline points={pts(data.map((d) => d.users), maxRight)} fill="none" stroke="#8B5CF6" strokeWidth={2} />
          <polyline points={pts(data.map((d) => d.signups), maxRight)} fill="none" stroke="#10B981" strokeWidth={2} strokeDasharray="5 3" />
        </svg>
      </div>
    </GlassCard>
  );
}
