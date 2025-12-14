const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://ats-linkedin.onrender.com"
    : "http://localhost:5000";

export const postJSON = async (endpoint, data, token) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const postFile = async (endpoint, formData, token) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  return res.json();
};
