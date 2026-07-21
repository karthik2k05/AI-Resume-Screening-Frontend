import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function AdminSupportChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Admin Connected");

      socket.emit("join_admin");
    });

    socket.on("admin_receive_message", (data) => {
      console.log("New Candidate Message", data);

      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("admin_receive_message");
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-5">
        💬 Live Support
      </h2>

      <div className="space-y-4">

        {messages.length === 0 && (
          <p className="text-gray-500">
            Waiting for candidate messages...
          </p>
        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className="border rounded-lg p-3"
          >

            <h3 className="font-semibold text-blue-600">
              {msg.username}
            </h3>

            <p>{msg.message}</p>

          </div>

        ))}

      </div>

    </div>
  );
}