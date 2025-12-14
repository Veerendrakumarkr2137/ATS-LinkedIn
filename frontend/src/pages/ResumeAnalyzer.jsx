import { useState } from "react";
import { analyzeResume } from "../api/api";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);

  const submit = async () => {
    const fd = new FormData();
    fd.append("resume", file);
    fd.append("jobTitle", jobTitle);

    const { data } = await analyzeResume(fd);
    setResult(data.analysis);
  };

  return (
    <div className="card">
      <h2>Resume ATS Analyzer</h2>

      <input
        placeholder="Target Job Title"
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={submit}>Analyze Resume</button>

      {result && (
        <div>
          <h3>ATS Score: {result.score}%</h3>
          <ul>
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
