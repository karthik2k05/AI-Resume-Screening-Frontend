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
  FaRobot,
  FaChartBar,
  FaUserCheck,
} from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register({ darkMode }) {
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
  // Create Firebase account
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const firebaseUser = userCredential.user;

  // Save user in PostgreSQL
  await API.post("/register", {
    name,
    email,
    password,
    firebase_uid: firebaseUser.uid,
    role: "candidate",
  });

  alert("Registration Successful");

  setName("");
  setEmail("");
  setPassword("");
  setConfirmPassword("");
  setAcceptTerms(false);

  navigate("/login/candidate");

} catch (error) {
  console.log(error);
  alert(error.message || "Registration Failed");
}
  };

return (
  <div
    className={`relative min-h-screen flex items-center justify-center px-6 py-6 ${
  darkMode
    ? "bg-[#020617]"
    : "bg-slate-200"
}`}
  >
    <Link
      to="/"
      className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-20 inline-flex items-center gap-2 text-sm font-medium transition-colors ${
        darkMode
          ? "text-slate-300 hover:text-white"
          : "text-slate-700 hover:text-slate-900"
      }`}
    >
      <FaArrowLeft className="text-base" />
      <span>Back to Home</span>
    </Link>


    <div
      className={`relative z-10 w-full max-w-lg rounded-2xl shadow-xl ${
  darkMode
    ? "bg-slate-900 border border-slate-700"
    : "bg-white border border-slate-200"
}`}
    >

      {/* RIGHT PANEL */}
      <div className="px-10 py-6 flex items-center">

        <div className="w-full max-w-sm mx-auto">


          {/* Title */}
          <h2
            className={`text-3xl font-bold text-center ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Create Account
          </h2>


          <p
            className={`text-center mt-2 mb-8 text-sm ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Join and start your AI-powered career journey
          </p>



          {/* FULL NAME */}
          <div className="mb-4">

            <label
              className={`text-sm font-medium ${
                darkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Full Name
            </label>


            <div
              className={`mt-2 flex items-center h-12 rounded-xl border px-4 transition ${
                darkMode
                  ? "bg-slate-800/70 border-slate-700 focus-within:border-blue-500"
                  : "bg-gray-50 border-gray-300 focus-within:border-blue-500"
              }`}
            >

              <FaUser className="text-blue-500 mr-3" />


              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className={`w-full outline-none text-sm ${
                  darkMode
                    ? "bg-transparent text-white placeholder-slate-400"
                    : "bg-transparent text-black placeholder-gray-500"
                }`}
              />

            </div>

          </div>



          {/* EMAIL */}
          <div className="mb-4">

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
                onChange={(e)=>setEmail(e.target.value)}
                className={`w-full outline-none text-sm ${
                  darkMode
                    ? "bg-transparent text-white placeholder-slate-400"
                    : "bg-transparent text-black placeholder-gray-500"
                }`}
              />

            </div>

          </div>

                    {/* PASSWORD */}
          <div className="mb-4">

            <label
              className={`text-sm font-medium ${
                darkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Password
            </label>


            <div
              className={`mt-2 flex items-center h-12 rounded-xl border px-4 transition ${
                darkMode
                  ? "bg-slate-800/70 border-slate-700 focus-within:border-blue-500"
                  : "bg-gray-50 border-gray-300 focus-within:border-blue-500"
              }`}
            >

              <FaLock className="text-blue-500 mr-3" />


              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className={`w-full outline-none text-sm ${
                  darkMode
                    ? "bg-transparent text-white placeholder-slate-400"
                    : "bg-transparent text-black placeholder-gray-500"
                }`}
              />


              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </button>

            </div>

          </div>




          {/* CONFIRM PASSWORD */}
          <div className="mb-4">

            <label
              className={`text-sm font-medium ${
                darkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>


            <div
              className={`mt-2 flex items-center h-12 rounded-xl border px-4 transition ${
                darkMode
                  ? "bg-slate-800/70 border-slate-700 focus-within:border-blue-500"
                  : "bg-gray-50 border-gray-300 focus-within:border-blue-500"
              }`}
            >

              <FaLock className="text-blue-500 mr-3" />


              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className={`w-full outline-none text-sm ${
                  darkMode
                    ? "bg-transparent text-white placeholder-slate-400"
                    : "bg-transparent text-black placeholder-gray-500"
                }`}
              />


              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </button>

            </div>

          </div>




          {/* TERMS */}
          <div
            className={`flex items-center gap-2 mt-5 text-sm ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >

            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e)=>setAcceptTerms(e.target.checked)}
              className="accent-blue-600"
            />

            <span>
              I agree to the

              <a
                href="#"
                className="text-blue-500 ml-1 hover:underline"
              >
                Terms & Conditions
              </a>

            </span>

          </div>




          {/* REGISTER BUTTON */}
          <button
            onClick={handleRegister}
            className="
              w-full
              h-12
              mt-7
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
            Create Account
          </button>




          {/* LOGIN */}
          <p
            className={`text-center mt-4 text-sm ${
              darkMode ? "text-slate-400" : "text-gray-600"
            }`}
          >

            Already have an account?

            <Link
              to="/login/candidate"
              className="ml-2 text-blue-500 font-semibold hover:underline"
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