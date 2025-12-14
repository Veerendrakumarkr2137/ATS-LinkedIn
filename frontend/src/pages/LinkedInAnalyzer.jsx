import { useState } from "react";
import { analyzeLinkedIn } from "../api/api";

export default function LinkedInAnalyzer() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const submit = async () => {
    const res = await analyzeLinkedIn(form);
    setResult(res.data);
  };

  return (
    <div className="page">
      <h2>LinkedIn Analyzer</h2>

      <input placeholder="Target Role" onChange={e => setForm({...form, targetRole: e.target.value})} />
      <textarea placeholder="Headline" onChange={e => setForm({...form, headline: e.target.value})} />
      <textarea placeholder="Skills" onChange={e => setForm({...form, skills: e.target.value})} />
      <textarea placeholder="About" onChange={e => setForm({...form, about: e.target.value})} />
      <textarea placeholder="Experience" onChange={e => setForm({...form, experienceText: e.target.value})} />

      <button onClick={submit}>Analyze LinkedIn</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
