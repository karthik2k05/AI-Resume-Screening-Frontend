import { useState } from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Candidates from "./pages/dashboard/Candidates";
import JobPostings from "./pages/dashboard/JobPostings";
import Analytics from "./pages/dashboard/Analytics";
import Applications from "./pages/dashboard/Applications";
import JobMatches from "./pages/dashboard/JobMatches";
import Settings from "./pages/dashboard/Settings";
import SupportChats from "./pages/dashboard/SupportChats";
import ChatBot from "./chatbot/ChatBot";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();

  const hideChatbot =
    location.pathname.includes("/dashboard/admin/support");



  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <Routes>
        <Route path="/" element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/:role"
          element={<DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
        >
         <Route index element={<Overview />} />
          {/* admin / hr */}
          <Route path="candidates" element={<Candidates />} />
          <Route path="jobs" element={<JobPostings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="support" element={<SupportChats />} />
          {/* candidate */}
          <Route path="applications" element={<Applications />} />
          <Route path="matches" element={<JobMatches />} />
          {/* shared */}
          <Route path="settings" element={<Settings />} />
          
        
        </Route>
      </Routes>
      {!hideChatbot && <ChatBot />}
    </div>
  );
}

export default App;
