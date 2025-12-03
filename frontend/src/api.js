// frontend/src/api.js

import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ats-linkedin.onrender.com"   
    : "http://localhost:5000";              

console.log("Using API URL:", API_BASE_URL);

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: false,
});

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};

export const analyzeResume = async (file, jobTitle, token) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobTitle", jobTitle);

  const res = await api.post("/resume/analyze", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const analyzeLinkedIn = async (profileData, token) => {
  const res = await api.post("/linkedin/analyze", profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export default api;
