import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, X, Check } from "lucide-react";
import { INITIAL_POSTINGS } from "../../data/mockDashboardData";

export default function JobPostings() {
  const { darkMode, searchQuery } = useOutletContext();
  const [postings, setPostings] = useState(INITIAL_POSTINGS);
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("");
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const filteredPostings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return postings;
    return postings.filter((p) => p.title.toLowerCase().includes(q) || p.dept.toLowerCase().includes(q));
  }, [postings, searchQuery]);

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
    setPostings((prev) => prev.map((p) => (p.id === id ? { ...p, status: p.status === "Open" ? "Closed" : "Open" } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Job Postings</h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Manage your open and closed roles.
          </p>
        </div>
        <button
          onClick={() => setShowNewJob(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm shadow-blue-600/30 transition-colors"
        >
          <Plus size={16} />
          New Job Posting
        </button>
      </div>

      {showNewJob && (
        <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Create Job Posting</h3>
            <button onClick={() => setShowNewJob(false)} className={`p-1.5 rounded-lg ${darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>
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
          <button onClick={addJobPosting} className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            <Check size={16} />
            Publish Posting
          </button>
        </div>
      )}

      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="divide-y">
          {filteredPostings.length === 0 ? (
            <p className={`px-5 sm:px-6 py-8 text-center text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              No job postings match "{searchQuery}"
            </p>
          ) : (
            filteredPostings.map((p) => (
            <div key={p.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t first:border-t-0 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
              <div>
                <p className="font-medium">{p.title}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                  {p.dept} · {p.applicants} applicants
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    p.status === "Open" ? "bg-emerald-100 text-emerald-700" : darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {p.status}
                </span>
                <button
                  onClick={() => toggleJobStatus(p.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {p.status === "Open" ? "Close Posting" : "Reopen"}
                </button>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
