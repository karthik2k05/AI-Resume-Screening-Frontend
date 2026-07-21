import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaCircle } from "react-icons/fa";
import socket from "../services/socket";

export default function AdminSupportPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_admin");
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("admin_receive_message", (data) => {
        console.log("📩 Received:", data);
      setMessages((prev) => [...prev, data]);

      if (!selectedCandidate) {
        setSelectedCandidate(data.username);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("admin_receive_message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendReply = () => {
    if (!input.trim() || !selectedCandidate) return;
    

    const reply = {
      room: selectedCandidate,
      sender: "admin",
      message: input,
    };
    console.log("📤 Sending Reply:", reply);

    socket.emit("admin_message", reply);

    setMessages((prev) => [
      ...prev,
      {
        username: "Admin",
        sender: "admin",
        message: input,
      },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}

        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              ResumeIQ Admin Support
            </h1>

            <p className="text-sm opacity-90">
              Live Candidate Chat
            </p>
          </div>

          <div className="flex items-center gap-2">

            <FaCircle
              className={connected ? "text-green-400" : "text-red-400"}
              size={12}
            />

            <span>
              {connected ? "Connected" : "Connecting..."}
            </span>

          </div>

        </div>

        {/* Messages */}

        <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">

          {messages.length === 0 ? (
            <p className="text-gray-500">
              Waiting for candidate messages...
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "admin"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-xl px-4 py-3 shadow-md ${
                    msg.sender === "admin"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-300 text-gray-900"
                  }`}
                >
                  <p 
  className={`font-semibold mb-1 ${
    msg.sender === "admin"
      ? "text-white"
      : "text-blue-700"
  }`}
>
                    {msg.sender === "admin"
                      ? "Admin"
                      : msg.username}
                  </p>

                  <p
                   className={
    msg.sender === "admin"
      ? "text-white"
      : "text-gray-900"
  }
                  >{msg.message}</p>
                </div>
              </div>
            ))
          )}

          <div ref={bottomRef}></div>

        </div>

        {/* Input */}

        <div className="border-t bg-white p-4 flex gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Reply to candidate..."
            className="flex-1 border rounded-lg px-4 py-3 text-black placeholder:text-gray-500 outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendReply();
            }}
          />

          <button
            onClick={sendReply}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>

    </div>
  );
}