import React, { useState } from "react";
import { DatePicker, Button, Dropdown, Menu } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const SearchAccount = ({ handleExport }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDownload = (format) => {
    console.log("Downloading in", format, "format...");
    if (format === "pdf") {
      handleExport();
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="pdf" onClick={() => handleDownload("pdf")}>Download as PDF</Menu.Item>
      <Menu.Item key="csv" onClick={() => handleDownload("csv")}>Download as CSV</Menu.Item>
      <Menu.Item key="excel" onClick={() => handleDownload("excel")}>Download as Excel</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <select
        className="w-full lg:w-auto max-w-md rounded-lg p-2 border-gray-500 border"
        placeholder="Search accounts"
        onChange={handleSearch}
        value={searchValue}
      >
        <option value="">Search accounts</option>
        <option value="1">Account 1</option>
        <option value="2">Account 2</option>
        <option value="3">Account 3</option>
      </select>
      <RangePicker
        className="w-full lg:w-auto rounded-lg p-2 border-gray-500 border"
      />
      <div className="flex justify-end w-full lg:w-auto" style={{ width: "100%" }}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            type="primary"
            className="text-white p-2 flex items-center justify-center"
            style={{
              background: "#4467a1",
              borderRadius: "24px",
              width: "150px"
            }}
          >
            <DownloadOutlined className="mr-2" />
            Export
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchAccount;
