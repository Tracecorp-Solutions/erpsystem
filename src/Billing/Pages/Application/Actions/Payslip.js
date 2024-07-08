import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table, Dropdown, Menu, Button, message } from "antd";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import PaymentDetails from "./PaymentDetails";
import ReconcileInvoice from "./ReconcileInvoice";
import axios from "axios";

const Payslip = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReconcileInvoice, setIsReconcileInvoice] = useState(false);
  const [invoices,setInvoices] = useState([]);

  const location = useLocation();
  const { state } = location;
  const application = state?.applicationNumber;

  const handleOk = () => {
    setIsModalVisible(false);
    // Logic to handle saving payment details
  };

  const CanceReconcileInvoice = () => {
    setIsReconcileInvoice(false);
  };

  useEffect(()=>{
    getCustomerInvoices();
  },[]);

  const handleMenuClick = (applicationNumber, key) => {
    // Handle menu item clicks here
    console.log(`Clicked on ${key} for application ${applicationNumber}`);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const getCustomerInvoices = async ()=>{
    try{
      const resp = await axios.get(`${process.env.REACT_APP_API_URL}/GetAllInvoices`);
      message.success("Successfully fetched invoice items");
      setInvoices(resp.data);
    }catch(error){
      message.error(error.response);
    }
  };

  const columns = [
    {
      title: "Application No.",
      dataIndex: "applicationNumber",
      key: "applicationNumber",
    },
    {
      title: "Payment Ref.",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Invoice Amount",
      dataIndex: "invoiceAmount",
      key: "invoiceAmount",
    },
    {
      title: "Creation Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={({ key }) => handleMenuClick(record.applicationNo, key)}>
              <Menu.Item key="view">View Details</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <EllipsisVerticalIcon className="h-6" />
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      applicationNo: "AB/00/22022022/1",
      paymentRef: "NC009",
      amountPaid: "400,000",
      balance: "0",
      paymentDate: "20/04/2024",
      status: "Paid",
    },
    {
      key: "2",
      applicationNo: "AB/00/22022022/2",
      paymentRef: "NC009",
      amountPaid: "93,000",
      balance: "0",
      paymentDate: "20/04/2024",
      status: "Deposit",
    },
  ];

  const paginationConfig = {
    pageSize: 10,
    total: data.length,
    };

  return (
    <div className="flex flex-col justify-center items-center py-6 font-semibold rounded-3xl bg-stone-100 leading-[160%]">
      {/* Applications Section */}
      <div className="flex gap-2 items-center self-stretch px-6 text-base text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="self-stretch my-auto">Applications</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
          alt="Application Icon"
        />
        <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
          {application}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-stretch my-auto w-6 aspect-square"
          alt="Payment Reference Icon"
        />
        <div className="self-stretch my-auto max-md:max-w-full">
          Payment References
        </div>
      </div>

      <div className="w-full max-w-[1088px] mt-6">
        <div className="text-4xl text-neutral-600 px-5">Customer Invoices</div>
        <Table
          columns={columns}
          dataSource={invoices}
          pagination={paginationConfig}
          className="mt-4"
        />
      </div>

      <PaymentDetails
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleOk}
      />
      <ReconcileInvoice
        isReconcileInvoice={isReconcileInvoice}
        CanceReconcileInvoice={CanceReconcileInvoice}
      />
    </div>
  );
};

export default Payslip;
