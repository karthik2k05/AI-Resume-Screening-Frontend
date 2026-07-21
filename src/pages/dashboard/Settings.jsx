import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Check, Eye, EyeOff } from "lucide-react";

const ROLE_LABELS = { admin: "Admin", hr: "HR", candidate: "Candidate" };

function Toggle({ checked, onChange, darkMode }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
        checked ? "bg-blue-600" : darkMode ? "bg-slate-700" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SectionCard({ title, desc, darkMode, children }) {
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
      <h3 className="font-semibold">{title}</h3>
      {desc && <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{desc}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { darkMode, role } = useOutletContext();
  const roleLabel = ROLE_LABELS[role] || "Candidate";

  const [name, setName] = useState(`${roleLabel} User`);
  const [email, setEmail] = useState(`${role}@example.com`);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [notifications, setNotifications] = useState({
    email: true,
    productUpdates: false,
    weeklyDigest: true,
  });

  const [saved, setSaved] = useState(false);

  const inputClasses = `w-full rounded-lg px-3 py-2.5 text-sm outline-none border transition-colors focus:ring-2 focus:ring-blue-500 ${
    darkMode ? "bg-slate-800 border-slate-700 placeholder-slate-500" : "bg-slate-50 border-slate-300 placeholder-slate-400"
  }`;

  function handleSave() {
    // TODO: replace with a real API call once the backend is connected,
    // e.g. await updateProfile({ name, email, notifications })
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Account and notification preferences.
        </p>
      </div>

      <SectionCard title="Profile" desc="Your personal information." darkMode={darkMode}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Full name
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Email
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputClasses} />
          </div>
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Role
          </label>
          <input value={roleLabel} disabled className={`${inputClasses} opacity-60 cursor-not-allowed`} />
        </div>
      </SectionCard>

      <SectionCard title="Password" desc="Change your account password." darkMode={darkMode}>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className={`${inputClasses} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Notifications" desc="What you get emailed about." darkMode={darkMode}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Email notifications</p>
            <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              Status changes on candidates or applications
            </p>
          </div>
          <Toggle
            darkMode={darkMode}
            checked={notifications.email}
            onChange={(v) => setNotifications((n) => ({ ...n, email: v }))}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Product updates</p>
            <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              New features and announcements
            </p>
          </div>
          <Toggle
            darkMode={darkMode}
            checked={notifications.productUpdates}
            onChange={(v) => setNotifications((n) => ({ ...n, productUpdates: v }))}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Weekly digest</p>
            <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              Summary every Monday morning
            </p>
          </div>
          <Toggle
            darkMode={darkMode}
            checked={notifications.weeklyDigest}
            onChange={(v) => setNotifications((n) => ({ ...n, weeklyDigest: v }))}
          />
        </div>
      </SectionCard>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm shadow-blue-600/30 transition-colors"
        >
          Save changes
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
            <Check size={16} />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
