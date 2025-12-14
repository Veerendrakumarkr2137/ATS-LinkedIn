import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h3>ATS + LinkedIN</h3>
      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/resume">Resume ATS</Link>
          <Link to="/linkedin">LinkedIn Analyzer</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

