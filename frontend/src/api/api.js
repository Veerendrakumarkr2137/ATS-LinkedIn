import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://ats-linkedin.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

export const analyzeResume = (formData) =>
  API.post("/resume/analyze", formData);

export const analyzeLinkedIn = (data) =>
  API.post("/linkedin/analyze", data);

export default API;
