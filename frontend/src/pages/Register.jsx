// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/api/auth/register", form);
      nav("/login");
    } catch (error) {
      setErr(error?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card">
        <h2>Create account</h2>
        {err && <div className="error-box">{err}</div>}
        <form onSubmit={submit} className="form">
          <label>Name<input name="name" value={form.name} onChange={change} required/></label>
          <label>Email<input name="email" value={form.email} onChange={change} required/></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={change} required/></label>
          <button className="btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
