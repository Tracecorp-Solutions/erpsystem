import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import SearchAccount from "./SearchAccount ";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { RangePicker } = DatePicker;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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
    fetchStatementEntries(accountId, startDate, endDate);
  };

  const fetchStatementEntries = async (accountId, startDate, endDate) => {
    startDate =
      startDate instanceof Date
        ? startDate
        : new Date(startDate.$y, startDate.$M, startDate.$D);
    endDate =
      endDate instanceof Date
        ? endDate
        : new Date(endDate.$y, endDate.$M, endDate.$D);

    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      console.error("Error: startDate and endDate must be valid Date objects.");
      return;
    }

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Error: startDate and endDate must be valid dates.");
      return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/Report/AccountStatement?accountId=${accountId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
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
      console.log("aaaacountntnntnntn", data);
      setOptions(data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <SearchAccount
        handleExport={handleExport}
        handleFilter={handleFilter}
        options={options}
        filteredEntries={filteredEntries}
      />
      <table>
      <thead>
                  <tr>
                    <th
                      className="px-4 py-2"
                      style={{
                        color: "#505050",
                        fontWeight: "600",
                        fontSize: "18px",
                        fontFamily: "outFit, Sans-serif",
                      }}
                    >
                      Description
                    </th>
                    <th
                      className="px-4 py-2"
                      style={{
                        color: "#505050",
                        fontWeight: "600",
                        fontSize: "18px",
                        fontFamily: "outFit, Sans-serif",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      className="px-4 py-2"
                      style={{
                        color: "#505050",
                        fontWeight: "600",
                        fontSize: "18px",
                        fontFamily: "outFit, Sans-serif",
                      }}
                    >
                      Running Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                {filteredEntries.length > 0 ? (
        filteredEntries.map((entry, index) => (
          <div key={index}>
            <h3
              className="mt-4 mb-2"
              style={{
                color: "#A1A1A1",
                fontWeight: "600",
                fontSize: "16px",
                fontFamily: "outFit, Sans-serif",
              }}
            >
              {entry.transactionDate}
            </h3>
            <div className="overflow-x-auto">
                  {entry.transactionsFortheDay.map((transaction, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white-100" : ""}
                    >
                      <td
                        className=" px-4 py-2 w-1/2"
                        style={{
                          color: "#505050",
                          fontWeight: "400",
                          fontSize: "16px",
                          fontFamily: "outFit, Sans-serif",
                        }}
                      >
                        {transaction.description}
                      </td>
                      <td
                        className="px-4 py-2"
                        style={{
                          color: "#F06C3E",
                          fontWeight: "400",
                          fontSize: "16px",
                          fontFamily: "outFit, Sans-serif",
                        }}
                      >
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td
                        className="px-4 py-2"
                        style={{
                          color: "#505050",
                          fontWeight: "400",
                          fontSize: "16px",
                          fontFamily: "outFit, Sans-serif",
                        }}
                      >
                        {transaction.runningBalance}
                      </td>
                    </tr>
                  ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-5" style={{
          color: "#505050",
          fontFamily: "outFit, Sans-serif",
        }}>No Filtered Data</p>
      )}
                </tbody>
      </table>
     
    </div>
  );
};

export default Statement;
