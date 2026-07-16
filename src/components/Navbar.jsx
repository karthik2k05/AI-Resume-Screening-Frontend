import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ScanSearch, ChevronDown, UserCog, Users, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const LOGIN_OPTIONS = [
  { label: "Admin", role: "admin", icon: UserCog },
  { label: "HR", role: "hr", icon: Users },
  { label: "Candidate", role: "candidate", icon: User },
];

export default function Navbar({ darkMode, setDarkMode, activePage = "Home" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        darkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center gap-4 sm:gap-6">

        {/* Logo */}
        <a href="#" className="shrink-0 flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm shadow-blue-600/30 group-hover:shadow-md group-hover:shadow-blue-600/40 transition-shadow">
            <ScanSearch size={18} className="text-white" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <h1 className="text-base sm:text-lg font-bold tracking-tight">
              ResumeIQ
              <span className="text-blue-600">AI</span>
            </h1>
            <p
              className={`hidden sm:block text-[11px] font-medium tracking-wide uppercase ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Recruitment Intelligence
            </p>
          </div>
        </a>

        {/* Menu */}
        <ul
          className={`hidden lg:flex items-center gap-1 text-sm font-medium ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.label === activePage;
            const linkClasses = `block px-4 py-2 rounded-full transition-colors ${
              isActive
                ? darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-white"
                : darkMode
                ? "hover:bg-slate-800/70 hover:text-white"
                : "hover:bg-slate-100 hover:text-slate-900"
            }`;
            return (
              <li key={link.label}>
                {link.to ? (
                  <Link to={link.to} className={linkClasses}>
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={linkClasses}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-1.5 sm:gap-3">

          {/* Login dropdown */}
          <div className="relative hidden sm:block" ref={loginRef}>
            <button
              onClick={() => setLoginOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={loginOpen}
              className={`flex items-center gap-1.5 text-sm font-medium px-3.5 sm:px-4 py-2 rounded-full transition-colors ${
                darkMode
                  ? "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              Login
              <ChevronDown
                size={15}
                className={`transition-transform ${loginOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {loginOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={`absolute right-0 mt-2 w-44 rounded-xl border shadow-lg overflow-hidden ${
                    darkMode
                      ? "bg-slate-900 border-slate-800"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {LOGIN_OPTIONS.map(({ label, role, icon: Icon }) => (
                    <Link
                      key={label}
                      to={`/login/${role}`}
                      onClick={() => setLoginOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                        darkMode
                          ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon size={16} />
                      {label} Login
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

          <span
            className={`hidden sm:block w-px h-6 ${
              darkMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          />

          <Link
            to="/register"
            className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 sm:px-5 py-2 rounded-lg font-semibold shadow-sm shadow-blue-600/30 hover:shadow-md hover:shadow-blue-600/40 transition-all"
          >
            Start Free Trial
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode
                ? "text-slate-300 hover:bg-slate-800"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`lg:hidden border-t overflow-hidden ${
              darkMode ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200"
            }`}
          >
            <div className="px-4 sm:px-6 py-4">
              <ul
                className={`flex flex-col gap-1 text-sm font-medium ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {NAV_LINKS.map((link) => {
                  const isActive = link.label === activePage;
                  const linkClasses = `block px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "hover:bg-slate-800"
                      : "hover:bg-slate-100"
                  }`;
                  return (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          onClick={() => setMobileOpen(false)}
                          className={linkClasses}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={linkClasses}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Mobile login options */}
              <div
                className={`mt-3 pt-3 border-t ${
                  darkMode ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <p
                  className={`px-3 pb-1.5 text-xs font-semibold uppercase tracking-wide ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Login as
                </p>
                <ul className="flex flex-col gap-1 text-sm font-medium">
                  {LOGIN_OPTIONS.map(({ label, role, icon: Icon }) => (
                    <li key={label}>
                      <Link
                        to={`/login/${role}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${
                          darkMode
                            ? "text-slate-300 hover:bg-slate-800"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Icon size={16} />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2.5 rounded-lg font-semibold shadow-sm shadow-blue-600/30 transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
