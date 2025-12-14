import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <h2>ResumeIQ</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/linkedin">LinkedIn</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
