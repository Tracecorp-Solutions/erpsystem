import { LayoutDashboard, Files, ArrowRightLeft, Users, CreditCard, ReceiptText, FileText, FolderClosed, Settings, ChevronDown, Minus } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function SideNav() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="sidenav flex flex-col w-3/12 h-screen scroll-auto">
      <div className="flex justify-center items-center px-6 fx-height-100 w-full bg-white pb-0.5">
        <img
          loading="lazy"
          src="../img/logo.png"
          className="aspect-[1.25] w-[87px]"
        />
      </div>
      <div className="flex flex-col justify-center px-6 pt-5 pb-8 w-full text-base leading-6 rounded-none bg-stone-100 text-neutral-400 rounded-tr-3xl">
        <div className="text-xs font-medium tracking-wide uppercase">
          You are managing:
        </div>
        <div className="justify-center items-start px-4 py-3 mt-3 font-semibold bg-white txt-color-blue rounded-xl">
          LedgerMate Inc
        </div>
        <div className="shrink-0 mt-6 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10" />
        <div className="mt-7 text-xs font-medium tracking-wide uppercase">
          main menu
        </div>
        <div
          className={`flex gap-2 py-3 mt-3 whitespace-nowrap rounded-xl ${location.pathname === "/dashboard" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"
            }`}
        >
          <LayoutDashboard className="shrink-0 self-start w-6 aspect-square" />
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="mt-3 py-3 w-full">
          <button className="flex justify-between w-full" onClick={() => toggleDropdown('chartOfAccounts')}>
            <span className="flex gap-2">
              <Files className="shrink-0 self-start w-6 aspect-square" />
              <span>Chart of Accounts</span>
            </span>
            <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
          </button>
          {openDropdown === 'chartOfAccounts' && (
            <div className="pt-3">
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/groups"
                  ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                  : "bg-none"
                  }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <Link to="/groups">Groups</Link>
              </div>
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/subgroups"
                  ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                  : "bg-none"
                  }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <Link to="/subgroups">Subgroups</Link>
              </div>
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/accounts"
                  ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                  : "bg-none"
                  }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <Link to="/accounts">Accounts</Link>
              </div>
            </div>
          )}
        </div>
        <div
          className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/transactions"
            ? "bg-active-green txt-color-blue font-semibold px-4"
            : "bg-none"
            }`}
        >
          <ArrowRightLeft className="shrink-0 self-start w-6 aspect-square" />
          <Link to="/transactions">Transactions</Link>
        </div>
        <div className="mt-3 py-3 w-full">
          <button className="flex justify-between w-full" onClick={() => toggleDropdown('people')}>
            <span className="flex gap-2">
              <Users className="shrink-0 self-start w-6 aspect-square" />
              <span>People</span>
            </span>
            <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
          </button>
          {openDropdown === 'people' && (
            <div className="pt-3">
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/customers"
                  ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                  : "bg-none"
                  }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <Link to="/customers">Customers</Link>
              </div>
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/vendors"
                  ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                  : "bg-none"
                  }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <Link to="/vendors">Vendors</Link>
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 py-3 w-full">
          <button className="flex justify-between w-full" onClick={() => toggleDropdown('bills')}>
            <span className="flex gap-2">
              <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
              <span>Bills & Invoices</span>
            </span>
            <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
          </button>
          {openDropdown === 'bills' && (
            <div className="pt-3">
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/bills"
                  ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                  : "bg-none"
                  }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <Link to="/bills">Bills</Link>
              </div>
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/invoices"
                  ? "bg-active-green txt-color-blue font-semibold px-4 mt-3" : "bg-none" }`}>
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <Link to="/invoices">Invoices</Link>
              </div>
            </div>
          )}
        </div>
        <div
          className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/reports"
            ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none" }`}>
          <FolderClosed className="shrink-0 self-start w-6 aspect-square" />
          <Link to="/reports">Reports</Link>
        </div>
        <div className={`flex gap-2 px-4 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/settings"
          ? "bg-active-green txt-color-blue font-semibold" : "bg-white"}`}>
          <Settings className="shrink-0 self-start w-6 aspect-square" />
          <Link to="/settings">Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
