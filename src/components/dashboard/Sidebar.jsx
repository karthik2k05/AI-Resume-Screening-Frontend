import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ChartColumn,
  Settings,
  ScanSearch,
  X,
  LogOut,
  FileText,
  MessageSquare,
} from "lucide-react";

function navFor(role) {
  const base = `/dashboard/${role}`;
  if (role === "candidate") {
    return [
      { label: "Overview", icon: LayoutDashboard, to: base, end: true },
      { label: "My Applications", icon: FileText, to: `${base}/applications` },
      { label: "Job Matches", icon: Briefcase, to: `${base}/matches` },
      { label: "Settings", icon: Settings, to: `${base}/settings` },
    ];
  }
  if (role === "admin") {
  return [
    { label: "Overview", icon: LayoutDashboard, to: base, end: true },
    { label: "Candidates", icon: Users, to: `${base}/candidates` },
    { label: "Job Postings", icon: Briefcase, to: `${base}/jobs` },
    { label: "Analytics", icon: ChartColumn, to: `${base}/analytics` },

    // NEW
    { label: "Support Chats", icon: MessageSquare, to: `${base}/support` },

    { label: "Settings", icon: Settings, to: `${base}/settings` },
  ];
}

if (role === "hr") {
  return [
    { label: "Overview", icon: LayoutDashboard, to: base, end: true },
    { label: "Candidates", icon: Users, to: `${base}/candidates` },
    { label: "Job Postings", icon: Briefcase, to: `${base}/jobs` },
    { label: "Analytics", icon: ChartColumn, to: `${base}/analytics` },
    { label: "Settings", icon: Settings, to: `${base}/settings` },
  ];
}
}

export default function Sidebar({ darkMode, role, mobileOpen, onClose }) {
  const navItems = navFor(role);

  const content = (
    <div
      className={`flex h-full w-64 flex-col border-r shadow-sm ${
        darkMode ? "bg-slate-900 border-slate-800 shadow-black/20" : "bg-white border-slate-200 shadow-slate-200/60"
      }`}
    >
      <div
        className={`flex items-center justify-between px-5 h-16 shrink-0 border-b ${
          darkMode ? "border-slate-800" : "border-slate-200"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm shadow-blue-600/30">
            <ScanSearch size={16} className="text-white" strokeWidth={2.25} />
          </div>
          <span className="text-base font-bold tracking-tight">
            ResumeIQ<span className="text-blue-600">AI</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className={`lg:hidden p-1.5 rounded-lg ${
            darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
          }`}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, to, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div
        className={`px-3 py-4 border-t ${
          darkMode ? "border-slate-800" : "border-slate-200"
        }`}
      >
        <Link
          to="/"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            darkMode
              ? "text-slate-400 hover:bg-slate-800 hover:text-white"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <LogOut size={18} />
          Log out
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block shrink-0">{content}</aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden shadow-2xl"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
