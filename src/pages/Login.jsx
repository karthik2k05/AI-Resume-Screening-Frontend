import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/authApi";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
const ROLE_LABELS = {
  admin: "Admin",
  hr: "HR",
  candidate: "Candidate",
};

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
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
    const response = await API.post("/login", {
      email,
      password,
    });

    // Save JWT
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);
     alert("Login Successful");

    navigate(`/dashboard/${role || "candidate"}`);
    alert(response.data.message);

  } catch (error) {
    alert(
      error.response?.data?.message || "Login Failed"
    );
  }
};
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
    navigate(`/dashboard/${role || "candidate"}`);

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
    <div className="min-h-screen flex items-center justify-center px-6 py-8 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 relative overflow-hidden">
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

      <div className="relative z-10 w-full max-w-4xl h-[600px] bg-white rounded-[24px] overflow-hidden shadow-2xl grid md:grid-cols-[1fr_1fr]">
        {/* LEFT PANEL */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="mt-5 text-lg leading-8 text-slate-200 max-w-sm mx-auto">
              Upload your resume and let AI analyze your skills, experience, and
              qualifications to connect you with the right career opportunities.
            </p>
            <button className="mt-8 px-8 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-100 transition">
              Learn More
            </button>

            <div className="mt-10 space-y-4 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-green-400">✔</span>
                <p>AI-Powered Resume Analysis</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400">✔</span>
                <p>Instant Skill Matching</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400">✔</span>
                <p>Secure & Reliable Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-12 flex items-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              LOGIN
            </h2>
            <p className="text-md text-gray-500 text-center mt-2 mb-6">
              Login to your account
            </p>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="font-medium text-gray-700">Email</label>
              <div className="mt-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 focus-within:border-blue-700 transition">
                <FaEnvelope className="text-blue-600 mr-3" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-black"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-medium text-gray-700">Password</label>
              <div className="mt-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 focus-within:border-blue-700 transition">
                <FaLock className="text-blue-700 mr-2 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* REMEMBER */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-600"
                />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full h-10 mt-5 rounded-lg bg-gradient-to-r from-slate-900 to-blue-700 text-white text-sm font-semibold hover:opacity-95 transition"
            >
              Login
            </button>

            {/* REGISTER */}
            <p className="text-center mt-5 text-sm text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Register
              </Link>
              <br />
              <br />
              <button
  onClick={handleGoogleLogin}
  className="w-full h-10 mt-5 rounded-lg bg-gradient-to-r from-slate-900 to-blue-700 text-white text-sm font-semibold hover:opacity-95 transition"
>
  <FaGoogle className="text-red-500" />
  Continue with Google
</button>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
