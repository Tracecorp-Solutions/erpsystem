import React from "react";
import { Switch, Input } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import "../../../styles/components/AccountNavigationFilter.css";

const BillsNavigationbar = ({
  toggleDisabled,
  setToggleDisabled,
  searchQuery,
  handleSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:mb-4 w-full">
      <div style={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d9d9d9",
              borderRadius: "24px",
              padding: "3px",
            }}
          >
            <SearchOutlined style={{ fontSize: "16px", color: "#bfbfbf" }} />
            <Input
              placeholder="Enter bill number"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                border: "none",
                boxShadow: "none",
                flex: 1,
                marginRight: "4px",
              }}
              bordered={false}
            />
          </div>
        </div>
      </div>
      <div className="relative flex md:ml-auto md:mr-4">
        <div
          className="relative w-16 md:w-auto mr-4 md:mr-0"
          style={{
            marginRight: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {!toggleDisabled ? (
            <p
              style={{
                marginRight: "10px",
                color: "#a1a1a1",
                fontFamily: "outFit, Sans-serif",
              }}
            >
              Show Paid and Unpaid Bills
            </p>
          ) : (
            <p
              style={{
                marginRight: "10px",
                color: "#a1a1a1",
                fontFamily: "outFit, Sans-serif",
              }}
            >
              Show Only Unpaid Bills
            </p>
          )}
          <Switch
            checked={toggleDisabled}
            onChange={setToggleDisabled}
            className={`${toggleDisabled ? "bg-gray-100" : "bg-gray-200"} relative z-10`}
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
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          flex: 1,
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d9d9d9",
              borderRadius: "16px",
              padding: "3px",
            }}
          >
            <FilterOutlined style={{ fontSize: "16px", color: "#bfbfbf" }} />
            <Input
              placeholder="Filter"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                border: "none",
                boxShadow: "none",
                flex: 1,
                width: "58px",
                marginRight: "4px",
              }}
              bordered={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillsNavigationbar;
