import { Briefcase, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoleSelectionModal({
  open,
  onClose,
  darkMode,
  selectedPlan,
}) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleRoleSelect = (role) => {
    navigate(`/login/${role}`, {
      state: {
        selectedPlan,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`w-[90%] max-w-md rounded-2xl shadow-2xl p-6 ${
          darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Continue As
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <p
          className={`mt-2 text-sm ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Choose how you want to continue.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">

          <button
            onClick={() => handleRoleSelect("candidate")}
            className={`rounded-xl border p-6 transition-all hover:scale-105 ${
              darkMode
                ? "border-slate-700 hover:border-blue-500"
                : "border-slate-300 hover:border-blue-500"
            }`}
          >
            <User
              size={40}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 font-semibold">
              Candidate
            </h3>

            <p className="text-xs mt-2 text-slate-500">
              Upload resumes and apply for jobs
            </p>
          </button>

          <button
            onClick={() => handleRoleSelect("hr")}
            className={`rounded-xl border p-6 transition-all hover:scale-105 ${
              darkMode
                ? "border-slate-700 hover:border-blue-500"
                : "border-slate-300 hover:border-blue-500"
            }`}
          >
            <Briefcase
              size={40}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 font-semibold">
              HR
            </h3>

            <p className="text-xs mt-2 text-slate-500">
              Screen resumes and hire candidates
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}