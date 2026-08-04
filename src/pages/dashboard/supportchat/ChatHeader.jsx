import { FaCircle, FaUserCircle } from "react-icons/fa";

export default function ChatHeader({
  selectedUser,
  endChat,
  darkMode,
}) {
  const bg = darkMode ? "bg-[#1e293b]" : "bg-blue-300";
const text = darkMode ? "text-white" : "text-gray-800";
const subText = darkMode ? "text-gray-300" : "text-gray-500";
const border = darkMode ? "border-gray-700" : "border-gray-200";

  return (
    <div
  className={`${bg} border-b ${border} px-5 py-4 flex items-center justify-between shadow-sm rounded-lg`}>

      <div className="flex items-center gap-4">

        <FaUserCircle
          size={48}
          className="text-blue-600"
        />

        <div>

          <h2 className={`text-xl font-bold ${text}`}>
            {selectedUser.username}
          </h2>
          

          <div className="flex items-center gap-2 mt-1">

            <FaCircle
              size={10}
              className="text-green-500"
            />

            <span className={`text-sm ${subText}`}>
              Online
            </span>


          </div>

        </div>

      </div>
      <button
    onClick={endChat}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold font-medium transition-colors"
  >
    End Chat
  </button>

    </div>
  );
}