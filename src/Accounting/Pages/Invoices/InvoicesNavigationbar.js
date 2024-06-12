import React from "react";
import { Switch, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import "../../../styles/components/AccountNavigationFilter.css";

const InvoiceNavigationbar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:mb-4 w-full" style={{display: "flex", justifyContent: "space-between"}}>
      <Input
        placeholder="Search Accounts"
        prefix={<SearchOutlined />}
        className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        style={{ borderRadius: "24px", padding: "10px" }}
      />

      <Input
        placeholder="Filter"
        prefix={<FilterOutlined style={{ fontSize: "25px" }} />}
        className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        style={{ borderRadius: "24px", padding: "10px" }}
      />
    </div>
  );
};

export default InvoiceNavigationbar;
