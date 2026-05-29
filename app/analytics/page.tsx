import DashboardShell from "@/components/layout/DashboardShell";
import MultiLineTrendChart from "@/components/charts/MultiLineTrendChart";
import PeriodComparisonBar from "@/components/charts/PeriodComparisonBar";
import TrafficSourceDonut from "@/components/charts/TrafficSourceDonut";
import ActiveUsersAreaChart from "@/components/charts/ActiveUsersAreaChart";
import GlassCard from "@/components/ui/GlassCard";
import { kpiData } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { TrendingUp, Users, Star, Activity } from 'lucide-react';

const metrics = [
  {
    label: "Total Revenue YTD",
    value: formatCurrency(kpiData.totalRevenue.value, true),
    change: "+12.4%",
    positive: true,
    icon: TrendingUp,
    color: "text-indigo-400",
    bg: "bg-indigo-500/20",
    description: "vs $793K last year",
  },
  {
    label: "New Signups This Week",
    value: formatNumber(kpiData.newSignups.value),
    change: "+9.4%",
    positive: true,
    icon: Users,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    description: "vs 640 last week",
  },
  {
    label: "Avg Revenue Per User",
    value: "$" + (kpiData.avgRevPerUser as unknown as number).toFixed(2),
    change: "+2.1%",
    positive: true,
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
    description: "vs $2.98 last month",
  },
  {
    label: "Net Promoter Score",
    value: String(kpiData.nps.value),
    change: "+4 pts",
    positive: true,
    icon: Star,
    color: "text-amber-400",
    bg: "bg-amber-500/20",
    description: "vs 64 last quarter",
  },
];

const insights = [
  {
    title: "MRR Growth Accelerating",
    body: "Your MRR grew 8.6% month-over-month in December, the highest growth rate in Q4. Enterprise plan upgrades drove 42% of expansion revenue.",
    tag: "Revenue",
    tagColor: "bg-indigo-500/20 text-indigo-300",
  },
  {
    title: "Churn Rate at All-Time Low",
    body: "Churn dropped to 1.6% in December — below your 2% target for the first time. Improved onboarding flows reduced early-stage churn by 34%.",
    tag: "Retention",
    tagColor: "bg-emerald-500/20 text-emerald-300",
  },
  {
    title: "Organic Search Driving Growth",
    body: "38% of new signups came from organic search this month, up from 29% in Q3. Your SEO investment is compounding with a 31% increase in blog traffic.",
    tag: "Acquisition",
    tagColor: "bg-violet-500/20 text-violet-300",
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell title="Analytics">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Analytics Deep-Dive</h2>
        <p className="text-slate-400 mt-1">
          Comprehensive metrics and trend analysis for your business — Q4 2024
        </p>
      </div>

      {/* Metric summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <GlassCard key={m.label} className="p-5 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={"w-9 h-9 rounded-lg flex items-center justify-center " + m.bg}>
                  <Icon size={16} className={m.color} />
                </div>
                <span className={"text-xs font-semibold px-2 py-0.5 rounded-full " + (m.positive ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400")}>
                  {m.change}
                </span>
              </div>
              <p className="text-xl font-bold text-white">{m.value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{m.label}</p>
              <p className="text-xs text-slate-600 mt-1">{m.description}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Main trend chart */}
      <div className="mb-4">
        <MultiLineTrendChart />
      </div>

      {/* Two charts side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <PeriodComparisonBar />
        <TrafficSourceDonut />
      </div>

      {/* Active users area */}
      <div className="mb-6">
        <ActiveUsersAreaChart />
      </div>

      {/* AI Insights */}
      <GlassCard className="p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-white">AI-Powered Insights</h3>
          <p className="text-sm text-slate-500">Automatically generated from your data trends</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={"text-xs font-medium px-2 py-0.5 rounded-full " + insight.tagColor}>
                  {insight.tag}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">{insight.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{insight.body}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardShell>
  );
}
