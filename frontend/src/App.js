// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import LinkedInAnalyzer from "./pages/LinkedInAnalyzer";
import "./App.css";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <ResumeAnalyzer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/linkedin"
                element={
                  <ProtectedRoute>
                    <LinkedInAnalyzer />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
