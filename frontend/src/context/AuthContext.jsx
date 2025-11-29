// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("ats_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = (data) => {
    localStorage.setItem("ats_token", data.token);
    localStorage.setItem("ats_user", JSON.stringify(data));
    setUser(data);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("ats_token");
    localStorage.removeItem("ats_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
