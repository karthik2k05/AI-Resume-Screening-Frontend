import { Menu, Search, Bell, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

const ROLE_LABELS = {
  admin: "Admin",
  hr: "HR",
  candidate: "Candidate",
};

export default function Topbar({ darkMode, setDarkMode, role, onMenuClick, searchQuery, setSearchQuery }) {
  const roleLabel = ROLE_LABELS[role] || "Candidate";
  const initials = roleLabel.slice(0, 2).toUpperCase();
  const isCandidate = role === "candidate";

  return (
    <header
      className={`sticky top-0 z-30 h-16 flex items-center gap-3 sm:gap-4 px-4 sm:px-6 border-b backdrop-blur-xl ${
        darkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
      }`}
    >
      <button
        onClick={onMenuClick}
        className={`lg:hidden p-2 rounded-lg ${
          darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
        }`}
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 min-w-0">
        <div
          className={`hidden sm:flex items-center gap-2 rounded-lg border px-3 py-2 ${
            darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}
        >
          <Search size={16} className={darkMode ? "text-slate-500" : "text-slate-400"} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isCandidate ? "Search jobs, applications..." : "Search candidates, jobs..."}
            className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} aria-label="Clear search" className="shrink-0">
              <X size={15} className={darkMode ? "text-slate-500" : "text-slate-400"} />
            </button>
          )}
        </div>
      </div>

      <button
        className={`relative p-2 rounded-lg transition-colors ${
          darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
        }`}
        aria-label="Notifications"
      >
        <Bell size={19} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
      </button>

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
          {initials}
        </div>
        <div className="hidden sm:block leading-tight">
          <p className="text-sm font-semibold">{roleLabel} User</p>
          <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            {roleLabel} Portal
          </p>
        </div>
      </div>
    </header>
  );
}
