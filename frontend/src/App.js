import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import LinkedInAnalyzer from "./pages/LinkedInAnalyzer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/resume"
            element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>}
          />
          <Route
            path="/linkedin"
            element={<ProtectedRoute><LinkedInAnalyzer /></ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
