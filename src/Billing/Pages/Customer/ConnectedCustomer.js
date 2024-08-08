import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown, Input } from "antd";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentDetails from "../Application/Actions/PaymentDetails";
import BillingCustomer from "../Application/Actions/BillingCustomer";

const ConnectedCustomers = () => {
  const [customers, setConnectedCustomers] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showBillingCustomer, setShowBillingCustomer] = useState(false);
  const [customerRef, setCustomerRef] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    GetConnectedCustomers();
  }, []);

  const GetConnectedCustomers = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetConnectedCustomers`
      );
      setConnectedCustomers(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMenuClick = (customerRef, action) => {
    switch (action) {
      case "view":
        navigate(`/billingdashboard`, {
          state: { screen: "customer-details", customerRef },
        });
        break;
      case "bill":
        handleShowBillingCustomer(customerRef);
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const handleCancelPayment = () => {
    setShowPaymentForm(false);
  };

  const handleShowPaymentForm = () => {
    setShowPaymentForm(true);
  };

  const handleShowBillingCustomer = (customerRef) => {
    const selected = customers.find(
      (customer) => customer.customerRef === customerRef
    );
    setSelectedCustomer(selected);
    setCustomerRef(customerRef);
    setShowBillingCustomer(true);
  };

  const handleCancelBillingCustomer = () => {
    setShowBillingCustomer(false);
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
    setCurrentPage(1);
  };

  // Filtered customers based on search text
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchText) ||
      customer.customerRef.toLowerCase().includes(searchText) ||
      customer.applicationNo.toLowerCase().includes(searchText)
  );

  // Calculate current page of customers
  const indexOfLastCustomer = currentPage * pageSize;
  const indexOfFirstCustomer = indexOfLastCustomer - pageSize;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const columns = [
    {
      title: "Applicant Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Customer Ref",
      dataIndex: "customerRef",
      key: "customerRef",
    },
    {
      title: "Application Number",
      dataIndex: "applicationNo",
      key: "applicationNo",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (status) => <span className="px-3 py-1">{status}</span>,
    },
    {
      title: "Date Created",
      dataIndex: "dateConnected",
      key: "dateConnected",
      render: (status) => <span className="px-3 py-1">{status}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(record.customerRef, key)}
            >
              <Menu.Item key="view">View Details</Menu.Item>
              <Menu.Item key="bill">Bill Customer</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomLeft"
        >
          <EllipsisOutlined className="w-7 h-7" />
        </Dropdown>
      ),
    },
  ];

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="pb-0.5 mx-auto rounded-3xl bg-stone-100 max-md:mr-2.5 w-full">
      <h1 className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full p-6">
        Connected Customers
      </h1>
      <div className="p-6 mt-6 bg-white">
        <div className="flex gap-2 py-3 pr-6 pl-4 rounded-3xl my-4 border border-solid border-neutral-500 border-opacity-10 w-[300px]">
          <SearchOutlined style={{ color: "#6B7280" }} />
          <input
            placeholder="Search customers"
            onChange={(e) => handleSearch(e.target.value)}
            className="border-none outline-none focus:ring-0"
          />
        </div>

        <Table
          dataSource={currentCustomers}
          columns={columns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredCustomers.length,
            onChange: handlePaginationChange,
          }}
          scroll={{ x: 768 }}
          className="max-md:px-5 w-full"
        />
      </div>

      {/* PaymentDetails component */}
      <PaymentDetails
        handleShowPaymentForm={handleShowPaymentForm}
        handleCancelPayment={handleCancelPayment}
        showPaymentForm={showPaymentForm}
        customerRef={customerRef}
        setCustomerRef={setCustomerRef}
        selectedCustomer={selectedCustomer}
      />

      {showBillingCustomer && (
        <BillingCustomer
          custRef={customerRef}
          showBillingCustomer={showBillingCustomer}
          handleCancelBillingCustomer={handleCancelBillingCustomer}
        />
      )}
    </section>
  );
};

export default ConnectedCustomers;
