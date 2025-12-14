import { useState } from "react";
import { analyzeResume } from "../api/api";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);

  const submit = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", jobTitle);

    const res = await analyzeResume(formData);
    setResult(res.data);
  };

  return (
    <div className="page">
      <h2>Resume ATS Analyzer</h2>
      <input placeholder="Target Job Title" onChange={e => setJobTitle(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={submit}>Analyze Resume</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
