import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import API from "../api/authApi";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import { Moon, Sun } from "lucide-react";

const ROLE_LABELS = {
  admin: "Admin",
  hr: "HR",
  candidate: "Candidate",
};

export default function Login({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const { role } = useParams();
  const location = useLocation();

const selectedPlan = location.state?.selectedPlan || null;
  
  const roleLabel = ROLE_LABELS[role] || "Candidate";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  
  

  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  if (!rememberMe) {
    alert("Please select 'Remember me' to continue.");
    return;
  }

  try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
        
      );
  
 const firebaseUser = userCredential.user;
      const idToken = await firebaseUser.getIdToken();

      const response = await API.post("/firebase-login", {
        idToken,
      });

    // Save JWT
    localStorage.setItem("token", response.data.token);
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

alert(response.data.message || "Login Successful");

if (
  selectedPlan &&
  selectedPlan !== "Free Trial"
) {
  navigate(`/dashboard/${role}/subscription`, {
    state: {
      selectedPlan,
    },
  });
} else {
  navigate(`/dashboard/${role || "candidate"}`);
}


  } catch (error) {
      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Invalid email or password.");
      } else if (error.code === "auth/user-not-found") {
        alert("User not found.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email.");
      } else {
        alert(error.response?.data?.message || "Login Failed");
      }
    }
  };


//google login
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    // Get Firebase ID Token
    const idToken = await user.getIdToken();

    console.log("Firebase ID Token:", idToken);

    // Send token to backend
    const response = await API.post("/google-login", {
      idToken,
    });

    console.log(response.data);

    localStorage.setItem("token", response.data.token);
localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

if (
  selectedPlan &&
  selectedPlan !== "Free Trial"
) {
  navigate(`/dashboard/${role}/subscription`, {
    state: {
      selectedPlan,
    },
  });
} else {
  navigate(`/dashboard/${role || "candidate"}`);
}

alert(response.data.message);

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Google Login Failed"
    );
  }
};

 return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-6 py-8 ${
        darkMode
          ? "bg-[#020617]"
          : "bg-slate-200"
      }`}
    >
      <button
        onClick={() => {
          const newTheme = !darkMode;
          setDarkMode(newTheme);
          localStorage.setItem("theme", newTheme ? "dark" : "light");
        }}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className={`absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-lg transition ${
          darkMode
            ? "bg-slate-800 hover:bg-slate-700"
            : "bg-slate-200 hover:bg-slate-300"
        }`}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

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
        className={`relative z-10 w-full max-w-md rounded-2xl shadow-xl ${
          darkMode
            ? "bg-slate-900 border border-slate-700"
            : "bg-white border border-slate-200"
        }`}
      >
        <div className="p-8 flex items-center">
          <div className="w-full">
            <h2
              className={`text-3xl font-bold text-center ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Welcome Back 👋
            </h2>

            <p
              className={`text-center mt-2 mb-8 text-sm ${
                darkMode ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Sign in to access your ResumeIQ workspace
            </p>

            <div className="mb-5">
              <label
                className={`text-sm font-medium ${
                  darkMode ? "text-slate-200" : "text-gray-700"
                }`}
              >
                Email
              </label>

              <div
                className={`mt-2 flex items-center h-12 rounded-xl border px-4 ${
                  darkMode
                    ? "bg-slate-800/70 border-slate-700 focus-within:border-blue-500"
                    : "bg-gray-50 border-gray-300"
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

            <div>
              <label
                className={`text-sm font-medium ${
                  darkMode ? "text-slate-200" : "text-gray-700"
                }`}
              >
                Password
              </label>

              <div
                className={`mt-2 flex items-center h-12 rounded-xl border px-4 ${
                  darkMode
                    ? "bg-slate-800/70 border-slate-700 focus-within:border-blue-500"
                    : "bg-gray-50 border-gray-300"
                }`}
              >
                <FaLock className="text-blue-500 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex justify-between items-center mt-5">
              <label
                className={`flex items-center gap-2 text-sm ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-600"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              onClick={handleLogin}
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
              Sign In
            </button>

            <div className="flex items-center gap-3 my-4">
              <div
                className={`flex-1 h-px ${
                  darkMode ? "bg-slate-700" : "bg-gray-300"
                }`}
              ></div>
              <span
                className={`text-xs ${
                  darkMode ? "text-slate-400" : "text-gray-500"
                }`}
              >
                OR
              </span>
              <div
                className={`flex-1 h-px ${
                  darkMode ? "bg-slate-700" : "bg-gray-300"
                }`}
              ></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`w-full h-12 mt-4 rounded-xl flex items-center justify-center gap-3 font-medium border ${
                darkMode
                  ? "bg-slate-800/70 border-slate-700 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-700"
              }`}
            >
              <FaGoogle className="text-red-500" />
              <span>Continue with Google</span>
            </button>

            <div className="text-center mt-5 text-sm text-gray-600">
              {role !== "admin" && (
                <p>
                  Don't have an account?
                  <Link
                    to={`/register/${role}`}
                    className="text-blue-600 font-semibold ml-2 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
