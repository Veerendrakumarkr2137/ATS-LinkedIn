import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/auth/register", form);
    navigate("/login");
  };

  return (
    <form className="auth" onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Create Account</button>
    </form>
  );
}
