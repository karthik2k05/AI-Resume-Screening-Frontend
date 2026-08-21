import axios from "axios";
import { useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { extractJDKeywords } from "../../lib/jdMatcher";

import {
  getJobPostings,
  createJobPosting,
  updateJobStatus,
  updateJobPosting,
  deleteJobPosting,
} from "../../services/jobPostingService";

export default function JobPostingsHr() {
  const { darkMode, searchQuery, postings, setPostings } = useOutletContext();
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJobDescription, setNewJobDescription] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editingJob, setEditingJob] = useState(null);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10,
  });
  const [expandedJob, setExpandedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await getJobPostings(page, limit, searchQuery);

      const jobs = response.data.jobs.map((job) => ({
        id: job.id,
        title: job.title,
        dept: job.department,
        applicants: job.applicants_count,
        status: job.status === "open" ? "Open" : "Closed",
        description: job.description,
        keySkills: job.required_skills,
      }));

      setPostings(jobs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    }
  };

  // NOTE: This only ever loads applicants for a job that's already in `postings`,
  // and `postings` for the HR role is scoped server-side to jobs that HR created
  // (see getJobPostings). So an HR user can never expand applicants for a job
  // that isn't theirs, as long as the backend enforces that scoping.
  const loadApplicants = async (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
      return;
    }

    try {
      setApplicantsLoading(true);
     const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/candidate/jobs/${jobId}/applicants`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
      setApplicants(response.data.applicants);
      setExpandedJob(jobId);
    } catch (err) {
      console.error(err);
    } finally {
      setApplicantsLoading(false);
    }
  };

    // Status changes
  const updateApplicantStatus = async (applicationId, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/hr/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!expandedJob) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/candidate/jobs/${expandedJob}/applicants`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setApplicants(response.data.applicants);
    } catch (error) {
      console.error("Failed to update application status:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update application status."
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, limit, searchQuery]);

  const cardBg = darkMode
    ? "bg-slate-900 border-slate-800"
    : "bg-white border-slate-200";

  const addJobPosting = async () => {
    if (!newJobTitle.trim() || !newJobDept.trim()) return;

    const { requiredSkills } = extractJDKeywords(newJobDescription);

    try {
      const response = await createJobPosting({
        title: newJobTitle.trim(),
        department: newJobDept.trim(),
        description: newJobDescription.trim(),
        company: "ResumeIQ",
        location: "Remote",
        keySkills: requiredSkills,
      });

      const job = response.data.job;

      setPostings((prev) => [
        {
          id: job.id,
          title: job.title,
          dept: job.department,
          applicants: job.applicants_count,
          status: job.status === "open" ? "Open" : "Closed",
          description: job.description,
          keySkills: job.required_skills,
        },
        ...prev,
      ]);

      setEditingJob(null);
      setNewJobTitle("");
      setNewJobDept("");
      setNewJobDescription("");
      setShowNewJob(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editJobPosting = async () => {
    const { requiredSkills } = extractJDKeywords(newJobDescription);

    try {
      await updateJobPosting(editingJob.id, {
        title: newJobTitle.trim(),
        department: newJobDept.trim(),
        company: "ResumeIQ",
        location: "Remote",
        description: newJobDescription.trim(),
        keySkills: requiredSkills,
      });

      await fetchJobs();

      setEditingJob(null);
      setNewJobTitle("");
      setNewJobDept("");
      setNewJobDescription("");
      setShowNewJob(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteJob = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    try {
      await deleteJobPosting(id);
      await fetchJobs();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to delete job.");
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setNewJobTitle(job.title);
    setNewJobDept(job.dept);
    setNewJobDescription(job.description);
    setShowNewJob(true);
  };

  const toggleJobStatus = async (id) => {
    try {
      await updateJobStatus(id);
      await fetchJobs();
    } catch (error) {
      console.error(error);
    }
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
            <h3 className="font-semibold">
              {editingJob ? "Edit Job Posting" : "Create Job Posting"}
            </h3>
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
          <div className="mt-4">
            <textarea
              value={newJobDescription}
              onChange={(e) => setNewJobDescription(e.target.value)}
              placeholder="Paste or write the job description here — required skills and keywords are picked up automatically for resume screening."
              rows={4}
              className={`w-full rounded-lg px-3 py-2.5 text-sm outline-none border focus:ring-2 focus:ring-blue-500 resize-y ${
                darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300"
              }`}
            />
          </div>
          <button
            onClick={editingJob ? editJobPosting : addJobPosting}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Check size={16} />
            {editingJob ? "Update Job" : "Publish Posting"}
          </button>
        </div>
      )}

      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="divide-y">
          {postings.length === 0 ? (
            <p className={`px-5 sm:px-6 py-8 text-center text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              No job postings match "{searchQuery}"
            </p>
          ) : (
            postings.map((p) => (
              <div
                key={p.id}
                className={`border-t first:border-t-0 ${darkMode ? "border-slate-800" : "border-slate-100"}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                      {p.dept} · {p.applicants || 0} applicants
                      {p.keySkills?.length ? ` · ${p.keySkills.slice(0, 4).join(", ")}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
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
                      onClick={() => handleEditJob(p)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleJobStatus(p.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {p.status === "Open" ? "Close Posting" : "Reopen"}
                    </button>
                    <button
                      onClick={() => handleDeleteJob(p.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        darkMode
                          ? "border-red-700 text-red-400 hover:bg-red-900/20"
                          : "border-red-300 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => loadApplicants(p.id)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {expandedJob === p.id ? "Hide Applicants" : "Applicants"}
                      {expandedJob === p.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {expandedJob === p.id && (
                  <div
                    className={`px-5 sm:px-6 py-4 border-t ${
                      darkMode ? "border-slate-800 bg-slate-950/50" : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <h4 className="font-semibold text-sm mb-3">Candidates Applied</h4>

                    {applicantsLoading ? (
                      <p className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                        Loading applicants...
                      </p>
                    ) : applicants.length === 0 ? (
                      <p className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                        No applicants yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {applicants.map((candidate) => (
  <div
    key={candidate.application_id}
    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b last:border-b-0 ${
      darkMode ? "border-slate-800" : "border-slate-200"
    }`}
  >
    <div>
      <p className="text-sm font-semibold">
        👤 {candidate.name}
      </p>

      <p
        className={`text-xs mt-1 ${
          darkMode
            ? "text-slate-500"
            : "text-slate-400"
        }`}
      >
        Match: {candidate.match_score ?? 0}%
      </p>
    </div>

    <div className="relative w-fit">
  <select
    value={candidate.status || "Applied"}
    onChange={(e) =>
      updateApplicantStatus(
        candidate.application_id,
        e.target.value
      )
    }
    className={`appearance-none rounded-lg border pl-3 pr-7 py-2 text-xs font-semibold outline-none ${
      darkMode
        ? "bg-slate-800 border-slate-700 text-slate-200"
        : "bg-white border-slate-300 text-slate-700"
    }`}
  >
    <option value="Applied">Applied</option>
    <option value="Under Review">Under Review</option>
    <option value="Shortlisted">Shortlisted</option>
    <option value="Rejected">Rejected</option>
  </select>

  <ChevronDown
    size={14}
    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
  />
</div>
  </div>
))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className={`flex flex-col md:flex-row mt-6 items-center justify-between gap-4 px-6 py-4 border-t ${
          darkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Showing{" "}
          <span className="font-semibold">
            {pagination.totalRecords === 0
              ? 0
              : (pagination.currentPage - 1) * pagination.limit + 1}
          </span>
          –
          <span className="font-semibold">
            {Math.min(pagination.currentPage * pagination.limit, pagination.totalRecords)}
          </span>{" "}
          of <span className="font-semibold">{pagination.totalRecords}</span> jobs
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Rows</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className={`rounded-lg border px-3 py-2 text-sm ${
                darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-300"
              }`}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={pagination.currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-sm ${
              darkMode
                ? "border-slate-700 hover:bg-blue-500 disabled:opacity-40"
                : "border-slate-300 hover:bg-blue-100 disabled:opacity-40"
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, index) => (
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
              setPage((prev) => Math.min(prev + 1, pagination.totalPages))
            }
            disabled={pagination.currentPage === pagination.totalPages}
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