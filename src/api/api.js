import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-screening-backend-i5ki.onrender.com/api",
});

export default API;