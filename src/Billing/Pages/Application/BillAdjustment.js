import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DatePicker,
  Input,
  Select,
  Button,
  Dropdown,
  Menu,
  message,
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
  const [adjustmentType, setAdjustmentType] = useState("");
  const [activeTab, setActiveTab] = useState("adjustmentRequest");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [documentNumber, setDocumentNumber] = useState("");
  const [dataItem, setDataItem] = useState([]);
  const [transactionCodes, setTransactionCodes] = useState([]);
  const [adjustmentDetails, setAdjustmentDetails] = useState(null);

  const fetchTransactionCodes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetTransactionCodes`
      );
      console.log("Transaction Codes:", response.data);
      setTransactionCodes(response.data);
    } catch (error) {
      console.error("Error fetching transaction codes:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBillAdjustmentRequests`
      );
      console.log("Fetched data:", response.data);
      setDataItem(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchTransactionCodes();
    fetchData();
  }, []);

  const validateCustomer = () => {
    
    if (!customerRef) {
      alert("Please enter a customer reference.");
      return;
    }
    const apiUrl = `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`;
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

    if (!adjustmentType) {
      alert("Please select an adjustment type (+ or -).");
      return;
    }

    let adjustedAmount = 0;
    if (adjustmentType === "+") {
      adjustedAmount = amount;
    } else if (adjustmentType === "-") {
      adjustedAmount = -amount;
    }

    const totalAmount = adjustedAmount;

    const formData = new FormData();
    formData.append("CustRef", customerRef);
    formData.append("DocumentNumber", documentNumber);
    formData.append("TransactionCode", transactionCode);
    formData.append("Name", customerName);
    formData.append("AdjustmentReason", adjustmentReason);
    formData.append("AdjustmentType", adjustmentType);
    formData.append("Amount", adjustedAmount);

    if (attachment) {
      formData.append("file", attachment);
      formData.append("EvidenceFilePath", attachment.name);
    } else {
      formData.append("EvidenceFilePath", "");
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/AddBillAdjustmentRequest`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "*/*",
          },
        }
      )
      .then((response) => {
        message.success("Adjustment request submitted successfully!");
      })
      .catch((error) => {
        message.error("Adjustment Request Error:", error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleViewAdjustment = (itemId) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/GetBillAdjustmentRequestById/${itemId}`
      )
      .then((response) => {
        console.log("Adjustment Details:", response.data);
        setAdjustmentDetails(response.data);
        setDrawerVisible(true);
      })
      .catch((error) => {
        console.error("Error fetching adjustment details:", error);
        message.error("Failed to fetch adjustment details.");
      });
  };

  console.log("dataItem dataItem", dataItem);

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 pt-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-w-full">
        Adjust Bill
      </div>
      <div className="bg-white w-full mt-6">
        <div className="flex flex-wrap justify-start space-x-2 px-6 py-4 text-slate-500">
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
                  {transactionCodes.map((code) => (
                    <Option key={code.id} value={code.id}>
                      {code.description}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex gap-4 mt-4 max-md:flex-wrap">
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Document Number
                </div>
                <Input
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
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
                <div className="flex gap-2 items-center mt-2">
                  <Select
                    value={adjustmentType}
                    onChange={(value) => setAdjustmentType(value)}
                    className="flex gap-2 justify-between h-14 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full"
                  >
                    <Option value="">Select Adjustment Type</Option>
                    <Option value="+">+</Option>
                    <Option value="-">-</Option>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Total Amount
                </div>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4 max-md:flex-wrap">
              <div className="flex flex-col w-full">
                <div className="font-semibold text-neutral-600 w-full">
                  Attach File
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
                />
              </div>
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-solid border-neutral-500 border-opacity-30 rounded-xl mt-6">
              <thead className="bg-stone-100 text-neutral-600">
                <tr>
                  <th className="py-4 px-6">CUSTOMER REF</th>
                  <th className="py-4 px-6">TRANS CODE</th>
                  <th className="py-4 px-6">DOC NO.</th>
                  <th className="py-4 px-6">EFFECTIVE DATE</th>
                  <th className="py-4 px-6">AMOUNT</th>
                  <th className="py-4 px-6">TOTAL</th>
                  <th className="py-4 px-6">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-slate-500">
                {dataItem.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 px-6">{item.custRef}</td>
                    <td className="py-4 px-6">{item.transactionCode}</td>
                    <td className="py-4 px-6">{item.documentNumber}</td>
                    <td className="py-4 px-6">{item.effectiveDate}</td>
                    <td className="py-4 px-6">{item.amount}</td>
                    <td className="py-4 px-6">{item.amount}</td>
                    <td className="py-4 px-6">
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              key="1"
                              onClick={() => handleViewAdjustment(item.id)}
                            >
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div></div>
          </div>
        )}

        <BillAdjustmentDrawer
          setDrawerVisible={setDrawerVisible}
          drawerVisible={drawerVisible}
          adjustmentDetails={adjustmentDetails}
        />
      </div>
    </div>
  );
};

export default BillAdjustment;
