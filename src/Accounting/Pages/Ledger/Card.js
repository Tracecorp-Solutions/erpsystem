import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({
  onAccountStatementClick,
  onBalanceSheetsClick,
  onTrialBalanceClick,
  onUserActivityClick,
}) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName, onClickHandler) => {
    setActiveButton(buttonName);
    onClickHandler();
  };

  return (
    <div className="flex flex-wrap justify-start p-2">
      <button
        onClick={() => handleButtonClick("accountStatements", onAccountStatementClick)}
        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2 ${
          activeButton === "accountStatements" ? "text-gray-500" : ""
        }`}
      >
        <div className="bg-white rounded p-4 text-center">
          Accounts Statement
        </div>
      </button>
      <button
        onClick={() => handleButtonClick("transactionReport", onBalanceSheetsClick)}
        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2 ${
          activeButton === "TransactionReport" ? "text-gray-500" : ""
        }`}
      >
        <div className="bg-white rounded p-4 text-center">Transaction Report</div>
      </button>
      {/* <button
        onClick={() => handleButtonClick("trialBalance", onTrialBalanceClick)}
        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2 ${
          activeButton === "Cashflow" ? "text-gray-500" : ""
        }`}
      >
        <div className="bg-white rounded p-4 text-center">CashFlow</div>
      </button> */}
      {/* <button
        onClick={() => handleButtonClick("userActivity", onUserActivityClick)}
        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 px-2 ${
          activeButton === "userActivity" ? "text-blue-500" : ""
        }`}
      >
        <div className="bg-white rounded p-4 text-center">User Activity</div>
      </button> */}
    </div>
  );
};

export default Cards;
