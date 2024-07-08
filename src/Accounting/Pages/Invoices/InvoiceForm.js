import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SuccessMessageCard from "../../components/Shared/SuccessMessageCard";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    billDate: "",
    dueDate: "",
    billNo: "",
    billTranItems: [
      {
        accountId: "",
        amount: "",
        description: "",
      },
    ],
    vendorId: "",
    type: "Income",
    status: "Unpaid",
  });

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [isInvoiceCreated, setIsInvoiceCreated] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
    fetchCustomer();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
      console.log("get accounts", response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllVendors`
      );
      setCustomer(response.data);
      console.log("get accounts", response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleAddItem = () => {
    console.log("Added Item:", formData);
    setVisible(false);
    setItems([...items, formData]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customer") {
      setFormData({
        ...formData,
        vendorId: value,
      });
    } else if (name === "itemName") {
      const updatedItem = { ...formData.billTranItems[0], accountId: value };
      setFormData({
        ...formData,
        billTranItems: [updatedItem],
      });
    } else if (name === "amount") {
      const updatedItem = { ...formData.billTranItems[0], amount: value };
      setFormData({
        ...formData,
        billTranItems: [updatedItem],
      });
    } else if (name === "description") {
      const updatedItem = { ...formData.billTranItems[0], description: value };
      setFormData({
        ...formData,
        billTranItems: [updatedItem],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/CreateBill`,
        formData
      );
      setIsInvoiceCreated(true);
      setMessage(response.data);
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    items.forEach((item) => {
      item.billTranItems.forEach((tranItem) => {
        total += parseFloat(tranItem.amount);
      });
    });
    return total.toFixed(2);
  };

  return (
    <>
     
      <form onSubmit={handleSubmit} className="content">
       
        <div>
          <div className="sm:flex justify-between items-center mb-6">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() =>
                navigate("/Dashboardlayout", { state: { screen: "invoice" } })
              }
            >
              <ArrowLeftOutlined
                style={{
                  fontSize: "24px",
                  marginRight: "8px",
                  marginBottom: "6px",
                  marginLeft: "15px",
                }}
                
              />
              <h2 className="text-2xl font-semibold mb-4">Invoice Creation</h2>
            </h2>
            <strong className="text-2xl font-semibold mr-8">
              ${calculateTotalAmount()}
            </strong>
          </div>

          <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Customer
                </label>
                <p className="text-gray-500 text-sm mb-2">
                  Select the customer associated with this invoice
                </p>
                <select
                  name="customer"
                  value={formData.vendorId}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Customer</option>
                  {customer.map((customerData) => (
                    <option key={customerData.id} value={customerData.id}>
                      {customerData.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Invoice Number:
                </label>
                <p className="text-gray-500 text-sm mb-2">
                  Enter unique identifier for this invoice. It's sometimes
                  auto-generated.
                </p>
                <input
                  type="text"
                  name="billNo"
                  value={formData.billNo}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Invoice Date
                </label>
                <p className="text-gray-500 text-sm mb-2">
                  Choose the date the invoice was issued
                </p>
                <input
                  type="date"
                  name="billDate"
                  value={formData.billDate}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Due Date
                </label>
                <p className="text-gray-500 text-sm mb-2">
                  Specify when the payment is due
                </p>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={formData.billDate}
                  required
                  className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold">Invoice Items</h2>
              <Button
                type="submit"
                onClick={handleOpenModal}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                style={{
                  background: "#4467a1",
                  borderRadius: "28px",
                  fontFamily: "outFit, Sans-serif",
                  width: "150px",
                  paddingBottom: "10px",
                }}
              >
                + Add Invoice Item
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Due
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={index}>
                      {item.billTranItems.map((tranItem, index) => (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          {tranItem.description}
                        </td>
                      ))}
                      {item.billTranItems.map((tranItem, index) => (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          {tranItem.amount}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Modal visible={visible} onCancel={handleCloseModal} footer={null}>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() => navigate("/invoice")}
            >
              <ArrowLeftOutlined
                style={{
                  fontSize: "24px",
                  marginRight: "8px",
                  marginBottom: "15px",
                }}
              />
              <h2 className="text-2xl font-semibold mb-4">Invoice Creation</h2>
            </h2>
            <div>
              <label
                htmlFor="itemName"
                style={{
                  color: "#505050",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Attach Account
              </label>
              <p
                style={{
                  fontWeight: "400",
                  color: "#a1a1a1",
                  fontSize: "14px",
                  fontFamily: "outFit, Sans-serif",
                  marginBottom: "5px",
                }}
              >
                Select the account associated with this invoice item
              </p>
              <select
                id="itemName"
                name="itemName"
                value={formData.billTranItems.accountId}
                onChange={handleChange}
                required
                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="amount"
                style={{
                  color: "#505050",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Item Amount
              </label>
              <p
                style={{
                  fontWeight: "400",
                  color: "#a1a1a1",
                  fontSize: "14px",
                  fontFamily: "outFit, Sans-serif",
                  marginBottom: "5px",
                }}
              >
                Enter the cost of each invoice item
              </p>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.billTranItems.amount}
                onChange={handleChange}
                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                style={{
                  color: "#505050",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Description
              </label>
              <p
                style={{
                  fontWeight: "400",
                  color: "#a1a1a1",
                  fontSize: "14px",
                  fontFamily: "outFit, Sans-serif",
                  marginBottom: "5px",
                }}
              >
                Describe what you are being paid for
              </p>
              <textarea
                id="description"
                name="description"
                value={formData.billTranItems.description}
                onChange={handleChange}
                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-between">
              <Button
                onClick={handleCloseModal}
                className="py-2 px-4 text-white rounded focus:outline-none"
                style={{
                  borderRadius: "28px",
                  fontFamily: "outFit, Sans-serif",
                  width: "150px",
                  paddingBottom: "10px",
                  color: "#505050",
                  marginRight: "15px",
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleAddItem}
                className="py-2 px-4 text-white rounded focus:outline-none"
                style={{
                  background: "#4467a1",
                  borderRadius: "28px",
                  fontFamily: "outFit, Sans-serif",
                  width: "150px",
                  paddingBottom: "10px",
                }}
              >
                Add Item
              </Button>
            </div>
          </Modal>
          {isInvoiceCreated && (
            <SuccessMessageCard
              message={JSON.stringify(message)}
              onClose={() => setIsInvoiceCreated(false)}
              title="Invoices created!"
            />
          )}
          <div className="max-w-screen-xl mx-auto mt-4 flex justify-end">
            <Button
              onClick={() => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  billTranItems: [],
                }));
                setItems([]);
              }}
              className="py-2 px-4 text-white rounded focus:outline-none"
              style={{
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "150px",
                paddingBottom: "10px",
                color: "#505050",
                marginRight: "15px",
              }}
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              className="py-2 px-4 text-white rounded focus:outline-none"
              style={{
                background: "#4467a1",
                borderRadius: "28px",
                fontFamily: "outFit, Sans-serif",
                width: "150px",
                paddingBottom: "10px",
              }}
              disabled={isSaving}
            >
              Save Invoice
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default InvoiceForm;
