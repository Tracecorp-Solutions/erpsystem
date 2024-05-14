import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Files, ArrowRightLeft, Users, CreditCard, ReceiptText, FileText, FolderClosed, Settings, ChevronDown, Minus } from 'lucide-react';

function SideNav() {
  const [showSublinks, setShowSublinks] = useState(false);

  const toggleSublinks = () => {
    setShowSublinks(!showSublinks);
  };

  return (
    <nav className="sidenav">
      <div className="logo">
        <img src="./img/logo.png" alt="Logo" />
      </div>
      <ul>
        <li>
          <p className="caption">You are managing:</p>
        </li>
        <li className="company">LedgerMate Inc</li>
        <hr />
        <li>
          <p className="caption">Main menu</p>
        </li>
        <li>
          <Link to="/">
            <LayoutDashboard /><span>Dashboard</span>
          </Link>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleSublinks}>
              <Files />
              <span>Chart of Accounts</span>
              <ChevronDown />
            </button>
            {showSublinks && (
              <div className="dropdown-menu">
                <Link to="/groups">
                  <Minus />
                  <span>Groups</span>
                </Link>
                <Link to="/subgroups">
                  <Minus />
                  <span>Subgroups</span>
                </Link>
                <Link to="/accounts">
                  <Minus />
                  <span>Accounts</span>
                </Link>
              </div>
            )}
          </div>
        </li>
        <li>
          <Link to="/transactions">
            <ArrowRightLeft />
            <span>Transactions</span> 
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <Users />
            <span>People</span>
            <ChevronDown />
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <CreditCard />
            <span>Banking</span>
            <ChevronDown />
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <ReceiptText />
            <span>Bills & invoices</span>
            <ChevronDown />
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <FileText />
            <span>Files</span>
          </Link>
        </li>
        <li>
          <Link to="/transactions">
          <FolderClosed />
            <span>Reports</span>
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <Settings />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;
