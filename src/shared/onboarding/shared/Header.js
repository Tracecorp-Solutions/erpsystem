import React from "react";

const Header = (props) => {
  return (
    <nav className="p-4" style={{
    }}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            <img src="../images/imagelogo.svg" />
          </h1>
          <div className="flex items-center">
            <button className="mr-4 p-2 bg-white rounded-full">Hello, {props.userData.fullName}</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;