"use client";

import GlassCard from "@/components/ui/GlassCard";
import { periodComparisonData } from "@/lib/mock-data";
import React from "react";

export default function PeriodComparisonBar() {
  const data = periodComparisonData;
  const maxVal = Math.max(...data.flatMap((d) => [d.current, d.previous]));

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-white">Period Comparison</h3>
        <p className="text-sm text-slate-500">Current month vs previous month</p>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />
          <span className="text-xs text-slate-400">Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-slate-600 inline-block" />
          <span className="text-xs text-slate-400">Previous</span>
        </div>
      </div>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.metric}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400 w-20 flex-shrink-0">{d.metric}</span>
              <span className="text-xs text-slate-500 ml-2">{d.current.toLocaleString()}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-white/5 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-sm"
                    style={{ width: (d.current / maxVal) * 100 + "%" }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-white/5 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-slate-600 rounded-sm"
                    style={{ width: (d.previous / maxVal) * 100 + "%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
