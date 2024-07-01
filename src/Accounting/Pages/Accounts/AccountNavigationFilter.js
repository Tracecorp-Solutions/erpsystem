import React, { useState } from "react";
import { Switch, Select, Input } from "antd";
import {
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./AccountNavigationFilter.css";

const { Option } = Select;

const AccountNavigationFilter = ({accountNameFilter, setAccountNameFilter }) => {
  const [disabled, setDisabled] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
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

      <Input
        placeholder="Filter"
        prefix={<FilterOutlined style={{ fontSize: "25px" }} />}
        className="mb-2 md:mb-0 md:mr-4 md:w-auto w-full lg:w-22"
        style={{ borderRadius: "24px", padding: "10px" }}
      />

    </div>
  );
};

export default AccountNavigationFilter;
