import { useState } from "react";
import { loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [data, setData] = useState({});

  const submit = async () => {
    const res = await loginUser(data);
    login(res.data);
  };

  return (
    <div className="page">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
