import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditInvoiceForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    billDate: "",
    dueDate: "",
    billNo: "",
    billTranItems: [
      {
        accountId: "",
        amount: "",
        description: "",
      },
    ],
    vendorId: "",
    type: "Income",
    status: "Paid",
  });

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const fetchInvoiceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBillById/${id}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/invoices/${id}`,
        formData
      );
      console.log("Invoice updated successfully:", response.data);
      // Optionally, redirect the user to a success page or display a success message
    } catch (error) {
      console.error("Error updating invoice:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="billNo"
        value={formData.billNo}
        onChange={handleChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditInvoiceForm;
