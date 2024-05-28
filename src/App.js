import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Subgroups from './pages/Subgroups';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Profile from './pages/onboarding/Profile';
import Company from './pages/onboarding/Company';
import Vendors from './pages/Vendors';
import Customer from './pages/Customer';
import Signup from "./pages/authentication/Signup";
import Reset from "./pages/authentication/Reset";
import Verify from "./pages/authentication/Verify";
import Login from "./pages/authentication/Login";
import Forgot from "./pages/authentication/Forgot";


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
  const handleForgot = () => {
    setIsReset(true);
  };
  return (
    <div className="min-h-full">
      <div className="py-">

    <BrowserRouter>
      <div className="body">
        <Routes>
           <Route path="/signup" element={<Signup onVerify={handleVerify} />} />
            <Route path="/verify" element={<Verify onVerify={handleVerify} />} />
            <Route path="/forgot" element={<Forgot onForgot={handleForgot} />} />
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Login />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/sub-group" element={<Subgroups />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company" element={<Company />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
