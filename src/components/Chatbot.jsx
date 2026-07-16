import { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm ResumeIQ AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (message) => {
  const msg = message.toLowerCase();

  // Greetings
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey"))
    return "👋 Hello! Welcome to ResumeIQ. How can I assist you today?";

  // Registration
  if (msg.includes("register") || msg.includes("signup") || msg.includes("sign up"))
    return "Click the Register button and fill in your name, email, and password to create your account.";

  // Login
  if (msg.includes("login") || msg.includes("log in"))
    return "You can login using your registered email & password or continue with Google.";

  // Google Login
  if (msg.includes("google"))
    return "ResumeIQ supports secure Google Sign-In using Firebase Authentication.";

  // Resume
  if (msg.includes("resume") || msg.includes("upload"))
    return "After logging in, you can upload your resume in PDF format for AI analysis.";

  // ATS
  if (msg.includes("ats") || msg.includes("score"))
    return "Our AI compares your resume with job requirements and generates an ATS compatibility score.";

  // Jobs
  if (msg.includes("job") || msg.includes("apply"))
    return "After logging in, you can browse available jobs and apply to the ones that match your skills.";

  // HR
  if (msg.includes("hr"))
    return "HR can post jobs, review candidates, shortlist applicants, and view ATS scores.";

  // Admin
  if (msg.includes("admin"))
    return "The Admin manages users, HR accounts, jobs, and overall platform statistics.";

  // Password
  if (msg.includes("password"))
    return "If you've forgotten your password, please use the Forgot Password option once it becomes available.";

  // Contact
  if (msg.includes("contact") || msg.includes("support"))
    return "For additional assistance, please contact the ResumeIQ support team.";

  // About
  if (msg.includes("resumeiq") || msg.includes("project"))
    return "ResumeIQ is an AI-powered Resume Screening Portal that helps candidates upload resumes, receive ATS scores, and apply for jobs while assisting HR with candidate screening.";

  // Thanks
  if (msg.includes("thank"))
    return "😊 You're welcome! Feel free to ask me anything else.";

  // Bye
  if (msg.includes("bye"))
    return "👋 Thank you for visiting ResumeIQ. Have a wonderful day!";

  // Default
  return "I'm sorry, I don't have information about that yet. Please try asking about login, registration, resume upload, ATS score, jobs, or Google Sign-In.";
};

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const botMessage = {
      sender: "bot",
      text: getBotReply(input),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="
    fixed bottom-6 right-6
    w-16 h-16
    rounded-full
    bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700
    flex items-center justify-center
    shadow-[0_0_25px_rgba(59,130,246,0.6)]
    animate-float animate-glow
    hover:scale-110
    transition-all
    duration-300
    cursor-pointer
    z-50
  "
>
  {isOpen ? (
    <FaTimes className="text-white text-2xl" />
  ) : (
    <FaRobot className="text-white text-3xl" />
  )}
</button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border overflow-hidden flex flex-col">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4">
            <h2 className="font-bold text-lg">ResumeIQ AI Assistant</h2>
            <p className="text-xs opacity-80">
              Ask me anything about ResumeIQ
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === "user"
  ? "ml-auto bg-blue-600 text-white"
  : "bg-gray-100 text-gray-900 border border-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}