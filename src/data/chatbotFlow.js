export const chatbotFlow = {
  main: [
    { id: "login", title: "🔐 Login" },
    { id: "registration", title: "📝 Registration" },
    { id: "resume", title: "📄 Resume Upload" },
    { id: "ats", title: "🎯 ATS Score" },
    { id: "jobs", title: "💼 Job Applications" },
    { id: "candidate", title: "👤 Candidate Dashboard" },
    { id: "hr", title: "🏢 HR Dashboard" },
    { id: "admin", title: "🛡️ Admin Dashboard" },
    { id: "settings", title: "⚙️ Profile & Settings" },
    { id: "faq", title: "❓ General Questions" },
    { id: "support", title: "💬 Contact Live Support" },
  ],

  login: [
    { id: "forgot_password", title: "Forgot Password" },
    { id: "unable_login", title: "Unable to Login" },
    { id: "google_login", title: "Google Login" },
    { id: "otp_issue", title: "OTP Not Received" },
  ],

  registration: [
    { id: "email_exists", title: "Email Already Exists" },
    { id: "registration_failed", title: "Registration Failed" },
    { id: "verification_email", title: "Verification Email" },
  ],

  resume: [
    { id: "resume_upload_failed", title: "Resume Upload Failed" },
    { id: "unsupported_file", title: "Unsupported File Type" },
    { id: "resume_deleted", title: "Resume Missing" },
  ],

  ats: [
    { id: "ats_low", title: "Low ATS Score" },
    { id: "ats_not_generated", title: "ATS Score Not Generated" },
    { id: "missing_skills", title: "Missing Skills" },
    { id: "improve_ats", title: "How to Improve ATS Score" },
  ],

  jobs: [
    { id: "apply_job", title: "Apply for a Job" },
    { id: "application_failed", title: "Application Failed" },
    { id: "application_status", title: "Track Application Status" },
  ],
  candidate: [
  { id: "profile_update", title: "Update Profile" },
  { id: "dashboard_loading", title: "Dashboard Not Loading" },
],

hr: [
  { id: "hr_candidates", title: "View Candidates" },
  { id: "shortlist_candidate", title: "Shortlist Candidate" },
  { id: "reject_candidate", title: "Reject Candidate" },
],

admin: [
  { id: "create_job", title: "Create Job Posting" },
  { id: "manage_users", title: "Manage Users" },
  { id: "analytics", title: "View Analytics" },
],

settings: [
  { id: "change_password", title: "Change Password" },
  { id: "change_email", title: "Change Email" },
  { id: "dark_mode", title: "Appearance & Theme" },
],

faq: [
  { id: "supported_formats", title: "Supported Resume Formats" },
  { id: "browser_support", title: "Supported Browsers" },
  { id: "portal_info", title: "About ResumeIQ" },
],

  support: [
    { id: "live_chat", title: "Start Live Chat" }
  ]
};