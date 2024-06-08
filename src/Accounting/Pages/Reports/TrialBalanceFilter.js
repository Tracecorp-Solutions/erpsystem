import React from "react";
import { DatePicker } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const TrialBalanceFilter = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      <div className="mb-4 sm:mb-0">
        <RangePicker
          style={{ width: "100%", maxWidth: "320px", borderRadius: "24px", padding: "10px" }}
        />
      </div>
      <button
        type="button"
        className="text-white font-bold py-2 px-4 rounded-lg"
        style={{
            background: "#4467a1",
            borderRadius: "24px",
            width: "150px",
            marginBottom: "5px"
          }}
      >
        <DownloadOutlined style={{ marginRight: "5px" }} />
        Export
      </button>
    </div>
  );
};

export default TrialBalanceFilter;
