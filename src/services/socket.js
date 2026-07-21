import { io } from "socket.io-client";

const socket = io(
  "https://ai-resume-screening-backend-i5ki.onrender.com",
  {
    autoConnect:false,
    transports: ["websocket", "polling"],
  }
);

export default socket;