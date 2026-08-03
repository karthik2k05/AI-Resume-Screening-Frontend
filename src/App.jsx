import { useState } from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import CandidatesAdmin from "./pages/dashboard/CandidatesAdmin";
import CandidatesHR from "./pages/dashboard/CandidatesHR";
import JobPostings from "./pages/dashboard/JobPostings";

import AnalyticsAdmin from "./pages/dashboard/AnalyticsAdmin";
import AnalyticsHR from "./pages/dashboard/AnalyticsHR";
import ResumeScreening from "./pages/dashboard/ResumeScreening";
import Applications from "./pages/dashboard/Applications";
import JobMatches from "./pages/dashboard/JobMatches";
import Settings from "./pages/dashboard/Settings";
import SupportChats from "./pages/dashboard/SupportChats";
import Feedbacks from "./pages/dashboard/Feedbacks";
import ChatBot from "./chatbot/ChatBot";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();

  const hideChatbot =
    location.pathname.includes("/dashboard/admin");



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

            <Route
    path="candidates"
    element={
      location.pathname.includes("/dashboard/hr")
        ? <CandidatesHR />
        : <CandidatesAdmin />
    }
  />
             <Route
  path="analytics"
  element={
    role === "hr"
      ? <AnalyticsHR darkMode={darkMode}/>
      : <AnalyticsAdmin darkMode={darkMode}/>
  }
/>

          <Route path="jobs" element={<JobPostings />} />
          <Route path="screening" element={<ResumeScreening />} />
          
          <Route path="support" element={<SupportChats />} />
          <Route path="feedbacks" element={<Feedbacks />} />


          {/* candidate */}
          <Route path="applications" element={<Applications />} />
          <Route path="matches" element={<JobMatches />} />
          {/* shared */}
          <Route path="settings" element={<Settings />} />
          <Route path="overview" element={<Overview />} />

          
        
        </Route>
      </Routes>
      {!hideChatbot && <ChatBot />}
    </div>
  );
}

export default App;
