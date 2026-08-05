import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import API from "../api/authApi";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

export default function Register({ darkMode , setDarkMode }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }
    try {
  const response = await API.post("/register", {
    name,
    email,
    password,
    role,
  });

  alert(response.data.message);
  navigate(`/login/${role}`);

  // Clear the form
  setName("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
  setAcceptTerms(false);

} catch (error) {
  alert(
    error.response?.data?.message || "Registration Failed"
  );
}
  };

  return (
    <div
  className={`min-h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden ${
    darkMode
      ? "bg-slate-950"
      : "bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200"
  }`}
>
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
       <Link
        to="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
      >
        <FaArrowLeft size={14} />
        Back to home
      </Link>
      

      <div
  className={`relative z-10 w-full max-w-4xl h-[600px] rounded-[24px] overflow-hidden shadow-2xl grid md:grid-cols-[1fr_1fr] ${
    darkMode ? "bg-slate-900" : "bg-white"
  }`}
>
        {/* LEFT PANEL */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Join With Us</h1>
            <p className="mt-5 text-lg leading-8 text-slate-200 max-w-sm mx-auto">
              Create your account to upload your resume, receive AI-powered
              analysis, discover your strengths, and unlock opportunities
              tailored to your skills.
            </p>
            <button className="mt-8 px-8 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition">
              Get Started
            </button>

            <div className="mt-10 space-y-4 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-lg">✔</span>
                <p>Create Your Professional Profile</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-lg">✔</span>
                <p>AI-Based Resume Evaluation</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-lg">✔</span>
                <p>Personalized Career Insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2
  className={`text-2xl font-bold text-center ${
    darkMode ? "text-white" : "text-gray-800"
  }`}
>
              REGISTER
            </h2>
           <p
  className={`text-sm text-center mt-2 mb-6 ${
    darkMode ? "text-gray-300" : "text-gray-500"
  }`}
>
              Create your new account
            </p>

            {/* FULL NAME */}
            <div className="mb-4">
              <label
  className={`text-sm font-medium ${
    darkMode ? "text-gray-200" : "text-gray-700"
  }`}
>
                Full Name
              </label>
              <div
  className={`mt-2 flex items-center h-10 rounded-lg border px-3 transition ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-gray-50 border-gray-300"
  }`}
>
                <FaUser className="text-blue-700 mr-2 text-sm" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full outline-none text-sm ${
  darkMode
    ? "bg-slate-800 text-white placeholder-gray-400"
    : "bg-gray-50 text-black placeholder-gray-500"
}`}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label
  className={`text-sm font-medium ${
    darkMode ? "text-gray-200" : "text-gray-700"
  }`}
>Email</label>
              <div
  className={`mt-2 flex items-center h-10 rounded-lg border px-3 transition ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-gray-50 border-gray-300"
  }`}
>
                <FaEnvelope className="text-blue-700 mr-2 text-sm" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full outline-none text-sm ${
  darkMode
    ? "bg-slate-800 text-white placeholder-gray-400"
    : "bg-gray-50 text-black placeholder-gray-500"
}`}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label
  className={`text-sm font-medium ${
    darkMode ? "text-gray-200" : "text-gray-700"
  }`}
>
                Password
              </label>
              <div
  className={`mt-2 flex items-center h-10 rounded-lg border px-3 transition ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-gray-50 border-gray-300"
  }`}
>
                <FaLock className="text-blue-700 mr-2 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full outline-none text-sm ${
  darkMode
    ? "bg-slate-800 text-white placeholder-gray-400"
    : "bg-gray-50 text-black placeholder-gray-500"
}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 text-sm" />
                  ) : (
                    <FaEye className="text-gray-500 text-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
  className={`text-sm font-medium ${
    darkMode ? "text-gray-200" : "text-gray-700"
  }`}
>
                Confirm Password
              </label>
              <div
  className={`mt-2 flex items-center h-10 rounded-lg border px-3 transition ${
    darkMode
      ? "bg-slate-800 border-slate-600"
      : "bg-gray-50 border-gray-300"
  }`}
>
                <FaLock className="text-blue-700 mr-2 text-sm" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full outline-none text-sm ${
  darkMode
    ? "bg-slate-800 text-white placeholder-gray-400"
    : "bg-gray-50 text-black placeholder-gray-500"
}`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500 text-sm" />
                  ) : (
                    <FaEye className="text-gray-500 text-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <div
  className={`flex items-center gap-2 mt-4 text-sm ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`}
>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="accent-blue-700"
              />
              <span>
                I agree to the
                <a href="#" className="text-blue-700 ml-1 hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            {/* REGISTER BUTTON */}
            <button
              onClick={handleRegister}
              className="w-full h-10 mt-5 rounded-lg bg-gradient-to-r from-slate-900 to-blue-700 text-white text-sm font-semibold hover:opacity-95 transition"
            >
              Create Account
            </button>

            {/* LOGIN */}
            <p
  className={`text-center mt-5 text-sm ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`}
>
              Already have an account?
              <Link
                to={`/login/${role}`}
                className="text-blue-700 font-semibold ml-2 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
