import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import "../styles/components/InvoiceForm.css";

const AddItem = ({ visible, handleAddItem, handleCloseModal }) => {
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    handleAddItem({ itemName, amount, description });
    setItemName("");
    setAmount("");
    setDescription("");
  };

  return (
    <Modal visible={visible} onCancel={handleCloseModal} footer={null}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2
          style={{
            marginTop: "20px",
            fontSize: "36px",
            color: "#505050",
            fontWeight: "600",
            fontFamily: "outFit, Sans-serif",
          }}
        >
          Create Invoice Item
        </h2>
        <div>
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
            style={{
              fontWeight: "600",
              fontFamily: "outFit, Sans-serif",
              fontSize: "16px",
              color: "#505050",
            }}
          >
            Attach Account
          </label>
          <p
            style={{
              fontSize: "14px",
              fontFamily: "outFit, Sans-serif",
              color: "#a1a1a1",
              fontWeight: "400",
            }}
          >
            Select the account associated with this invoice item
          </p>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={handleItemNameChange}
            required
            className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            style={{
              border: "1px solid #7a7a7a",
              padding: "10px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
            style={{
              fontWeight: "600",
              fontFamily: "outFit, Sans-serif",
              fontSize: "16px",
              color: "#505050",
            }}
          >
            Item Amount
          </label>
          <p
            style={{
              fontSize: "14px",
              fontFamily: "outFit, Sans-serif",
              color: "#a1a1a1",
              fontWeight: "400",
            }}
          >
            Enter the cost of each invoice item
          </p>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
            className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            style={{
              border: "1px solid #7a7a7a",
              padding: "10px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
            style={{
              fontWeight: "600",
              fontFamily: "outFit, Sans-serif",
              fontSize: "16px",
              color: "#505050",
            }}
          >
            Description
          </label>
          <p
            style={{
              fontSize: "14px",
              fontFamily: "outFit, Sans-serif",
              color: "#a1a1a1",
              fontWeight: "400",
            }}
          >
            Describe what you are being paid for
          </p>
          <textarea
            id="description"
            value={description}
            placeholder="Description..."
            onChange={handleDescriptionChange}
            className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            style={{
              border: "1px solid #7a7a7a",
              padding: "10px",
            }}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <Button
            type="submit"
            className="py-2 px-4  text-white rounded focus:outline-none"
            style={{
              borderRadius: "28px",
              fontFamily: "outFit, Sans-serif",
              width: "150px",
              paddingBottom: "30px",
              marginRight: "10px",
              color: "#505050",
              border: "1px solid #7a7a7a",
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
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
      </form>
    </Modal>
  );
};

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    customer: "",
  });

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleAddItem = (values) => {
    console.log("Received values:", values);
    setVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Invoice Data:", invoiceData);
    setItems([...items, invoiceData]);
    setInvoiceData({
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      customer: "",
    });
  };

  return (
    <div>
      <div
        className="sm:flex justify-between items-center mb-8"
        style={{
          width: "85%",
          margin: "0 auto",
        }}
      >
        <h2
          className="text-2xl font-semibold mb-4 sm:mb-0"
          style={{
            fontSize: "36px",
            color: "#505050",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "600",
          }}
        >
          Invoice Creation
        </h2>
        <strong
          className="text-2xl font-semibold"
          style={{
            fontSize: "36px",
            color: "#505050",
            fontFamily: "outFit, Sans-serif",
            fontWeight: "600",
          }}
        >
          $1,000.00
        </strong>
      </div>

      <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{
            fontFamily: "outFit, Sans-serif",
            color: "#505050",
            fontWeight: "600",
            fontSize: "24px",
          }}
        >
          Basic Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              style={{
                fontSize: "16px",
                fontFamily: "outFit, Sans-serif",
                color: "#505050",
                fontWeight: "600",
              }}
            >
              Customer
            </label>
            <p
              style={{
                color: "#a1a1a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Select the customer associated with this invoice
            </p>
            <select
              name="customer"
              value={invoiceData.customer}
              required
              onChange={handleChange}
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Customer</option>
              <option value="customer1">Customer 1</option>
              <option value="customer2">Customer 2</option>
              <option value="customer3">Customer 3</option>
            </select>
          </div>
          <div>
            <label
              className="
                block
                text-gray-700
                text-sm
                font-bold
                mb-2
                "
              style={{
                fontSize: "16px",
                fontFamily: "outFit, Sans-serif",
                color: "#505050",
                fontWeight: "600",
              }}
            >
              Invoice Number:
            </label>
            <p
              style={{
                color: "#a1a1a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Enter unique identifier for this invoice. Its sometimes
              auto-generated.
            </p>
            <input
              type="text"
              name="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={handleChange}
              required
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              style={{
                fontSize: "16px",
                fontFamily: "outFit, Sans-serif",
                color: "#505050",
                fontWeight: "600",
              }}
            >
              Invoice Date
            </label>
            <p
              style={{
                color: "#a1a1a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Choose the date the invoice was issued
            </p>
            <input
              type="date"
              name="invoiceDate"
              value={invoiceData.invoiceDate}
              required
              onChange={handleChange}
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              style={{
                fontSize: "16px",
                fontFamily: "outFit, Sans-serif",
                color: "#505050",
                fontWeight: "600",
              }}
            >
              Due Date
            </label>
            <p
              style={{
                color: "#a1a1a1",
                fontFamily: "outFit, Sans-serif",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Specify when the payment is due
            </p>
            <input
              type="date"
              name="dueDate"
              value={invoiceData.dueDate}
              onChange={handleChange}
              required
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>

      <div
        className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg"
        style={{ borderRadius: "24px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h2
            className="
              text-2xl
              font-semibold
              mb-4"
            style={{
              fontFamily: "outFit, Sans-serif",
              fontWeight: "600",
              color: "#505050",
              fontSize: "24px",
            }}
          >
            Invoice Items
          </h2>
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
        <div>
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
      </div>
      <div
        className="mt-4 flex justify-end"
        style={{
          width: "90%",
        }}
      >
        <Button
          type="submit"
          className="py-2 px-4  text-white rounded focus:outline-none"
          style={{
            borderRadius: "28px",
            fontFamily: "outFit, Sans-serif",
            width: "150px",
            paddingBottom: "30px",
            marginRight: "10px",
            color: "#505050",
            border: "1px solid #7a7a7a",
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
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
      <AddItem
        visible={visible}
        handleAddItem={handleAddItem}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default InvoiceForm;
