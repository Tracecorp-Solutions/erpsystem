import React, { useState, useEffect } from "react";
import SearchAccount from "./SearchAccount ";

const Statement = () => {
  const [statementEntries, setStatementEntries] = useState([]);

  useEffect(() => {
    fetch("http://3.216.182.63:8095/api/Report/AccountStatement")
      .then((response) => response.json())
      .then((data) => {
        setStatementEntries(data.accountStatementEntries);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "54px",
        padding: "10px",
      }}
    >
      <SearchAccount />
      {statementEntries.map((entry, index) => (
        <div key={index}>
          <h3
            style={{
              margin: "10px",
              color: "#A1A1A1",
              fontFamily: "outFit, Sans-serif",
              fontWeight: "400",
            }}
          >
            {entry.transactionDate}
          </h3>
          <div
            style={{
              borderTop: "1px solid #7A7A7A",
            }}
          >
            {entry.transactionsFortheDay.map((transaction, idx) => (
              <div key={idx} className="bg-white rounded p-4" style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%"
              }}>
                <p>Description: {transaction.description}</p>
                <p>${transaction.amount.toFixed(2)}</p>
                <p>${transaction.runningBalance}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statement;
