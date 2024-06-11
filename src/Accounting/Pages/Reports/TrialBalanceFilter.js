import React from "react";
import { Dropdown, Menu, DatePicker, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const TrialBalanceFilter = ({ handleDownload }) => {
  const menu = (
    <Menu onClick={({ key }) => handleDownload(key)}>
      <Menu.Item key="pdf">Download as PDF</Menu.Item>
      <Menu.Item key="csv">Download as CSV</Menu.Item>
      <Menu.Item key="excel">Download as Excel</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      <div className="mb-4 sm:mb-0">
        <RangePicker
          style={{ width: "100%", maxWidth: "320px", borderRadius: "24px", padding: "10px" }}
        />
      </div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="primary"
          className="mb-4 sm:mb-0"
          icon={<DownloadOutlined />}
          style={{
            width: "150px",
            borderRadius: "24px",
            background: "#4467a1",
          }}
        >
          Export
        </Button>
      </Dropdown>
    </div>
  );
};

export default TrialBalanceFilter;
