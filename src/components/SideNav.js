import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Files, ArrowRightLeft, Users, CreditCard, ReceiptText, FileText, FolderClosed, Settings, ChevronDown, Minus } from 'lucide-react';

function SideNav() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <>
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
            <NavLink exact to="/" activeClassName="active">
              <LayoutDashboard /><span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={() => toggleDropdown('chartOfAccounts')}>
                <span className="dp-label">
                  <Files />
                  <span>Chart of Accounts</span>
                </span>
                <ChevronDown />
              </button>
              {openDropdown === 'chartOfAccounts' && (
                <div className="dropdown-menu">
                  <NavLink to="/groups" activeClassName="active">
                    <Minus />
                    <span>Groups</span>
                  </NavLink>
                  <NavLink to="/sub-group" activeClassName="active">
                    <Minus />
                    <span>Subgroups</span>
                  </NavLink>
                  <NavLink to="/accounts" activeClassName="active">
                    <Minus />
                    <span>Accounts</span>
                  </NavLink>
                </div>
              )}
            </div>
          </li>
          <li>
            <NavLink to="/transactions" activeClassName="active">
              <ArrowRightLeft />
              <span>Transactions</span> 
            </NavLink>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={() => toggleDropdown('people')}>
              <span className="dp-label">
                <Users />
                <span>People</span>
              </span>
              <ChevronDown />
              </button>
              {openDropdown === 'people' && (
                <div className="dropdown-menu">
                  <NavLink to="/customers" activeClassName="active">
                    <Minus />
                    <span>Customers</span>
                  </NavLink>
                  <NavLink to="/vendors" activeClassName="active">
                    <Minus />
                    <span>Vendors</span>
                  </NavLink>
                </div>
              )}
            </div>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={() => toggleDropdown('bank')}>
                <span className="dp-label">
                  <CreditCard />
                  <span>Banking</span>
                </span>
                <ChevronDown />
              </button>
              {openDropdown === 'bank' && (
                <div className="dropdown-menu">
                  <NavLink to="/deposits">
                    <Minus />
                    <span>Deposits</span>
                  </NavLink>
                  <NavLink to="/transfers">
                    <Minus />
                    <span>Transfers</span>
                  </NavLink>
                  <NavLink to="/reconciliations">
                    <Minus />
                    <span>Reconciliations</span>
                  </NavLink>
                </div>
              )}
            </div>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={() => toggleDropdown('billsInvoices')}>
                <span className="dp-label">
                  <ReceiptText />
                  <span>Bills & invoices</span>
                </span>
                <ChevronDown />
              </button>
              {openDropdown === 'billsInvoices' && (
                <div className="dropdown-menu">
                  <NavLink to="/bills" activeClassName="active">
                    <Minus />
                    <span>Bills</span>
                  </NavLink>
                  <NavLink to="/invoices" activeClassName="active">
                    <Minus />
                    <span>Invoices</span>
                  </NavLink>
                </div>
              )}
            </div>
          </li>
          <li>
            <NavLink to="/files" activeClassName="active">
              <FileText />
              <span>Files</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active">
            <FolderClosed />
              <span>Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <Settings />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideNav;
