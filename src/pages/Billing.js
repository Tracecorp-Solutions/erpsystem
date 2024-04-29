import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const Billing = () => {
    const [data, setData] = useState([
        {
          key: "1",
          category: "category1",
          description: "Lorem ipsum dolor sit amet",
          amount: "100",
        },
        {
          key: "2",
          category: "category2",
          description: "Consectetur adipiscing elit",
          amount: "200",
        },
      ]);
    
      const calculateTotalAmount = () => {
        let total = 0;
        data.forEach((item) => {
          total += parseFloat(item.amount);
        });
        return total;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 md:w-1/4">
          <label htmlFor="vendor" className="block mb-1">
            Vendor
          </label>
          <Select id="vendor" className="w-full" placeholder="Select vendor">
            <Option value="">Select vendor</Option>
            <Option value="vendor1">Vendor 1</Option>
            <Option value="vendor2">Vendor 2</Option>
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
            ></textarea>
          </div>

          <div className="mb-4 px-4 md:w-1/4">
            <label htmlFor="bill" className="block mb-1">
              Bill
            </label>
            <Select id="bill" className="w-full" placeholder="Select bill">
              <Option value="">Select bill</Option>
              <Option value="bill1">Bill 1</Option>
              <Option value="bill2">Bill 2</Option>
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
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Submit
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
            <tr>
            <Select
                  defaultValue="Category"
                  style={{ width: "75%" }}
                  onChange={(value) => {
                  }}
                >
                  <Option value="category1">Category 1</Option>
                  <Option value="category2">Category 2</Option>
                </Select>
              <td>
                <input
                  type="text"
                  placeholder="Description"
                  className="border px-3 py-2 w-3/4"
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Amount"
                  className="border px-3 py-2 w-3/4"
                />
              </td>
            </tr>
            {data.map((rowData, index) => (
              <tr key={index}>
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
