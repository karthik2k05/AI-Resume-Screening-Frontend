const HISTORY_KEY = "resumeiq_resume_history";
const LAST_RESULT_KEY = "resumeiq_last_analysis";
const MAX_HISTORY = 20;

function safeParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function getResumeHistory() {
  return safeParse(localStorage.getItem(HISTORY_KEY), []);
}

export function findAnalysisByHash(hash) {
  return getResumeHistory().find((entry) => entry.hash === hash) || null;
}

/**
 * Upserts by content hash — uploading the exact same resume twice
 * updates its timestamp instead of adding a second row, so the
 * history list never contains duplicate entries for one resume.
 */
export function saveAnalysis(result) {
  const history = getResumeHistory();
  const existingIndex = history.findIndex((entry) => entry.hash === result.hash);

  const entry = {
    hash: result.hash,
    fileName: result.fileName,
    analyzedAt: result.analyzedAt,
    score: result.score.overall,
  };

  if (existingIndex >= 0) {
    history[existingIndex] = entry;
  } else {
    history.unshift(entry);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
}

export function getLastAnalysis() {
  return safeParse(localStorage.getItem(LAST_RESULT_KEY), null);
}

export function clearLastAnalysis() {
  localStorage.removeItem(LAST_RESULT_KEY);
}

// --- HR bulk screening: separate store, also deduped by content hash ---
const HR_BATCH_KEY = "resumeiq_hr_batch";
const MAX_BATCH = 100;

export function getHrBatch() {
  return safeParse(localStorage.getItem(HR_BATCH_KEY), []);
}

export function findHrBatchByHash(hash) {
  return getHrBatch().find((entry) => entry.hash === hash) || null;
}

/**
 * Upserts a screened resume into the shared HR batch by content hash —
 * re-uploading the same file (even under a different name) updates the
 * existing record instead of creating a duplicate row in the results.
 */
export function saveHrBatchEntry(entry) {
  const batch = getHrBatch();
  const existingIndex = batch.findIndex((e) => e.hash === entry.hash);
  if (existingIndex >= 0) {
    batch[existingIndex] = entry;
  } else {
    batch.unshift(entry);
  }
  localStorage.setItem(HR_BATCH_KEY, JSON.stringify(batch.slice(0, MAX_BATCH)));
  return batch;
}

export function removeHrBatchEntry(hash) {
  const batch = getHrBatch().filter((e) => e.hash !== hash);
  localStorage.setItem(HR_BATCH_KEY, JSON.stringify(batch));
  return batch;
}

export function clearHrBatch() {
  localStorage.removeItem(HR_BATCH_KEY);
}
