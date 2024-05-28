import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './pages/onboarding/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Subgroups from './pages/Subgroups';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Signup from './pages/setup/Signup';
import Login from './pages/setup/Login';
import VerifyAccount from './pages/setup/VerifyAccount';
import ResetPassword from './pages/setup/ResetPassword';
import ForgotPassword from './pages/setup/ForgotPassword';
import Profile from './pages/onboarding/Profile';
import Company from './pages/onboarding/Company';
import Vendors from './pages/Vendors';
import Customer from './pages/Customer';


function App() {
  return (
    <div className="min-h-full">
      <div className="py-">

    <BrowserRouter>
      <div className="body">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/sub-group" element={<Subgroups />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company" element={<Company />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
