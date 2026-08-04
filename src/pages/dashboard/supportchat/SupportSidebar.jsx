export default function SupportSidebar({
  users,
  selectedUser,
  setSelectedUser,
  loadMessages,
  search,
  setSearch,
  darkMode,
}) {
  const card = darkMode ? "bg-[#1e293b]" : "bg-white";
const text = darkMode ? "text-white" : "text-gray-900";
const subText = darkMode ? "text-gray-300" : "text-gray-500";
const border = darkMode ? "border-gray-700" : "border-gray-200";
const input = darkMode
  ? "bg-[#111827] text-white border-gray-700 placeholder-gray-400"
  : "bg-white text-black border-gray-300 placeholder-gray-500";

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
    <div className={`w-80 border-r ${border} ${card} flex flex-col`}>

      <div className={`p-3 border-b ${border} ${card}`}>
        <h2 className={`text-xl font-bold ${text}`}>
          Support Chats
        </h2>

        <input
    type="text"
    placeholder="Search candidate..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className={`mt-2 w-full border rounded-xl px-3 py-2 outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 ${input}`}
/>
      </div>

      <div className={`flex-1 overflow-y-auto ${darkMode ? "bg-[#111827]" : "bg-blue-100"}`}>

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
  loadMessages(user.candidateId);
}}
              className={`cursor-pointer mx-2 my-1.5 px-3 py-2 rounded-xl transition-all duration-200 shadow-sm
${
  selectedUser?.candidateId === user.candidateId
    ? darkMode
      ? "bg-blue-900 border border-blue-700"
      : "bg-blue-50 border border-blue-300"
    : darkMode
      ? "bg-[#1e293b] hover:bg-gray-700 border border-transparent"
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


  <h3
    className={`font-semibold text-[15px] ${
  selectedUser?.candidateId === user.candidateId
    ? "text-blue-500"
    : text
}`}
  >
    {user.username}
  </h3>

    <span className={`text-xs font-medium ${subText}`}>
      {formatLastTime(user.lastTime)}
    </span>  

</div>

  <div className="flex justify-between items-center">

<p
    className={`text-sm truncate mt-1 ${
  selectedUser?.candidateId === user.candidateId
    ? "text-blue-400"
    : subText
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