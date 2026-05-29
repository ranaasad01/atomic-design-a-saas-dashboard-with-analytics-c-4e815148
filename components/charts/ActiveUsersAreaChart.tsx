"use client";

import GlassCard from "@/components/ui/GlassCard";
import { activeUsersData } from "@/lib/mock-data";
import React from "react";

export default function ActiveUsersAreaChart() {
  const maxMau = Math.max(...activeUsersData.map((d) => d.mau));
  const maxDau = Math.max(...activeUsersData.map((d) => d.dau));
  const height = 200;
  const width = 600;
  const pad = { top: 10, right: 10, bottom: 30, left: 45 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  const mauPoints = activeUsersData.map((d, i) => ({
    x: (i / (activeUsersData.length - 1)) * chartW + pad.left,
    y: chartH - (d.mau / maxMau) * chartH + pad.top,
    val: d.mau,
    label: d.date,
  }));

  const dauPoints = activeUsersData.map((d, i) => ({
    x: (i / (activeUsersData.length - 1)) * chartW + pad.left,
    y: chartH - (d.dau / maxDau) * chartH + pad.top,
    val: d.dau,
    label: d.date,
  }));

  const toPolyline = (pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(" ");

  const toArea = (pts: { x: number; y: number }[]) => {
    const base = chartH + pad.top;
    return (
      `M${pts[0].x},${base} ` +
      pts.map((p) => `L${p.x},${p.y}`).join(" ") +
      ` L${pts[pts.length - 1].x},${base} Z`
    );
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: chartH - t * chartH + pad.top,
    label: ((maxMau * t) / 1000).toFixed(0) + "K",
  }));

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Active Users Trend</h3>
        <p className="text-sm text-slate-500">DAU and MAU over the year</p>
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-violet-500 inline-block" />
          <span className="text-xs text-slate-400">MAU</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-indigo-500 inline-block" />
          <span className="text-xs text-slate-400">DAU</span>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ minWidth: 300 }}
        >
          <defs>
            <linearGradient id="mauAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="dauAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line
                x1={pad.left}
                y1={t.y}
                x2={pad.left + chartW}
                y2={t.y}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
              />
              <text x={pad.left - 6} y={t.y + 4} textAnchor="end" fill="#64748b" fontSize={11}>
                {t.label}
              </text>
            </g>
          ))}
          {/* X labels */}
          {activeUsersData.map((d, i) => (
            <text
              key={i}
              x={(i / (activeUsersData.length - 1)) * chartW + pad.left}
              y={height - 5}
              textAnchor="middle"
              fill="#64748b"
              fontSize={10}
            >
              {d.date}
            </text>
          ))}
          {/* MAU area */}
          <path d={toArea(mauPoints)} fill="url(#mauAreaGrad)" />
          {/* DAU area */}
          <path d={toArea(dauPoints)} fill="url(#dauAreaGrad)" />
          {/* MAU line */}
          <polyline
            points={toPolyline(mauPoints)}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={2}
          />
          {/* DAU line */}
          <polyline
            points={toPolyline(dauPoints)}
            fill="none"
            stroke="#6366F1"
            strokeWidth={2}
          />
        </svg>
      </div>
    </GlassCard>
  );
}
