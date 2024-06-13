import React, { useState } from "react";
import { Switch, Input, Button, DatePicker } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
// import "../styles/components/AccountNavigationFilter.css";

const { RangePicker } = DatePicker;

const TransactionNavigationFilter = ({
  accountNameFilter,
  setAccountNameFilter,
  setDateRange,
  handleFilter,
}) => {
  const [disabled, setDisabled] = useState(false);
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
            <button
              type="button"
              onClick={handleFilter}
              style={{
                border: "1px solid #4467A1",
                width: "100%",
                color: "#4467a1",
                padding: "10px",
                borderRadius: "24px",
                marginTop: "5px",
                alignContent: "flex-end",
              }}
            >
              Apply Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionNavigationFilter;
