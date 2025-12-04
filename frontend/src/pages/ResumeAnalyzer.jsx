// frontend/src/pages/ResumeAnalyzer.jsx
import React, { useState } from "react";
import { api } from "../api";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setResult(null);
    if (!file) return setErr("Choose a PDF or DOCX resume");
    const fd = new FormData();
    fd.append("resume", file);
    fd.append("jobTitle", jobTitle);
    try {
      const res = await api.post("/api/resume/analyze", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.analysis);
    } catch (error) {
      setErr(error?.response?.data?.message || "Analysis failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Resume ATS Analyzer</h2>
        <form className="form" onSubmit={submit}>
          <label>
            Upload resume
            <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <label>
            Target Job Title
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g., Full Stack Developer" />
          </label>
          <button className="btn-primary">Analyze</button>
        </form>

        {err && <div className="error-box">{err}</div>}

        {result && (
          <div className="result-card card gradient-card">
            <h3>Score: {result.score}</h3>
            <div className="score-display">
              <div className="score-circle">
                <span>{result.score}</span>
                <small>ATS</small>
              </div>
              <div className="score-details">
                <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(result.breakdown, null, 2)}</pre>
                <h4>Suggestions</h4>
                <ul className="suggestions-list">{result.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
