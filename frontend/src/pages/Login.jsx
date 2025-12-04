// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { api, loginUser } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data);
      nav("/resume");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card">
        <h2>Login</h2>
        {err && <div className="error-box">{err}</div>}
        <form onSubmit={submit} className="form">
          <label>Email<input name="email" value={form.email} onChange={change} required/></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={change} required/></label>
          <button className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
