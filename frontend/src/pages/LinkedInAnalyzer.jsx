// frontend/src/pages/LinkedInAnalyzer.jsx
import React, { useState } from "react";
import { api } from "../api";

const LinkedInAnalyzer = () => {
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/linkedin/analyze", {
        headline,
        about,
        skills: skills.split(",").map((s) => s.trim()),
        experienceText: "",
      });
      setResult(res.data.analysis);
    } catch (error) {
      setErr(error?.response?.data?.message || "Analyze failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>LinkedIn Analyzer</h2>
        <form className="form" onSubmit={submit}>
          <label>Headline<input value={headline} onChange={(e) => setHeadline(e.target.value)} /></label>
          <label>About<textarea value={about} onChange={(e) => setAbout(e.target.value)} /></label>
          <label>Skills (comma separated)<input value={skills} onChange={(e) => setSkills(e.target.value)} /></label>
          <button className="btn-primary">Analyze</button>
        </form>

        {err && <div className="error-box">{err}</div>}

        {result && (
          <div className="card result-card">
            <h3>Score: {result.score}</h3>
            <pre>{JSON.stringify(result.breakdown, null, 2)}</pre>
            <h4>Suggestions</h4>
            <ul>{result.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInAnalyzer;
