import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  Settings,
  ScanSearch,
  X,
  LogOut,
  FileText,
} from "lucide-react";

const ADMIN_HR_NAV = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Candidates", icon: Users },
  { label: "Job Postings", icon: Briefcase },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

const CANDIDATE_NAV = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "My Applications", icon: FileText },
  { label: "Job Matches", icon: Briefcase },
  { label: "Settings", icon: Settings },
];

export default function Sidebar({ darkMode, role, mobileOpen, onClose }) {
  const navItems = role === "candidate" ? CANDIDATE_NAV : ADMIN_HR_NAV;

  const content = (
    <div
      className={`flex h-full w-64 flex-col border-r ${
        darkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between px-5 h-16 shrink-0">
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
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-blue-600 text-white"
                : darkMode
                ? "text-slate-400 hover:bg-slate-900 hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
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
              ? "text-slate-400 hover:bg-slate-900 hover:text-white"
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
      {/* Desktop sidebar */}
      <aside className="hidden lg:block shrink-0">{content}</aside>

      {/* Mobile sidebar drawer */}
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
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
