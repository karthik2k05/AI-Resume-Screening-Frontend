import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { Upload, User, Briefcase, MapPin, Check } from "lucide-react";

const APPLICATIONS = [
  { id: 1, role: "Frontend Developer", company: "Northwind Labs", applied: "5 days ago", status: "Interview Scheduled" },
  { id: 2, role: "UI Engineer", company: "Bridgeform", applied: "12 days ago", status: "Under Review" },
  { id: 3, role: "React Developer", company: "Solstice Tech", applied: "20 days ago", status: "Rejected" },
  { id: 4, role: "Product Designer", company: "Kestrel Studio", applied: "2 days ago", status: "Application Received" },
];

const SKILL_MATCH = [
  { skill: "React", value: 95 },
  { skill: "JavaScript", value: 90 },
  { skill: "CSS", value: 85 },
  { skill: "Node.js", value: 70 },
  { skill: "SQL", value: 60 },
];

const RECOMMENDED_JOBS = [
  { id: 1, role: "Senior Frontend Engineer", company: "Vertex Applications", location: "Remote", match: 91 },
  { id: 2, role: "Full Stack Developer", company: "Ironleaf Systems", location: "Bengaluru, IN", match: 84 },
  { id: 3, role: "React Native Developer", company: "Compass Mobile", location: "Remote", match: 77 },
];

const STATUS_STYLES = {
  "Interview Scheduled": "bg-blue-100 text-blue-700",
  "Under Review": "bg-amber-100 text-amber-700",
  "Application Received": "bg-slate-200 text-slate-600",
  Rejected: "bg-rose-100 text-rose-700",
};

export default function CandidateOverview({ darkMode }) {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const applyToJob = (id) => {
    setAppliedJobs((prev) => [...prev, id]);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Resume "${file.name}" uploaded — re-analyzing your profile.`);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, Alex</h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Here's how your job search is progressing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border cursor-pointer transition-colors ${
              darkMode ? "border-slate-700 hover:bg-slate-900" : "border-slate-300 hover:bg-slate-100"
            }`}
          >
            <Upload size={16} />
            Upload New Resume
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload} />
          </label>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm shadow-blue-600/30 transition-colors">
            <User size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Resume score */}
        <div className={`rounded-2xl border p-5 sm:p-6 flex flex-col items-center text-center ${cardBg}`}>
          <h3 className="font-semibold self-start">Resume Match Score</h3>
          <div className="relative h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={[{ value: 82, fill: "#2563eb" }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={12} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold">82%</p>
            </div>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Strong match for Frontend & Full Stack roles
          </p>
        </div>

        {/* Skill breakdown */}
        <div className={`lg:col-span-2 rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <h3 className="font-semibold">Skill Match Breakdown</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            How your resume skills compare to job requirements
          </p>
          <div className="h-48 mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_MATCH} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#e2e8f0"} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="skill" type="category" stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} width={70} />
                <Tooltip
                  contentStyle={{
                    background: darkMode ? "#0f172a" : "#fff",
                    border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`,
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="p-5 sm:p-6 pb-0">
          <h3 className="font-semibold">My Applications</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Track the status of every role you've applied to
          </p>
        </div>
        <div className="divide-y mt-4">
          {APPLICATIONS.map((a) => (
            <div
              key={a.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 sm:px-6 py-4 border-t ${
                darkMode ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                  <Briefcase size={17} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{a.role}</p>
                  <p className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    {a.company} · Applied {a.applied}
                  </p>
                </div>
              </div>
              <span className={`self-start sm:self-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${STATUS_STYLES[a.status]}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended jobs */}
      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="p-5 sm:p-6 pb-0">
          <h3 className="font-semibold">Recommended For You</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Based on your resume and skill match
          </p>
        </div>
        <div className="divide-y mt-4">
          {RECOMMENDED_JOBS.map((j) => {
            const applied = appliedJobs.includes(j.id);
            return (
              <div
                key={j.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t ${
                  darkMode ? "border-slate-800" : "border-slate-100"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{j.role}</p>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {j.match}% match
                    </span>
                  </div>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    {j.company}
                    <span className="mx-1">·</span>
                    <MapPin size={12} />
                    {j.location}
                  </p>
                </div>
                <button
                  onClick={() => applyToJob(j.id)}
                  disabled={applied}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0 ${
                    applied
                      ? "bg-emerald-100 text-emerald-700 cursor-default"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {applied ? (
                    <>
                      <Check size={16} />
                      Applied
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
