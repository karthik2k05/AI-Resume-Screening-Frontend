import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Briefcase,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import axios from "axios";
import { APPLICATION_STATUS_STYLES } from "../../data/mockDashboardData";

export default function Applications() {
  const { darkMode, searchQuery } = useOutletContext();

  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // ================= FETCH REAL APPLICATION DATA =================

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/candidate/applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // REAL DATA FROM DATABASE
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH + FILTER =================

  const filteredApplications = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase() || "";

    return applications.filter((application) => {
      const matchesSearch =
        !q ||
        application.title?.toLowerCase().includes(q) ||
        application.status?.toLowerCase().includes(q);

      const matchesFilter =
        activeFilter === "All" ||
        application.status?.toLowerCase() ===
          activeFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [applications, searchQuery, activeFilter]);

  // Reset page when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeFilter]);

  // ================= REAL COUNTS =================

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "applied"
  ).length;

  const reviewCount = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "under review" ||
      application.status?.toLowerCase() === "review"
  ).length;

  const shortlistedCount = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "shortlisted"
  ).length;

  // ================= PAGINATION =================

  const totalRecords = filteredApplications.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalRecords / limit)
  );

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedApplications =
    filteredApplications.slice(start, end);

  // ================= THEME =================

  const cardBg = darkMode
    ? "bg-slate-900 border-slate-800"
    : "bg-white border-slate-200";

  const mutedText = darkMode
    ? "text-slate-400"
    : "text-slate-500";

  // ================= FILTERS =================

  const filters = [
    {
      label: "All",
      count: totalApplications,
    },
    {
      label: "Applied",
      count: appliedCount,
    },
    {
      label: "Under Review",
      count: reviewCount,
    },
    {
      label: "Shortlisted",
      count: shortlistedCount,
    },
  ];

  // ================= STATUS ICON =================

  const getStatusIcon = (status) => {
    const value = status?.toLowerCase();

    if (value === "applied") {
      return <FileText size={14} />;
    }

    if (
      value === "under review" ||
      value === "review"
    ) {
      return <Clock3 size={14} />;
    }

    if (
      value === "shortlisted" ||
      value === "interview"
    ) {
      return <CheckCircle2 size={14} />;
    }

    if (value === "rejected") {
      return <XCircle size={14} />;
    }

    return <Briefcase size={14} />;
  };

  // ================= UI =================

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p
          className={`text-sm font-medium mb-1 ${
            darkMode
              ? "text-blue-400"
              : "text-blue-600"
          }`}
        >
          Candidate Portal
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold">
          My Applications
        </h1>

        <p className={`mt-1 text-sm ${mutedText}`}>
          Track the status of your job applications.
        </p>
      </div>

      {/* REAL STATISTICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* TOTAL */}
        <div
          className={`rounded-xl border p-4 ${cardBg}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm ${mutedText}`}>
              Total
            </span>

            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                darkMode
                  ? "bg-blue-500/10"
                  : "bg-blue-50"
              }`}
            >
              <Briefcase
                size={17}
                className="text-blue-600"
              />
            </div>
          </div>

          <p className="mt-3 text-2xl font-bold">
            {totalApplications}
          </p>

          <p className={`text-xs mt-1 ${mutedText}`}>
            Applications
          </p>
        </div>

        {/* APPLIED */}
        <div
          className={`rounded-xl border p-4 ${cardBg}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm ${mutedText}`}>
              Applied
            </span>

            <FileText
              size={18}
              className="text-slate-500"
            />
          </div>

          <p className="mt-3 text-2xl font-bold">
            {appliedCount}
          </p>

          <p className={`text-xs mt-1 ${mutedText}`}>
            Submitted
          </p>
        </div>

        {/* REVIEW */}
        <div
          className={`rounded-xl border p-4 ${cardBg}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm ${mutedText}`}>
              Under Review
            </span>

            <Clock3
              size={18}
              className="text-amber-500"
            />
          </div>

          <p className="mt-3 text-2xl font-bold">
            {reviewCount}
          </p>

          <p className={`text-xs mt-1 ${mutedText}`}>
            Being reviewed
          </p>
        </div>

        {/* SHORTLISTED */}
        <div
          className={`rounded-xl border p-4 ${cardBg}`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm ${mutedText}`}>
              Shortlisted
            </span>

            <CheckCircle2
              size={18}
              className="text-green-500"
            />
          </div>

          <p className="mt-3 text-2xl font-bold">
            {shortlistedCount}
          </p>

          <p className={`text-xs mt-1 ${mutedText}`}>
            Shortlisted
          </p>
        </div>
      </div>

      {/* APPLICATION CARD */}
      <div
        className={`rounded-2xl border overflow-hidden ${cardBg}`}
      >

        {/* TOP */}
        <div
          className={`px-5 sm:px-6 py-4 border-b ${
            darkMode
              ? "border-slate-800"
              : "border-slate-100"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h2 className="font-semibold text-lg">
                Applications
              </h2>

              <p className={`text-sm mt-1 ${mutedText}`}>
                {totalRecords} application
                {totalRecords !== 1 ? "s" : ""}
              </p>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() =>
                    setActiveFilter(filter.label)
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeFilter === filter.label
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter.label}
                  <span className="ml-1 opacity-70">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

            <p className={`mt-3 text-sm ${mutedText}`}>
              Loading applications...
            </p>
          </div>
        ) : totalRecords === 0 ? (

          /* EMPTY */
          <div className="py-14 text-center px-6">

            <div
              className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-slate-100"
              }`}
            >
              {searchQuery ||
              activeFilter !== "All" ? (
                <Search
                  size={22}
                  className={mutedText}
                />
              ) : (
                <Briefcase
                  size={22}
                  className={mutedText}
                />
              )}
            </div>

            <h3 className="mt-4 font-semibold">
              {searchQuery ||
              activeFilter !== "All"
                ? "No applications found"
                : "No applications yet"}
            </h3>

            <p
              className={`mt-1 text-sm ${mutedText}`}
            >
              {searchQuery ||
              activeFilter !== "All"
                ? "Try changing your search or filter."
                : "Your applications will appear here."}
            </p>
          </div>

        ) : (

          /* REAL APPLICATIONS */
          <div>
          {paginatedApplications.map((application) => {
  const statusStyle =
    APPLICATION_STATUS_STYLES[application.status] ||
    (darkMode
      ? "bg-slate-800 text-slate-300"
      : "bg-slate-100 text-slate-700");

  return (
    <div
  key={application.application_id}
  className={`px-5 sm:px-6 py-5 border-b last:border-b-0 transition ${
    darkMode
      ? "border-slate-800 hover:bg-slate-800/40"
      : "border-slate-100 hover:bg-slate-50"
  }`}
>
  <div className="flex items-center justify-between gap-4">

    {/* APPLICATION */}
    <div className="flex items-center gap-4">

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
          darkMode
            ? "bg-blue-500/10"
            : "bg-blue-50"
        }`}
      >
        <Briefcase
          size={19}
          className="text-blue-600"
        />
      </div>

      <div>
  <p className="text-sm font-semibold">
    {application.title}
  </p>

  <p className={`text-xs mt-1 ${mutedText}`}>
    Applied on{" "}
    {new Date(
      application.applied_at
    ).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}
  </p>
</div>

    </div>

    {/* MATCH + STATUS */}
    <div className="flex items-center gap-3">

      {/* MATCH SCORE */}
      <div
        className={`px-3 py-2 rounded-xl text-center ${
          darkMode
            ? "bg-blue-500/10"
            : "bg-blue-50"
        }`}
      >
        <p
          className={`text-[10px] uppercase tracking-wide ${
            darkMode
              ? "text-slate-500"
              : "text-slate-400"
          }`}
        >
          Match
        </p>

        <p className="text-sm font-bold text-blue-600">
          {application.match_score != null
            ? `${application.match_score}%`
            : "—"}
        </p>
      </div>

      {/* STATUS */}
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
          APPLICATION_STATUS_STYLES[
            application.status
          ] ||
          (darkMode
            ? "bg-slate-800 text-slate-300"
            : "bg-slate-100 text-slate-700")
        }`}
      >
        {getStatusIcon(application.status)}
        {application.status}
      </span>

    </div>
  </div>
</div>
      );
})}  
          </div>
        )}

        {/* PAGINATION */}
        {!loading && totalRecords > 0 && (
          <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-6 py-4 ${
              darkMode
                ? "border-slate-800"
                : "border-slate-100"
            }`}
          >

            <p className={`text-sm ${mutedText}`}>
              Showing{" "}
              <span className="font-semibold">
                {start + 1}
              </span>
              –
              <span className="font-semibold">
                {Math.min(end, totalRecords)}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {totalRecords}
              </span>
            </p>

            <div className="flex items-center gap-2">

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
                <option value={10}>10 rows</option>
                <option value={25}>25 rows</option>
                <option value={50}>50 rows</option>
              </select>

              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={page === 1}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                  darkMode
                    ? "border-slate-700 hover:bg-slate-800 disabled:opacity-40"
                    : "border-slate-300 hover:bg-slate-100 disabled:opacity-40"
                }`}
              >
                <ChevronLeft size={17} />
              </button>

              <span className="text-sm font-medium px-2">
                {page} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }
                disabled={page === totalPages}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                  darkMode
                    ? "border-slate-700 hover:bg-slate-800 disabled:opacity-40"
                    : "border-slate-300 hover:bg-slate-100 disabled:opacity-40"
                }`}
              >
                <ChevronRight size={17} />
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}