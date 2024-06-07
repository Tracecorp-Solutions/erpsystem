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
    <div className="" style={{
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div>
        <select
          style={{
            width: 200,
            marginRight: "10px",
            borderRadius: "24px",
            padding: "10px",
            border: "0.5px solid gray",
          }}
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
          style={{ width: "40%", padding: "10px", borderRadius: "24px" }}
        />
      </div>
      <button
        type="button"
        style={{
          background: "#4467A1",
          padding: "10px",
          width: "13%",
          borderRadius: "24px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DownloadOutlined style={{ marginRight: "5px" }} />
        Export
      </button>
    </div>
  );
};

export default SearchAccount;
