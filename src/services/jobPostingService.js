import axios from "axios";
console.log(import.meta.env.VITE_API_URL);
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/admin/job-postings`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getJobPostings = (page, limit, search = "") =>
  API.get(`/?page=${page}&limit=${limit}&search=${search}`);

export const createJobPosting = (data) =>
  API.post("/", data);

export const updateJobStatus = (id) =>
  API.patch(`/${id}/status`);

export const updateJobPosting = (id, data) =>
  API.put(`/${id}`, data);

export const deleteJobPosting = (id) =>
  API.delete(`/${id}`);