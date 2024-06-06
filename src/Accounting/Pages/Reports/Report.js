import React, { useState } from "react";
import Cards from "./Card";
import Statement from "./Statement";
import BalanceSheets from "./BalanceSheets";
import TrialBalance from "./TrialBalance ";

const Report = () => {
  const [showStatement, setShowStatement] = useState(false);
  const [showBalanceSheets, setShowBalanceSheets] = useState(false);
  const [showTrialBalance, setShowTrialBalance] = useState(false);

  const handleAccountStatementClick = () => {
    setShowStatement(true);
    setShowBalanceSheets(false); 
    setShowTrialBalance(false);
  };

  const handleBalanceSheetsClick = () => {
    setShowStatement(false);
    setShowBalanceSheets(true);
    setShowTrialBalance(false);
  };

  const handleTrialBalanceClick = () => {
    setShowStatement(false);
    setShowBalanceSheets(false);
    setShowTrialBalance(true);
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
      />
      {showStatement && <Statement />}
      {showBalanceSheets && <BalanceSheets />}
      {showTrialBalance && <TrialBalance />}
    </div>
  );
};

export default Report;
