import React, { useState } from "react";
import { DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const TrialBalanceFilter = () => {
  return (
    <div className="" style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px"
    }}>
      <div>
        <RangePicker
          style={{ width: "70%", padding: "10px", borderRadius: "24px" }}
        />
      </div>
      <button
        type="button"
        style={{
          background: "#4467A1",
          padding: "10px",
          width: "150px",
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

export default TrialBalanceFilter;
