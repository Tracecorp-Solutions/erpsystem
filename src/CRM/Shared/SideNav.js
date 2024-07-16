import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Files,
  ArrowRightLeft,
  Users,
  ReceiptText,
  FolderClosed,
  Settings,
  ChevronDown,

  Minus,
  Menu,
} from "lucide-react";
import MobileNav from "./MobileNav";

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1080);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const moduleScreens = [
    { to: "/Dashboard", label: "Dashboard" },
    { to: "/connection", label: "Connection" },
    { to: "/sub-group", label: "Subgroups" },
    { to: "/accounts", label: "Accounts" },
    { to: "/transactions", label: "Transactions" },
    { to: "/customer", label: "Customers" },
    { to: "/vendors", label: "Vendors" },
    { to: "/billing", label: "Bills" },
    { to: "/invoice", label: "Invoices" },
    { to: "/reports", label: "Reports" },
    { to: "/settings", label: "Settings" },
  ];

  const hoverColor = "#9ec137";

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
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const toggleDropdownReports = () => {
    setOpenDropdown(openDropdown === "reports" ? null : "reports");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path, state) => {
    if (state && state.dropdown) {
      setOpenDropdown(state.dropdown);
    } else {
      setOpenDropdown(null);
    }
    navigate(path, { state });
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
          {isMenuOpen && (
            <MobileNav links={moduleScreens} closeMenu={toggleMenu} />
          )}
        </div>
      )}
      <div
        className={`sidenav flex flex-col w-3/12 h- scroll-auto relative ${
          isSmallScreen ? "hidden" : "block"
        }`}
      >
        <div className="flex justify-center items-center px-6 fx-height-100 w-full bg-white pb-0.5">
          <img
            loading="lazy"
            src="../img/logo.png"
            className="aspect-[1.25] w-[87px]"
          />
        </div>
        <div className="flex flex-col justify-center mt-4 px-6 pt-5 pb-8 w-full text-base leading-6 rounded-none bg-stone-100 text-neutral-400 rounded-tr-3xl">
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
            className={`flex gap-2 py-3 mt-3 whitespace-nowrap rounded-xl ${
              location.pathname === "/crm-dashboard"
                ? "bg-active-green txt-color-blue font-semibold px-4"
                : "bg-none"
            }`}
          >
            <LayoutDashboard className="shrink-0 self-start w-6 aspect-square" />
            <button
              onClick={() =>
                navigate("/crm", { state: { screen: "crm-dashboard" } })
              }
            >
              Dashboard
            </button>
          </div>
          <div className="mt-3 py-3 w-full">
            <button
              className="flex justify-between w-full"
              onClick={() => toggleDropdown("chartOfAccounts")}
            >
              <span className="flex gap-2">
                <Files className="shrink-0 self-start w-6 aspect-square" />
                <span>Customer Care</span>
              </span>
              <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
            </button>
            {openDropdown === "chartOfAccounts" && (
              <div className="pt-3">
                <div
                  className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                    location.pathname === "/newapplication"
                      ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                      : "bg-none"
                  }`}
                >
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button onClick={() => navigate("/billingDashboard", { state: { screen: "new-application" } })}>
                    New Connections
                  </button>
                </div>
                <div
                  className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                    location.pathname === "/application"
                      ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                      : "bg-none"
                  }`}
                >
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    onClick={() =>
                      navigate("/billingdashboard", {
                        state: { screen: "application" },
                      })
                    }
                  >
                    View Applications
                  </button>
                </div>
              </div>
            )}
          </div>
            {/* Billing & Invoicing */}
            <div className="flex gap-2 py-3 mt-2 whitespace-nowrap justify-between rounded-xl">
            <div className="flex">
              <ArrowRightLeft className="shrink-0 self-start w-6 aspect-square" />
              <span>Job Cards</span>
            </div>
            <button
              onClick={() => toggleDropdown("billing")}
              className="flex items-center"
            >
              <ChevronDown className="shrink-0 self-start w-6 aspect-square ml-2" />
            </button>
          </div>
          {openDropdown === "billing" && (
            <div className="pt-3">
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                  location.state?.dropdown === "adjustment"
                    ? "bg-active-green txt-color-blue font-semibold px-4"
                    : "bg-none"
                }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <button
                  onClick={() =>
                    handleNavigation("/billingdashboard", {
                      dropdown: "adjustment",
                      screen: "bill-adjsutment",
                    })
                  }
                >
                  Bill Adjusmtent
                </button>
              </div>
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                  location.state?.dropdown === "bill-period"
                    ? "bg-active-green txt-color-blue font-semibold px-4"
                    : "bg-none"
                }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <button
                  onClick={() =>
                    handleNavigation("/billingdashboard", {
                      dropdown: "bill-period",
                      screen: "bill-period",
                    })
                  }
                >
                  Bill Period Setup
                </button>
              </div>
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                  location.state?.dropdown === "bill-production"
                    ? "bg-active-green txt-color-blue font-semibold px-4"
                    : "bg-none"
                }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <button
                  onClick={() =>
                    handleNavigation("/billingdashboard", {
                      dropdown: "bill-production",
                      screen: "bill-production",
                    })
                  }
                >
                  Bill Production
                </button>
              </div>
            </div>
          )}
          {/* Payments section */}
         
          {/* Reports section */}
          <div className="flex gap-2 py-3 mt-2 whitespace-nowrap justify-between rounded-xl">
            <div className="flex">
            <Files className="shrink-0 self-start w-6 aspect-square" />
            <span>Reports</span>
            </div>
            <button
              onClick={() => toggleDropdown("reports")}
              className="flex items-center"
            >
              <ChevronDown className="shrink-0 self-start w-6 aspect-square ml-2" />
            </button>
          </div>
          {openDropdown === "reports" && (
            <div className="pt-3">
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                  location.state?.dropdown === "customer-invoice"
                    ? "bg-active-green txt-color-blue font-semibold px-4"
                    : "bg-none"
                }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <button
                   onClick={() =>
                    handleNavigation("/billingdashboard", {
                      dropdown: "customer-invoice",
                      screen: "customer-invoice",
                    })
                  }
                >
                  Customer Invoice
                </button>
              </div>
              <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                  location.state?.dropdown === "payments"
                    ? "bg-active-green txt-color-blue font-semibold px-4"
                    : "bg-none"
                }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <button
                  onClick={() =>
                    handleNavigation("/billingdashboard", {
                      dropdown: "payments",
                      screen: "payments",
                    })
                  }
                >
                  Payments
                </button>
              </div>
              <div
                  className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                    location.pathname === "/accounts"
                      ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                      : "bg-none"
                  }`}
                >
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    onClick={() =>
                      navigate("/billingdashboard", {
                        state: { screen: "connectedcustomers" },
                      })
                    }
                  >
                   Connected  Customers
                  </button>
                </div>
                <div
                  className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                    location.pathname === "/accounts"
                      ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                      : "bg-none"
                  }`}
                >
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    onClick={() =>
                      navigate("/billingdashboard", {
                        state: { screen: "customer-statement" },
                      })
                    }
                  >
                   Customer Statement
                  </button>
                </div>
                <div
                  className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                    location.pathname === "/accounts"
                      ? "bg-active-green txt-color-blue font-semibold px-4 mt-3"
                      : "bg-none"
                  }`}
                >
                  <Minus className="shrink-0 self-start w-6 aspect-square" />
                  <button
                    onClick={() =>
                      navigate("/billingdashboard", {
                        state: { screen: "tariffs" },
                      })
                    }
                  >
                    Customer Tariffs
                  </button>
                </div>
                <div
                className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${
                  location.state?.dropdown === "billing"
                    ? "bg-active-green txt-color-blue font-semibold px-4"
                    : "bg-none"
                }`}
              >
                <Minus className="shrink-0 self-start w-6 aspect-square" />
                <button
                   onClick={() =>
                    handleNavigation("/billingdashboard", {
                      dropdown: "billing",
                      screen: "billing",
                    })
                  }
                >
                 Customer Bills
                </button>
              </div>
            </div>
          )}
         
          <div className="mt-4 mb-6 py-3 w-full">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("documents")}>
              <span className="flex gap-2">
                <Settings className="shrink-0 self-start w-6 aspect-square" />
                <span>Configuration</span>
              </span>
              <ChevronDown className="shrink-0 self-start w-6 aspect-square" />
            </button>
            {openDropdown === "documents" && (
              <div className="pt-3">
                <div className={`flex gap-2 py-3 mt-2 whitespace-nowrap rounded-xl ${location.pathname === "/billing" ? "bg-active-green txt-color-blue font-semibold px-4 mt-3" : "bg-none"}`}>
                  <ReceiptText className="shrink-0 self-start w-6 aspect-square" />
                  <button onClick={() => navigate("/crm", { state: { screen: "departments" } })}>
                    Departments
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default SideNav;
