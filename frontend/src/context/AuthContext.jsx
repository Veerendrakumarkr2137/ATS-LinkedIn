// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // load saved user
  useEffect(() => {
    const saved = localStorage.getItem("ats_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (data) => {
    // expect backend returns { token, _id, name, email }
    localStorage.setItem("ats_token", data.token);
    localStorage.setItem("ats_user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("ats_token");
    localStorage.removeItem("ats_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
