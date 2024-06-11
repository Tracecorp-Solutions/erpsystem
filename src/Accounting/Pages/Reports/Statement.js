import React, { useState, useEffect } from "react";
import SearchAccount from "./SearchAccount ";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const Statement = () => {
  const [statementEntries, setStatementEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/Report/AccountStatement`)
      .then((response) => response.json())
      .then((data) => {
        setStatementEntries(data.accountStatementEntries);
        setFilteredEntries(data.accountStatementEntries);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleExport = () => {
    const doc = new jsPDF();

    // Define columns for the table
    const columns = ["Description", "Amount", "Running Balance"];

    // Define rows for the table
    const rows = [];
    filteredEntries.forEach((entry) => {
      entry.transactionsFortheDay.forEach((transaction) => {
        rows.push([
          transaction.description,
          `$${transaction.amount.toFixed(2)}`,
          `$${transaction.runningBalance}`,
        ]);
      });
    });

    // Add autoTable to the document
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Save the PDF
    doc.save("statement.pdf");
  };

  const handleFilter = (startDate, endDate) => {
    const filtered = statementEntries.filter((entry) => {
      const entryDate = new Date(entry.transactionDate);
      return entryDate >= startDate && entryDate <= endDate;
    });
    setFilteredEntries(filtered);
  };

  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "24px",
        padding: "10px",
      }}
    >
      <SearchAccount handleExport={handleExport} handleFilter={handleFilter} />
      {filteredEntries.map((entry, index) => (
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
      ))}
    </div>
  );
};

export default Statement;
