import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Files, ArrowRightLeft, Users, ReceiptText, FolderClosed, Settings, Minus, ChevronDown } from 'lucide-react';

function MobileNav({ links, closeMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1080);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1080);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeAndNavigate = (path, state) => {
    navigate(path, { state });
    closeMenu();
  };

  return (
    <div className={`mobile-nav bg-white w-full text-neutral-400 h-full fixed top-0 left-0 z-50 flex flex-col ${isSmallScreen ? 'block' : 'hidden'}`}>
      <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-300">
        <img loading="lazy" src="../img/logo.png" className="aspect-[1.25] w-[87px]" alt="Logo" />
        <button onClick={closeMenu} className="text-xl">&times;</button>
      </div>
      <div className="flex flex-col p-4 overflow-y-auto">
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
          <div className={`flex items-center gap-2 py-2 mt-3 whitespace-nowrap rounded-xl ${location.pathname === "/dashboard" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
            <LayoutDashboard className="shrink-0 self-center w-5 aspect-square" />
            <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "dashboard" })}>
              Dashboard
            </button>
          </div>
          <div className="mt-2 py-2 w-full">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("chartOfAccounts")}>
              <span className="flex gap-2 items-center">
                <Files className="shrink-0 w-5 aspect-square" />
                <span>Chart of Accounts</span>
              </span>
              <ChevronDown className="shrink-0 w-5 aspect-square" />
            </button>
            {openDropdown === "chartOfAccounts" && (
              <div className="pt-2">
                <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/groups" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
                  <Minus className="shrink-0 w-5 aspect-square" />
                  <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "groups" })}>
                    Groups
                  </button>
                </div>
                <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/sub-group" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
                  <Minus className="shrink-0 w-5 aspect-square" />
                  <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "sub-group" })}>
                    Subgroups
                  </button>
                </div>
                <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/accounts" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
                  <Minus className="shrink-0 w-5 aspect-square" />
                  <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "accounts" })}>
                    Accounts
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/transactions" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
            <ArrowRightLeft className="shrink-0 self-center w-5 aspect-square" />
            <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "transactions" })}>
              Transactions
            </button>
          </div>
          <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/customer" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
            <Users className="shrink-0 self-center w-5 aspect-square" />
            <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "customer" })}>
              Customers
            </button>
          </div>
          <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/vendors" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
            <Users className="shrink-0 self-center w-5 aspect-square" />
            <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "vendors" })}>
              Vendors
            </button>
          </div>
          <div className="mt-2 py-2 w-full">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("documents")}>
              <span className="flex gap-2 items-center">
                <FolderClosed className="shrink-0 w-5 aspect-square" />
                <span>Documents</span>
              </span>
              <ChevronDown className="shrink-0 w-5 aspect-square" />
            </button>
            {openDropdown === "documents" && (
              <div className="pt-2">
                <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/billing" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
                  <ReceiptText className="shrink-0 w-5 aspect-square" />
                  <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "billing" })}>
                    Bills
                  </button>
                </div>
                <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/invoice" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
                  <ReceiptText className="shrink-0 w-5 aspect-square" />
                  <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "invoice" })}>
                    Invoices
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/reports" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
            <Files className="shrink-0 self-center w-5 aspect-square" />
            <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "reports" })}>
              Reports
            </button>
          </div>
          <div className={`flex items-center gap-2 py-2 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/settings" ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none"}`}>
            <Settings className="shrink-0 self-center w-5 aspect-square" />
            <button onClick={() => closeAndNavigate("/Dashboardlayout", { screen: "settings" })}>
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
