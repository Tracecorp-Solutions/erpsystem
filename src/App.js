import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Main from "./components/Header";
import Signup from "./pages/authentication/Signup";
import Reset from "./pages/authentication/Reset";
import Verify from "./pages/authentication/Verify";
import Login from "./pages/authentication/Login";
import Forgot from "./pages/authentication/Forgot";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's login status
  const [isVerified, setIsVerified] = useState(false); // State to track user's verification status
  const [isReset, setIsReset] = useState(false); // State to track user's reset password status

  // Function to set login status
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to set verification status
  const handleVerify = () => {
    setIsVerified(true);
  };

  // Function to set reset password status
  const handleReset = () => {
    setIsReset(true);
  };

  return (
    <div className="min-h-full">
      <div className="py-">
        <Router>
          {/* <Main /> */}
          <Routes>
            <Route path="/" element={<Signup onVerify={handleVerify} />} />
            <Route path="/verify" element={<Verify onVerify={handleVerify} />} />
            <Route path="/reset" element={<Reset onReset={handleReset} />} />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/forgot" element={<Forgot />} />
            <Route
              path="/dashboard"
              element={
                isLoggedIn && isVerified ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
