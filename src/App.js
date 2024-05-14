import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Subgroups from './pages/Subgroups';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import SideNav from './components/SideNav';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <SideNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/subgroups" element={<Subgroups />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
