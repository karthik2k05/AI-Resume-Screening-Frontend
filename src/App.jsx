import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/dashboard/:role"
          element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
    </div>
  );
}

export default App;
