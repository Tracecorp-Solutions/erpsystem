import React from "react";
import { Switch, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import "../styles/components/AccountNavigationFilter.css";

const BillsNavigationbar = ({
  toggleDisabled,
  setToggleDisabled,
  searchQuery,
  handleSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:mb-4 w-full">
      <div>
        <p
          className="text-gray-600 text-sm mb-1"
          style={{ fontFamily: "outFit, Sans-serif" }}
        >
          Vendors
        </p>
        <Input
          placeholder="Bills"
          prefix={<SearchOutlined />}
          className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
          style={{ borderRadius: "24px", padding: "10px" }}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
       
        <p
          className="text-gray-600 text-sm mb-1"
          style={{ fontFamily: "outFit, Sans-serif" }}
        >
          status
        </p>
        <Input
          placeholder="Bills"
          prefix={<SearchOutlined />}
          className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
          style={{ borderRadius: "24px", padding: "10px" }}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
      <p
          className="text-gray-600 text-sm mb-1"
          style={{ fontFamily: "outFit, Sans-serif" }}
        >
          from
        </p>
      <Input
        placeholder="Bills"
        prefix={<SearchOutlined />}
        className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        style={{ borderRadius: "24px", padding: "10px" }}
        value={searchQuery}
        onChange={handleSearch}
      />
      </div>
      
     <div>
     <p
          className="text-gray-600 text-sm mb-1"
          style={{ fontFamily: "outFit, Sans-serif" }}
        >
          to
        </p> 
     <Input
        placeholder="Filter"
        prefix={<FilterOutlined style={{ fontSize: "25px" }} />}
        className="mb-2 md:mb-0 md:mr-4 md:w-auto w-full lg:w-22"
        style={{ borderRadius: "24px", padding: "10px" }}
      />
     </div>
      
    </div>
  );
};

export default BillsNavigationbar;
