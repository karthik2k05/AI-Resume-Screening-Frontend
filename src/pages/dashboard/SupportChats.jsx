import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SupportAPI from "../../api/supportApi";
import socket from "../../services/socket";
import SupportSidebar from "./supportchat/SupportSidebar";
import ChatHeader from "./supportchat/ChatHeader";
import MessageList from "./supportchat/MessageList";
import ChatInput from "./supportchat/ChatInput";

export default function SupportChats() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState({});
    
    const bottomRef = useRef(null);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const location = useLocation();

const selectedCandidateFromNotification =
  location.state?.candidateId;

    useEffect(() => {

       const loadConversations = async () => {
  try {
    const res = await SupportAPI.get("/conversations");

    const conversations = res.data.map((user) => ({
      ...user,
      candidateId: Number(user.candidateId),
    }));

    setUsers(conversations);

    if (selectedCandidateFromNotification) {

    const user = conversations.find(
        u =>
            Number(u.candidateId) ===
            Number(selectedCandidateFromNotification)
    );

    if (user) {
        setSelectedUser(user);
        loadMessages(user.candidateId);
    }

} else if (conversations.length > 0) {

    setSelectedUser(conversations[0]);
    loadMessages(conversations[0].candidateId);

}

  } catch (err) {
    console.error(err);
  }
};
  loadConversations();
  socket.connect();

  socket.on("connect", () => {
    console.log("✅ Admin Connected");

    socket.emit("join_admin");
  });

  socket.on("admin_receive_message", (data) => {
    console.log("Received:", data);
  

    // Add candidate to left sidebar
    
    setUsers((prev) => {
  const id = Number(data.candidateId);

  const filtered = prev.filter(
    (u) => Number(u.candidateId) !== id
  );

  return [
    {
      candidateId: id,
      username: data.username,
      lastMessage: data.message,
    },
    ...filtered,
  ];
});

    // Store messages candidate-wise

    setMessages((prev) => ({
      ...prev,
      [data.candidateId]: [
        ...(prev[data.candidateId] || []),
        data,
      ],
    }));
  

    // Auto-select first candidate

    setSelectedUser((current) => current || {
      candidateId: data.candidateId,
      username: data.username,
    });

  });
  

  return () => {
    socket.off("connect");
    socket.off("admin_receive_message");
  };

}, []);
    useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, selectedUser]);

    const loadMessages = async (candidateId) => {
  try {
    const res = await SupportAPI.get(`/messages/${candidateId}`);

    setMessages((prev) => ({
      ...prev,
      [candidateId]: res.data,
    }));

  } catch (err) {
    console.error(err);
  }
};

        const sendReply = () => {
  if (!input.trim() || !selectedUser) return;

  const reply = {
    room: selectedUser.candidateId.toString(),
    sender: "admin",
    username: "Admin",
    message: input,
    candidateId: selectedUser.candidateId,
  };


  socket.emit("admin_message", reply);

  setMessages((prev) => ({
    ...prev,
    [selectedUser.candidateId]: [
      ...(prev[selectedUser.candidateId] || []),
      reply,
    ],
  }));

  setInput("");
};
      

  return (
    <div className="h-[calc(100vh-90px)] flex bg-white rounded-xl shadow overflow-hidden">

      {/* Left Sidebar */}

      <SupportSidebar
  users={users}
  selectedUser={selectedUser}
  setSelectedUser={setSelectedUser}
  loadMessages={loadMessages}
  search={search}
  setSearch={setSearch}
/>

      {/* Right Chat Area */}

      <div className="flex-1 flex flex-col">

  {selectedUser ? (

    <>

      {/* Header */}

      <ChatHeader
  selectedUser={selectedUser}
/>

      {/* Messages */}

      <MessageList
    selectedUser={selectedUser}
    messages={messages}
    bottomRef={bottomRef}
/>

      {/* Reply Box */}

      <ChatInput
    input={input}
    setInput={setInput}
    sendReply={sendReply}
/>

    </>

  ) : (

    <div className="flex flex-1 items-center justify-center text-gray-500">

      <div className="text-center">

        <h2 className="text-2xl font-semibold">
          Select a candidate
        </h2>

        <p>
          Choose a conversation from the left.
        </p>

      </div>

    </div>

  )}
     
        
        
</div>

    </div>
  );
}