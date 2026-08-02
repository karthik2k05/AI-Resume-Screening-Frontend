import { useState, useEffect, useMemo, useRef, Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Upload,
  Loader2,
  AlertTriangle,
  Info,
  Award,
  UserPlus,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { scoreResumeAgainstJD } from "../../lib/jdMatcher";
import axios from "axios";

const TOP_N_OPTIONS = [5, 10, 20, "All"];
const RANK_STYLES = [
  "bg-amber-100 text-amber-700 border-amber-300",
  "bg-slate-200 text-slate-600 border-slate-300",
  "bg-orange-100 text-orange-700 border-orange-300",
];

export default function ResumeScreening() {
  const { darkMode, candidates, setCandidates, postings } = useOutletContext();
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const fileInputRef = useRef(null);

  const [batch, setBatch] = useState([]);
  const [selectedPostingId, setSelectedPostingId] = useState("");
  const [jdText, setJdText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [fileErrors, setFileErrors] = useState([]);
  const [duplicateNames, setDuplicateNames] = useState([]);
  const [topN, setTopN] = useState(10);
  const [addedHashes, setAddedHashes] = useState(new Set());
  const [expandedHash, setExpandedHash] = useState(null);

  const fetchResumes = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/hr/resumes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const formatted = response.data.resumes.map((resume) => ({
      hash: resume.resume_id,
      resume_id: resume.resume_id,
      fileName: resume.file_name,
      candidateName: resume.candidate_name,
      analyzedAt: resume.uploaded_at,
      atsScore: resume.match_score,
      displayScore: resume.match_score,
      text: resume.resume_text,
      matchedSkills: resume.detected_skills || [],
      missingSkills: resume.missing_skills || [],
      formatting: {
        passedCount: Math.round((resume.resume_health || 0) / 20),
        totalChecks: 5,
        warnings: [],
        wordCount: resume.resume_text
          ? resume.resume_text.split(/\s+/).length
          : 0,
      },
    }));

    setBatch(formatted);

  } catch (error) {

    console.error(error);

  }
};

  useEffect(() => {
    fetchResumes();
  }, []);

  const selectedPosting = useMemo(
    () => postings.find((p) => p.id === Number(selectedPostingId)) || null,
    [postings, selectedPostingId]
  );

  // Picking a posting fills the JD box with its description — from
  // there HR can freely edit it, so the filter is never limited to
  // just the posting's preset keywords.
  const handleSelectPosting = (id) => {
    setSelectedPostingId(id);
    const posting = postings.find((p) => p.id === Number(id));
    setJdText(posting?.description || "");
  };

  // Re-scores every stored resume against whatever's currently in the
  // JD box — nothing is baked in at upload time, so editing the text
  // or switching postings re-ranks instantly.
  const ranked = useMemo(() => {
    const trimmedJD = jdText.trim();
    return batch
      .map((entry) => {
        if (!trimmedJD) {
          return { ...entry, displayScore: entry.atsScore, jdMatch: null };
        }
        const jdMatch = scoreResumeAgainstJD(entry, trimmedJD);
        return { ...entry, jdMatch, displayScore: jdMatch.combined };
      })
      .sort((a, b) => b.displayScore - a.displayScore);
  }, [batch, jdText]);

  const topCandidates = ranked.slice(0, 3);
  const tableRows = topN === "All" ? ranked : ranked.slice(0, topN);

  const handleFiles = async (e) => {
  const files = Array.from(e.target.files || []);

  if (files.length === 0) return;

  setProcessing(true);
  setProgress({
    current: 0,
    total: files.length,
  });

  try {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("resumes", file);
    });

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/hr/upload-resumes`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await fetchResumes();

    setDuplicateNames([]);
    setFileErrors([]);

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to upload resumes."
    );

  } finally {

    setProcessing(false);

    setProgress({
      current: files.length,
      total: files.length,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  }
};

  const addToPipeline = (entry) => {
    setCandidates((prev) => [
      {
        id: Date.now() + Math.random(),
        name: entry.candidateName,
        role: selectedPosting ? selectedPosting.title : "General Application",
        applied: "Just now",
        score: entry.displayScore,
        status: "Screening",
      },
      ...prev,
    ]);
    setAddedHashes((prev) => new Set(prev).add(entry.hash));
  };

  const removeEntry = (hash) => {
    setBatch(removeHrBatchEntry(hash));
  };

  const handleClearAll = () => {
    if (batch.length === 0) return;
    if (!confirm(`Remove all ${batch.length} screened resumes? This can't be undone.`)) return;
    clearHrBatch();
    setBatch([]);
  };

  const clearFilter = () => {
    setSelectedPostingId("");
    setJdText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Resume Screening</h1>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Upload resumes in bulk and filter them by job description to get a ranked shortlist.
          </p>
        </div>
        {batch.length > 0 && (
          <button
            onClick={handleClearAll}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors self-start ${
              darkMode ? "border-slate-700 hover:bg-slate-900 text-slate-400" : "border-slate-300 hover:bg-slate-100 text-slate-500"
            }`}
          >
            <Trash2 size={14} />
            Clear all ({batch.length})
          </button>
        )}
      </div>

      {/* Upload + JD filter controls */}
      <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={`text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Filter by job posting (optional)
            </label>
            <select
              value={selectedPostingId}
              onChange={(e) => handleSelectPosting(e.target.value)}
              className={`mt-1.5 w-full rounded-lg px-3 py-2.5 text-sm outline-none border focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300"
              }`}
            >
              <option value="">Choose a posting to auto-fill its description...</option>
              {postings.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} — {p.dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border cursor-pointer transition-colors ${
                processing ? "opacity-60 pointer-events-none" : ""
              } ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-300 hover:bg-slate-100"}`}
            >
              {processing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {processing ? `Analyzing ${progress.current}/${progress.total}...` : "Upload Resumes (multiple allowed)"}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                multiple
                disabled={processing}
                className="hidden"
                onChange={handleFiles}
              />
            </label>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Job description (edit freely — this is what resumes are filtered and ranked against)
            </label>
            {(jdText || selectedPostingId) && (
              <button onClick={clearFilter} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                Clear filter
              </button>
            )}
          </div>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste any job description here to filter and rank resumes against it — required skills and keywords are picked up automatically. Leave blank to rank by general ATS score."
            rows={4}
            className={`w-full rounded-lg px-3 py-2.5 text-sm outline-none border focus:ring-2 focus:ring-blue-500 resize-y ${
              darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300"
            }`}
          />
        </div>
      </div>

      {fileErrors.length > 0 && (
        <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${darkMode ? "bg-rose-950/40 border-rose-900 text-rose-300" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{fileErrors.length} file{fileErrors.length > 1 ? "s" : ""} couldn't be analyzed:</p>
            <ul className="mt-1 list-disc list-inside space-y-0.5">
              {fileErrors.map((e) => (
                <li key={e.fileName}>
                  <span className="font-medium">{e.fileName}</span> — {e.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {duplicateNames.length > 0 && (
        <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${darkMode ? "bg-blue-950/40 border-blue-900 text-blue-300" : "bg-blue-50 border-blue-200 text-blue-700"}`}>
          <Info size={18} className="shrink-0 mt-0.5" />
          <p>
            {duplicateNames.length} file{duplicateNames.length > 1 ? "s were" : " was"} already in this batch — refreshed instead of duplicated: {duplicateNames.join(", ")}
          </p>
        </div>
      )}

      {batch.length === 0 && !processing && (
        <div className={`rounded-2xl border p-10 text-center ${cardBg}`}>
          <p className={`text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            No resumes screened yet — upload a batch of .pdf or .docx files above to get a ranked shortlist.
          </p>
        </div>
      )}

      {/* Top shortlist */}
      {topCandidates.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Top Candidates</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {topCandidates.map((entry, idx) => {
              const added = addedHashes.has(entry.hash);
              return (
                <div key={entry.hash} className={`rounded-2xl border p-5 ${cardBg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${RANK_STYLES[idx]}`}>
                      <Award size={12} />#{idx + 1}
                    </span>
                    <span className={entry.displayScore >= 85 ? "text-emerald-600 font-bold" : entry.displayScore >= 70 ? "text-amber-600 font-bold" : "text-rose-600 font-bold"}>
                      {entry.displayScore}%
                    </span>
                  </div>
                  <p className="font-semibold truncate">{entry.candidateName}</p>
                  <p className={`text-xs mt-0.5 truncate ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{entry.fileName}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {entry.matchedSkills.slice(0, 4).map((s) => (
                      <span key={s.skill} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        {s.skill}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => addToPipeline(entry)}
                    disabled={added}
                    className={`w-full mt-4 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      added ? "bg-emerald-100 text-emerald-700 cursor-default" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {added ? <Check size={14} /> : <UserPlus size={14} />}
                    {added ? "Added to pipeline" : "Advance to pipeline"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full ranked table */}
      {ranked.length > 0 && (
        <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
          <div className="flex items-center justify-between p-5 sm:p-6 pb-4">
            <div>
              <h3 className="font-semibold">All Screened Resumes</h3>
              <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                {ranked.length} total · sorted by {jdText.trim() ? "job description match" : "ATS score"}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {TOP_N_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setTopN(n)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                    topN === n
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "bg-slate-800 text-slate-400 hover:text-white"
                      : "bg-slate-100 text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {n === "All" ? "All" : `Top ${n}`}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className={`text-left ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                  <th className="font-medium px-5 sm:px-6 py-3">Rank</th>
                  <th className="font-medium px-4 py-3">Candidate</th>
                  <th className="font-medium px-4 py-3">Score</th>
                  <th className="font-medium px-4 py-3">Top Skills</th>
                  <th className="font-medium px-4 py-3 pr-5 sm:pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((entry, idx) => {
                  const added = addedHashes.has(entry.hash);
                  const expanded = expandedHash === entry.hash;
                  return (
                    <Fragment key={entry.hash}>
                      <tr className={`border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                        <td className="px-5 sm:px-6 py-3.5 font-semibold">#{idx + 1}</td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => setExpandedHash(expanded ? null : entry.hash)}
                            className="flex items-center gap-1.5 text-left hover:text-blue-600 transition-colors"
                          >
                            <div>
                              <p className="font-medium whitespace-nowrap">{entry.candidateName}</p>
                              <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{entry.fileName}</p>
                            </div>
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={entry.displayScore >= 85 ? "text-emerald-600 font-semibold" : entry.displayScore >= 70 ? "text-amber-600 font-semibold" : "text-rose-600 font-semibold"}>
                            {entry.displayScore}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {entry.matchedSkills.slice(0, 3).map((s) => (
                              <span key={s.skill} className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
                                {s.skill}
                              </span>
                            ))}
                            {entry.matchedSkills.length > 3 && (
                              <span className={`text-[11px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                                +{entry.matchedSkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 pr-5 sm:pr-6">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => addToPipeline(entry)}
                              disabled={added}
                              className={`text-xs font-semibold whitespace-nowrap ${
                                added ? "text-emerald-600" : "text-blue-600 hover:text-blue-700"
                              }`}
                            >
                              {added ? "✓ Added" : "Advance"}
                            </button>
                            <button
                              onClick={() => removeEntry(entry.hash)}
                              className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className={darkMode ? "bg-slate-950/50" : "bg-slate-50"}>
                          <td colSpan={5} className="px-5 sm:px-6 py-4">
                            <div className="grid sm:grid-cols-3 gap-4 text-xs">
                              <div>
                                <p className={`font-semibold mb-1.5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>All matched skills</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {entry.matchedSkills.map((s) => (
                                    <span key={s.skill} className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                                      {s.skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              {entry.jdMatch && (
                                <div>
                                  <p className={`font-semibold mb-1.5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Missing from this JD</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {entry.jdMatch.missingRequired.length === 0 && entry.jdMatch.missingExtra.length === 0 ? (
                                      <span className="text-emerald-600 font-medium">None — full match</span>
                                    ) : (
                                      [...entry.jdMatch.missingRequired, ...entry.jdMatch.missingExtra].map((skill) => (
                                        <span key={skill} className={`px-2 py-0.5 rounded-full font-medium ${darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-500"}`}>
                                          {skill}
                                        </span>
                                      ))
                                    )}
                                  </div>
                                </div>
                              )}
                              <div>
                                <p className={`font-semibold mb-1.5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Resume health</p>
                                <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
                                  {entry.formatting.passedCount}/{entry.formatting.totalChecks} checks passed · {entry.formatting.wordCount} words
                                </p>
                                {entry.formatting.warnings.length > 0 && (
                                  <ul className="mt-1 list-disc list-inside text-rose-500">
                                    {entry.formatting.warnings.map((w) => (
                                      <li key={w}>{w}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
