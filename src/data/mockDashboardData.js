// Temporary mock data. Once the backend is connected (see src/lib/api.js),
// delete this file and fetch the same shapes from your API instead —
// every component here imports from this single file, so there's one
// place to swap, not five.

export const APPLICANT_TREND = [
  { month: "Feb", applicants: 145 },
  { month: "Mar", applicants: 210 },
  { month: "Apr", applicants: 189 },
  { month: "May", applicants: 264 },
  { month: "Jun", applicants: 298 },
  { month: "Jul", applicants: 342 },
];

export const SOURCE_BREAKDOWN = [
  { name: "LinkedIn", value: 38, color: "#2563eb" },
  { name: "Job Boards", value: 26, color: "#0ea5e9" },
  { name: "Referrals", value: 22, color: "#22c55e" },
  { name: "Company Site", value: 14, color: "#f59e0b" },
];

export const HIRING_FUNNEL = [
  { stage: "Applied", count: 1284 },
  { stage: "Screened", count: 612 },
  { stage: "Interviewed", count: 268 },
  { stage: "Offered", count: 74 },
  { stage: "Hired", count: 51 },
];

export const STAGES = ["Screening", "Interview Scheduled", "Offer Sent", "Hired"];

export const INITIAL_CANDIDATES = [
  { id: 1, name: "Ananya Rao", role: "Senior Frontend Developer", applied: "2 days ago", score: 94, status: "Interview Scheduled" },
  { id: 2, name: "Kevin Chao", role: "Backend Engineer (Node.js)", applied: "3 days ago", score: 88, status: "Screening" },
  { id: 3, name: "Priya Nathan", role: "UX Designer", applied: "5 days ago", score: 76, status: "Screening" },
  { id: 4, name: "Marcus Webb", role: "DevOps Engineer", applied: "1 week ago", score: 91, status: "Offer Sent" },
  { id: 5, name: "Sara Malik", role: "Data Analyst", applied: "1 week ago", score: 68, status: "Rejected" },
  { id: 6, name: "Daniel Osei", role: "Product Manager", applied: "4 days ago", score: 83, status: "Interview Scheduled" },
  { id: 7, name: "Linh Tran", role: "QA Engineer", applied: "6 days ago", score: 79, status: "Screening" },
  { id: 8, name: "Ahmed Farouk", role: "Full Stack Developer", applied: "2 weeks ago", score: 96, status: "Hired" },
];

export const INITIAL_POSTINGS = [
  { id: 1, title: "Senior Frontend Developer", dept: "Engineering", applicants: 142, status: "Open" },
  { id: 2, title: "Backend Engineer (Node.js)", dept: "Engineering", applicants: 98, status: "Open" },
  { id: 3, title: "UX Designer", dept: "Design", applicants: 61, status: "Open" },
  { id: 4, title: "DevOps Engineer", dept: "Infrastructure", applicants: 47, status: "Closed" },
  { id: 5, title: "Product Manager", dept: "Product", applicants: 73, status: "Open" },
];

export const STATUS_STYLES = {
  Screening: "bg-amber-100 text-amber-700",
  "Interview Scheduled": "bg-blue-100 text-blue-700",
  "Offer Sent": "bg-indigo-100 text-indigo-700",
  Hired: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

export const APPLICATIONS = [
  { id: 1, role: "Frontend Developer", company: "Northwind Labs", applied: "5 days ago", status: "Interview Scheduled" },
  { id: 2, role: "UI Engineer", company: "Bridgeform", applied: "12 days ago", status: "Under Review" },
  { id: 3, role: "React Developer", company: "Solstice Tech", applied: "20 days ago", status: "Rejected" },
  { id: 4, role: "Product Designer", company: "Kestrel Studio", applied: "2 days ago", status: "Application Received" },
];

export const APPLICATION_STATUS_STYLES = {
  "Interview Scheduled": "bg-blue-100 text-blue-700",
  "Under Review": "bg-amber-100 text-amber-700",
  "Application Received": "bg-slate-200 text-slate-600",
  Rejected: "bg-rose-100 text-rose-700",
};

export const SKILL_MATCH = [
  { skill: "React", value: 95 },
  { skill: "JavaScript", value: 90 },
  { skill: "CSS", value: 85 },
  { skill: "Node.js", value: 70 },
  { skill: "SQL", value: 60 },
];

export const RECOMMENDED_JOBS = [
  { id: 1, role: "Senior Frontend Engineer", company: "Vertex Applications", location: "Remote", match: 91 },
  { id: 2, role: "Full Stack Developer", company: "Ironleaf Systems", location: "Bengaluru, IN", match: 84 },
  { id: 3, role: "React Native Developer", company: "Compass Mobile", location: "Remote", match: 77 },
];

export function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
