import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Files, ArrowRightLeft, Users, ReceiptText, FolderClosed, Settings, ChevronDown, Minus, Menu } from "lucide-react";
import MobileNav from "./MobileNav";

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1080);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const moduleScreens = [
    { to: "/Dashboardlayout", label: "Dashboard" },
    { to: "/groups", label: "Groups" },
    { to: "/sub-group", label: "Subgroups" },
    { to: "/accounts", label: "Accounts" },
    { to: "/transactions", label: "Transactions" },
    { to: "/customer", label: "Customers" },
    { to: "/vendors", label: "Vendors" },
    { to: "/billing", label: "Bills" },
    { to: "/invoice", label: "Invoices" },
    { to: "/report", label: "Report" },
    { to: "/settings", label: "Settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1080);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prevDropdown) => (prevDropdown === dropdownName ? null : dropdownName));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (pathname) => {
    return location.pathname === pathname ? "bg-active-green txt-color-blue font-semibold px-4" : "bg-none";
  };

  const isDropdownActive = (dropdownName) => {
    return openDropdown === dropdownName ? "bg-active-green txt-color-blue font-semibold px-4 mt-3" : "bg-none";
  };

  return (
    <>
      {isSmallScreen && (
        <div className="mobile-nav-container">
          <button
            className="menu-btn"
            onClick={toggleMenu}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: "1000",
              color: isMenuOpen ? "white" : "black",
              backgroundColor: isMenuOpen ? "none" : "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Menu size={24} />
          </button>
          {isMenuOpen && <MobileNav links={moduleScreens} closeMenu={toggleMenu} />}
        </div>
      )}
      <div className={`sidenav flex flex-col w-3/12 h-screen scroll-auto relative ${isSmallScreen ? "hidden" : "block"}`}>
        <div className="flex justify-center items-center px-6 fx-height-100 w-full bg-white pb-0.5">
          <img loading="lazy" src="../img/logo.png" className="aspect-[1.25] w-[87px]" />
        </div>
        <div className="flex flex-col justify-center px-6 pt-5 pb-8 w-full text-base leading-6 rounded-none bg-stone-100 text-neutral-400 rounded-tr-3xl">
          <div className="text-xs font-medium tracking-wide uppercase">
            You are managing:
          </div>
          <div className="justify-center items-start px-4 py-3 mt-3 font-semibold bg-white txt-color-blue rounded-xl">
            {sessionStorage.getItem("organisationname")}
          </div>
          <div className="shrink-0 mt-6 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10" />
          <div className="mt-7 text-xs font-medium tracking-wide uppercase">
            Main Menu
          </div>

          {/* Dashboard */}
          <div className={`flex gap-2 py-3 mt-3 whitespace-nowrap rounded-xl ${isActive("/Dashboardlayout")}`}>
            <LayoutDashboard className="shrink-0 self-start w-6 aspect-square" />
            <button
              className=""
              onClick={() => navigate("/Dashboardlayout", { state: { screen: "dashboard" } })}
            >
              Dashboard
            </button>
          </div>

          {/* Chart of Accounts Dropdown */}
          <div className="mt-3 py-3 w-full">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("chartOfAccounts")}>
              <span className="flex gap-2">
                <Files className="shrink-0 self-start w-6 aspect-square" />
                <span>Chart of Accounts</span>
              </span>
              <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
            </button>
            {openDropdown === "chartOfAccounts" && (
              <div className="pt-3">
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/groups")}`}>
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "groups" } })}
                  >
                    Groups
                  </button>
                </div>
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/sub-group")}`}>
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "sub-group" } })}
                  >
                    Subgroups
                  </button>
                </div>
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/accounts")}`}>
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "accounts" } })}
                  >
                    Accounts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Transactions */}
          <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/transactions")}`}>
            <ArrowRightLeft className="shrink-0 self-start w-6 aspect-square" />
            <button
              className=""
              onClick={() => navigate("/Dashboardlayout", { state: { screen: "transactions" } })}
            >
              Journal Entries
            </button>
          </div>

          {/* Purchase Ledger Dropdown */}
          <div className="mt-3 py-3 w-full">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("purchaseLedger")}>
              <span className="flex gap-2">
                <Users className="shrink-0 self-start w-6 aspect-square" />
                <span>Purchase Ledger</span>
              </span>
              <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
            </button>
            {openDropdown === "purchaseLedger" && (
              <div className="pt-3">
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/billing")}`}>
                  <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "vendors" } })}
                  >
                    Vendors
                  </button>
                </div>
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/invoice")}`}>
                  <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "billing" } })}
                  >
                    Bills
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Purchase Order Dropdown */}
          <div className="mt-3 py-3 w-full">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("purchaseOrder")}>
              <span className="flex gap-2">
                <Users className="shrink-0 self-start w-6 aspect-square" />
                <span>Purchase Order</span>
              </span>
              <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
            </button>
            {openDropdown === "purchaseOrder" && (
              <div className="pt-3">
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/customer")}`}>
                  <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "customer" } })}
                  >
                    Customers
                  </button>
                </div>
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/invoice")}`}>
                  <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "invoice" } })}
                  >
                    Invoices
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reports Dropdown */}
          <div className="mt-3 py-3 w-full">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("reports")}>
              <span className="flex gap-2">
                <Files className="shrink-0 self-start w-6 aspect-square" />
                <span>Reports</span>
              </span>
              <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
            </button>
            {openDropdown === "reports" && (
              <div className="pt-3">
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/")}`}>
                  <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className="hover:bg-green-300"
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "ledger" } })}
                  >
                    General Ledger
                  </button>
                </div>
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/report")}`}>
                  <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    className=""
                    onClick={() => navigate("/Dashboardlayout", { state: { screen: "reports" } })}
                  >
                    General Reports
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stock Management */}
          <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/")}`}>
            <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
            <button
              className=""
              onClick={() => navigate("/Dashboardlayout", { state: { screen: "" } })}
            >
              Stock Management
            </button>
          </div>

          {/* Settings */}
          <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${isActive("/settings")}`}>
            <Settings className="shrink-0 self-start w-6 aspect-square" />
            <button
              className=""
              onClick={() => navigate("/DashboardLayout", { state: { screen: "settings" } })}
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
