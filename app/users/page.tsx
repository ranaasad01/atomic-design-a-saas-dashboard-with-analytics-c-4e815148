"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import GlassCard from "@/components/ui/GlassCard";
import { usersData } from "@/lib/mock-data";
import { Search, Users, UserCheck, UserX, Clock, ArrowUpDown } from 'lucide-react';

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-400/15 text-emerald-400" },
  churned: { label: "Churned", className: "bg-red-400/15 text-red-400" },
  trial: { label: "Trial", className: "bg-amber-400/15 text-amber-400" },
};

const planConfig: Record<string, string> = {
  Enterprise: "bg-indigo-500/20 text-indigo-300",
  Pro: "bg-violet-500/20 text-violet-300",
  Starter: "bg-slate-500/20 text-slate-300",
};

const statCards = [
  { label: "Total Users", value: "12,847", change: "+9.4%", icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/20" },
  { label: "Active Users", value: "10,203", change: "+11.2%", icon: UserCheck, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { label: "Churned Users", value: "1,204", change: "-3.1%", icon: UserX, color: "text-red-400", bg: "bg-red-500/20" },
  { label: "Trial Users", value: "1,440", change: "+18.7%", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/20" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("joined");

  const filtered = usersData
    .filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "all" || u.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === "revenue") return b.revenue - a.revenue;
      if (sortField === "name") return a.name.localeCompare(b.name);
      return b.joined.localeCompare(a.joined);
    });

  return (
    <DashboardShell title="Users">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <p className="text-slate-400 mt-1">
          Track user activity, plan distribution, and engagement metrics
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          const isPositive = card.change.startsWith("+");
          return (
            <GlassCard key={card.label} className="p-5 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={"w-9 h-9 rounded-lg flex items-center justify-center " + card.bg}>
                  <Icon size={16} className={card.color} />
                </div>
                <span className={"text-xs font-semibold px-2 py-0.5 rounded-full " + (isPositive ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400")}>
                  {card.change}
                </span>
              </div>
              <p className="text-xl font-bold text-white">{card.value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{card.label}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Plan distribution */}
      <GlassCard className="p-5 mb-6">
        <h3 className="text-base font-semibold text-white mb-4">Plan Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { plan: "Starter", count: 4820, pct: 37.5, color: "#64748b" },
            { plan: "Pro", count: 6210, pct: 48.3, color: "#8B5CF6" },
            { plan: "Enterprise", count: 1817, pct: 14.1, color: "#6366F1" },
          ].map((p) => (
            <div key={p.plan} className="text-center">
              <div className="text-2xl font-bold text-white">{p.count.toLocaleString()}</div>
              <div className="text-sm text-slate-400 mb-2">{p.plan}</div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: p.pct + "%", backgroundColor: p.color }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{p.pct}%</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Users table */}
      <GlassCard className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">All Users</h3>
            <p className="text-sm text-slate-500">{filtered.length} users found</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex-1 sm:w-56">
              <Search size={14} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#1E1E2E]">All Status</option>
              <option value="active" className="bg-[#1E1E2E]">Active</option>
              <option value="trial" className="bg-[#1E1E2E]">Trial</option>
              <option value="churned" className="bg-[#1E1E2E]">Churned</option>
            </select>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none cursor-pointer"
            >
              <option value="joined" className="bg-[#1E1E2E]">Sort: Joined</option>
              <option value="revenue" className="bg-[#1E1E2E]">Sort: Revenue</option>
              <option value="name" className="bg-[#1E1E2E]">Sort: Name</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">User</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Plan</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Status</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">
                  <button
                    onClick={() => setSortField("revenue")}
                    className="flex items-center gap-1 hover:text-slate-300 transition-colors"
                  >
                    Revenue <ArrowUpDown size={11} />
                  </button>
                </th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Last Seen</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3">
                  <button
                    onClick={() => setSortField("joined")}
                    className="flex items-center gap-1 hover:text-slate-300 transition-colors"
                  >
                    Joined <ArrowUpDown size={11} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " + planConfig[user.plan]}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " + statusConfig[user.status].className}>
                      {statusConfig[user.status].label}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm font-semibold text-white">
                      {user.revenue > 0 ? "$" + user.revenue + "/mo" : "—"}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-slate-400">{user.lastSeen}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-slate-500">{user.joined}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </DashboardShell>
  );
}
