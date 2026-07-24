import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaCircle } from "react-icons/fa";
import socket from "../services/socket";
import SupportAPI from "../api/supportApi";

export default function LiveChat({ onBack }) {
  // TODO: Replace with the logged-in username from your auth state
  const user = JSON.parse(localStorage.getItem("user"));

    const username = user?.name;
    const candidateId = user?.id;
    
  const [messages, setMessages] = useState([
    {
      sender: "admin",
      text: "Hello 👋\nHow may I assist you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    console.log(user);
    console.log("Candidate ID:", candidateId);

    socket.connect();

    socket.on("connect", () => {
  setConnected(true);

  if (candidateId) {
    socket.emit(
      "join_candidate_room",
      candidateId.toString()
    );
  }
});
    const loadMessages = async () => {
  try {
    const res = await SupportAPI.get(`/messages/${candidateId}`);

    const history = res.data.map((msg) => ({
      sender: msg.sender,
      text: msg.message,
      time: new Date(msg.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    setMessages(history);
  } catch (err) {
    console.error(err);
  }
};  
  if (candidateId) {
  loadMessages();
}

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("candidate_receive_message", (data) => {
        console.log("📨 Received admin reply:", data);
        
      setMessages((prev) => [
        ...prev,
        {
          sender: "admin",
          text: data.message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("candidate_receive_message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    const msg = input.trim();

    if (!msg) return;
    if (!candidateId) return;
    const message = {
  room: candidateId.toString(),
  candidateId: candidateId.toString(),
  sender: "candidate",
  username,
  message: msg,
};

    setMessages((prev) => [
      ...prev,
      {
        sender: "candidate",
        text: msg,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    console.log("Sending:", message);
    socket.emit("candidate_message", message);

    setInput("");
  };

  return (
    <div className="h-[520px] flex flex-col bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-3">

        <button onClick={onBack}>
          <FaArrowLeft />
        </button>

        <div className="flex-1">

          <h3 className="font-semibold">
            Admin
          </h3>

          <div className="flex items-center gap-2 text-sm">

            <FaCircle
              className={
                connected
                  ? "text-green-400"
                  : "text-red-400"
              }
              size={10}
            />

            {connected ? "Online" : "Connecting..."}

          </div>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.sender === "candidate"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
  className={`max-w-[75%] rounded-xl px-4 py-3 shadow whitespace-pre-line ${
    msg.sender === "candidate"
      ? "bg-blue-600 text-white"
      : "bg-white text-gray-900 border border-gray-200"
  }`}
>

              <p
  className={
    msg.sender === "candidate"
      ? "text-white"
      : "text-gray-900"
  }
>
  {msg.text}
</p>

              <p
  className={`text-xs mt-2 text-right ${
    msg.sender === "candidate"
      ? "text-blue-100"
      : "text-gray-500"
  }`}
>
                {msg.time}
              </p>

            </div>

          </div>

        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}

      <div className="border-t bg-white p-3 flex gap-2">

        <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") sendMessage();
  }}
  placeholder="Type your message..."
  className="
    flex-1
    bg-white
    text-black
    placeholder:text-gray-500
    border
    border-gray-300
    rounded-lg
    px-4
    py-3
    outline-none
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-500
  "
/>
        

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
}