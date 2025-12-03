import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeATS from "./pages/ResumeAnalyzer.jsx";
import LinkedInAnalyzer from "./pages/LinkedInAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeATS />} />
        <Route path="/linkedin" element={<LinkedInAnalyzer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
