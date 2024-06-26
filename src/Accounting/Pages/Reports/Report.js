import React, { useState } from "react";
import Cards from "./Card";
import Statement from "./Statement";
import BalanceSheets from "./BalanceSheets";
import TrialBalance from "./TrialBalance ";
import UserActivity from "./UserActivity";

const Report = () => {
  const [showStatement, setShowStatement] = useState(true);
  const [showBalanceSheets, setShowBalanceSheets] = useState(false);
  const [showTrialBalance, setShowTrialBalance] = useState(false);
  const [showUserActivity, setShowUserActivity] = useState(false);

  const handleAccountStatementClick = () => {
    setShowStatement(true);
    setShowBalanceSheets(false); 
    setShowTrialBalance(false);
    setShowUserActivity(false);
  };

  const handleBalanceSheetsClick = () => {
    setShowStatement(false);
    setShowBalanceSheets(true);
    setShowTrialBalance(false);
    setShowUserActivity(false);
  };

  const handleTrialBalanceClick = () => {
    setShowStatement(false);
    setShowBalanceSheets(false);
    setShowUserActivity(false);
    setShowTrialBalance(true);
  };

  const handleUserActivityClick = () => {
    setShowStatement(false);
    setShowBalanceSheets(false);
    setShowTrialBalance(false);
    setShowUserActivity(true);
  };

  return (
    <div>
      <h1 style={{
        fontSize: "36px",
        color: "#505050",
        fontWeight: "600",
        fontFamily: "outFit, Sans-serif",
        marginLeft: "10px"
      }}>Reports</h1>
      <Cards
        onAccountStatementClick={handleAccountStatementClick}
        onBalanceSheetsClick={handleBalanceSheetsClick}
        onTrialBalanceClick={handleTrialBalanceClick}
        onUserActivityClick={handleUserActivityClick}
      />
      {showStatement && <Statement />}
      {showBalanceSheets && <BalanceSheets />}
      {showTrialBalance && <TrialBalance />}
      {showUserActivity && <UserActivity />}
    </div>
  );
};

export default Report;
