import React, { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;

const Products = () => {
  const [vendor, setVendor] = useState([]);
  const [selectedVendor, setselectedVendor] = useState(null);
  const [address, setAddress] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [billData, setBillData] = useState({
    billDate: "",
    dueDate: "",
    billNo: "",
    billTranItems: [],
    totalAmount: 0,
    status: "",
    type: "Invoice",
    narration: "",
  });
  const [data, setData] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchVendor = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllVendors`
      );
      setVendor(response.data);
    } catch (error) {
      console.error("Error fetching vendors", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAccounts`
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts", error);
    }
  };

  useEffect(() => {
    fetchVendor();
    fetchAccounts();
  }, []);

  const calculateTotalAmount = () => {
    let total = 0;
    data.forEach((item) => {
      total += parseFloat(item.amount);
    });
    return total;
  };

  const handleVendorChange = (value) => {
    const selected = vendor.find((v) => v.id === value);
    if (selected) {
      setselectedVendor(selected);
      setAddress(selected.email);
    }
  };
  const handleAccountChange = (value) => {
    console.log("Selected account id:", value);
    const newBillTranItem = {
      accountId: value,
      description: description,
      amount: amount,
    };
    setBillData((prevBillData) => ({
      ...prevBillData,
      billTranItems: [newBillTranItem, ...prevBillData.billTranItems],
    }));
  };

  const handleDataSubmit = async () => {
    try {
      const billDataToSend = {
        billDate: billData.billDate,
        dueDate: billData.dueDate,
        billNo: billData.billNo,
        billTranItems: data.map((item) => ({
          accountId: item.accountId,
          description: item.description,
          amount: parseFloat(item.amount),
        })),
        totalAmount: calculateTotalAmount(),
        status: billData.status,
        type: "Invoice",
      };

      console.log(billDataToSend);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/CreateBill`,
        billDataToSend
      );
      setBillData({
        billDate: "",
        dueDate: "",
        billNo: "",
        billTranItems: [],
        totalAmount: 0,
        status: "",
      });
      setSuccessMessage("Bill submitted successfully successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting bill data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = {
      key: Date.now().toString(),
      category: "category",
      description: description,
      amount: amount,
      accountId:
        billData.billTranItems.length > 0
          ? billData.billTranItems[0].accountId
          : null,
    };

    setData([...data, newRow]);

    setDescription("");
    setAmount("");
  };

  return (
    <div className="mx-auto">
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="vendor" className="block mb-1">
              Vendor
            </label>
            <Select
              id="vendor"
              className="w-full"
              placeholder="Select vendor"
              onChange={handleVendorChange}
              value={selectedVendor ? selectedVendor.id : ""}
              required
            >
              <Option value="">Select vendor</Option>
              {vendor.map((vendorData) => (
                <Option key={vendorData.id} value={vendorData.id}>
                  {vendorData.title} {vendorData.firstName}{" "}
                  {vendorData.middleName} {vendorData.lastName}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <textarea
              id="address"
              className="w-full border rounded p-2"
              rows="4"
              placeholder="Enter address"
              value={address}
              readOnly
            ></textarea>
          </div>

          <div>
            <label htmlFor="status" className="block mb-1">
              Status
            </label>
            <Select
              id="status"
              className="w-full"
              value={billData.status}
              onChange={(value) => setBillData({ ...billData, status: value })}
              readOnly
              required
            >
              <Option value="">Select status</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="billDate" className="block mb-1">
            Date
            </label>
            <input
              type="date"
              id="billDate"
              className="w-full border rounded p-2"
              value={billData.billDate}
              onChange={(e) =>
                setBillData({ ...billData, billDate: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full border rounded p-2"
              value={billData.dueDate}
              onChange={(e) =>
                setBillData({ ...billData, dueDate: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="billNo" className="block mb-1">
              Invoice No
            </label>
            <input
              type="text"
              id="billNo"
              className="w-full border rounded p-2"
              placeholder="Enter bill number"
              value={billData.billNo}
              onChange={(e) =>
                setBillData({ ...billData, billNo: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              value={billData.narration}
              onChange={(e) =>
                setBillData({ ...billData, narration: e.target.value })
              }
              placeholder="Narration"
              className="w-full border rounded p-2"
              rows={3}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">
              Description of the items
            </label>
            <textarea
              placeholder="Description"
              className="border rounded px-3 py-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block mb-1">
              Amount
            </label>
            <input
              type="text"
              placeholder="Amount"
              className="border px-3 py-2 w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-4">Details</h2>
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th scope="col" className="relative px-3 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr></tr>
            {data.map((rowData) => (
              <tr key={rowData.key}>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {rowData.category}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rowData.description}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rowData.amount}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="2"
                className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                Total Amount
              </td>
              <td
                colSpan="2"
                className="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {calculateTotalAmount()}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            onClick={handleDataSubmit}
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
          >
            Submit Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
