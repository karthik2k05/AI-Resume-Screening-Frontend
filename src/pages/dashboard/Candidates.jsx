import { useMemo, useState,useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Download } from "lucide-react";
import AdminAPI from "../../api/adminApi";
import { STAGES, STATUS_STYLES, initials } from "../../data/mockDashboardData";

export default function Candidates() {
  const { darkMode, searchQuery } = useOutletContext();
 const [candidates, setCandidates] = useState([]);

const [page, setPage] = useState(1);

const [totalPages, setTotalPages] = useState(1);
useEffect(() => {

  const fetchCandidates = async () => {

    try {

      const res = await AdminAPI.getCandidates(page,10);

      setCandidates(res.data.data);

      setTotalPages(res.data.pagination.totalPages);

    } catch (err) {

      console.error(err);

    }

  };

  fetchCandidates();

}, [page]);
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const filteredCandidates = useMemo(() => {
  const q = searchQuery.trim().toLowerCase();

  if (!q) return candidates;

  return candidates.filter(
    (c) =>
      (c.name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.role || "").toLowerCase().includes(q) ||
      (c.status || "").toLowerCase().includes(q)
  );
}, [candidates, searchQuery]);

  const advanceCandidate = (id) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.user_id !== id) return c;
        const idx = STAGES.indexOf(c.status);
        const next = idx === -1 || idx === STAGES.length - 1 ? c.status : STAGES[idx + 1];
        return { ...c, status: next };
      })
    );
  };

  const rejectCandidate = (id) => {
    setCandidates((prev) => prev.map((c) => (c.user_id === id ? { ...c, status: "Rejected" } : c)));
  };

  const exportReport = () => {
    const rows = [
      ["Candidate", "Role", "AI Match Score", "Status"],
      ...filteredCandidates.map((c) => [c.name, c.role, `${c.score}%`, c.status]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = "candidates.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Candidates</h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Review and move candidates through your pipeline.
          </p>
        </div>
        <button
          onClick={exportReport}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
            darkMode ? "border-slate-700 hover:bg-slate-900" : "border-slate-300 hover:bg-slate-100"
          }`}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="overflow-x-auto">
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
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className={`px-5 sm:px-6 py-8 text-center text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    No candidates match "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => (
                <tr key={c.id} className={`border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                  <td className="px-5 sm:px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                        {initials(c.name)}
                      </div>
                      <span className="font-medium whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3.5 whitespace-nowrap ${darkMode ? "text-slate-400" : "text-slate-600"}`}>{c.role}</td>
                  <td className="px-4 py-3.5">
                    <span className={Number(c.score) >= 85 ? "text-emerald-600 font-semibold" : Number(c.score) >= 70 ? "text-amber-600 font-semibold" : "text-rose-600 font-semibold"}>
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
                          <button onClick={() => advanceCandidate(c.user_id)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap">
                            Advance
                          </button>
                          <span className={darkMode ? "text-slate-700" : "text-slate-300"}>|</span>
                          <button onClick={() => rejectCandidate(c.user_id)} className="text-xs font-semibold text-rose-600 hover:text-rose-700">
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs ${darkMode ? "text-slate-600" : "text-slate-400"}`}>No actions</span>
                      )}
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
