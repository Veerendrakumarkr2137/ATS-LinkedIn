// frontend/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const doLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">ATS+LINK</div>
        <Link className="nav-link" to="/">
          Dashboard
        </Link>
        <Link className="nav-link" to="/resume">
          Resume Analyzer
        </Link>
        <Link className="nav-link" to="/linkedin">
          LinkedIn Analyzer
        </Link>
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link className="btn-outline nav-link" to="/login">
              Login
            </Link>
            <Link className="btn-primary" to="/register">
              Register
            </Link>
          </>
        ) : (
          <div className="profile-pill">
            <div className="avatar-circle">{(user.name || "U").charAt(0)}</div>
            <div className="profile-name">{user.name}</div>
            <button onClick={doLogout} className="btn-outline small">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
