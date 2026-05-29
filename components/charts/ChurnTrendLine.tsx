"use client";

import { churnData } from "@/lib/mock-data";
import GlassCard from "@/components/ui/GlassCard";
import React from "react";

export default function ChurnTrendLine() {
  const height = 200;
  const width = 600;
  const pad = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const maxY = 5;

  const toY = (v: number) => chartH - (v / maxY) * chartH + pad.top;
  const toX = (i: number) => (i / (churnData.length - 1)) * chartW + pad.left;

  const churnPts = churnData.map((d, i) => `${toX(i)},${toY(d.churnRate)}`).join(" ");
  const targetY = toY(2);

  const yTicks = [0, 1, 2, 3, 4, 5].map((v) => ({ y: toY(v), label: v + "%" }));

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Churn Rate Trend</h3>
        <p className="text-sm text-slate-500">Monthly churn rate — target below 2%</p>
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-red-400 inline-block" />
          <span className="text-xs text-slate-400">Churn Rate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 inline-block" style={{ background: "repeating-linear-gradient(to right, #F59E0B 0, #F59E0B 4px, transparent 4px, transparent 7px)" }} />
          <span className="text-xs text-slate-400">Target 2%</span>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 300 }}>
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={pad.left} y1={t.y} x2={pad.left + chartW} y2={t.y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <text x={pad.left - 4} y={t.y + 4} textAnchor="end" fill="#64748b" fontSize={11}>{t.label}</text>
            </g>
          ))}
          <line x1={pad.left} y1={targetY} x2={pad.left + chartW} y2={targetY} stroke="#F59E0B" strokeDasharray="4 4" strokeWidth={1.5} />
          <text x={pad.left + chartW - 2} y={targetY - 4} textAnchor="end" fill="#F59E0B" fontSize={10}>Target 2%</text>
          {churnData.map((d, i) => (
            <text
              key={i}
              x={toX(i)}
              y={height - 5}
              textAnchor="middle"
              fill="#64748b"
              fontSize={10}
            >
              {d.month}
            </text>
          ))}
          <polyline points={churnPts} fill="none" stroke="#EF4444" strokeWidth={2.5} />
          {churnData.map((d, i) => (
            <circle key={i} cx={toX(i)} cy={toY(d.churnRate)} r={3} fill="#EF4444" />
          ))}
        </svg>
      </div>
    </GlassCard>
  );
}
