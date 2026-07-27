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
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
  const joinRoom = () => {
    console.log("Joining room:", candidateId);

    setConnected(true);

    socket.emit(
      "join_candidate_room",
      candidateId.toString()
    );
  };

  if (socket.connected) {
    joinRoom();
  } else {
    socket.on("connect", joinRoom);
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
  socket.on("candidate_chat_closed", () => {
  console.log("Chat ended by admin");

  setShowFeedback(true);
});

  return () => {
    socket.off("connect", joinRoom);
    socket.off("disconnect");
    socket.off("candidate_receive_message");
    socket.off("candidate_chat_closed");
  };
}, [candidateId]);
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
    const submitFeedback = () => {

  console.log({
    rating,
    comments,
  });

  alert("Feedback submitted successfully!");

};

    if (showFeedback) {
  return (
    <div className="h-[520px] flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">

        <h2 className="text-2xl font-bold text-green-600 text-center">
          Chat Ended
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Thank you for contacting our support.
        </p>

        <p className="text-center font-semibold mt-5">
          How would you rate your experience?
        </p>

        <div className="flex justify-center gap-3 mt-5">
          {[1,2,3,4,5].map((star)=>(
            <button
              key={star}
              onClick={()=>setRating(star)}
              className={`text-4xl ${
                rating >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={comments}
          onChange={(e)=>setComments(e.target.value)}
          placeholder="Additional comments (optional)"
          className="w-full border rounded-lg mt-6 p-3 resize-none"
          rows={4}
        />

        <button
          onClick={submitFeedback}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Submit Feedback
        </button>

      </div>
    </div>
  );
}

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