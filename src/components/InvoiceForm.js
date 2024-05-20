import React, { useState } from 'react';

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    clientName: '',
    amount: 0,
    dueDate: '',
    notes: ''
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
    <div>
      <h2>Invoice Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Invoice Number:</label>
          <input 
            type="text" 
            name="invoiceNumber" 
            value={invoiceData.invoiceNumber} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Client Name:</label>
          <input 
            type="text" 
            name="clientName" 
            value={invoiceData.clientName} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Amount:</label>
          <input 
            type="number" 
            name="amount" 
            value={invoiceData.amount} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input 
            type="date" 
            name="dueDate" 
            value={invoiceData.dueDate} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea 
            name="notes" 
            value={invoiceData.notes} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
