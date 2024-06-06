import React from "react";

const Cards = () => {
  return (
    <div className="flex flex-wrap justify-start p-2">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </div>
    </div>
  );
};

export default Cards;
