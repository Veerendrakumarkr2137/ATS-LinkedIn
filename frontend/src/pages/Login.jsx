// src/pages/Login.jsx
import React, { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", form);
      login(res.data);

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card">
        <h2>Welcome back 👋</h2>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </label>

          <button className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="muted small-text">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
