import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { APPLICATION_STATUS_STYLES } from "../../data/mockDashboardData";
import axios from "axios";
import { useEffect } from "react";

export default function Applications() {
  const { darkMode, searchQuery } = useOutletContext();
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);
const [applications, setApplications] = useState([]);
  const filteredApplications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter(
  (a) =>
    a.job_title.toLowerCase().includes(q) ||
    a.company_name.toLowerCase().includes(q) ||
    a.status.toLowerCase().includes(q)
);
  }, [applications, searchQuery]);
  useEffect(() => {
  fetchApplications();
}, []);

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

    setApplications(response.data.applications);

  } catch (error) {
    console.error(error);
  }
};
  const totalRecords = filteredApplications.length;
  const totalPages = Math.ceil(totalRecords / limit);

const start = (page - 1) * limit;

const end = start + limit;

const paginatedApplications = filteredApplications.slice(start, end);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">My Applications</h1>
        <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Track the status of every role you've applied to.
        </p>
      </div>

      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="divide-y">
          {filteredApplications.length === 0 ? (
            <p className={`px-5 sm:px-6 py-8 text-center text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              No applications match "{searchQuery}"
            </p>
          ) : (
            paginatedApplications.map((a) => (
              <div key={a.application_id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 sm:px-6 py-4 border-t first:border-t-0 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                    <Briefcase size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{a.job_title}</p>
                    <p className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                      {a.company_name} · Applied {new Date(a.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
className={`self-start sm:self-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
APPLICATION_STATUS_STYLES[a.status] ||
"bg-gray-100 text-gray-700"
}`}
>
                  {a.status}
                </span>
              </div>
            ))
          )}
        </div>
        
      </div>
      <div
  className={`flex flex-col md:flex-row mt-30 items-center justify-between gap-4 px-6 py-4 border-t ${
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
    applications
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
