// src/pages/LinkedInAnalyzer.jsx
import React, { useState } from "react";
import { api } from "../api";

const LinkedInAnalyzer = () => {
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      setLoading(true);
      const res = await api.post("/api/linkedin/analyze", {
        headline,
        about,
        skills,
        experienceText,
        targetRole,
      });
      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Failed to analyze LinkedIn details. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>LinkedIn Profile Analyzer</h2>
      <p className="muted">
        Paste your LinkedIn content to get a score and suggestions.  
        <strong>No scraping</strong> – everything stays in your control.
      </p>

      <div className="card">
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit} className="form grid-2">
          <div className="form-col">
            <label>
              Target Role
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Full Stack Developer"
              />
            </label>
            <label>
              Headline
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder='e.g. "Aspiring Full Stack Developer | MERN Stack"'
              />
            </label>
            <label>
              Skills (comma separated)
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="React, Node.js, MongoDB, JavaScript"
              />
            </label>
          </div>
          <div className="form-col">
            <label>
              About Section
              <textarea
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Paste your LinkedIn About here..."
              />
            </label>
            <label>
              Experience Summary
              <textarea
                rows={4}
                value={experienceText}
                onChange={(e) => setExperienceText(e.target.value)}
                placeholder="Summarize your work / internship / project experience..."
              />
            </label>
          </div>
          <div className="form-full">
            <button className="btn-primary" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze LinkedIn"}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="card result-card">
          <h3>Profile Score</h3>
          <div className="score-display">
            <div className="score-circle">
              <span>{result.score}</span>
              <small>/ 100</small>
            </div>
            <div className="score-details">
              <p>
                <strong>Headline:</strong> {result.headline || headline}
              </p>
              <p className="muted small-text">
                Role Focus: {targetRole}
              </p>
              {result.breakdown && (
                <ul className="small-text">
                  <li>
                    Keywords Score: {result.breakdown.keywordScore}/60
                  </li>
                  <li>Length Score: {result.breakdown.lengthScore}/25</li>
                  <li>
                    Structure Score: {result.breakdown.structureScore}/15
                  </li>
                </ul>
              )}
            </div>
          </div>
          {result.suggestions && result.suggestions.length > 0 && (
            <>
              <h4>Suggestions</h4>
              <ul className="suggestions-list">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkedInAnalyzer;
