import React, { useState } from "react";
import { DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const SearchAccount = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <select
        className="w-full lg:w-auto max-w-md rounded-lg p-2 border-gray-500 border"
        placeholder="Search accounts"
        onChange={handleSearch}
        value={searchValue}
      >
        <option value="">Search accounts</option>
        <option value="1">Account 1</option>
        <option value="2">Account 2</option>
        <option value="3">Account 3</option>
      </select>
      <RangePicker
        className="w-full lg:w-auto rounded-lg p-2 border-gray-500 border"
      />
      <div className="flex justify-end w-full lg:w-auto" style={{
        width: "100%"
      }}>
        <button
          type="button"
          className="text-white p-2 flex items-center justify-center"
          style={{
            background: "#4467a1",
            borderRadius: "24px",
            width: "20%"
          }}
  
        >
          <DownloadOutlined className="mr-2" />
          Export
        </button>
      </div>
    </div>
  );
};

export default SearchAccount;
