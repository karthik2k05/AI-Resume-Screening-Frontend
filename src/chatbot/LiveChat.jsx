import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaCircle } from "react-icons/fa";
import socket from "../services/socket";
import SupportAPI from "../api/supportApi";

export default function LiveChat({ onBack, darkMode }) {
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
  const [showThankYou, setShowThankYou] = useState(false);

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
  const submitFeedback = async () => {
  try {

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    await SupportAPI.post("/feedback", {
      candidateId,
      rating,
      comments,
    });

    setShowFeedback(false);
    setShowThankYou(true);

  } catch (err) {
    console.error(err);

    alert("Failed to submit feedback.");
  }
};

    if (showThankYou) {
  return (
    <div
  className={`h-[520px] flex items-center justify-center ${
    darkMode ? "bg-slate-800" : "bg-gray-100"
  }`}
>
      <div
  className={`rounded-xl shadow-lg p-8 w-[400px] text-center ${
    darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
  }`}
>

        <div className="text-6xl mb-4">✅</div>

        <h2 className="text-2xl font-bold text-green-600">
          Thank You!
        </h2>

        <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Your feedback has been submitted successfully.
        </p>

        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          We appreciate your valuable feedback.
        </p>

        <button
          onClick={onBack}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Close
        </button>

      </div>
    </div>
  );
}

    if (showFeedback) {
  return (
    <div
  className={`h-[520px] flex items-center justify-center ${
    darkMode ? "bg-slate-800" : "bg-gray-100"
  }`}
>
      <div
  className={`rounded-xl shadow-lg p-6 w-[400px] ${
    darkMode
      ? "bg-slate-900 text-white"
      : "bg-white text-gray-900"
  }`}
>

        <h2 className="text-2xl font-bold text-green-600 text-center">
          Chat Ended
        </h2>

        <p
  className={`text-center mt-2 ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`}
>
          Thank you for contacting our support.
        </p>

        <p
  className={`text-center font-semibold mt-5 ${
    darkMode ? "text-gray-200" : "text-gray-900"
  }`}
>
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
                  : darkMode ? "text-slate-600" : "text-gray-300"
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
          className={`w-full border rounded-lg mt-6 p-3 resize-none ${
  darkMode
    ? "bg-slate-800 text-white placeholder:text-gray-400 border-slate-600"
    : "bg-white text-gray-900 placeholder:text-gray-500 border-gray-300"
}`}
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
    
    <div
  className={`h-[520px] flex flex-col ${
    darkMode ? "bg-slate-800" : "bg-gray-100"
  }`}
>

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
      : darkMode
  ? "bg-slate-700 text-white border border-slate-600"
  : "bg-white text-gray-900 border border-gray-200"
  }`}
>

              <p
  className={
    msg.sender === "candidate"
      ? "text-white"
      : darkMode
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
      : darkMode
      ? "text-gray-300"
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

      <div
  className={`border-t p-3 flex gap-2 ${
    darkMode
      ? "bg-slate-900 border-slate-700"
      : "bg-white border-gray-200"
  }`}
>

        <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") sendMessage();
  }}
  placeholder="Type your message..."
  className={`
flex-1
rounded-lg
px-4
py-3
outline-none
border
focus:border-blue-500
focus:ring-2
focus:ring-blue-500
${
  darkMode
    ? "bg-slate-800 text-white placeholder:text-gray-400 border-slate-600"
    : "bg-white text-black placeholder:text-gray-500 border-gray-300"
}
`}
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