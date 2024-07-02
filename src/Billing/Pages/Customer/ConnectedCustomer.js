import React, { useState } from "react";
import { Table, Menu, Dropdown, message, Input, Space, Switch } from "antd";
import { EllipsisOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const { Search } = Input;

function ConnectedCustomers() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [toggleDisabled, setToggleDisabled] = useState(false); // State for switch

  const handleMenuClick = (e) => {
    message.info(`Click on menu item ${e.key}`);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Menu Item 1</Menu.Item>
      <Menu.Item key="2">Menu Item 2</Menu.Item>
      <Menu.Item key="3">Menu Item 3</Menu.Item>
    </Menu>
  );

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Search
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <button
            type="button"
            onClick={() => handleReset(clearFilters)}
            style={{ width: 90 }}
          >
            Reset
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <EllipsisOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <strong>{text}</strong>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Customer Reference",
      dataIndex: "customerRef",
      key: "customerRef",
      ...getColumnSearchProps("customerRef", "Search Customer Reference"),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName", "Search Customer Name"),
    },
    {
      title: "Application No.",
      dataIndex: "applicationNo",
      key: "applicationNo",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Property Ref",
      dataIndex: "propertyRef",
      key: "propertyRef",
    },
    {
      title: "Date Connected",
      dataIndex: "dateConnected",
      key: "dateConnected",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Actions <EllipsisOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      customerRef: "21110911",
      customerName: "Grace Eze",
      applicationNo: "211/77/54/1",
      balance: "56,000",
      propertyRef: "211/77/54/1",
      dateConnected: "12/06/2024",
    },
    // Add more data as needed
  ];

  return (
    <div className="p-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex justify-between w-full">
        <Input
          placeholder="Search Accounts"
          prefix={<SearchOutlined />}
          className="mb-2 md:mb-0 md:mr-4 w-full md:w-auto"
          style={{ borderRadius: "24px", padding: "10px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Filter Input */}
        <Input
          placeholder="Filter"
          prefix={<FilterOutlined style={{ fontSize: "25px" }} />}
          className="mb-2 md:mb-0 md:mr-4 md:w-auto w-full lg:w-22"
          style={{ borderRadius: "24px", padding: "10px" }}
        />
      </div>

      {/* Table Component */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default ConnectedCustomers;
