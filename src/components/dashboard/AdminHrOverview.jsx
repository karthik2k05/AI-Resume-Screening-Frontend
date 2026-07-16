import { useState } from "react";
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
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  Briefcase,
  CalendarClock,
  Timer,
  Plus,
  Download,
  X,
  Check,
} from "lucide-react";
import StatCard from "./StatCard";

const APPLICANT_TREND = [
  { month: "Feb", applicants: 145 },
  { month: "Mar", applicants: 210 },
  { month: "Apr", applicants: 189 },
  { month: "May", applicants: 264 },
  { month: "Jun", applicants: 298 },
  { month: "Jul", applicants: 342 },
];

const SOURCE_BREAKDOWN = [
  { name: "LinkedIn", value: 38, color: "#2563eb" },
  { name: "Job Boards", value: 26, color: "#0ea5e9" },
  { name: "Referrals", value: 22, color: "#22c55e" },
  { name: "Company Site", value: 14, color: "#f59e0b" },
];

const HIRING_FUNNEL = [
  { stage: "Applied", count: 1284 },
  { stage: "Screened", count: 612 },
  { stage: "Interviewed", count: 268 },
  { stage: "Offered", count: 74 },
  { stage: "Hired", count: 51 },
];

const STAGES = ["Screening", "Interview Scheduled", "Offer Sent", "Hired"];

const INITIAL_CANDIDATES = [
  { id: 1, name: "Ananya Rao", role: "Senior Frontend Developer", applied: "2 days ago", score: 94, status: "Interview Scheduled" },
  { id: 2, name: "Kevin Chao", role: "Backend Engineer (Node.js)", applied: "3 days ago", score: 88, status: "Screening" },
  { id: 3, name: "Priya Nathan", role: "UX Designer", applied: "5 days ago", score: 76, status: "Screening" },
  { id: 4, name: "Marcus Webb", role: "DevOps Engineer", applied: "1 week ago", score: 91, status: "Offer Sent" },
  { id: 5, name: "Sara Malik", role: "Data Analyst", applied: "1 week ago", score: 68, status: "Rejected" },
  { id: 6, name: "Daniel Osei", role: "Product Manager", applied: "4 days ago", score: 83, status: "Interview Scheduled" },
  { id: 7, name: "Linh Tran", role: "QA Engineer", applied: "6 days ago", score: 79, status: "Screening" },
  { id: 8, name: "Ahmed Farouk", role: "Full Stack Developer", applied: "2 weeks ago", score: 96, status: "Hired" },
];

const INITIAL_POSTINGS = [
  { id: 1, title: "Senior Frontend Developer", dept: "Engineering", applicants: 142, status: "Open" },
  { id: 2, title: "Backend Engineer (Node.js)", dept: "Engineering", applicants: 98, status: "Open" },
  { id: 3, title: "UX Designer", dept: "Design", applicants: 61, status: "Open" },
  { id: 4, title: "DevOps Engineer", dept: "Infrastructure", applicants: 47, status: "Closed" },
  { id: 5, title: "Product Manager", dept: "Product", applicants: 73, status: "Open" },
];

