// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">ATS + LinkedIn</span>
        {user && (
          <>
            <Link to="/" className={isActive("/")}>
              Dashboard
            </Link>
            <Link to="/resume" className={isActive("/resume")}>
              Resume ATS
            </Link>
            <Link to="/linkedin" className={isActive("/linkedin")}>
              LinkedIn Analyzer
            </Link>
          </>
        )}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <div className="profile-pill">
              <div className="avatar-circle">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="profile-name">{user.name}</span>
            </div>
            <button className="btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline small">
              Login
            </Link>
            <Link to="/register" className="btn-primary small">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
