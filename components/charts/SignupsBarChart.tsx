"use client";

import { signupsData } from "@/lib/mock-data";
import GlassCard from "@/components/ui/GlassCard";
import React from "react";

export default function SignupsBarChart() {
  const maxVal = Math.max(...signupsData.flatMap((d) => [d.signups, d.activated]));
  const height = 200;
  const width = 600;
  const pad = { top: 10, right: 10, bottom: 40, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const groupW = chartW / signupsData.length;
  const barW = (groupW * 0.35);

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: chartH - t * chartH + pad.top,
    label: Math.round(maxVal * t).toString(),
  }));

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">User Signups</h3>
        <p className="text-sm text-slate-500">Weekly signups vs activated users</p>
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />
          <span className="text-xs text-slate-400">Signups</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" />
          <span className="text-xs text-slate-400">Activated</span>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 300 }}>
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={pad.left} y1={t.y} x2={pad.left + chartW} y2={t.y} stroke="rgba(255,255,255,0.05)" />
              <text x={pad.left - 4} y={t.y + 4} textAnchor="end" fill="#64748b" fontSize={10}>{t.label}</text>
            </g>
          ))}
          {signupsData.map((d, i) => {
            const gx = pad.left + i * groupW;
            const signupH = (d.signups / maxVal) * chartH;
            const activatedH = (d.activated / maxVal) * chartH;
            return (
              <g key={i}>
                <rect
                  x={gx + groupW * 0.1}
                  y={pad.top + chartH - signupH}
                  width={barW}
                  height={signupH}
                  fill="#6366F1"
                  rx={2}
                />
                <rect
                  x={gx + groupW * 0.1 + barW + 2}
                  y={pad.top + chartH - activatedH}
                  width={barW}
                  height={activatedH}
                  fill="#8B5CF6"
                  rx={2}
                />
                <text
                  x={gx + groupW / 2}
                  y={height - 5}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={9}
                >
                  {d.week}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </GlassCard>
  );
}
