// src/api.js
import axios from "axios";

export const API_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ats_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
