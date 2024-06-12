import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, BellDot, ChevronDown, Menu } from "lucide-react";

function TopNav() {
  const user = {
    name: "Nakitto Catherine",
    imageUrl: "./img/profile-pic.png",
    imageSize: 40,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="topnav"
      style={{
        position: "sticky",
        right: 0,
        width: "80%",
        zIndex: 1000,
        alignContent: "flex-end",
      }}
    >
      <ul>
        {isMobile ? null : ( // Hide on screens under 768px
          <li>
            <div
              className="button-container"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <button className="btn" onClick={toggleDropdown}>
                <Plus />
                <span>New Entry</span>
                <ChevronDown />
              </button>
            </div>

            {isOpen && (
              <div
                className="dropdown-content"
                style={{
                  position: "absolute",
                  backgroundColor: "#f9f9f9",
                  minWidth: "160px",
                  zIndex: 1001,
                  top: "calc(100% + 5px)",
                }}
              >
                <Link
                  to="/vendors"
                  style={{ color: "#007bff", padding: "10px", display: "block" }}
                >
                  Vendors
                </Link>
                <Link
                  to="/customer"
                  style={{ color: "#007bff", padding: "10px", display: "block" }}
                >
                  Customers
                </Link>
                <Link
                  to="/account"
                  style={{ color: "#007bff", padding: "10px", display: "block" }}
                >
                  New Account
                </Link>
                <Link
                  to="/billing"
                  style={{ color: "#007bff", padding: "10px", display: "block" }}
                >
                  Billing
                </Link>
                <Link
                  to="/invoice"
                  style={{ color: "#007bff", padding: "10px", display: "block" }}
                >
                  Invoice
                </Link>
              </div>
            )}
          </li>
        )}

        <li>
          <Link to="/" className="notif">
            <BellDot />
          </Link>
        </li>
        <li>
          <Link to="/" className="profile">
            <img
              className="avatar"
              src={sessionStorage.getItem("profilepic")}
              alt={"Photo of " + user.name}
              style={{
                width: user.imageSize,
                height: user.imageSize,
              }}
            />
             <span className="user-name">{sessionStorage.getItem("fullname")}</span>
            <ChevronDown />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TopNav;
