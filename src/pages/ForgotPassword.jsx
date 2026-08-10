import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword({ darkMode }) {
const navigate = useNavigate();

const [email, setEmail] = useState("");

//forgot password
const handleForgotPassword = async (e) => {
  e.preventDefault();

  if (!email) {
    alert("Please enter your email.");
    return;
  }
 
  try {
  await sendPasswordResetEmail(auth, email, {
    url: "http://localhost:5173/login/candidate",
    handleCodeInApp: false,
  });

  alert("Password reset link sent to your email");

  navigate("/login/candidate");

} catch (error) {
  console.log(error);

  if (error.code === "auth/user-not-found") {
    alert("Email not registered");
  } else if (error.code === "auth/invalid-email") {
    alert("Invalid email");
  } else {
    alert("Failed to send reset email");
  }
}
};

return (
  <div
    className={`min-h-screen flex items-center justify-center ${
      darkMode ? "bg-[#020617]" : "bg-slate-200"
    }`}
  >
    <div
      className={`rounded-xl shadow-lg p-8 w-full max-w-md ${
        darkMode
          ? "bg-slate-900 border border-slate-700"
          : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold text-center mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Forgot Password
      </h2>

      {/* EMAIL */}
      <div className="mb-5">
        <label
          className={`text-sm font-medium ${
            darkMode ? "text-slate-200" : "text-gray-700"
          }`}
        >
          Email
        </label>

        <div
          className={`mt-2 flex items-center h-12 rounded-xl border px-4 transition ${
            darkMode
              ? "bg-slate-800/70 border-slate-700 focus-within:border-blue-500"
              : "bg-gray-50 border-gray-300 focus-within:border-blue-500"
          }`}
        >
          <FaEnvelope className="text-blue-500 mr-3" />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full outline-none text-sm ${
              darkMode
                ? "bg-transparent text-white placeholder-slate-400"
                : "bg-transparent text-black placeholder-gray-500"
            }`}
          />
        </div>
      </div>

      {/* SEND RESET LINK */}
      <button
        onClick={handleForgotPassword}
        className="
          w-full
          h-12
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          font-semibold
          shadow-lg
          shadow-blue-900/30
          hover:opacity-90
          transition
        "
      >
        Send Reset Link
      </button>
    </div>
  </div>
);
}
