import React from "react";
import { DatePicker, Button, Select, Dropdown, Menu } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const UserActivityHeader = () => {
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
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      <div className="mb-4 sm:mb-0 flex items-center">
        <Select
          defaultValue="all"
          className="w-40 mr-4"
          dropdownClassName="rounded-md"
        >
          <Option value="all">All Users</Option>
          <Option value="userA">User A</Option>
          <Option value="userB">User B</Option>
          <Option value="userC">User C</Option>
        </Select>
        <RangePicker
          style={{
            width: "100%",
            maxWidth: "320px",
            borderRadius: "24px",
            padding: "10px",
          }}
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

export default UserActivityHeader;
