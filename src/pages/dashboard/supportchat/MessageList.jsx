export default function MessageList({
  selectedUser,
  messages,
  bottomRef,
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-100 p-6">

      {(messages[selectedUser.candidateId] || []).map((msg, index) => (

        <div
          key={index}
          className={`flex mb-4 ${
            msg.sender === "admin"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-md ${
              msg.sender === "admin"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-white text-gray-800 rounded-bl-sm border"
            }`}
          >

            <p className="text-sm font-semibold mb-1">
              {msg.sender === "admin"
                ? "Admin"
                : msg.username}
            </p>

            <p className="text-[15px] leading-relaxed break-words">
              {msg.message}
            </p>

            <div
              className={`text-xs mt-2 text-right ${
                msg.sender === "admin"
                  ? "text-blue-100"
                  : "text-gray-400"
              }`}
            >
              {msg.created_at
                ? new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </div>

          </div>

        </div>

      ))}

      <div ref={bottomRef}></div>

    </div>
  );
}