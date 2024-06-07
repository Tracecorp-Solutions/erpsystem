import React, { useState, useEffect } from "react";
import SearchAccount from "./SearchAccount ";
import jsPDF from "jspdf";

const Statement = () => {
  const [statementEntries, setStatementEntries] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/Report/AccountStatement`)
      .then((response) => response.json())
      .then((data) => {
        setStatementEntries(data.accountStatementEntries);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleExport = () => {
    const doc = new jsPDF();
  
    statementEntries.forEach((entry, index) => {
      doc.text(entry.transactionDate, 10, 10 + index * 60);
      doc.setLineWidth(0.5);
      doc.line(10, 15 + index * 60, 200, 15 + index * 60);
  
      entry.transactionsFortheDay.forEach((transaction, idx) => {
        const y = 25 + (index * 60) + (idx * 20);
        doc.text(`Description: ${transaction.description}`, 10, y);
        doc.text(`Amount: ${transaction.amount.toFixed(2)}`, 60, y);
        doc.text(`Running Balance: ${transaction.runningBalance}`, 110, y);
      });
    });
  
    // Save the PDF
    doc.save("statement.pdf");
  };
  
  

  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "54px",
        padding: "10px",
      }}
    >
      <SearchAccount handleExport={handleExport} />
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
                justifyContent: "space-between",
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
