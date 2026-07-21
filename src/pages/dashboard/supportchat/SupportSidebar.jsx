export default function SupportSidebar({
  users,
  selectedUser,
  setSelectedUser,
  loadMessages,
}) {
  return (
    <div className="w-80 border-r bg-white flex flex-col">

      <div className="p-5 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          Support Chats
        </h2>

        <input
          type="text"
          placeholder="Search candidate..."
          className="mt-4 w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto">

        {users.length === 0 ? (
          <div className="p-5 text-gray-500">
            Waiting for candidate messages...
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.candidateId}
              onClick={() => {
  setSelectedUser(user);
  loadMessages(user.candidateId);
}}
              className={`cursor-pointer px-5 py-4 border-b transition
              ${
                selectedUser?.candidateId === user.candidateId
                  ? "bg-blue-50 border-l-4 border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <h3 className="font-semibold text-gray-800">
                {user.username}
              </h3>

              <p className="text-sm text-gray-500">
                Click to open conversation
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}