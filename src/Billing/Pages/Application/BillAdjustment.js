import React, { useState } from "react";
import axios from "axios";
import {
  DatePicker,
  Input,
  Select,
  Form,
  Table,
  Button,
  Dropdown,
  Menu,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import BillAdjustmentDrawer from "./Actions/BillAdjustmentDrawer";
const { Option } = Select;

const BillAdjustment = () => {
  const [customerRef, setCustomerRef] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [attachment, setAttachment] = useState(null);
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [activeTab, setActiveTab] = useState("adjustmentRequest");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const apiUrl = `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`;

  const validateCustomer = () => {
    if (!customerRef) {
      alert("Please enter a customer reference.");
      return;
    }

    axios
      .get(apiUrl, {
        headers: {
          accept: "*/*",
        },
      })
      .then((response) => {
        console.log("Validation Response:", response.data);
        setCustomerName(response.data.name);
      })
      .catch((error) => {
        console.error("Validation Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const data = [
    {
      key: "1",
      customerRef: "21310001",
      transCode: "312",
      docNo: "12345",
      effectiveDate: "05/31/2024",
      amount: "-20,000",
      vat: "0.00",
      total: "-20,000",
    },
  ];

  const columns = [
    {
      title: "Customer Ref",
      dataIndex: "customerRef",
      key: "customerRef",
    },
    {
      title: "Trans Code",
      dataIndex: "transCode",
      key: "transCode",
    },
    {
      title: "Doc No.",
      dataIndex: "docNo",
      key: "docNo",
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => setDrawerVisible(true)}>
                View Adjustment
              </Menu.Item>
              <Menu.Item key="2">
                <a href="#">Commit to Database</a>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            type="text"
            icon={
              <EllipsisOutlined
                style={{ fontSize: "20px", color: "#1890ff" }}
              />
            }
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 pt-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Adjust Bill
      </div>
      <div className="bg-white w-full mt-6">
        <div className="flex flex-wrap justify-start space-x-2 px-6 py-4 text-slate-500">
          {/* Toggle Tabs */}
          <button
            type="button"
            onClick={() => toggleTab("adjustmentRequest")}
            className={`font-semibold ${
              activeTab === "adjustmentRequest"
                ? "bg-stone-100 text-slate-500 rounded-lg px-6 py-4 focus:outline-none"
                : "text-neutral-400 px-4 py-3 focus:outline-none"
            }`}
          >
            Adjustment Request
          </button>
          <button
            type="button"
            onClick={() => toggleTab("viewAdjustments")}
            className={`font-semibold ${
              activeTab === "viewAdjustments"
                ? "bg-stone-100 text-slate-500 rounded-lg px-6 py-4 focus:outline-none"
                : "text-neutral-400 px-4 py-3 focus:outline-none"
            }`}
          >
            View Adjustments
          </button>
        </div>
        {activeTab === "adjustmentRequest" && (
          <form onSubmit={handleSubmit} className="flex flex-col p-6 text-base">
            <div className="mt-8 font-semibold text-neutral-600 max-w-full">
              Customer Reference
            </div>
            <div className="flex flex-col mt-2 max-w-full">
              <div className="bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2">
                  <Input
                    value={customerRef}
                    onChange={(e) => setCustomerRef(e.target.value)}
                    placeholder="Enter Customer Ref"
                    className="my-auto text-neutral-400 flex-1 border-none py-4 px-4 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={validateCustomer}
                    className="cursor-pointer justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-w-[50%] md:w-[25%] md:ml-2"
                  >
                    Validate Customer
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4 max-md:flex-wrap">
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Customer Name
                </div>
                <Input
                  value={customerName}
                  disabled
                  className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Transaction Code
                </div>
                <Select
                  value={transactionCode}
                  onChange={(value) => setTransactionCode(value)}
                  className="flex gap-2 justify-between h-14 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full"
                >
                  <Option value="">Select Code</Option>
                  <Option value="code1">Code 1</Option>
                  <Option value="code2">Code 2</Option>
                  <Option value="code3">Code 3</Option>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 mt-4 max-md:flex-wrap">
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Document Number
                </div>
                <Input
                  value={customerRef}
                  onChange={(e) => setCustomerRef(e.target.value)}
                  placeholder="Enter Document Number"
                  className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Effective Date
                </div>
                <DatePicker
                  value={effectiveDate}
                  onChange={(date, dateString) => setEffectiveDate(date)}
                  className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4 max-md:flex-wrap">
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Amount (-/+)
                </div>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount to add or subtract"
                  className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Total Amount
                </div>
                <Input
                  value={amount}
                  className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4 max-md:flex-wrap">
              <Form.Item
                name="attachment"
                className="flex flex-col w-full"
                valuePropName="fileList"
                getValueFromEvent={(e) => handleFileChange(e)}
              >
                <div className="font-semibold text-neutral-600 w-full">
                  Attach File
                </div>
                <input
                  type="file"
                  className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
                />
              </Form.Item>

              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Adjustment Reason
                </div>
                <Input
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  placeholder="Enter adjustment reason"
                  className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8 max-md:flex-wrap">
              <button
                type="submit"
                className="px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-w-[50%] md:w-[25%] md:ml-2"
              >
                Submit Adjustment
              </button>
            </div>
          </form>
        )}

        {activeTab === "viewAdjustments" && (
          <Table dataSource={data} columns={columns} />
        )}

        {/* Drawer for Viewing Adjustment Details */}
        <BillAdjustmentDrawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        />
      </div>
    </div>
  );
};

export default BillAdjustment;
