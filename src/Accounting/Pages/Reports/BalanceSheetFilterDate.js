import React from "react";
import { DatePicker, Button, Dropdown, Menu } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const BalanceSheetFilterDate = () => {
  const handleDownload = (format) => {
    // Logic for downloading data in the selected format
    console.log("Downloading in", format, "format...");
  };

  const menu = (
    <Menu onClick={({ key }) => handleDownload(key)}>
      <Menu.Item key="pdf">Download as PDF</Menu.Item>
      <Menu.Item key="csv">Download as CSV</Menu.Item>
      <Menu.Item key="excel">Download as Excel</Menu.Item>
    </Menu>
  );

  return (
    <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <RangePicker
          style={{ width: "70%", padding: "10px", borderRadius: "24px" }}
        />
      </div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="primary"
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
        </Button>
      </Dropdown>
    </div>
  );
};

export default BalanceSheetFilterDate;
