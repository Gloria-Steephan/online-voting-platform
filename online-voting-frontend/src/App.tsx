import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";

import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import LoginSuccess from "./pages/LoginSuccess";
import ResetPassword from "./pages/ResetPassword";

import { User } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* ================= SIGNUP ================= */}
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup />
            )
          }
        />

        {/* ================= GOOGLE LOGIN CALLBACK ================= */}
        <Route path="/login/success" element={<LoginSuccess />} />

        {/* ================= FORGOT PASSWORD ================= */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= RESET PASSWORD ================= */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= PROTECTED DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ================= DEFAULT ================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
