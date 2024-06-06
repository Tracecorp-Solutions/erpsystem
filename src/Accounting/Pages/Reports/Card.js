import React from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <div className="flex flex-wrap justify-start p-2">
      <Link to="/report" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
        <div
          className="bg-white rounded p-4 text-center"
          style={{
            color: "#A1A1A1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "600",
          }}
        >
          Account Statements
        </div>
      </Link>
      <Link to="/balance-sheets" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
        <div
          className="bg-white rounded p-4 text-center"
          style={{
            color: "#A1A1A1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "600",
          }}
        >
          Balance Sheets
        </div>
      </Link>
      <Link to="/trial-balance" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
        <div
          className="bg-white rounded p-4 text-center"
          style={{
            color: "#A1A1A1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "600",
          }}
        >
          Trial Balance
        </div>
      </Link>
      <Link to="/user-activity" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
        <div
          className="bg-white rounded p-4 text-center"
          style={{
            color: "#A1A1A1",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "600",
          }}
        >
          User Activity
        </div>
      </Link>
    </div>
  );
};

export default Cards;
