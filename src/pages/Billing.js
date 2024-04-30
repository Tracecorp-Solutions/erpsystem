import React, { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;

const Billing = () => {
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
  });
  const [data, setData] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const fetchVendor = async () => {
    try {
      const response = await axios.get("http://54.226.71.2/GetAllVendors");
      setVendor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching vendors", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://54.226.71.2/GetAccounts");
      setAccounts(response.data);
      console.log(response.data);
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
    if (data.length > 0) {
      const newData = [...data];
      newData[0].accountId = value;
      setData(newData);
    } else {
      console.error("Data array is empty. Cannot set accountId.");
    }
  };
  

  const handleCreateBill = async () => {
    try {
      const response = await axios.post(
        "http://54.226.71.2/CreateBill",
        billData
      );
      console.log("Bill created successfully", response.data);
    } catch (error) {
      console.error("Error creating bill", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = {
      key: Date.now().toString(),
      category: "category",
      description: description,
      amount: amount,
    };

    setData([...data, newRow]);

    setDescription("");
    setAmount("");
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 md:w-1/4">
          <label htmlFor="vendor" className="block mb-1">
            Vendor
          </label>
          <Select
            id="vendor"
            className="w-full"
            placeholder="Select vendor"
            onChange={handleVendorChange}
            value={selectedVendor ? selectedVendor.id : ""}
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

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4 mb-4">
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

          <div className="mb-4 px-4 md:w-1/4">
            <label htmlFor="status" className="block mb-1">
              Status
            </label>
            <Select
              id="status"
              className="w-full"
              value={billData.status}
              onChange={(value) => setBillData({ ...billData, status: value })}
            >
              <Option value="">Select status</Option>
              <Option value="pending">Pending</Option>
              <Option value="cancel">Cancel</Option>
              <Option value="succeeded">Succeeded</Option>
            </Select>
          </div>

          <div className="w-full md:w-1/4 px-4 mb-4">
            <label htmlFor="billDate" className="block mb-1">
              Bill Date
            </label>
            <input
              type="date"
              id="billDate"
              className="w-full border rounded p-2"
              value={billData.billDate}
              onChange={(e) =>
                setBillData({ ...billData, billDate: e.target.value })
              }
            />
          </div>

          <div className="w-full md:w-1/4 px-4 mb-4">
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
            />
          </div>

          <div className="w-full md:w-1/4 px-4 mb-4">
            <label htmlFor="billNo" className="block mb-1">
              Bill No
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
            />
          </div>

          <div className="w-full md:w-1/4 px-4 mb-4">
            <Select
              defaultValue="Category"
              style={{ width: "75%" }}
              onChange={(value) => handleAccountChange(value)}
            >
              {accounts.map((accountData, index) => (
                <Option key={index} value={accountData.id}>
                  {accountData.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="w-full md:w-1/4 px-4 mb-4">
            <input
              type="text"
              placeholder="Description"
              className="border px-3 py-2 w-3/4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4 px-4 mb-4">
            <input
              type="text"
              placeholder="Amount"
              className="border px-3 py-2 w-3/4"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-4">Details of the bills</h2>
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
      </div>
    </div>
  );
};

export default Billing;
