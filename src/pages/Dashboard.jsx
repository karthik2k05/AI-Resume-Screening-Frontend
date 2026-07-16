import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import AdminHrOverview from "../components/dashboard/AdminHrOverview";
import CandidateOverview from "../components/dashboard/CandidateOverview";

const ROLE_LABELS = {
  admin: "Admin",
  hr: "HR",
  candidate: "Candidate",
};

export default function Dashboard({ darkMode, setDarkMode }) {
  const { role: rawRole } = useParams();
  const role = ROLE_LABELS[rawRole] ? rawRole : "candidate";
  const roleLabel = ROLE_LABELS[role];
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {role === "candidate" ? (
            <CandidateOverview darkMode={darkMode} />
          ) : (
            <AdminHrOverview darkMode={darkMode} roleLabel={roleLabel} />
          )}
        </main>
      </div>
    </div>
  );
}
