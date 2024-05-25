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

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/subgroups" element={<Subgroups />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
