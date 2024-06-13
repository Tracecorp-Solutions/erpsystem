import React, { useState } from "react";
import { DatePicker, Button, Menu, Dropdown, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { RangePicker } = DatePicker;

const SearchAccount = ({ handleFilter, options, filteredEntries, handleDownloadPDF }) => {
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
      handleFilter(selectedOption, startDate, endDate);
    } else {
      console.log("Please select an option and date range.");
    }
  };
    
  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "account_statement.csv");
  };
  
  const generateCSV = () => {
    const headers = ["Date", "Description", "Amount", "Running Balance"];
    const rows = filteredEntries.flatMap((entry) =>
      entry.transactionsFortheDay.map((transaction) => [
        entry.transactionDate,
        transaction.description,
        transaction.amount,
        transaction.runningBalance,
      ])
    );
    const csvRows = [headers.join(","), ...rows.map((row) => row.join(","))];
    return csvRows.join("\n");
  };
  
  const handleDownloadExcel = () => {
    const flattenEntries = filteredEntries.flatMap((entry) =>
      entry.transactionsFortheDay.map((transaction) => ({
        Date: entry.transactionDate,
        Description: transaction.description,
        Amount: transaction.amount,
        "Running Balance": transaction.runningBalance,
      }))
    );
    const worksheet = XLSX.utils.json_to_sheet(flattenEntries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Account Statement");
    XLSX.writeFile(workbook, "account_statement.xlsx");
  };

  const menu = (
    <Menu>
      <Menu.Item key="pdf" onClick={() => handleDownloadPDF("pdf")}>
        Download as PDF
      </Menu.Item>
      <Menu.Item key="csv" onClick={handleDownloadCSV}>
        Download as CSV
      </Menu.Item>
      <Menu.Item key="excel" onClick={handleDownloadExcel}>
        Download as Excel
      </Menu.Item>
    </Menu>
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <select
          className="w-full max-w-md rounded-lg p-2 border-gray-500 border"
          placeholder="Select an option"
          onChange={(e) => handleOptionSelection(e.target.value)}
          value={selectedOption}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <RangePicker
          className="w-full rounded-lg p-2 border-gray-500 border"
          onChange={handleDateRangeChange}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Button
          type="primary"
          className="text-white p-2 flex items-center justify-center"
          style={{
            background: "#4467a1",
            borderRadius: "24px",
            width: "100%",
          }}
          onClick={handleFilterButtonClick}
        >
          Filter
        </Button>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            style={{
              width: "100%",
              borderRadius: "24px",
              background: "#4467a1",
            }}
          >
            Export
          </Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default SearchAccount;
