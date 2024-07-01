import React, { useState } from "react";
import { Input, Button, DatePicker, Dropdown, Menu } from "antd";
import { FilterOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const TransactionNavigationFilter = ({
  accountNameFilter,
  setAccountNameFilter,
  setDateRange,
  handleFilter,
  billData, // assuming bill data for download functionalities
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:mb-4 w-full">
      <Input
        placeholder="Search Accounts"
        prefix={<SearchOutlined />}
        value={accountNameFilter}
        onChange={(e) => setAccountNameFilter(e.target.value)}
        className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        style={{ borderRadius: "24px", padding: "10px" }}
      />

      <div className="relative">
        <Input
          placeholder="Filter"
          prefix={<FilterOutlined style={{ fontSize: "25px" }} />}
          className="mb-2 md:mb-0 md:mr-4 md:w-auto w-full lg:w-22"
          style={{ borderRadius: "24px", padding: "10px" }}
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div
            className="absolute bg-white border rounded-md p-4 mt-2 shadow-lg"
            style={{
              width: "270px",
              left: "calc(100% - 270px)",
            }}
          >
            <RangePicker
              onChange={(dates) => setDateRange(dates)}
              style={{
                marginBottom: "8px",
                width: "100%",
                paddingLeft: "15px",
                paddingRight: "15px",
                borderRadius: "24px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            />
            <Button
              type="primary"
              onClick={handleFilter}
              style={{
                width: "100%",
                borderRadius: "24px",
                marginTop: "5px",
              }}
            >
              Apply Filter
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default TransactionNavigationFilter;
