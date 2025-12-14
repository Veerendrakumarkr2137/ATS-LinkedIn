import { useState } from "react";
import api from "../api";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("resume", file);

    const res = await api.post("/api/resume/analyze", data);
    setResult(res.data.analysis);
  };

  return (
    <div className="page">
      <h2>ATS Resume Analyzer</h2>
      <form onSubmit={submit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button>Analyze</button>
      </form>
      {result && <h3>ATS Score: {result.score}</h3>}
    </div>
  );
}
