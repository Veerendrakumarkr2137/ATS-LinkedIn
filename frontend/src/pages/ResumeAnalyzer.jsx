import { useState } from "react";
import { postFile } from "../api/api";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("resume", file);
    form.append("jobTitle", "Full Stack Developer");

    const res = await postFile(
      "/api/resume/analyze",
      form,
      localStorage.getItem("token")
    );
    setResult(res.analysis);
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
