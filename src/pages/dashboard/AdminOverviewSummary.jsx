import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Briefcase, CalendarClock, Timer, ArrowRight } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import { APPLICANT_TREND, SOURCE_BREAKDOWN, INITIAL_POSTINGS } from "../../data/mockDashboardData";

export default function AdminOverviewSummary({ darkMode, roleLabel, role }) {
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const openPostings = INITIAL_POSTINGS.filter((p) => p.status === "Open").length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{roleLabel} Overview</h1>
        <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Here's what's happening with your recruitment pipeline today.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard darkMode={darkMode} icon={Users} tint="bg-blue-600" label="Total Applicants" value="1,284" delta="12.4%" deltaLabel="vs. last month" positive />
        <StatCard darkMode={darkMode} icon={Briefcase} tint="bg-emerald-600" label="Active Job Postings" value={openPostings} delta="+3" deltaLabel="vs. last month" positive />
        <StatCard darkMode={darkMode} icon={CalendarClock} tint="bg-indigo-600" label="Interviews This Week" value="42" delta="6.1%" deltaLabel="vs. last week" positive={false} />
        <StatCard darkMode={darkMode} icon={Timer} tint="bg-amber-500" label="Avg. Time to Hire" value="16 days" delta="2 days" deltaLabel="faster than last month" positive />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        <div className={`lg:col-span-2 rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <h3 className="font-semibold">Applicant Growth</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Monthly applicant volume, last 6 months
          </p>
          <div className="h-64 mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={APPLICANT_TREND}>
                <defs>
                  <linearGradient id="applicantFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="month" stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: darkMode ? "#0f172a" : "#fff", border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`, borderRadius: 10, fontSize: 13 }} />
                <Area type="monotone" dataKey="applicants" stroke="#2563eb" strokeWidth={2.5} fill="url(#applicantFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <h3 className="font-semibold">Applicant Sources</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Where candidates are coming from
          </p>
          <div className="h-48 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SOURCE_BREAKDOWN} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {SOURCE_BREAKDOWN.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: darkMode ? "#0f172a" : "#fff", border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`, borderRadius: 10, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick links to the full pages instead of repeating their tables here */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Link
          to={`/dashboard/${role}/candidates`}
          className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}
        >
          <div>
            <p className="font-semibold">Review candidates</p>
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              8 in your pipeline right now
            </p>
          </div>
          <ArrowRight size={18} className="text-blue-600" />
        </Link>
        <Link
          to={`/dashboard/${role}/jobs`}
          className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}
        >
          <div>
            <p className="font-semibold">Manage job postings</p>
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              {openPostings} open roles
            </p>
          </div>
          <ArrowRight size={18} className="text-blue-600" />
        </Link>
      </div>
    </div>
  );
}
