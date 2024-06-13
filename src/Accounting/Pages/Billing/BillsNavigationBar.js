import React from "react";
import { Switch, Input } from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  FolderOutlined,
  CalendarOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "../../../styles/components/AccountNavigationFilter.css";

const BillsNavigationbar = ({
  toggleDisabled,
  setToggleDisabled,
  searchQuery,
  handleSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:mb-4 w-full">
      <div
        style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
      >
        <div style={{ marginBottom: "16px",  }}>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d9d9d9",
              borderRadius: "24px",
              padding: "3px",
            }}
          >
            < SearchOutlined style={{ fontSize: "16px", color: "#bfbfbf" }} />
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
      <div
        style={{ display: "flex", justifyContent: "end", flex: 1,  alignItems: "center", }}
      >
        <div style={{ marginBottom: "16px",    alignItems: "center", }}>
          
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
              placeholder="filter"
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
