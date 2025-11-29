// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="hero">
        <h1>
          Hi {user?.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p>
          Welcome to your <strong>ATS + LinkedIn Analyzer</strong>.  
          Upload your resume, analyze your LinkedIn profile, and track your improvements.
        </p>
        <div className="hero-actions">
          <Link to="/resume" className="btn-primary">
            Analyze Resume
          </Link>
          <Link to="/linkedin" className="btn-outline">
            Analyze LinkedIn
          </Link>
        </div>
      </div>
      <div className="cards-grid">
        <div className="card gradient-card">
          <h3>Resume ATS Score</h3>
          <p className="muted">
            Upload PDF/DOCX resumes and see an estimated ATS score with keyword and structure checks.
          </p>
        </div>
        <div className="card gradient-card">
          <h3>LinkedIn Optimization</h3>
          <p className="muted">
            Paste your LinkedIn headline, about, skills and experience to get suggestions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
