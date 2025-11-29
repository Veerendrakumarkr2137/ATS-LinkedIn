// src/pages/ResumeAnalyzer.jsx
import React, { useState } from "react";
import { api } from "../api";

const ResumeAnalyzer = () => {
  const [jobTitle, setJobTitle] = useState("Full Stack Developer");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // allow only PDF or DOCX
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selected.type)) {
      setError("Please upload a PDF or DOCX file only.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) {
      setError("Please choose a resume file first.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("jobTitle", jobTitle);
      // 👇 IMPORTANT: field name must be "resume" (matches backend upload.single("resume"))
      formData.append("resume", file);

      const res = await api.post("/api/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.analysis);
    } catch (err) {
      console.error("Resume analyze error:", err);
      setError(
        err?.response?.data?.message || "Resume analysis failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const scorePercent = result?.score ?? 0;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>Resume ATS Analyzer</h1>
        <p className="muted">
          Upload your <strong>PDF</strong> or <strong>DOCX</strong> resume to
          get an estimated ATS score and improvement suggestions.
        </p>
      </div>

      <div className="card">
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <label>
            Target Job Title
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              required
            />
          </label>

          <label>
            Resume File (PDF / DOCX)
            <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
            {file && (
              <p className="muted small-text">
                Selected: <strong>{file.name}</strong>
              </p>
            )}
          </label>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>
      </div>

      {result && (
        <div className="card result-card slide-up">
          <h2>ATS Score</h2>
          <div className="score-wrapper">
            <div className="score-circle">
              <span>{scorePercent}%</span>
            </div>
            <div className="score-details">
              <p>
                <strong>Job Title:</strong> {result.jobTitle || jobTitle}
              </p>
              {result.breakdown && (
                <>
                  <p>
                    <strong>Keyword score:</strong>{" "}
                    {result.breakdown.keywordScore}/60
                  </p>
                  <p>
                    <strong>Length score:</strong>{" "}
                    {result.breakdown.lengthScore}/25
                  </p>
                  <p>
                    <strong>Structure score:</strong>{" "}
                    {result.breakdown.structureScore}/15
                  </p>
                </>
              )}
            </div>
          </div>

          {result.suggestions && result.suggestions.length > 0 && (
            <>
              <h3 className="mt-24">Suggestions</h3>
              <ul className="suggestion-list">
                {result.suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
