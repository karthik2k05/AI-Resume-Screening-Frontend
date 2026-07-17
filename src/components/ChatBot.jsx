import SupportCard from "./SupportCard";
import { getBotReply } from "../utils/chatbotEngine";
import { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm ResumeIQ AI Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), 
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
    useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isTyping]);
  const suggestions = [
  "What is ATS?",
  "How do I register?",
  "contact admin",
  "How do I upload my resume?",
  "What technologies are used?",
];
const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = {
    sender: "user",
    text: input,
    time: getCurrentTime(),
  };
 

  setMessages((prev) => [...prev, userMessage]);

  const userInput = input;
  setInput("");

  // Show typing indicator
  setIsTyping(true);

  const reply = await getBotReply(userInput);

// Small delay to make it feel natural
setTimeout(() => {

  if (reply === "__SUPPORT__") {

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        type: "support",
      },
    ]);

  } else {

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        type: "text",
        text: reply,
      },
    ]);

  }

  setIsTyping(false);

}, 1000);
};
 const clearChat = () => {
  if (!window.confirm("Clear this conversation?")) return;

  setMessages([
    {
      sender: "bot",
      text: "👋 Hi! I'm ResumeIQ AI Assistant. How can I help you today?",
      time: getCurrentTime(),
    },
  ]);
};

const handleSuggestionClick = (question) => {
  setInput(question);

  setTimeout(() => {
    document.getElementById("chat-send-btn")?.click();
  }, 100);
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

  <div className="flex justify-between items-center">

    {/* Left Side */}
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
        🤖
      </div>

      <div>
        <h2 className="font-bold text-lg">
          ResumeIQ AI Assistant
        </h2>

        <p className="text-xs text-green-300 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          AI Ready
        </p>
      </div>

    </div>

    {/* Right Side */}
    <button
      onClick={clearChat}
      className="hover:bg-white/20 p-2 rounded-full transition"
      title="Clear Chat"
    >
      <FaTrash />
    </button>

  </div>

</div>
          {/* Messages */}
<div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
  {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex items-end gap-2 ${
      msg.sender === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >

    {/* AI Avatar */}
    {msg.sender === "bot" && (
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg flex-shrink-0">
        🤖
      </div>
    )}

    {/* Message Bubble */}
    <div
      className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm whitespace-pre-line ${
        msg.sender === "user"
          ? "bg-blue-600 text-white rounded-br-md"
          : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
      }`}
    >
      {msg.type === "support" ? (
  <SupportCard />
) : (
  msg.text
)}

      
      <p
  className={`text-[10px] mt-2 ${
    msg.sender === "user"
      ? "text-blue-100 text-right"
      : "text-gray-400"
  }`}
>
  {msg.time}
</p>
    </div>

    {/* User Avatar */}
    {msg.sender === "user" && (
      <div className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
        👤
      </div>
    )}

  </div>
))}

  {/* Typing Indicator */}
 {isTyping && (
  <div className="flex items-center gap-2">

    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
      🤖
    </div>

    <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3">

      <div className="typing">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>

  </div>
)}
  <div ref={messagesEndRef}></div>
</div>
{messages.length === 1 && (
  <div className="mt-3 flex flex-wrap gap-2">
    {suggestions.map((item, index) => (
      <button
        key={index}
        onClick={() => handleSuggestionClick(item)}
        className="px-3 py-2 rounded-full border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 text-xs transition"
      >
        {item}
      </button>
    ))}
  </div>
)}

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
            id="chat-send-btn"
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