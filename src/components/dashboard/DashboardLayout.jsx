import { useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const VALID_ROLES = ["admin", "hr", "candidate"];

export default function DashboardLayout({ darkMode, setDarkMode }) {
  const { role: rawRole } = useParams();
  const role = VALID_ROLES.includes(rawRole) ? rawRole : "candidate";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      <Sidebar
        darkMode={darkMode}
        role={role}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          role={role}
          onMenuClick={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Whichever sidebar page is active renders here via nested routes */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet context={{ darkMode, role, searchQuery }} />
        </main>
      </div>
    </div>
  );
}
