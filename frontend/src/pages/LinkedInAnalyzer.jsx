import { useState } from "react";
import api from "../api";

export default function LinkedInAnalyzer() {
  const [text, setText] = useState("");
  const [score, setScore] = useState(null);

  const submit = async () => {
    const res = await api.post("/api/linkedin/analyze", {
      headline: text,
    });
    setScore(res.data.analysis.score);
  };

  return (
    <div className="page">
      <h2>LinkedIn Analyzer</h2>
      <textarea onChange={(e) => setText(e.target.value)} />
      <button onClick={submit}>Analyze</button>
      {score && <h3>Score: {score}</h3>}
    </div>
  );
}
