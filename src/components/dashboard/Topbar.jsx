import { Menu, Search, Bell, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchItems } from "../../data/searchItems";
import SearchAPI from "../../api/searchApi";

const ROLE_LABELS = {
  admin: "Admin",
  hr: "HR",
  candidate: "Candidate",
};

export default function Topbar({ darkMode, setDarkMode, role, onMenuClick, searchQuery, setSearchQuery }) {
  const roleLabel = ROLE_LABELS[role] || "Candidate";
  const initials = roleLabel.slice(0, 2).toUpperCase();
  const isCandidate = role === "candidate";
  const navigate = useNavigate();

const [showResults, setShowResults] = useState(false);
const [dbResults, setDbResults] = useState({
  users: [],
  jobs: [],
  applications: [],
  tickets: [],
  messages: [],
});

const filteredResults = useMemo(() => {
  if (!searchQuery.trim()) return [];

  return searchItems.filter(
    (item) =>
      item.roles.includes(role) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery, role]);
      useEffect(() => {
  const fetchResults = async () => {
    if (searchQuery.trim().length < 2) {
      setDbResults({
        users: [],
        jobs: [],
        applications: [],
        tickets: [],
        messages: [],
      });
      return;
    }

    try {
      const res = await SearchAPI.search(searchQuery);
      

      setDbResults(res.data);
      

    } catch (err) {
      console.error(err);
    }
  };

  const timer = setTimeout(fetchResults, 300);

  return () => clearTimeout(timer);

}, [searchQuery]);

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
          className={`relative hidden sm:block flex items-center gap-2 rounded-lg border px-3 py-2 ${
            darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}
        >
          <Search size={16} className={darkMode ? "text-slate-500" : "text-slate-400"} />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setShowResults(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isCandidate
                ? "Search jobs, applications..."
                : "Search candidates, jobs..."
          }
          className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
        />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} aria-label="Clear search" className="shrink-0">
              <X size={15} className={darkMode ? "text-slate-500" : "text-slate-400"} />
            </button>
          )}
        </div>
      </div>
      {showResults && (
  <div
    className={`absolute top-full mt-3 w-full rounded-lg shadow-lg border z-50 overflow-hidden ${
      darkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-white border-slate-200"
    }`}
  >
    {/* ---------------- Pages ---------------- */}

    {filteredResults.length > 0 && (
      <>
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
          Pages
        </div>

        {filteredResults.map((item) => (
          <button
            key={item.title}
            onClick={() => {
              setSearchQuery("");
              setShowResults(false);

              if (item.path === "#chatbot") {
                window.dispatchEvent(new Event("open-chatbot"));
              } else if (item.path === "/dashboard") {
                navigate(`/dashboard/${role}`);
              } else {
                navigate(`/dashboard/${role}/${item.path}`);
              }
            }}
            className={`w-full text-left px-4 py-2 ${
              darkMode
                ? "hover:bg-slate-800"
                : "hover:bg-blue-50"
            }`}
          >
            <div className="text-sm font-semibold">
              {item.title}
            </div>

            <div className="text-[11px] text-gray-500">
              {item.type}
            </div>
          </button>
        ))}
      </>
    )}

    {/* ---------------- Users ---------------- */}

    {dbResults.users.length > 0 && (
      <>
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t">
          Users
        </div>

        {dbResults.users.map((user) => (
          <button onClick={() => {
  navigate(`/dashboard/candidates`);
  setShowResults(false);
  setSearchQuery("");
}}
            key={user.user_id}
            className={`w-full text-left px-4 py-2 ${
              darkMode
                ? "hover:bg-slate-800"
                : "hover:bg-blue-50"
            }`}
          >
            <div className="font-medium">
              {user.name}
            </div>

            <div className="text-xs text-gray-500">
              {user.role}
            </div>
          </button>
        ))}
      </>
    )}

    {/* ---------------- Jobs ---------------- */}

    {dbResults.jobs.length > 0 && (
      <>
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t">
          Jobs
        </div>

        {dbResults.jobs.map((job) => (
          <button onClick={() => {
  navigate(`/dashboard/${role}/jobs`);
  setShowResults(false);
  setSearchQuery("");
}}
            key={job.job_id}
            className={`w-full text-left px-4 py-2 ${
              darkMode
                ? "hover:bg-slate-800"
                : "hover:bg-blue-50"
            }`}
          >
            <div className="font-medium">
              {job.job_title}
            </div>

            <div className="text-xs text-gray-500">
              {job.required_skills}
            </div>
          </button>
        ))}
      </>
    )}

    {/* ---------------- Support Tickets ---------------- */}

    {dbResults.tickets.length > 0 && (
      <>
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t">
          Support Tickets
        </div>

        {dbResults.tickets.map((ticket) => (
          <button onClick={() => {
  navigate(`/dashboard/${role}/support`);
  setShowResults(false);
  setSearchQuery("");
}}
            key={ticket.ticket_id}
            className={`w-full text-left px-4 py-2 ${
              darkMode
                ? "hover:bg-slate-800"
                : "hover:bg-blue-50"
            }`}
          >
            <div className="font-medium">
              {ticket.issue_type}
            </div>

            <div className="text-xs text-gray-500">
              {ticket.status}
            </div>
          </button>
        ))}
      </>
    )}

    {/* ---------------- Messages ---------------- */}

    {dbResults.messages.length > 0 && (
      <>
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-t">
          Messages
        </div>

        {dbResults.messages.map((msg) => (
          <button onClick={() => {
  navigate(`/dashboard/${role}/support`);
  setShowResults(false);
  setSearchQuery("");
}}
            key={msg.message_id}
            className={`w-full text-left px-4 py-2 ${
              darkMode
                ? "hover:bg-slate-800"
                : "hover:bg-blue-50"
            }`}
          >
            <div className="font-medium truncate">
              {msg.message}
            </div>

            <div className="text-xs text-gray-500">
              {msg.sender}
            </div>
          </button>
        ))}
      </>
    )}
  </div>
)}

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
