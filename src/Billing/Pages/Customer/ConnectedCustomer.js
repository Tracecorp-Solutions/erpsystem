import React, { useState } from "react";
import { Table, Input, Dropdown, Menu, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Search } = Input;

function ConnectedCustomers() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleMenuClick = (e) => {
    setSelectedFilter(e.key);
  };

  const filterMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="operation">Operation Area</Menu.Item>
      <Menu.Item key="branch">Branch</Menu.Item>
      <Menu.Item key="customerType">Customer Type</Menu.Item>
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
        <button
          type="button"
          onClick={() => handleReset(clearFilters)}
          style={{ marginTop: 8, width: 90, borderRadius: "24px", padding: "6px 16px" }}
        >
          Reset
        </button>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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
        <Dropdown overlay={filterMenu} trigger={["click"]}>
          <Button type="text" className="ant-dropdown-link">
            Actions <FilterOutlined />
          </Button>
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

        {/* Filter Button */}
        <Dropdown overlay={filterMenu} trigger={["click"]} placement="bottomRight">
          <Button
            className="mb-2 md:mb-0 md:mr-4 md:w-auto w-full lg:w-22"
            style={{ borderRadius: "24px", padding: "10px" }}
          >
            <FilterOutlined style={{ fontSize: "25px" }} />
          </Button>
        </Dropdown>
      </div>

      {/* Table Component */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default ConnectedCustomers;
