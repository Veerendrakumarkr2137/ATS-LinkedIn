
// Auto-switch API base URL
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://ats-linkedin.onrender.com"
    : "http://localhost:5000";

// Send JSON data (login, register, LinkedIn analyzer)
export const postJson = async (endpoint, data, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const body = await res.json();
  return { status: res.status, body };
};

// Upload file (PDF / DOCX for ATS resume)
export const postFile = async (endpoint, file, extraData = {}, token) => {
  const formData = new FormData();
  formData.append("resume", file);

  Object.keys(extraData).forEach((key) => {
    formData.append(key, extraData[key]);
  });

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const body = await res.json();
  return { status: res.status, body };
};
