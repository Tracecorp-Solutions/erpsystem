import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Input, Pagination, Table } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PaymentDetails from "./Actions/PaymentDetails";
import BillingCustomer from "./Actions/BillingCustomer";
import BulkSms from "./Actions/BulkSms";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function MyComponent({ payments }) {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col justify-center px-8 py-6 text-base max-w-[550px] max-md:px-5">
        {payments.map((payment) => (
          <div key={payment.customerBillId} className="mb-8">
            <div className="flex flex-col items-center py-4 text-white bg-slate-500 leading-[160%] max-md:max-w-full">
              <div className="self-stretch text-2xl font-semibold text-center max-md:max-w-full">
                Ogun State Water Corporation
              </div>
              <div className="mt-4 text-center">Location: Abeokuta</div>
              <div className="mt-1">
                Phone: 08031230137 / 08139936865
              </div>
              <div className="mt-1">
                Email: ogunwater2018@yahoo.com
              </div>
              <div className="mt-1 text-center">
                Website: http://ogunwater.org.ng
              </div>
            </div>
            <div className="mt-6 leading-7 text-neutral-600 max-md:max-w-full">
              <span className="font-semibold">Customer Information:</span> <br />
              ----------------------------------------------------------------- <br />
              Customer Name: {payment.customerName} <br />
              Account Number: {payment.customerRef} <br />
              Service Address: {payment.customer.application.streetAddress} <br />
              Billing Date: {new Date(payment.billDate).toLocaleDateString()} <br />
              Due Date: {new Date(payment.paymentDate).toLocaleDateString()}
              ----------------------------------------------------------------- <br />
              <span className="font-semibold">Water Usage Details: </span> <br />
              ----------------------------------------------------------------- <br />
              Meter Number: {payment.meterNumber} <br />
              Previous Reading (June 1, 2024): {payment.previousReading} m³ <br />
              Current Reading (July 1, 2024): {payment.currentReading} m³ <br />
              Usage: {payment.consuption} m³ Rate per m³: ₦{payment.customer.customerTarrif.tarrifAmount} <br />
              Usage Charge: ₦{payment.amount}
              ----------------------------------------------------------------- <br />
              <span className="font-semibold">Bill Summary: </span> <br />
              ----------------------------------------------------------------- <br />
              Previous Balance: ₦{payment.previousBalance} <br />
              Payments Received: ₦{payment.totalAmountPaid} <br />
              Adjustments: ₦{payment.adjustments} <br />
              Balance Forward: ₦{payment.amount} <br />
              <span className="font-semibold">Current Charges: </span> <br />
              - Water Usage Charge: ₦{payment.amount} <br />
              - Service Charge: ₦{payment.amount} <br />
              - Other Charges: ₦{payment.amount} <br />
              Total Current Charges: ₦{payment.amount} <br />
              <span className="font-semibold">Total Amount Due: ₦{payment.amount} </span>
              -----------------------------------------------------------------
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BillingCycle = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [customerBills, setCustomerBills] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [showBillingCustomer, setShowBillingCustomer] = useState(false);
  const [customerRef, setCustomerRef] = useState("");
  const [showBulkSms, setShowBulkSms] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetCustomerBills`
        );
        setCustomerBills(response.data);
        const data = response.data;
        const formattedData = data.map((item, index) => ({
          ...item,
          key: item.customerBillId,
          customerRef: item.customer.customerRef,
          customerName: item.customer.application.fullName,
          paymntReference: item.billPeriod,
          vendor: item.vendor,
          amount: item.totalBillAmount,
          paymentDate: item.billDate,
          paymentMethod: item.paymentMethod,
        }));
        setPayments(formattedData);
        setFilteredPayments(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleShowPaymentForm = () => {
    setShowPaymentForm(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentForm(false);
  };

  const handleShowBillingCustomer = (value) => {
    setCustomerRef(value);
    setShowBillingCustomer(true);
  };

  const handleCancelBillingCustomer = () => {
    setShowBillingCustomer(false);
  };

  const handleShowBulkSms = () => {
    setShowBulkSms(true);
  };

  const handleCancelBulkSms = () => {
    setShowBulkSms(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const lowerCaseValue = value.toLowerCase();

    const filteredData = payments.filter((payment) => {
      return Object.keys(payment).some((key) => {
        if (key === "paymentDate") {
          return new Date(payment[key])
            .toLocaleDateString()
            .toLowerCase()
            .includes(lowerCaseValue);
        } else {
          const fieldValue = payment[key];
          if (
            typeof fieldValue === "string" ||
            typeof fieldValue === "number"
          ) {
            return fieldValue.toString().toLowerCase().includes(lowerCaseValue);
          }
          return false;
        }
      });
    });

    setFilteredPayments(filteredData);
    setCurrentPage(1);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDisplayData = filteredPayments.slice(startIndex, endIndex);

  const generatePDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Define columns for the table
    const columns = [
      { title: "Customer Ref", dataKey: "customerRef" },
      { title: "Customer Name", dataKey: "customerName" },
      { title: "Payment Ref", dataKey: "paymntReference" },
      { title: "Amount", dataKey: "amount" },
      { title: "Payment Date", dataKey: "paymentDate" },
    ];

    // Prepare rows from filteredPayments
    const rows = filteredPayments.map((payment) => ({
      customerRef: payment.customerRef,
      customerName: payment.customerName,
      paymntReference: payment.paymntReference,
      amount: payment.amount,
      paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
    }));

    // AutoTable plugin to generate table
    doc.autoTable({
      head: [columns.map((col) => col.title)],
      body: rows.map((row) => Object.values(row)),
      startY: 20, // Position from top
    });

    // Download the PDF
    doc.save("billing_data.pdf");
  };

  const actionMenu = (record) => (
    <Menu onClick={(e) => handleDropdownMenuClick(record, e)}>
      <Menu.Item key="view">View Details</Menu.Item>
      <Menu.Item key="generate">Generate Bill</Menu.Item>
      <Menu.Item key="print">Print Bill</Menu.Item>
      <Menu.Item key="contact">Contact Customer</Menu.Item>
      <Menu.Item key="approve">Approve Payment</Menu.Item>
      <Menu.Item key="assign">Assign Surveyor</Menu.Item>
    </Menu>
  );

  const handleDropdownMenuClick = (record, e) => {
    switch (e.key) {
      case "view":
        handleShowBillingCustomer(record.customerRef);
        break;
      case "generate":
        generatePDF(); // Call generatePDF function
        break;
      case "print":
        // Handle print application
        break;
      case "contact":
        // Handle contact applicant
        break;
      case "approve":
        // Handle approve application
        break;
      case "assign":
        // Handle assign surveyor
        break;
      default:
        break;
    }
  };

  const renderActions = (text, record) => (
    <Dropdown
      overlay={() => actionMenu(record)}
      trigger={["click"]}
      placement="bottomLeft"
    >
      <button className="ant-dropdown-link bg-transparent border-none outline-none">
        <EllipsisOutlined style={{ fontSize: 20, color: "#1890ff" }} />
      </button>
    </Dropdown>
  );

  const columns = [
    {
      title: "Customer Ref",
      dataIndex: "customerRef",
      key: "customerRef",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Payment Ref",
      dataIndex: "paymntReference",
      key: "paymntReference",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: renderActions,
    },
  ];

  console.log("payments payments", payments);

  return (
    <div className="md:px-6 md:py-5 rounded-3xl bg-stone-100">
      <div className="mb-6 md:flex md:justify-between md:items-center md:mb-6 font-semibold text-4xl text-neutral-600">
        <div className="mb-4 md:mb-0">Billing</div>
        <Dropdown overlay={actionMenu} trigger={["click"]}>
          <button className="flex items-center gap-1 bg-slate-500 py-3 rounded-full text-white px-5 border-none outline-none">
            <span className="text-xl">Actions</span>{" "}
            <DownOutlined className="mt-2 text-xl" />
          </button>
        </Dropdown>
      </div>
      <div className="bg-white rounded-3xl">
        <div className="flex flex-col md:flex-row md:justify-between p-6 border-b border-neutral-500 border-opacity-10">
          <div className="mb-4 md:mb-0 md:mr-4">
            <div className="flex items-center gap-2 rounded-3xl border border-neutral-500 border-opacity-10 p-3">
              <SearchOutlined />
              <Input
                placeholder="Customer Reference"
                className="bg-transparent outline-none border-none"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-3xl border border-neutral-500 border-opacity-30 p-3 w-40">
            <FilterOutlined />
            <div>Filter</div>
          </div>
        </div>
        <div className="p-6 overflow-x-auto">
          <Table
            dataSource={payments}
            columns={columns}
            rowKey="customerBillId"
            pagination={false}
            rowSelection={{
              type: "checkbox",
              selectedRowKeys: selectedRows,
              onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys),
            }}
          />
        </div>
        <div className="flex justify-end p-6">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredPayments.length}
            onChange={handleChangePage}
          />
        </div>
      </div>

      <PaymentDetails
        handleShowPaymentForm={handleShowPaymentForm}
        handleCancelPayment={handleCancelPayment}
        showPaymentForm={showPaymentForm}
      />

      {showBillingCustomer && (
        <BillingCustomer
          custRef={customerRef}
          showBillingCustomer={showBillingCustomer}
          handleCancelBillingCustomer={handleCancelBillingCustomer}
        />
      )}

      <BulkSms
        showBulkSms={showBulkSms}
        handleCancelBulkSms={handleCancelBulkSms}
      />

      {/* Display MyComponent below the Table */}
      <MyComponent payments={payments} />
    </div>
  );
};

export default BillingCycle;
