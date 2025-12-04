// frontend/src/api.js
import axios from "axios";

const DEFAULT_PROD_BACKEND = "https://ats-linkedin.onrender.com";

// Use environment variable when provided (for Vercel / Netlify)
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? DEFAULT_PROD_BACKEND : "http://localhost:5000");

// named axios instance
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
});

// attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ats_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// helper functions (optional)
export const loginUser = (payload) => api.post("/api/auth/login", payload);
export const registerUser = (payload) => api.post("/api/auth/register", payload);
export const analyzeResume = (formData) =>
  api.post("/api/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const analyzeLinkedIn = (payload) => api.post("/api/linkedin/analyze", payload);

export default api;
