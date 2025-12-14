import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav initial={{ y: -50 }} animate={{ y: 0 }} className="navbar">
      <h2>ResumeSphere</h2>
      <div>
        <Link to="/">Home</Link>
        {user && <Link to="/resume">Resume</Link>}
        {user && <Link to="/linkedin">LinkedIn</Link>}
        {!user ? <Link to="/login">Login</Link> : <button onClick={logout}>Logout</button>}
      </div>
    </motion.nav>
  );
}
