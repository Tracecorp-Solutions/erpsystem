import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Files, ArrowRightLeft, Users, CreditCard, ReceiptText, FileText, FolderClosed, Settings, ChevronDown, Minus } from 'lucide-react';

function SideNav() {
  const [showAccountsSublinks, setShowAccountsSublinks] = useState(false);
  const [showPeopleSublinks, setShowPeopleSublinks] = useState(false);
  const [showBillsSublinks, setShowBillsSublinks] = useState(false);
  const [showBankSublinks, setShowBankSublinks] = useState(false);

  const toggleAccountsSublinks = () => {
    setShowAccountsSublinks(!showAccountsSublinks);
  };

  const togglePeopleSublinks = () => {
    setShowPeopleSublinks(!showPeopleSublinks);
  };

  const toggleBillsSublinks = () => {
    setShowBillsSublinks(!showBillsSublinks);
  };

  const toggleBankSublinks = () => {
    setShowBankSublinks(!showBankSublinks);
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
            <button className="dropdown-toggle" onClick={toggleAccountsSublinks}>
              <span className="dp-label">
                <Files />
                <span>Chart of Accounts</span>
              </span>
              <ChevronDown />
            </button>
            {showAccountsSublinks && (
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
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={togglePeopleSublinks}>
            <span className="dp-label">
              <Users />
              <span>People</span>
            </span>
            <ChevronDown />
            </button>
            {showPeopleSublinks && (
              <div className="dropdown-menu">
                <Link to="/customers">
                  <Minus />
                  <span>Customers</span>
                </Link>
                <Link to="/vendors">
                  <Minus />
                  <span>Vendors</span>
                </Link>
              </div>
            )}
          </div>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleBankSublinks}>
              <span className="dp-label">
                <CreditCard />
                <span>Banking</span>
              </span>
              <ChevronDown />
            </button>
            {showBankSublinks && (
              <div className="dropdown-menu">
                <Link to="/deposits">
                  <Minus />
                  <span>Deposits</span>
                </Link>
                <Link to="/transfers">
                  <Minus />
                  <span>Transfers</span>
                </Link>
                <Link to="/reconciliations">
                  <Minus />
                  <span>Reconciliations</span>
                </Link>
              </div>
            )}
          </div>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleBillsSublinks}>
              <span className="dp-label">
                <ReceiptText />
                <span>Bills & invoices</span>
              </span>
              <ChevronDown />
            </button>
            {showBillsSublinks && (
              <div className="dropdown-menu">
                <Link to="/bills">
                  <Minus />
                  <span>Bills</span>
                </Link>
                <Link to="/invoices">
                  <Minus />
                  <span>Invoices</span>
                </Link>
              </div>
            )}
          </div>
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
