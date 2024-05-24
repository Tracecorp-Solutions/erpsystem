import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Header';
import Signup from './pages/authentication/Signup';
import Reset from './pages/authentication/Reset';
import Verify from './pages/authentication/Verify';
import Login from './pages/authentication/Login';
import Forgot from './pages/authentication/Forgot';

function App() {
  return (
    <div className="min-h-full">
      <div className="py-">
        <Router>
          <Main />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot" element={<Forgot />} />
          </Routes>
        </Router>
      </div>
    </div>

  );
}

export default App;

