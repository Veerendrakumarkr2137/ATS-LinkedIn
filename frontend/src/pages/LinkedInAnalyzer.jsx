import { useState } from "react";
import { postJSON } from "../api/api";

export default function LinkedInAnalyzer() {
  const [headline, setHeadline] = useState("");
  const [score, setScore] = useState(null);

  const submit = async () => {
    const res = await postJSON(
      "/api/linkedin/analyze",
      { headline },
      localStorage.getItem("token")
    );
    setScore(res.analysis.score);
  };

  return (
    <div className="page">
      <h2>LinkedIn Analyzer</h2>
      <input placeholder="Headline" onChange={e => setHeadline(e.target.value)} />
      <button onClick={submit}>Analyze</button>
      {score && <h3>Score: {score}</h3>}
    </div>
  );
}
