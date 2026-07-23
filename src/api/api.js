import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-screening-backend-i5ki.onrender.com/api",
});

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;