import React, { useState } from 'react';

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    customer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Invoice Data:', invoiceData);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Customer</label>
            <p>Select the customer associated with this invoice</p>
            <select 
              name="customer" 
              value={invoiceData.customer} 
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Invoice Number:</label>
            <p>Enter unique identifier for this invoice. Its sometimes auto-generated.</p>
            <input 
              type="text" 
              name="invoiceNumber" 
              value={invoiceData.invoiceNumber} 
              onChange={handleChange} 
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Invoice Date</label>
            <p>Choose the date the invoice was issued</p>
            <input 
              type="date" 
              name="invoiceDate" 
              value={invoiceData.invoiceDate} 
              onChange={handleChange} 
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
            <p>Specify when the payment is due</p>
            <input 
              type="date" 
              name="dueDate" 
              value={invoiceData.dueDate} 
              onChange={handleChange} 
              className="w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
    </div>
  );
};

export default InvoiceForm;
