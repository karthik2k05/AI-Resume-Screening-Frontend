import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaPaperPlane, FaRobot } from "react-icons/fa";
import { askAI } from "../services/aiService";

export default function AIChat({ onBack }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello 👋

I'm ResumeIQ AI Assistant.

Ask me anything about:
• Resume Upload
• ATS Score
• Login
• Registration
• Job Applications
• Interview Preparation
• Career Guidance`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const question = input.trim();

    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const reply = await askAI(question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to contact ResumeIQ AI Assistant.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-[520px] flex flex-col bg-gray-50">

      {/* Header */}

      <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-3 shadow">

        <button
          onClick={onBack}
          className="hover:text-gray-200 transition"
        >
          <FaArrowLeft />
        </button>

        <div className="bg-white text-blue-600 rounded-full p-2">
          <FaRobot />
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            ResumeIQ AI Assistant
          </h3>

          <p className="text-xs text-blue-100">
            Online
          </p>
        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>

          </div>

        ))}

        {/* Typing Animation */}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">

              <div className="typing">

                <span></span>
                <span></span>
                <span></span>

              </div>

              <p className="text-sm text-gray-500 mt-2">
                ResumeIQ is typing...
              </p>

            </div>

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}

      <div className="border-t border-gray-200 bg-white p-3 flex gap-2">

        <input
          type="text"
          value={input}
          placeholder="Ask anything about ResumeIQ..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1
                     bg-white
                     text-black
                     placeholder:text-gray-500
                     border
                     border-gray-300
                     rounded-lg
                     px-4
                     py-3
                     outline-none
                     focus:ring-2
                     focus:ring-blue-500
                     focus:border-blue-500"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
}