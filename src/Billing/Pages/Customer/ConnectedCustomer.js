import React, { useState, useEffect } from "react";
import { Table, Menu, Dropdown } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentDetails from "../Application/Actions/PaymentDetails";
import BillingCustomer from "../Application/Actions/BillingCustomer"; // Import BillingCustomer component

function ConnectedCustomers() {
  const [customers, setConnectedCustomers] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showBillingCustomer, setShowBillingCustomer] = useState(false); // State for showing BillingCustomer
  const [customerRef, setCustomerRef] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State to hold selected customer details

  const navigate = useNavigate();

  useEffect(() => {
    GetConnectedCustomers();
  }, []);

  const GetConnectedCustomers = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API_URL}/GetConnectedCustomers`);
      setConnectedCustomers(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error if needed
    }
  };

  const handleMenuClick = (customerRef, action) => {
    switch (action) {
      case "view":
        navigate(`/billingdashboard`, { state: { screen: 'customer-details', customerRef } });
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
    const selected = customers.find(customer => customer.customerRef === customerRef);
    setSelectedCustomer(selected); // Store selected customer details
    setCustomerRef(customerRef);
    setShowPaymentForm(true); // Show PaymentDetails component
  };

  const handleCancelBillingCustomer = () => {
    setShowBillingCustomer(false);
  };

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
      render: status => <span className="px-3 py-1">{status}</span>,
    },
    {
      title: "Date Created",
      dataIndex: "dateConnected",
      key: "dateConnected",
      render: status => <span className="px-3 py-1">{status}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleMenuClick(record.customerRef, key)}>
              <Menu.Item key="view">View Details</Menu.Item>
              <Menu.Item key="bill">Bill Customer</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottomLeft"
        >
          <EllipsisVerticalIcon className="w-7 h-7" />
        </Dropdown>
      ),
    },
  ];

  return (
    <section className="pb-0.5 mx-auto rounded-3xl bg-stone-100 max-md:mr-2.5 w-full">
      <h1 className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full p-6">
        Bill Customers
      </h1>
      <div className="p-6 mt-6 bg-white">
        <Table
          dataSource={customers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 768 }}
          className="max-md:px-5 w-full"
        />
      </div>

      <PaymentDetails
        handleShowPaymentForm={handleShowPaymentForm}
        handleCancelPayment={handleCancelPayment}
        showPaymentForm={showPaymentForm}
        customerRef={customerRef}
        setCustomerRef={setCustomerRef}
        selectedCustomer={selectedCustomer}
      />

      {/* BillingCustomer component */}
      {showBillingCustomer && (
        <BillingCustomer
          customer={selectedCustomer} // Pass selected customer details as prop
          showBillingCustomer={showBillingCustomer}
          handleCancelBillingCustomer={handleCancelBillingCustomer}
        />
      )}
    </section>
  );
}

export default ConnectedCustomers;
