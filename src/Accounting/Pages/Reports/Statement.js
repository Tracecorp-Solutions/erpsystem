import React, { useState, useEffect } from "react";
import SearchAccount from "./SearchAccount ";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Statement = () => {
  const [statementEntries, setStatementEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleExport = () => {
    // Your export logic remains the same
  };

  const handleFilter = (accountId, startDate, endDate) => {
    // Fetch statement entries based on the selected accountId, startDate, and endDate
    fetchStatementEntries(accountId, startDate, endDate);
  };

  const fetchStatementEntries = async (accountId, startDate, endDate) => {
    console.log("aaccounttntnid", accountId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/Report/AccountStatement?accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setStatementEntries(data.accountStatementEntries);
      setFilteredEntries(data.accountStatementEntries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  return (
    <div className="bg-white" style={{ borderRadius: "24px", padding: "10px" }}>
      <SearchAccount
        handleExport={handleExport}
        handleFilter={handleFilter}
        options={options}
      />
      {filteredEntries.length > 0 ? (
        filteredEntries.map((entry, index) => (
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
            <div style={{ borderTop: "1px solid #7A7A7A" }}>
              {entry.transactionsFortheDay.map((transaction, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded p-4"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p>Description: {transaction.description}</p>
                  <p>${transaction.amount.toFixed(2)}</p>
                  <p>${transaction.runningBalance}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p> // Display loading message while data is being fetched
      )}
    </div>
  );
};

export default Statement;
