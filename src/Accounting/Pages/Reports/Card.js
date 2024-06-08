import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({onAccountStatementClick, onBalanceSheetsClick, onTrialBalanceClick, onUserActivityClick }) => {

  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-start p-2">
      <button  onClick={onAccountStatementClick} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </button>
      <button onClick={onBalanceSheetsClick}  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </button>
      <button onClick={onTrialBalanceClick} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </button>
      <button onClick={onUserActivityClick} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2">
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
      </button>
    </div>
  );
};

export default Cards;
