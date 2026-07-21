import { useOutletContext } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { HIRING_FUNNEL } from "../../data/mockDashboardData";

export default function Analytics() {
  const { darkMode } = useOutletContext();
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
        <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Candidate progression through your hiring funnel.
        </p>
      </div>

      <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
        <h3 className="font-semibold">Hiring Funnel</h3>
        <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          Candidate progression through each stage
        </p>
        <div className="h-64 sm:h-72 mt-4 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HIRING_FUNNEL} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#e2e8f0"} vertical={false} />
              <XAxis dataKey="stage" stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={darkMode ? "#64748b" : "#94a3b8"} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: darkMode ? "#0f172a" : "#fff", border: `1px solid ${darkMode ? "#1e293b" : "#e2e8f0"}`, borderRadius: 10, fontSize: 13 }} />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
