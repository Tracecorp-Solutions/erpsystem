import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    mobile: '',
    website: '',
    addres: {
      street: '',
      city: '',
      zipCode: '',
      country: '',
    },
    accountNo: '',
    billingRate: 0,
    openingBalance: 0,
    openingBalanceDate: '',
    notes: '',
    businessIdNo: '',
    status: true,
    paymentAccount: 0,
    subGroupId: 0,
    vendorType: 'Vendor',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [mainKey, subKey] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [mainKey]: {
          ...prevData[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://3.216.182.63:8095/CreateVendor', formData)
      .then((response) => {
        console.log('Form submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <br/>
      <label>fullName</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
      <br/>
      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <br/>
      <label>companyName</label>
      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" />
      <br/>
      <label>Phone</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <br/>
      <label>Mobile</label>
      <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
      <br/>
      <label>Website</label>
      <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
      <br/>
      <label>Street</label>
      <input type="text" name="addres.street" value={formData.addres.street} onChange={handleChange} placeholder="Street" />
      <br/>
      <label>City</label>
      <input type="text" name="addres.city" value={formData.addres.city} onChange={handleChange} placeholder="City" />
      <br/>
      <label>zipCode</label>
      <input type="text" name="addres.zipCode" value={formData.addres.zipCode} onChange={handleChange} placeholder="Zip Code" />
      <br/>
      <label>Country</label>
      <input type="text" name="addres.country" value={formData.addres.country} onChange={handleChange} placeholder="Country" />
      <br/>
      <label>Account number</label>
      <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} placeholder="Account No" />
      <br/>
      <label>Billing rate</label>
      <input type="number" name="billingRate" value={formData.billingRate} onChange={handleChange} placeholder="Billing Rate" />
      <br/>
      <label>openingBalance</label>
      <input type="number" name="openingBalance" value={formData.openingBalance} onChange={handleChange} placeholder="Opening Balance" />
      <br/>
      <label>openingBalanceDate</label>
      <input type="datetime-local" name="openingBalanceDate" value={formData.openingBalanceDate} onChange={handleChange}  />
      <br/>
      <label>Notes</label>
      <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
      <br/>
      <label>businessIdNo</label>
      <input type="text" name="businessIdNo" value={formData.businessIdNo} onChange={handleChange} placeholder="Business ID No" />
      <br/>
      <label>status</label>
      <input type="checkbox" name="status" checked={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.checked })} />
      <br/>
      <label>paymentAccount</label>
      <input type="number" name="paymentAccount" value={formData.paymentAccount} onChange={handleChange} placeholder="Payment Account" />
      <br/>
      <label>subGroupId</label>
      <input type="number" name="subGroupId" value={formData.subGroupId} onChange={handleChange} placeholder="Sub Group ID" />
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
