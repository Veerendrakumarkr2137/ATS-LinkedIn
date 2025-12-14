import { useState } from "react";
import API from "../api";

export default function LinkedInAnalyzer() {
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [result, setResult] = useState(null);

  const submit = async () => {
    const res = await API.post("/api/linkedin/analyze", {
      headline,
      about,
      skills: []
    });
    setResult(res.data.analysis);
  };

  return (
    <div className="page">
      <h2>LinkedIn Analyzer</h2>
      <input placeholder="Headline" onChange={e => setHeadline(e.target.value)} />
      <textarea placeholder="About" onChange={e => setAbout(e.target.value)} />
      <button onClick={submit}>Analyze</button>
      {result && <h3>Score: {result.score}</h3>}
    </div>
  );
}
