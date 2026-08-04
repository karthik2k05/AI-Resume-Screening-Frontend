import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({
  darkMode,
  setDarkMode,
}) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center justify-center w-10 h-10 rounded-lg transition
      ${
        darkMode
          ? "bg-slate-800 hover:bg-slate-700"
          : "bg-slate-200 hover:bg-slate-300"
      }`}
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}