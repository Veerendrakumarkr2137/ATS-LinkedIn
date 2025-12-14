import axios from "axios";

const api = axios.create({
  baseURL: "https://ats-linkedin.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

export const analyzeResume = (formData) =>
  api.post("/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const analyzeLinkedIn = (data) =>
  api.post("/linkedin/analyze", data);

export default api;
