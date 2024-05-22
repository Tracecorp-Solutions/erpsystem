import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

const BillsForm = () => {
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
    type: "Expense",
    status: "Unpaid",
  });

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isBillCreated, setIsBillCreated] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAccounts();
    fetchVendors();
  }, []);

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

  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllVendors`
      );
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleAddItem = () => {
    setItems([...items, ...formData.billTranItems]);
    setFormData({
      ...formData,
      billTranItems: [{ accountId: "", amount: "", description: "" }],
    });
    setVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vendorId") {
      setFormData({
        ...formData,
        vendorId: value,
      });
    } else if (
      name === "accountId" ||
      name === "amount" ||
      name === "description"
    ) {
      const updatedItem = { ...formData.billTranItems[0], [name]: value };
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/CreateBill`,
        formData
      );
      setFormData({
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
        type: "Expense",
        status: "Unpaid",
      });
      setIsBillCreated(true);
      setMessage(response.data);
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="sm:flex justify-between items-center mb-8">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ fontFamily: "outFit, Sans-serif" }}
          >
            Bills Creation
          </h2>
          <strong
            className="text-2xl font-semibold"
            style={{ fontFamily: "outFit, Sans-serif" }}
          >
            $2,000.00
          </strong>
        </div>

        <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ fontFamily: "outFit, Sans-serif" }}
          >
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Vendor
              </label>
              <p className="text-gray-500 text-sm mb-2">
                Select the vendor associated with this bill
              </p>
              <select
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                required
                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bills Number:
              </label>
              <p className="text-gray-500 text-sm mb-2">
                Enter unique identifier for this bill. It's sometimes
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
                Bill Date
              </label>
              <p className="text-gray-500 text-sm mb-2">
                Choose the date the bill was issued
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
                required
                className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
          <div className="flex justify-between mb-4">
            <h2
              className="text-2xl"
              style={{
                fontFamily: "outFit, Sans-serif",
                width: "150px",
                paddingBottom: "30px",
              }}
            >
              Bill Items
            </h2>
            <Button
              type="button"
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
              + Add Bill Item
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                    <input type="checkbox" />
                  </td>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Due
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-3 py-4 whitespace-nowrap mt-3 text-sm text-gray-800">
                    <input type="checkbox" />
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {accounts.find((acc) => acc.id === item.accountId)
                        ?.name || "Unknown Account"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${item.amount}
                    </td>
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
            Create Bill Item
          </h2>
          <div>
            <label htmlFor="account" style={{ marginTop: "15px" }}>
              Account
            </label>
            <p>Select the account for the bill item</p>
            <select
              name="accountId"
              value={formData.billTranItems[0].accountId}
              onChange={handleChange}
              required
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="amount" style={{ marginTop: "15px" }}>
              Amount
            </label>
            <p>Enter the amount for the bill item</p>
            <input
              type="number"
              name="amount"
              value={formData.billTranItems[0].amount}
              onChange={handleChange}
              required
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="description" style={{ marginTop: "15px" }}>
              Description
            </label>
            <p>Provide a description for the bill item</p>
            <input
              type="text"
              name="description"
              value={formData.billTranItems[0].description}
              onChange={handleChange}
              required
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <Button
            type="button"
            onClick={handleAddItem}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            style={{
              background: "#4467a1",
              borderRadius: "28px",
              fontFamily: "outFit, Sans-serif",
              width: "150px",
              paddingBottom: "30px",
            }}
          >
            + Add Bill Item
          </Button>
        </Modal>

        <div className="max-w-screen-xl mx-auto mt-4 flex justify-end">
          <Button
            onClick={() =>
              setFormData({
                billNumber: "",
                billDate: "",
                dueDate: "",
                vendor: "",
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

export default BillsForm;
