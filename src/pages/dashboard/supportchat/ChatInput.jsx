export default function ChatInput({
  input,
  setInput,
  sendReply,
  darkMode,
}) {
  const bg = darkMode ? "bg-[#1e293b]" : "bg-blue-50";

const inputStyle = darkMode
  ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400"
  : "bg-white text-black border-gray-300 placeholder-gray-500";

  return (
    <div
  className={`${bg} shadow-lg rounded-b-2xl rounded-lg p-3 flex gap-3`}>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendReply();
          }
        }}
        placeholder="Type your reply..."
        className={`flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputStyle}`}/>

      <button
        onClick={sendReply}
        className="
          bg-blue-600
          hover:bg-blue-700
          transition
          text-white
          px-6
          rounded-xl
          font-semibold
        "
      >
        Send
      </button>

    </div>
  );
}