const STATUS_STYLES = {
  Screening: "bg-amber-100 text-amber-700",
  "Interview Scheduled": "bg-blue-100 text-blue-700",
  "Offer Sent": "bg-indigo-100 text-indigo-700",
  Hired: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function AdminHrOverview({ darkMode, roleLabel }) {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [postings, setPostings] = useState(INITIAL_POSTINGS);
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("");

  const advanceCandidate = (id) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = STAGES.indexOf(c.status);
        const next = idx === -1 || idx === STAGES.length - 1 ? c.status : STAGES[idx + 1];
        return { ...c, status: next };
      })
    );
  };

  const rejectCandidate = (id) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, status: "Rejected" } : c)));
  };

  const addJobPosting = () => {
    if (!newJobTitle.trim() || !newJobDept.trim()) return;
    setPostings((prev) => [
      { id: Date.now(), title: newJobTitle.trim(), dept: newJobDept.trim(), applicants: 0, status: "Open" },
      ...prev,
    ]);
    setNewJobTitle("");
    setNewJobDept("");
    setShowNewJob(false);
  };

  const toggleJobStatus = (id) => {
    setPostings((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === "Open" ? "Closed" : "Open" } : p))
    );
  };

  const exportReport = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Applicants", "1,284"],
      ["Active Job Postings", String(postings.filter((p) => p.status === "Open").length)],
      ["Interviews This Week", "42"],
      ["Avg. Time to Hire", "16 days"],
      [],
      ["Candidate", "Role", "AI Match Score", "Status"],
      ...candidates.map((c) => [c.name, c.role, `${c.score}%`, c.status]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resumeiq-recruitment-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{roleLabel} Overview</h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Here's what's happening with your recruitment pipeline today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportReport}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
              darkMode
                ? "border-slate-700 hover:bg-slate-900"
                : "border-slate-300 hover:bg-slate-100"
            }`}
          >
            <Download size={16} />
            Export Report
          </button>
          <button
            onClick={() => setShowNewJob(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm shadow-blue-600/30 transition-colors"
          >
            <Plus size={16} />
            New Job Posting
          </button>
        </div>
      </div>

      {/* New job posting inline form */}
      {showNewJob && (
        <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Create Job Posting</h3>
            <button
              onClick={() => setShowNewJob(false)}
              className={`p-1.5 rounded-lg ${darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              placeholder="Job title, e.g. Machine Learning Engineer"
              className={`rounded-lg px-3 py-2.5 text-sm outline-none border focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300"
              }`}
            />
            <input
              value={newJobDept}
              onChange={(e) => setNewJobDept(e.target.value)}
              placeholder="Department, e.g. Engineering"
              className={`rounded-lg px-3 py-2.5 text-sm outline-none border focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300"
              }`}
            />
          </div>
          <button
            onClick={addJobPosting}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Check size={16} />
            Publish Posting
          </button>
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          darkMode={darkMode}
          icon={Users}
          tint="bg-blue-600"
          label="Total Applicants"
          value="1,284"
          delta="12.4%"
          deltaLabel="vs. last month"
          positive
        />
        <StatCard
          darkMode={darkMode}
          icon={Briefcase}
          tint="bg-emerald-600"
          label="Active Job Postings"
          value={postings.filter((p) => p.status === "Open").length}
          delta="+3"
          deltaLabel="vs. last month"
          positive
        />
        <StatCard
          darkMode={darkMode}
          icon={CalendarClock}
          tint="bg-indigo-600"
          label="Interviews This Week"
          value="42"
          delta="6.1%"
          deltaLabel="vs. last week"
          positive={false}
        />
        <StatCard
          darkMode={darkMode}
          icon={Timer}
          tint="bg-amber-500"
          label="Avg. Time to Hire"
          value="16 days"
          delta="2 days"
          deltaLabel="faster than last month"
          positive
        />
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
                <Tooltip
                  contentStyle={{
                    background: darkMode ? "#0f172a" : "#fff",
                    border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                />
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
                <Tooltip
                  contentStyle={{
                    background: darkMode ? "#0f172a" : "#fff",
                    border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {SOURCE_BREAKDOWN.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                <span className={darkMode ? "text-slate-400" : "text-slate-600"}>
                  {s.name} · {s.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
        <h3 className="font-semibold">Hiring Funnel</h3>
        <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          Candidate progression through each stage
        </p>
        <div className="h-56 mt-4 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HIRING_FUNNEL} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#e2e8f0"} vertical={false} />
              <XAxis dataKey="stage" stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: darkMode ? "#0f172a" : "#fff",
                  border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
                  borderRadius: 10,
                  fontSize: 13,
                }}
              />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Candidates table */}
      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="p-5 sm:p-6 pb-0">
          <h3 className="font-semibold">Recent Candidates</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Review and move candidates through your pipeline
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className={`text-left ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                <th className="font-medium px-5 sm:px-6 py-3">Candidate</th>
                <th className="font-medium px-4 py-3">Role Applied</th>
                <th className="font-medium px-4 py-3">Match Score</th>
                <th className="font-medium px-4 py-3">Status</th>
                <th className="font-medium px-4 py-3 pr-5 sm:pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr
                  key={c.id}
                  className={`border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`}
                >
                  <td className="px-5 sm:px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                        {initials(c.name)}
                      </div>
                      <span className="font-medium whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3.5 whitespace-nowrap ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {c.role}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={c.score >= 85 ? "text-emerald-600 font-semibold" : c.score >= 70 ? "text-amber-600 font-semibold" : "text-rose-600 font-semibold"}>
                      {c.score}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 pr-5 sm:pr-6">
                    <div className="flex items-center justify-end gap-2">
                      {c.status !== "Hired" && c.status !== "Rejected" ? (
                        <>
                          <button
                            onClick={() => advanceCandidate(c.id)}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
                          >
                            Advance
                          </button>
                          <span className={darkMode ? "text-slate-700" : "text-slate-300"}>|</span>
                          <button
                            onClick={() => rejectCandidate(c.id)}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs ${darkMode ? "text-slate-600" : "text-slate-400"}`}>
                          No actions
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job postings */}
      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="p-5 sm:p-6 pb-0">
          <h3 className="font-semibold">Job Postings</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Manage your open and closed roles
          </p>
        </div>
        <div className="divide-y mt-4 divide-slate-800/60">
          {postings.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t ${
                darkMode ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <div>
                <p className="font-medium">{p.title}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                  {p.dept} · {p.applicants} applicants
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    p.status === "Open"
                      ? "bg-emerald-100 text-emerald-700"
                      : darkMode
                      ? "bg-slate-800 text-slate-400"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {p.status}
                </span>
                <button
                  onClick={() => toggleJobStatus(p.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    darkMode
                      ? "border-slate-700 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {p.status === "Open" ? "Close Posting" : "Reopen"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
