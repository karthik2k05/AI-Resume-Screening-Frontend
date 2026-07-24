import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { MapPin, Check } from "lucide-react";
import { RECOMMENDED_JOBS } from "../../data/mockDashboardData";

export default function JobMatches() {
  const { darkMode, searchQuery } = useOutletContext();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const applyToJob = (id) => setAppliedJobs((prev) => [...prev, id]);

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return RECOMMENDED_JOBS;
    return RECOMMENDED_JOBS.filter(
      (j) => j.role.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)
    );
  }, [searchQuery]);
  const totalRecords = filteredJobs.length;

const totalPages = Math.ceil(totalRecords / limit);

const start = (page - 1) * limit;

const end = start + limit;

const paginatedJobs = filteredJobs.slice(start, end);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Job Matches</h1>
        <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Based on your resume and skill match.
        </p>
      </div>

      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="divide-y">
          {filteredJobs.length === 0 ? (
            <p className={`px-5 sm:px-6 py-8 text-center text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              No job matches for "{searchQuery}"
            </p>
          ) : (
            paginatedJobs.map((j) => {
              const applied = appliedJobs.includes(j.id);
              return (
                <div key={j.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t first:border-t-0 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{j.role}</p>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{j.match}% match</span>
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
                      applied ? "bg-emerald-100 text-emerald-700 cursor-default" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {applied ? (<><Check size={16} />Applied</>) : "Apply Now"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div
  className={`flex flex-col mt-60 md:flex-row items-center justify-between gap-4 px-6 py-4 border-t ${
    darkMode
      ? "border-slate-700 bg-slate-900"
      : "border-slate-200 bg-white"
  }`}
>
  <p
    className={`text-sm ${
      darkMode ? "text-slate-400" : "text-slate-500"
    }`}
  >
    Showing{" "}
    <span className="font-semibold">
      {totalRecords === 0 ? 0 : start + 1}
    </span>
    –
    <span className="font-semibold">
      {Math.min(end, totalRecords)}
    </span>{" "}
    of{" "}
    <span className="font-semibold">
      {totalRecords}
    </span>{" "}
    job matches
  </p>

  <div className="flex items-center gap-4">

    <div className="flex items-center gap-2">
      <span
        className={`text-sm ${
          darkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Rows
      </span>

      <select
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value));
          setPage(1);
        }}
        className={`rounded-lg border px-3 py-2 text-sm ${
          darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-300"
        }`}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>

    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className={`px-4 py-2 rounded-lg border text-sm ${
        darkMode
          ? "border-slate-700 hover:bg-blue-500 disabled:opacity-40"
          : "border-slate-300 hover:bg-blue-100 disabled:opacity-40"
      }`}
    >
      Previous
    </button>

    <div className="flex items-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
            page === index + 1
              ? "bg-blue-600 text-white"
              : darkMode
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>

    <button
      onClick={() =>
        setPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={page === totalPages}
      className={`px-4 py-2 rounded-lg border text-sm ${
        darkMode
          ? "border-slate-700 hover:bg-blue-500 disabled:opacity-40"
          : "border-slate-300 hover:bg-blue-100 disabled:opacity-40"
      }`}
    >
      Next
    </button>

  </div>
</div>
    </div>
  );
}
