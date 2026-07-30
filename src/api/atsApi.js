// Thin client for the standalone ATS / resume-screening backend (see the
// /backend folder). All resume parsing, scoring, JD matching, and storage
// now happens server-side — this file just calls the API.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";


async function handleResponse(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const message = data?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return data;
}

/** Uploads a single resume for analysis (candidate self-service flow). */
export async function analyzeResume(file) {
  const formData = new FormData();
  formData.append("resume", file);
  const res = await fetch(`${API_BASE}/api/resumes/analyze`, { method: "POST", body: formData });
  const data = await handleResponse(res);
  return { ...data.resume, isDuplicate: data.isDuplicate };
}

/** Uploads many resumes at once (HR bulk screening flow). */
export async function uploadResumeBatch(files) {
  const formData = new FormData();
  files.forEach((file) => formData.append("resumes", file));
  const res = await fetch(`${API_BASE}/api/resumes/batch`, { method: "POST", body: formData });
  return handleResponse(res); // { results, errors, duplicates }
}

/** Fetches every stored resume, optionally ranked against a job description. */
export async function getResumes(jdText = "") {
  const url = new URL(`${API_BASE}/api/resumes`);
  if (jdText.trim()) url.searchParams.set("jd", jdText);
  const res = await fetch(url);
  const data = await handleResponse(res);
  return data.resumes;
}

/** Fetches one stored resume by hash, optionally scored against a JD. */
export async function getResumeByHash(hash, jdText = "") {
  const url = new URL(`${API_BASE}/api/resumes/${hash}`);
  if (jdText.trim()) url.searchParams.set("jd", jdText);
  const res = await fetch(url);
  const data = await handleResponse(res);
  return data.resume;
}

export async function removeResume(hash) {
  const res = await fetch(`${API_BASE}/api/resumes/${hash}`, { method: "DELETE" });
  const data = await handleResponse(res);
  return data.resumes;
}

export async function clearResumes() {
  const res = await fetch(`${API_BASE}/api/resumes`, { method: "DELETE" });
  const data = await handleResponse(res);
  return data.resumes;
}

/** Extracts required skills + extra keywords from free-text JD (used when creating job postings). */
export async function extractJDKeywords(jobDescription) {
  const res = await fetch(`${API_BASE}/api/jd/keywords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobDescription }),
  });
  return handleResponse(res); // { requiredSkills, extraKeywords }
}
