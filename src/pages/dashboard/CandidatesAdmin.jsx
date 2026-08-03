import { useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Download } from "lucide-react";
import AdminAPI from "../../api/adminApi";
import { STATUS_STYLES, initials } from "../../data/mockDashboardData";

export default function CandidatesAdmin() {
  const { darkMode, searchQuery } = useOutletContext();

  const [candidates, setCandidates] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const start = (page - 1) * limit + 1;
const end = Math.min(page * limit, totalRecords);

  const cardBg =
    darkMode
      ? "bg-slate-900 border-slate-800"
      : "bg-white border-slate-200";

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await AdminAPI.getCandidates(page, limit);

        setCandidates(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        setTotalRecords(res.data.pagination.totalRecords);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCandidates();
  }, [page, limit]);

  const filteredCandidates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) return candidates;

    return candidates.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.role || "").toLowerCase().includes(q) ||
        (c.status || "").toLowerCase().includes(q)
    );
  }, [candidates, searchQuery]);

  const exportCSV = () => {
    const rows = [
      ["Candidate", "Role", "ATS Score", "Status"],
      ...filteredCandidates.map((c) => [
        c.name,
        c.role,
        `${c.score}%`,
        c.status,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "admin-candidates.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Candidates
          </h1>

          <p
            className={`mt-1 text-sm ${
              darkMode
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >
            View all candidates across the recruitment pipeline.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border ${
            darkMode
              ? "border-slate-700 hover:bg-slate-900"
              : "border-slate-300 hover:bg-slate-100"
          }`}
        >
          <Download size={16} />
          Export CSV
        </button>

      </div>

      <div
        className={`rounded-2xl border ${cardBg} overflow-hidden`}
      >
        <div className="overflow-x-auto">

          <table className="w-full text-sm min-w-[700px]">

            <thead>

              <tr
                className={`text-left ${
                  darkMode
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                <th className="px-6 py-3">Candidate</th>
                <th className="px-4 py-3">Role Applied</th>
                <th className="px-4 py-3">ATS Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredCandidates.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-8"
                  >
                    No candidates found.
                  </td>

                </tr>

              ) : (

                filteredCandidates.map((c) => (

                  <tr
                    key={c.user_id}
                    className={`border-t ${
                      darkMode
                        ? "border-slate-800"
                        : "border-slate-100"
                    }`}
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
                          {initials(c.name)}
                        </div>

                        <span className="font-medium">
                          {c.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-4">
                      {c.role}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={
                          Number(c.score) >= 85
                            ? "text-emerald-600 font-semibold"
                            : Number(c.score) >= 70
                            ? "text-amber-600 font-semibold"
                            : "text-rose-600 font-semibold"
                        }
                      >
                        {c.score}%
                      </span>

                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[c.status]}`}
                      >
                        {c.status}
                      </span>

                    </td>

                    <td className="px-4 py-4 text-right">

                      <span
                        className={`text-xs ${
                          darkMode
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        View Only
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>

      <div
  className={`flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 ${
    darkMode ? "bg-slate-900" : "bg-white"
  }`}
>
  <p
    className={`text-sm ${
      darkMode ? "text-slate-400" : "text-slate-500"
    }`}
  >
    Showing <span className="font-semibold">{start}</span>–
    <span className="font-semibold">{end}</span> of{" "}
    <span className="font-semibold">{totalRecords}</span> candidates
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
      className={`px-4 py-2 rounded-lg border text-sm font-medium ${
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
      className={`px-4 py-2 rounded-lg border text-sm font-medium ${
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