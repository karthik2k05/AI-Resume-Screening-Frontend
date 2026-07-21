import { FaCircle, FaUserCircle } from "react-icons/fa";

export default function ChatHeader({ selectedUser }) {
  return (
    <div className="bg-blue-300 border-b border-gray-200 px-5 py-4 flex items-center justify-between shadow-sm rounded-lg">

      <div className="flex items-center gap-4">

        <FaUserCircle
          size={48}
          className="text-blue-600"
        />

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            {selectedUser.username}
          </h2>

          <div className="flex items-center gap-2 mt-1">

            <FaCircle
              size={10}
              className="text-green-500"
            />

            <span className="text-sm text-gray-500">
              Online
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}