import React, { useState } from "react";
import { Switch, Input, Button, DatePicker } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import "../styles/components/AccountNavigationFilter.css";

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
      <div className="relative flex md:ml-auto md:mr-4">
        <div
          className="relative w-16 md:w-auto mr-4 md:mr-0"
          style={{
            marginRight: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <p
            style={{
              marginRight: "10px",
              color: "#a1a1a1",
              fontFamily: "outFit, Sans-serif",
            }}
          >
            Show Disabled Accounts
          </p>
          <Switch
            checked={!disabled}
            onChange={() => setDisabled(!disabled)}
            className={`${
              disabled ? "bg-gray-300" : "bg-blue-500"
            } relative z-10`}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center px-2">
            <span
              className={`text-sm font-semibold ${
                disabled ? "text-gray-600" : "text-white"
              }`}
            ></span>
          </div>
        </div>
      </div>

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
