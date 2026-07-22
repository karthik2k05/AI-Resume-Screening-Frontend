export const searchItems = [

   {
    title: "Dashboard",
    type: "Page",
    roles: ["admin", "hr", "candidate"],
    path: "/dashboard",
  },
  {
    title: "Candidates",
    type: "Page",
    roles: ["admin", "hr"],
    path: "candidates",
  },
  {
    title: "Jobs",
    type: "Page",
    roles: ["admin", "hr"],
    path: "jobs",
  },
  {
    title: "Analytics",
    type: "Page",
    roles: ["admin", "hr"],
    path: "analytics",
  },
  {
    title: "Support Chat",
    type: "Feature",
    roles: ["admin", "hr", "candidate"],
    path: "support",
  },

  // Candidate
  {
    title: "Applications",
    type: "Page",
    roles: ["candidate"],
    path: "applications",
  },
  {
    title: "Job Matches",
    type: "Page",
    roles: ["candidate"],
    path: "matches",
  },

  // Shared
  {
    title: "Settings",
    type: "Page",
    roles: ["admin", "hr", "candidate"],
    path: "settings",
  },

  {
    title: "AI Chatbot",
    type: "Feature",
    roles: ["candidate"],
    path: "#chatbot",
  },

  {
    title: "Upload Resume",
    type: "Feature",
    roles: ["candidate"],
    path: "applications",
  },
  {
    title: "Overview",
    type: "page",
    roles: ["admin", "hr", "candidate"],
    path: "overview",
  },


];