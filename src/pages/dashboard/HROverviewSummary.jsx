import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  CalendarClock,
  Timer,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/dashboard/StatCard";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HROverviewSummary({ darkMode }) {
    console.log("HR OVERVIEW COMPONENT LOADED");
  const [overview, setOverview] = useState(null);

  const cardBg = darkMode
    ? "bg-slate-900 border-slate-800"
    : "bg-white border-slate-200";

  useEffect(() => {
    const fetchHROverview = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/hr/overview`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
console.log("HR OVERVIEW RESPONSE:", response.data);
        setOverview(response.data);
      } catch (error) {
        console.error("Failed to fetch HR overview:", error);
      }
    };

    fetchHROverview();
  }, []);

  const statistics = overview?.statistics || {};

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* HEADER */}
      <div>
        <p
          className={`text-sm font-medium mb-1 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          HR Portal
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold">
          HR Overview
        </h1>

        <p
          className={`mt-1 text-sm ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Manage your recruitment pipeline and track your hiring activity.
        </p>
      </div>

      {/* HR STATISTICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

        <StatCard
          darkMode={darkMode}
          icon={Users}
          tint="bg-blue-600"
          label="Total Applicants"
          value={statistics.totalApplicants ?? 0}
          delta=""
          deltaLabel=""
          positive
        />

        <StatCard
          darkMode={darkMode}
          icon={Briefcase}
          tint="bg-emerald-600"
          label="My Job Postings"
          value={statistics.activeJobPostings ?? 0}
          delta=""
          deltaLabel=""
          positive
        />

        <StatCard
          darkMode={darkMode}
          icon={CalendarClock}
          tint="bg-indigo-600"
          label="Interviews"
          value={statistics.interviewsThisWeek ?? 0}
          delta=""
          deltaLabel=""
          positive
        />

        <StatCard
          darkMode={darkMode}
          icon={Timer}
          tint="bg-amber-500"
          label="Avg. Time to Hire"
          value={`${statistics.averageHireDays ?? 0} days`}
          delta=""
          deltaLabel=""
          positive
        />

      </div>
{/* HR ANALYTICS */}
<div className="grid lg:grid-cols-2 gap-5 sm:gap-6">

  {/* Applications Trend */}
  <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
    <div className="mb-4">
      <h3 className="font-semibold">
        Applications Trend
      </h3>

      <p
        className={`text-xs mt-1 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        Applications received for your jobs
      </p>
    </div>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={overview?.monthlyApplications || []}
        >
          <defs>
            <linearGradient
              id="hrApplicationsFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.3}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={
              darkMode
                ? "#1e293b"
                : "#e2e8f0"
            }
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke={
              darkMode
                ? "#64748b"
                : "#94a3b8"
            }
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke={
              darkMode
                ? "#64748b"
                : "#94a3b8"
            }
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background: darkMode
                ? "#0f172a"
                : "#fff",
              border: `1px solid ${
                darkMode
                  ? "#1e293b"
                  : "#e2e8f0"
              }`,
              borderRadius: 10,
              fontSize: 13,
            }}
          />

          <Area
            type="monotone"
            dataKey="applications"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#hrApplicationsFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>


  {/* Applications Per Job */}
  <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
    <div className="mb-4">
      <h3 className="font-semibold">
        Applications by Job
      </h3>

      <p
        className={`text-xs mt-1 ${
          darkMode
            ? "text-slate-500"
            : "text-slate-400"
        }`}
      >
        Applicant volume across your job postings
      </p>
    </div>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={overview?.applicationsPerJob || []}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={
              darkMode
                ? "#1e293b"
                : "#e2e8f0"
            }
            vertical={false}
          />

          <XAxis
            dataKey="title"
            stroke={
              darkMode
                ? "#64748b"
                : "#94a3b8"
            }
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke={
              darkMode
                ? "#64748b"
                : "#94a3b8"
            }
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background: darkMode
                ? "#0f172a"
                : "#fff",
              border: `1px solid ${
                darkMode
                  ? "#1e293b"
                  : "#e2e8f0"
              }`,
              borderRadius: 10,
              fontSize: 13,
            }}
          />

          <Bar
            dataKey="applicants"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

</div> 
{/* Application Status */}
<div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
  <div className="flex items-center justify-between mb-5">
    <div>
      <h3 className="font-semibold text-lg">
        Application Status
      </h3>

      <p
        className={`text-xs mt-1 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        Current status of applications for your jobs
      </p>
    </div>

    <div
      className={`text-xs px-3 py-1.5 rounded-full ${
        darkMode
          ? "bg-slate-800 text-slate-300"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {overview?.statistics?.totalApplications ?? 0} Total
    </div>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

    {/* Applied */}
    <div
      className={`rounded-xl p-4 ${
        darkMode ? "bg-blue-500/10" : "bg-blue-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />

        <span className="text-xs font-medium text-blue-600">
          Applied
        </span>
      </div>

      <p className="text-2xl font-bold mt-3">
        {Number(
          overview?.applicationStatus?.find(
            (item) =>
              item.status?.toLowerCase() === "applied"
          )?.count ?? 0
        )}
      </p>

      <p
        className={`text-xs mt-1 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        applications
      </p>
    </div>


    {/* Under Review*/}
    <div
      className={`rounded-xl p-4 ${
        darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />

        <span className="text-xs font-medium text-emerald-600">
          Under Review
        </span>
      </div>

      <p className="text-2xl font-bold mt-3">
        {Number(
          overview?.applicationStatus?.find(
            (item) =>
              item.status?.toLowerCase() === "under review"
          )?.count ?? 0
        )}
      </p>

      <p
        className={`text-xs mt-1 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        applications
      </p>
    </div>

    {/* Shortlisted*/}
    <div
      className={`rounded-xl p-4 ${
        darkMode ? "bg-indigo-500/10" : "bg-indigo-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />

        <span className="text-xs font-medium text-indigo-600">
  Shortlisted
</span>
      </div>

      <p className="text-2xl font-bold mt-3">
        {Number(
          overview?.applicationStatus?.find(
            (item) =>
              item.status?.toLowerCase() === "shortlisted"
          )?.count ?? 0
        )}
      </p>

      <p
        className={`text-xs mt-1 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        applications
      </p>
    </div>

    {/* Rejected */}
    <div
      className={`rounded-xl p-4 ${
        darkMode ? "bg-red-500/10" : "bg-red-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />

        <span className="text-xs font-medium text-red-600">
          Rejected
        </span>
      </div>

      <p className="text-2xl font-bold mt-3">
        {Number(
          overview?.applicationStatus?.find(
            (item) =>
              item.status?.toLowerCase() === "rejected"
          )?.count ?? 0
        )}
      </p>

      <p
        className={`text-xs mt-1 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        applications
      </p>
    </div>

  </div>
</div>
  {/* QUICK LINKS */}
      <div className="grid sm:grid-cols-2 gap-5">

        <Link
          to="/dashboard/hr/candidates"
          className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}
        >
          <div>
            <p className="font-semibold">
              Review candidates
            </p>

            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Review candidates in your hiring pipeline
            </p>
          </div>

          <ArrowRight
            size={18}
            className="text-blue-600"
          />
        </Link>

        <Link
          to="/dashboard/hr/jobs"
          className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}
        >
          <div>
            <p className="font-semibold">
              Manage job postings
            </p>

            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {statistics.activeJobPostings ?? 0} active job postings
            </p>
          </div>

          <ArrowRight
            size={18}
            className="text-blue-600"
          />
        </Link>

      </div>
    </div>
  );
}