import axios from "axios";

const SupportAPI = axios.create({
  baseURL: "https://ai-resume-screening-backend-i5ki.onrender.com/api/support",
});

export default SupportAPI;