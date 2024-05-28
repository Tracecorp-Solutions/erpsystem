import React, { useState } from 'react';
import { X } from 'lucide-react';

function CreateTransaction({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    transactionDate: '',
    accountFromId: '',
    accountToId: '',
    amount: '',
    narration: '',
    tranReference: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Sample list of accounts (Replace with your actual data)
  const accountOptions = [
    { id: '1', name: 'Account 1' },
    { id: '2', name: 'Account 2' },
    { id: '3', name: 'Account 3' },
    // Add more accounts as needed
  ];

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className='form-title'>
          <h2>Create Transaction</h2>
          <span className="close" onClick={onClose}><X /></span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="label-desc">
              <label>Date of Transaction</label>
              <p>The specific day when the transaction occurred</p>
            </div>
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div className="label-desc">
              <label>Reference Number (Optional)</label>
              <p>If you have an invoice or cheque number related to this transaction</p>
            </div>
            <input
              type="text"
              name="tranReference"
              value={formData.tranReference}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div className="label-desc">
              <label>Account From</label>
              <p>The originating account involved in the transaction</p>
            </div>
            <select
              name="accountFromId"
              value={formData.accountFromId}
              onChange={handleChange}>
              <option value="">Select Account</option>
              {accountOptions.map(account => (
                <option key={account.id} value={account.id}>{account.name}</option>
              ))}
            </select> 
          </div>
          <div className="form-group">
            <div className="label-desc">
              <label>Account To</label>
              <p>The destination account where funds are transferred to in a transaction</p>
            </div>
            <select
              name="accountToId"
              value={formData.accountToId}
              onChange={handleChange}>
              <option value="">Select Account</option>
              {accountOptions.map(account => (
                <option key={account.id} value={account.id}>{account.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <div className="label-desc">
              <label>Amount</label>
              <p>The monetary value exchanged in the transaction</p>
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div className="label-desc">
              <label>Description</label>
              <p>A brief explanation of the transaction for reference</p>
            </div>
            <textarea
              type="text"
              rows="5"
              name="narration"
              value={formData.narration}
              onChange={handleChange}
            />
          </div>
          <div className='CTA-btn'>
            <button type="submit" className="create-btn cancel">Cancel</button>
            <button type="submit" className="create-btn">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTransaction;
