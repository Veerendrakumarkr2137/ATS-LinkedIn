import { useState } from "react";
import API from "../api";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async () => {
    const form = new FormData();
    form.append("resume", file);

    const res = await API.post("/api/resume/analyze", form);
    setResult(res.data.analysis);
  };

  return (
    <div className="page">
      <h2>Resume Analyzer</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={submit}>Analyze</button>
      {result && <h3>ATS Score: {result.score}</h3>}
    </div>
  );
}
