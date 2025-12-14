import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h2>ResumeIQ</h2>
      <div>
        <Link to="/">Home</Link>
        {user && <Link to="/resume">Resume</Link>}
        {user && <Link to="/linkedin">LinkedIn</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
