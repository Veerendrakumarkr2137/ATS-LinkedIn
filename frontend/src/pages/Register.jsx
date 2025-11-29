// src/pages/Register.jsx
import React, { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await api.post("/api/auth/register", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card">
        <h2>Create an account</h2>
        <p className="muted">
          Sign up to start analyzing your resume and LinkedIn profile.
        </p>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Veerendra"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="******"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button className="btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="muted small-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
