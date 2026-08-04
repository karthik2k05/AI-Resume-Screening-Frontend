import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import {
  Upload,
  User,
  ArrowRight,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import axios from "axios";

function scoreLabel(score) {
  if (score >= 85) return "Strong ATS match — this resume should pass most automated screens.";
  if (score >= 65) return "Decent match, but a few gaps could hold it back with certain ATS filters.";
  if (score >= 40) return "Weak match — add more relevant keywords and tighten formatting.";
  return "Low match — this resume likely won't clear most ATS filters as-is.";
}

export default function CandidateOverviewSummary({ darkMode }) {
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const fileInputRef = useRef(null);

  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [jobCount, setJobCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);
    
  const fetchLatestResume = async () => {

    try{

        const token = localStorage.getItem("token");

        const response = await axios.get(

            `${import.meta.env.VITE_API_URL}/api/candidate/resume`,

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        );

        setAnalysis(response.data.resume);

    }

    catch (err) {
    console.error(err);
    setErrorMsg(
        err.response?.data?.message ||
        "Failed to load your resume."
    );
}

}

const fetchApplications = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/candidate/applications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setApplicationCount(response.data.applications.length);

  } catch (err) {
    console.error(err);
  }
};

const fetchJobMatches = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/candidate/jobs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setJobCount(response.data.jobs.length);

  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
    fetchLatestResume();
    fetchApplications();
    fetchJobMatches();
}, []);


  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setErrorMsg("");

    try {
      const formData = new FormData();

formData.append("resume", file);

const token = localStorage.getItem("token");

const response = await axios.post(

    `${import.meta.env.VITE_API_URL}/api/candidate/upload-resume`,

    formData,

    {

        headers:{

            Authorization:`Bearer ${token}`

        }

    }

);

setAnalysis(response.data.resume);
     
    }
     catch (err) {
  console.error(err);

  setErrorMsg(
    err.response?.data?.message ||
    "Couldn't analyze this resume. Please try again."
  );
}
    finally {
      setAnalyzing(false);
      // reset so selecting the same file again still fires onChange
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.name || "Candidate"}</h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Here's how your job search is progressing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border cursor-pointer transition-colors ${
              analyzing ? "opacity-60 pointer-events-none" : ""
            } ${darkMode ? "border-slate-700 hover:bg-slate-900" : "border-slate-300 hover:bg-slate-100"}`}
          >
            {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {analyzing ? "Analyzing..." : "Upload New Resume"}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              disabled={analyzing}
              onChange={handleResumeUpload}
            />
          </label>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm shadow-blue-600/30 transition-colors">
            <User size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {errorMsg && (
        <div
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
            darkMode ? "bg-rose-950/40 border-rose-900 text-rose-300" : "bg-rose-50 border-rose-200 text-rose-700"
          }`}
        >
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      


      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        <div className={`rounded-2xl border p-5 sm:p-6 flex flex-col items-center text-center ${cardBg}`}>
          <h3 className="font-semibold self-start">Resume Match Score</h3>
          <div className="relative h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={[{ value: analysis?.score?.overall ?? 0, fill: "#2563eb" }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={12} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold">{analysis ? `${analysis.score.overall}%` : "—"}</p>
            </div>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            {analysis ? scoreLabel(analysis.score.overall) : "Upload your resume to see your real ATS match score."}
          </p>
        </div>

        <div className={`lg:col-span-2 rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <h3 className="font-semibold">Skill Match Breakdown</h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Skills detected in your uploaded resume
          </p>
          <div className="h-48 mt-4 -ml-2">
            {analysis?.matchedSkills?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis.matchedSkills} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#e2e8f0"} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="skill" type="category" stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} width={90} />
                  <Tooltip contentStyle={{ background: darkMode ? "#0f172a" : "#fff", border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`, borderRadius: 10, fontSize: 13 }} />
                  <Bar dataKey="value" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className={`h-full flex items-center justify-center text-center text-sm px-6 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                {analysis
                  ? "No recognized skills found in this resume — try adding specific technologies and tools."
                  : "Upload a resume to see which skills it contains."}
              </div>
            )}
          </div>
        </div>
      </div>

      {analysis && (
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
          <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
            <h3 className="font-semibold">Skills Detected & Missing</h3>
            <p className={`text-xs mt-1 mb-4 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              Deduplicated against a {analysis.matchedSkills.length + analysis.missingSkills.length}+ keyword ATS bank
            </p>

            {analysis.matchedSkills.length > 0 && (
              <div className="mb-4">
                <p className={`text-xs font-semibold mb-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Found in your resume</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedSkills.map((s) => (
                    <span key={s.skill} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      <CheckCircle2 size={12} />
                      {s.skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.missingSkills.length > 0 && (
              <div>
                <p className={`text-xs font-semibold mb-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Consider adding</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Resume Health Checks</h3>
              <span className={`text-xs font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {analysis.formatting.passedCount}/{analysis.formatting.totalChecks} passed
              </span>
            </div>
            <p className={`text-xs mt-1 mb-4 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              <FileText size={12} className="inline -mt-0.5 mr-1" />
              {analysis.formatting.wordCount} words analyzed
            </p>
            <ul className="space-y-2.5">
              {analysis.formatting.checks.map((check) => (
                <li key={check.label} className="flex items-center gap-2.5 text-sm">
                  {check.passed ? (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle size={16} className="text-rose-500 shrink-0" />
                  )}
                  <span className={check.passed ? "" : darkMode ? "text-slate-400" : "text-slate-500"}>{check.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Link to="/dashboard/candidate/applications" className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}>
          <div>
            <p className="font-semibold">My Applications</p>
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{applicationCount} in progress</p>
          </div>
          <ArrowRight size={18} className="text-blue-600" />
        </Link>
        <Link to="/dashboard/candidate/matches" className={`flex items-center justify-between rounded-2xl border p-5 transition-colors ${cardBg} hover:border-blue-500/50`}>
          <div>
            <p className="font-semibold">Job Matches</p>
            <p
  className={`text-xs mt-1 ${
    darkMode ? "text-slate-500" : "text-slate-400"
  }`}
>
  {jobCount} recommended for you
</p>
          </div>
          <ArrowRight size={18} className="text-blue-600" />
        </Link>
      </div>
    </div>
  );
}
