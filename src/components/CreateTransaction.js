// TransactionModal.js
import React, { useState } from 'react';
import { X } from 'lucide-react';

function CreateTransaction({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: ''
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
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTransaction;
