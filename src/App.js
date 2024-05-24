import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Header';
import Profile from './pages/onboarding/Profile';

function App() {

  return (
    <div className="min-h-full">
      <div className="py-">
        <Router>
         <Routes>
          <Route path="/profile" element={<Profile />} />
         </Routes>
         {/* <Main /> */}
        </Router>
      </div>
    </div>
  );
}

export default App;
