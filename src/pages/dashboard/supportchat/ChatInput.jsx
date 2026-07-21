export default function ChatInput({
  input,
  setInput,
  sendReply,
}) {
  return (
    <div className="bg-blue-50 shadow-lg rounded-b-2xl rounded-lg p-3 flex gap-3 ">

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendReply();
          }
        }}
        placeholder="Type your reply..."
        className="
          flex-1
          placeholder-gray-500
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />

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