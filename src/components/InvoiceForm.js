import React, { useState } from "react";
import { Button, Modal } from "antd";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    customer: "",
    itemName: "",
    amount: "",
    description: "",
  });

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

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
    setFormData({
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      customer: "",
      itemName: "",
      amount: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Invoice Data:", formData);
    setItems([...items, formData]);
    setFormData({
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      customer: "",
      itemName: "",
      amount: "",
      description: "",
    });
  };

  return (
    <div>
      <div className="sm:flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Invoice Creation
        </h2>
        <strong className="text-2xl font-semibold">
          $1,000.00
        </strong>
      </div>

      <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Basic Information
        </h2>
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
              value={formData.customer}
              onChange={handleChange}
              required
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Customer</option>
              <option value="customer1">Customer 1</option>
              <option value="customer2">Customer 2</option>
              <option value="customer3">Customer 3</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Invoice Number:
            </label>
            <p className="text-gray-500 text-sm mb-2">
              Enter unique identifier for this invoice. It's sometimes auto-generated.
            </p>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
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
              name="invoiceDate"
              value={formData.invoiceDate}
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
          <h2 className="text-2xl font-semibold">
            Invoice Items
          </h2>
          <Button onClick={handleOpenModal}>
            + Add Invoice Item
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.invoiceDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.customer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal visible={visible} onCancel={handleCloseModal} footer={null}>
        <h2>Create Invoice Item</h2>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mt-4 flex justify-between">
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </div>
      </Modal>

      <div className="max-w-screen-xl mx-auto mt-4 flex justify-end">
        <Button className="mr-4" onClick={() => setFormData({
            invoiceNumber: "",
            invoiceDate: "",
            dueDate: "",
            customer: "",
            itemName: "",
            amount: "",
            description: "",
          })}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          Save Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
