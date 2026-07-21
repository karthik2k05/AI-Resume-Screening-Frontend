import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { APPLICATIONS, APPLICATION_STATUS_STYLES } from "../../data/mockDashboardData";

export default function Applications() {
  const { darkMode, searchQuery } = useOutletContext();
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const filteredApplications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return APPLICATIONS;
    return APPLICATIONS.filter(
      (a) => a.role.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.status.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">My Applications</h1>
        <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Track the status of every role you've applied to.
        </p>
      </div>

      <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
        <div className="divide-y">
          {filteredApplications.length === 0 ? (
            <p className={`px-5 sm:px-6 py-8 text-center text-sm ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              No applications match "{searchQuery}"
            </p>
          ) : (
            filteredApplications.map((a) => (
              <div key={a.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 sm:px-6 py-4 border-t first:border-t-0 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                    <Briefcase size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{a.role}</p>
                    <p className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                      {a.company} · Applied {a.applied}
                    </p>
                  </div>
                </div>
                <span className={`self-start sm:self-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${APPLICATION_STATUS_STYLES[a.status]}`}>
                  {a.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
