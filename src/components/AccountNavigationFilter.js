import React, { useState } from "react";
import { Switch, Select, Input } from "antd";
import { CloseOutlined, CheckOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const AccountNavigationFilter = () => {
  const [disabled, setDisabled] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:mb-4 w-full">
            <Input
        placeholder="Search Accounts"
        prefix={<SearchOutlined />}
        className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
        style={{ borderRadius: "24px", padding: "10px" }}
      />
      <div className="relative flex md:ml-auto md:mr-4">
        <div className="relative w-16 md:w-auto mr-4 md:mr-0">
          <Switch
            checked={!disabled}
            onChange={toggleDisabled}
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
            <div className="flex items-center">
              <CheckOutlined
                className={`${!disabled ? "text-white" : "hidden"}`}
              />
              <CloseOutlined
                className={`${disabled ? "text-gray-600" : "hidden"}`}
              />
            </div>
          </div>
        </div>

        <Select
          mode="multiple"
          placeholder="Filter fields"
          className="w-full md:w-64"
        >
          <Option value="field1">Field 1</Option>
          <Option value="field2">Field 2</Option>
          <Option value="field3">Field 3</Option>
        </Select>
      </div>

      <Select defaultValue="Newest First" className="w-full md:w-40">
        <Option value="newest">Newest First</Option>
        <Option value="oldest">Oldest First</Option>
      </Select>
    </div>
  );
};

export default AccountNavigationFilter;
