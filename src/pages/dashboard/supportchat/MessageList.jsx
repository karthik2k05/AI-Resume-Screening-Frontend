export default function MessageList({
  selectedUser,
  messages,
  bottomRef,
  darkMode,
}) {
  const bg = darkMode ? "bg-[#111827]" : "bg-slate-200";
const candidateMsg = darkMode
  ? "bg-[#1e293b] text-white border border-gray-700"
  : "bg-white text-gray-800 border";

const timeText = darkMode ? "text-gray-400" : "text-gray-400";

  return (
    <div className={`flex-1 overflow-y-auto ${bg} p-6`}>

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
            className={`max-w-[70%] rounded-2xl px-4 py-1 shadow-md ${
  msg.sender === "admin"
    ? "bg-blue-600 text-white rounded-br-sm"
    : `${candidateMsg} rounded-bl-sm`
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
    : timeText
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