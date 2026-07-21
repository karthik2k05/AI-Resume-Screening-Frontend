import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Upload, User, ArrowRight } from "lucide-react";
import { SKILL_MATCH } from "../../data/mockDashboardData";

export default function CandidateOverviewSummary({ darkMode }) {
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) alert(`Resume "${file.name}" uploaded — re-analyzing your profile.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, Alex</h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Here's how your job search is progressing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border cursor-pointer transition-colors ${darkMode ? "border-slate-700 hover:bg-slate-900" : "border-slate-300 hover:bg-slate-100"}`}>
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
        <div className={`rounded-2xl border p-5 sm:p-6 flex flex-col items-center text-center ${cardBg}`}>
          <h3 className="font-semibold self-start">Resume Match Score</h3>
          <div className="relative h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: 82, fill: "#2563eb" }]} startAngle={90} endAngle={-270}>
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
                <Tooltip contentStyle={{ background: darkMode ? "#0f172a" : "#fff", border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`, borderRadius: 10, fontSize: 13 }} />
                <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Link to="/dashboard/candidate/applications" className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}>
          <div>
            <p className="font-semibold">My Applications</p>
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>4 in progress</p>
          </div>
          <ArrowRight size={18} className="text-blue-600" />
        </Link>
        <Link to="/dashboard/candidate/matches" className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}>
          <div>
            <p className="font-semibold">Job Matches</p>
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>3 recommended for you</p>
          </div>
          <ArrowRight size={18} className="text-blue-600" />
        </Link>
      </div>
    </div>
  );
}
