import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import SlideInCard from "./SlideInCard ";

const EditInvoiceForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    billDate: "",
    dueDate: "",
    billNo: "",
    billTranItems: [],
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

  console.log("updating invoices", formData);
  console.log("custmoner iddd", customer);

  useEffect(() => {
    fetchAccounts();
    fetchCustomer();
    fetchBillById(id);
  }, [id]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllVendors`
      );
      const customerData = response.data;
      const defaultCustomerId =
        customerData.length > 0 ? customerData[0].id : "";
      setFormData((prevFormData) => ({
        ...prevFormData,
        vendorId: defaultCustomerId,
      }));
      setCustomer(customerData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchBillById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBillById/${id}`
      );
      console.log("Bill Data:", response.data);

      const {
        billDate,
        dueDate,
        billNo,
        billTranItems,
        vendorId,
        type,
        status,
      } = response.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        billDate,
        dueDate,
        billNo,
        billTranItems,
        vendorId,
      }));
    } catch (error) {
      console.error("Error fetching bill:", error);
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleAddItem = () => {
    setVisible(false);
    setItems([...items, formData]);
    setFormData({
      ...formData,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      billTranItems: [
        {
          ...formData.billTranItems[0],
          [name]: value,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with id:", id);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/UpdateBill/${id}`,
        formData
      );
      setIsInvoiceCreated(true);
      setMessage(response.data);
    } catch (error) {
      console.error("Error updating invoice:", error);
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

  const formattedDueDate = isNaN(new Date(formData.dueDate))
    ? ""
    : new Date(formData.dueDate).toISOString().split("T")[0];
  const formattedBillDate = isNaN(new Date(formData.billDate))
    ? ""
    : new Date(formData.billDate).toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="sm:flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Invoice Creation</h2>
          <strong className="text-2xl font-semibold">
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
                value={formattedBillDate}
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
                value={formattedDueDate}
                onChange={handleChange}
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
                paddingBottom: "30px",
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
            style={{
              fontSize: "36px",
              fontFamily: "sans-serif",
              color: "#505050",
              marginTop: "15px",
            }}
          >
            Create Invoice Item
          </h2>
          <div>
            <label
              htmlFor="accountId"
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
              id="accountId"
              name="accountId"
              value={
                formData.billTranItems.length > 0
                  ? formData.billTranItems[0].accountId
                  : ""
              }
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
              value={
                formData.billTranItems.length > 0
                  ? formData.billTranItems[0].amount
                  : ""
              }
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
              value={
                formData.billTranItems.length > 0
                  ? formData.billTranItems[0].description
                  : ""
              }
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
                paddingBottom: "30px",
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
                paddingBottom: "30px",
              }}
            >
              Add Item
            </Button>
          </div>
        </Modal>
        {isInvoiceCreated && (
          <SlideInCard
            message={JSON.stringify(message)}
            onClose={() => setIsInvoiceCreated(false)}
            title="Invoices created!"
          />
        )}
        <div className="max-w-screen-xl mx-auto mt-4 flex justify-end">
          <Button
            onClick={() =>
              setFormData({
                invoiceNumber: "",
                invoiceDate: "",
                dueDate: "",
                customer: "",
                itemName: "",
                amount: "",
                description: "",
              })
            }
            className="py-2 px-4 text-white rounded focus:outline-none"
            style={{
              borderRadius: "28px",
              fontFamily: "outFit, Sans-serif",
              width: "150px",
              paddingBottom: "30px",
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
              paddingBottom: "30px",
            }}
          >
            Save Invoice
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditInvoiceForm;
