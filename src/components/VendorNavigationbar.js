import React from "react";
import { Switch, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import "../styles/components/AccountNavigationFilter.css";

const VendorNavigationbar = ({ toggleDisabled, setToggleDisabled, searchQuery, handleSearch }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:mb-4 w-full">
      <Input
        placeholder="Search Accounts"
        prefix={<SearchOutlined />}
        className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        style={{ borderRadius: "24px", padding: "10px" }}
        value={searchQuery}
        onChange={handleSearch}
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
          {
            !toggleDisabled ? (
                <p
            style={{
              marginRight: "10px",
              color: "#a1a1a1",
              fontFamily: "outFit, Sans-serif",
            }}
          >
            Show Active Customers
          </p>
            ) : (
                <p
            style={{
              marginRight: "10px",
              color: "#a1a1a1",
              fontFamily: "outFit, Sans-serif",
            }}
          >
            Show None Active Customers
          </p>
            )
          }
          <Switch
            checked={toggleDisabled}
            onChange={setToggleDisabled}
            className={`${
              toggleDisabled ? "bg-gray-100" : "bg-gray-200"
            } relative z-10`}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center px-2">
            <span
              className={`text-sm font-semibold ${
                toggleDisabled ? "text-gray-600" : "text-white"
              }`}
            ></span>
          </div>
        </div>
      </div>

      <Input
        placeholder="Filter"
        prefix={<FilterOutlined style={{ fontSize: "25px" }} />}
        className="mb-2 md:mb-0 md:mr-4 md:w-auto w-full lg:w-22"
        style={{ borderRadius: "24px", padding: "10px" }}
      />

     
    </div>
  );
};

export default VendorNavigationbar;
