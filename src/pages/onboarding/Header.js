import React from "react";

const Header = () => {
  return (
    <nav className="p-4" style={{
        background: "#fff"
    }}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Your Logo</h1>
          <div className="flex items-center">
            <button className="mr-4">Home</button>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
