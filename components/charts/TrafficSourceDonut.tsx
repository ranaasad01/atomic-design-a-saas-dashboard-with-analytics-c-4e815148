"use client";

import { trafficSourceData } from "@/lib/mock-data";
import GlassCard from "@/components/ui/GlassCard";
import React from "react";

export default function TrafficSourceDonut() {
  const total = trafficSourceData.reduce((s, d) => s + d.value, 0);

  const cx = 75;
  const cy = 75;
  const r = 55;
  const innerR = 33;
  const gap = 2;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  let currentAngle = -90;

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

  const segments = trafficSourceData.map((d) => {
    const sweep = (d.value / total) * 360 - gap;
    const start = currentAngle;
    const end = currentAngle + sweep;
    currentAngle += sweep + gap;
    return { ...d, path: arcPath(start, end) };
  });

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Traffic Sources</h3>
        <p className="text-sm text-slate-500">Where your visitors come from</p>
      </div>
      <div className="flex items-center gap-4">
        <svg width={150} height={150} viewBox="0 0 150 150" className="flex-shrink-0">
          {segments.map((seg) => (
            <path key={seg.name} d={seg.path} fill={seg.color} />
          ))}
        </svg>
        <div className="flex-1 space-y-2">
          {trafficSourceData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-400">{item.name}</span>
              </div>
              <span className="text-xs font-semibold text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
