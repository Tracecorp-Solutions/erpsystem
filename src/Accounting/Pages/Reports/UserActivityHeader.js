import React from "react";
import { DatePicker, Button, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const UserActivityHeader = () => {
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
      <Button
        type="primary"
        className="mb-4 sm:mb-0"
        icon={<DownloadOutlined />}
        style={{
          width: "150px",
          borderRadius: "24px",
        }}
      >
        Export
      </Button>
      {/* Adding more buttons/icons here if needed */}
    </div>
  );
};

export default UserActivityHeader;
