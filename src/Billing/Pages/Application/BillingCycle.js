import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Input, Pagination, Table } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

// Import your components here
import GeneratingReport from "./GeneratingReport";
import BillingCustomer from "./Actions/BillingCustomer";
import BulkSms from "./Actions/BulkSms"; // Assuming these components are in separate files

const BillingCycle = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showBillingCustomer, setShowBillingCustomer] = useState(false);
  const [customerRef, setCustomerRef] = useState("");
  const [showBulkSms, setShowBulkSms] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null); // State to hold selected record
  const pageSize = 4;
  const [{isgeneratepdf,selectedRecord2},setIsGeneratePdf] =useState(false,null);

  useEffect(() => {
    const fetchData = async () => {
      sessionStorage.removeItem("setrecord");
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/GetCustomerBills`
        );
        const data = response.data.map((item) => ({
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
        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

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

    const filteredData = payments.filter((payment) =>
      Object.keys(payment).some((key) => {
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
      })
    );

    setFilteredPayments(filteredData);
    setCurrentPage(1);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const generatePDF = (record) => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("billing_data.pdf");
    }).catch((error) => {
      console.error("Error generating PDF:", error);
    });
  };

  const actionMenu = (record) => (
    <Menu onClick={(e) => handleDropdownMenuClick(record, e)}>
      <Menu.Item key="view">View Details</Menu.Item>
      <Menu.Item key="generate">Generate Bill</Menu.Item>
      {/* Add other menu items as needed */}
    </Menu>
  );

  const handleDropdownMenuClick = (record, e) => {
    switch (e.key) {
      case "view":
        handleShowBillingCustomer(record.customerRef);
        break;
      case "generate":
        sessionStorage.setItem("setrecord",record);
        setSelectedRecord(record);
        console.log(sessionStorage.getItem("setrecord"));
        setIsGeneratePdf(true,record);
        //sessionStorage.removeItem("setrecord");
        //setSelectedRecord(record);
        generatePDF(record);
        break;
      // Handle other menu item clicks
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

  return (
    <div className="md:px-6 md:py-5 rounded-3xl bg-stone-100">
      <div className="mb-6 md:flex md:justify-between md:items-center md:mb-6 font-semibold text-4xl text-neutral-600">
        <div className="mb-4 md:mb-0">Customer Bills</div>
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
            dataSource={filteredPayments}
            columns={columns}
            rowKey="key"
            pagination={false}
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

      {/* Render modals or components for additional actions */}
      {showBillingCustomer && (
        <BillingCustomer
          custRef={customerRef}
          showBillingCustomer={showBillingCustomer}
          handleCancelBillingCustomer={handleCancelBillingCustomer}
        />
      )}

      {showBulkSms && (
        <BulkSms
          showBulkSms={showBulkSms}
          handleCancelBulkSms={handleCancelBulkSms}
        />
      )}
      {(sessionStorage.getItem("setrecord") !=null) && <GeneratingReport record={selectedRecord} generatePDF={generatePDF} />}
      
    </div>
  );
};

export default BillingCycle;
