import React from "react";
import { Switch, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import "../styles/components/AccountNavigationFilter.css";

const CustomerNavigationbar = ({ toggleDisabled, setToggleDisabled, searchQuery, handleSearch }) => {
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
          <p
            style={{
              marginRight: "10px",
              color: "#a1a1a1",
              fontFamily: "outFit, Sans-serif",
            }}
          >
            Show Active Customers
          </p>
          <Switch
            checked={toggleDisabled}
            onChange={setToggleDisabled}
            className={`${
              toggleDisabled ? "bg-gray-300" : "bg-blue-500"
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

      <div>
        <select
          id="location"
          name="location"
          className="mt-2 block w-full rounded-md border-0  pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="Newest Frst"
          style={{
            padding: "10px",
            borderRadius: "24px",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          <option>Newest First</option>
          <option>Newest First</option>
        </select>
      </div>
    </div>
  );
};

export default CustomerNavigationbar;
