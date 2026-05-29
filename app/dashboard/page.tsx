import DashboardShell from "@/components/layout/DashboardShell";
import KpiCard from "@/components/dashboard/KpiCard";
import MrrLineChart from "@/components/charts/MrrLineChart";
import SignupsBarChart from "@/components/charts/SignupsBarChart";
import ActiveUsersAreaChart from "@/components/charts/ActiveUsersAreaChart";
import RevenueSourceDonut from "@/components/charts/RevenueSourceDonut";
import { kpiData, transactionsData } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { DollarSign, Users, TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

const statusColors: Record<string, string> = {
  paid: "bg-emerald-400/15 text-emerald-400",
  failed: "bg-red-400/15 text-red-400",
  refunded: "bg-amber-400/15 text-amber-400",
};

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Good morning, Sarah 👋</h2>
            <p className="text-slate-400 mt-1">
              Here&apos;s what&apos;s happening with PulseAI today — March 15, 2024
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-indigo-300 font-medium">All systems operational</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Monthly Recurring Revenue"
          value={formatCurrency(kpiData.mrr.value, true)}
          change={kpiData.mrr.change}
          icon={<DollarSign size={18} className="text-indigo-400" />}
          iconBg="bg-indigo-500/20"
        />
        <KpiCard
          label="Annual Recurring Revenue"
          value={formatCurrency(kpiData.arr.value, true)}
          change={kpiData.arr.change}
          icon={<TrendingUp size={18} className="text-violet-400" />}
          iconBg="bg-violet-500/20"
        />
        <KpiCard
          label="Monthly Active Users"
          value={formatNumber(kpiData.activeUsers.value, true)}
          change={kpiData.activeUsers.change}
          icon={<Users size={18} className="text-emerald-400" />}
          iconBg="bg-emerald-500/20"
        />
        <KpiCard
          label="Churn Rate"
          value={formatPercent(kpiData.churnRate.value)}
          change={kpiData.churnRate.change}
          icon={<TrendingDown size={18} className="text-red-400" />}
          iconBg="bg-red-500/20"
          inverse={true}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <MrrLineChart />
        </div>
        <div>
          <RevenueSourceDonut />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <SignupsBarChart />
        <ActiveUsersAreaChart />
      </div>

      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Recent Transactions</h3>
            <p className="text-sm text-slate-500">Latest billing activity across all plans</p>
          </div>
          <Link
            href="/revenue"
            className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Transaction</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Customer</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Plan</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Amount</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3 pr-4">Status</th>
                <th className="text-left text-xs font-medium text-slate-500 pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.slice(0, 6).map((txn) => (
                <tr key={txn.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-sm font-mono text-slate-400">{txn.id}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-white">{txn.user}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-slate-400">{txn.plan}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize " + statusColors[txn.status]}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-slate-500">{txn.date}</span>
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
