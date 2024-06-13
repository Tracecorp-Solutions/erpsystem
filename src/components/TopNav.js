import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BellDot, ChevronDown } from 'lucide-react';

function TopNav() {
  const user = {
    name: 'Nakitto Catherine',
    imageUrl: './img/profile-pic.png',
    imageSize: 40,
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="topnav" style={{
      position: 'sticky',
      right: 0,
      width: '100%',
      zIndex: 1000,
    }}>
      <ul>
        <li>
          <div className="dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
            <button className="btn" onClick={toggleDropdown}>
              <Plus /><span>New Entry</span>
              <ChevronDown />
            </button>
            {isOpen && (
              <div className="dropdown-content" style={{
                position: 'absolute',
                backgroundColor: '#f9f9f9',
                minWidth: '160px',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                zIndex: 1001,
                top: 'calc(100% + 5px)',
                left: 0,
              }}>
                <Link to="/vendors" style={{ color: '#007bff', padding: '10px', display: 'block' }}>Vendors</Link>
                <Link to="/customer" style={{ color: '#007bff', padding: '10px', display: 'block' }}>Customers</Link>
                <Link to="/account" style={{ color: '#007bff', padding: '10px', display: 'block' }}>New Account</Link>
                <Link to="/billing" style={{ color: '#007bff', padding: '10px', display: 'block' }}>Billing</Link>
                <Link to="/invoice" style={{ color: '#007bff', padding: '10px', display: 'block' }}>Invoice</Link>
              </div>
            )}
          </div>
        </li>
        <li>
          <Link to="/" className="notif">
            <BellDot />
          </Link>
        </li>
        <li>
          <Link to="/" className="profile">
            <img
              className="avatar"
              src={user.imageUrl}
              alt={'Photo of ' + user.name}
              style={{
                width: user.imageSize,
                height: user.imageSize
              }} />
            <span>{user.name}</span>
            <ChevronDown />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TopNav;
