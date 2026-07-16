import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatCard({ darkMode, icon: Icon, label, value, delta, deltaLabel, positive, tint }) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${tint}`}
        >
          <Icon size={20} className="text-white" strokeWidth={2.25} />
        </div>
        {delta !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              positive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {delta}
          </span>
        )}
      </div>

      <p className={`mt-4 text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
        {label}
      </p>
      <h3 className="mt-1 text-2xl sm:text-3xl font-bold">{value}</h3>
      {deltaLabel && (
        <p className={`mt-1 text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          {deltaLabel}
        </p>
      )}
    </div>
  );
}
