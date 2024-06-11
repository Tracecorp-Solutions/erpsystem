import React, { useState } from "react";
import { DatePicker, Button, Menu } from "antd";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { RangePicker } = DatePicker;

const SearchAccount = ({ handleFilter, options, filteredEntries }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleOptionSelection = (value) => {
    setSelectedOption(value);
  };

  const handleDateRangeChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const handleFilterButtonClick = () => {
    if (selectedOption && startDate && endDate) {
      // Pass selectedOption (accountId), startDate, and endDate to handleFilter
      handleFilter(selectedOption, startDate, endDate);
    } else {
      console.log("Please select an option and date range.");
    }
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const columns = ["Description", "Amount", "Running Balance"];
    const rows = filteredEntries.map((activity) => [
      activity.description,
      activity.amount,
      activity.runningBalance,
    ]);

    pdf.text("Account Statement Report", 10, 10);
    pdf.autoTable({ head: [columns], body: rows });
    pdf.save("user_activity.pdf");
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "user_activity.csv");
  };

  const generateCSV = () => {
    const headers = ["Description", "Amount", "Running Balance"];
    const rows = filteredEntries.map((activity) => [
      activity.description,
      activity.amount,
      activity.runningBalance,
    ]);
    const csvRows = [headers.join(","), ...rows.map((row) => row.join(","))];
    return csvRows.join("\n");
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEntries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Activity");
    XLSX.writeFile(workbook, "user_activity.xlsx");
  };

  const menu = (
    <Menu onClick={({ key }) => handleDownloadPDF(key)}>
      <Menu.Item key="pdf">Download as PDF</Menu.Item>
      <Menu.Item key="csv" onClick={handleDownloadCSV}>
        Download as CSV
      </Menu.Item>
      <Menu.Item key="excel" onClick={handleDownloadExcel}>
        Download as Excel
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <select
        className="w-full lg:w-auto max-w-md rounded-lg p-2 border-gray-500 border"
        placeholder="Select an option"
        onChange={(e) => handleOptionSelection(e.target.value)}
        value={selectedOption}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      <RangePicker
        className="w-full lg:w-auto rounded-lg p-2 border-gray-500 border"
        onChange={handleDateRangeChange}
      />
      <div className="flex justify-end w-full lg:w-auto" style={{ width: "100%" }}>
        <Button
          type="primary"
          className="text-white p-2 flex items-center justify-center"
          style={{
            background: "#4467a1",
            borderRadius: "24px",
            width: "150px"
          }}
          onClick={handleFilterButtonClick}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default SearchAccount;
