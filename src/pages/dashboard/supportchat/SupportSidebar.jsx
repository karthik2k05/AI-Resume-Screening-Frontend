export default function SupportSidebar({
  users,
  selectedUser,
  setSelectedUser,
  loadMessages,
  search,
  setSearch,
  unread,
}) {
      const filteredUsers = users.filter((user) =>
    user.username
        .toLowerCase()
        .includes(search.toLowerCase())
);
    const getInitials = (name) => {
  if (!name) return "?";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};
const formatLastTime = (date) => {
  if (!date) return "";

  const messageDate = new Date(date);
  const today = new Date();

  const isToday =
    messageDate.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    messageDate.toDateString() === yesterday.toDateString();

  if (isToday) {
    return "Today";
  }

  if (isYesterday) {
    return "Yesterday";
  }

  const diff =
    (today - messageDate) / (1000 * 60 * 60 * 24);

  if (diff < 7) {
    return messageDate.toLocaleDateString([], {
      weekday: "short",
    });
  }

  return messageDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
  });
};

  return (
    <div className="w-80  border-r border-gray-200 bg-white flex flex-col">

      <div className="p-3 border-b border-gray-300 bg-blue-300 ">
        <h2 className="text-xl font-bold text-gray-800 ">
          Support Chats
        </h2>

        <input
    type="text"
    placeholder="Search candidate..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mt-2 w-full border rounded-xl border-gray-300 px-3 py-2 outline-none placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
/>
      </div>

      <div className="flex-1 overflow-y-auto bg-blue-100">

        {users.length === 0 ? (
          <div className="p-5 text-gray-500">
            Waiting for candidate messages...
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.candidateId}
              onClick={() => {
  setSelectedUser(user);

  setUnread((prev) => ({
    ...prev,
    [user.candidateId]: 0,
  }));

  loadMessages(user.candidateId);
}}
              className={`cursor-pointer mx-2 my-1.5 px-3 py-0.5 rounded-xl transition-all duration-200 shadow-sm
              ${
                selectedUser?.candidateId === user.candidateId
                  ? "bg-blue-50 border border-blue-300 shadow-md"
                  : "bg-white hover:bg-gray-50 border border-transparent hover:border-gray-200"
              }`}
            >
              
  <div className="flex justify-between items-start">
    <div
  className="
    w-7
    h-7
    rounded-full
    bg-blue-600
    text-white
    flex
    items-center
    justify-center
    font-semibold
    shrink-0
  "
>
  {getInitials(user.username)}
</div>



   <div className="flex justify-between items-center">

  <h3
    className={`font-semibold text-[15px] ${
      selectedUser?.candidateId === user.candidateId
        ? "text-blue-700"
        : "text-gray-800"
    }`}
  >
    {user.username}
  </h3>

  <div className="flex items-center gap-2">

    {unread?.[user.candidateId] > 0 && (
      <span className="min-w-[20px] h-[20px] rounded-full bg-red-500 text-white text-[11px] font-semibold flex items-center justify-center px-1">
        {unread[user.candidateId]}
      </span>
    )}

    <span className="text-xs text-gray-400 font-medium">
      {formatLastTime(user.lastTime)}
    </span>

  </div>

</div>
    

</div>

  <div className="flex justify-between items-center">

<p
    className={`text-sm truncate mt-1 ${
        selectedUser?.candidateId === user.candidateId
            ? "text-blue-600"
            : "text-gray-500"
    }`}
>
    {user.lastMessage || "No messages"}
</p>
</div>

    
            </div>
          ))
        )}

      </div>

    </div>
  );
}