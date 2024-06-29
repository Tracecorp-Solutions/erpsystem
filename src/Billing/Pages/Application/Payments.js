import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import PaymentDetails from "./Actions/PaymentDetails";

const Payments = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/GetAllPayments`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Assuming each payment has a unique id, use that as the key
        const formattedData = data.map((item, index) => ({ ...item, key: item.paymentId }));
        setPayments(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleShowPaymentForm = () => {
    setShowPaymentForm(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentForm(false);
  };

  const toggleSelectRow = (paymentId) => {
    const isSelected = selectedRows.includes(paymentId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(id => id !== paymentId));
    } else {
      setSelectedRows([...selectedRows, paymentId]);
    }
  };

  const isSelected = (paymentId) => selectedRows.includes(paymentId);

  return (
    <div className="px-6 py-5 rounded-3xl bg-stone-100 max-md:px-5">
      <div className="flex justify-between items-center mb-6 font-semibold text-4xl text-neutral-600">
        Payments
        <Button
          type="primary"
          onClick={handleShowPaymentForm}
          className="flex items-center px-4 py-2 rounded-full bg-slate-500"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a6fbf858a262ca173836b28ea1635646ad60c82456acd8cee2b922f3be3bea7?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            alt="Add Payment"
            className="w-6 h-6"
          />
          <span className="text-xl text-white ml-2">Add Payment</span>
        </Button>
      </div>
      <div className="bg-white rounded-3xl">
        <div className="flex justify-between p-6 border-b border-neutral-500 border-opacity-10">
          <div className="flex items-center gap-2 rounded-3xl border border-neutral-500 border-opacity-10 p-3">
            <SearchOutlined />
            <Input placeholder="Search Payment Ref..." className="bg-transparent outline-none border-none" />
          </div>
          <div className="flex items-center gap-2 rounded-3xl border border-neutral-500 border-opacity-30 p-3">
            <FilterOutlined />
            <div>Filter</div>
          </div>
        </div>
        <div className="p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-neutral-100">
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">CUSTOMER REF</th>
                <th className="px-4 py-2">PAYMENT REF</th>
                <th className="px-4 py-2">VENDOR ID</th>
                <th className="px-4 py-2">AMOUNT</th>
                <th className="px-4 py-2">PAYMENT DATE</th>
                <th className="px-4 py-2">PAYMENT METHOD</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={isSelected(payment.paymentId)}
                      onChange={() => toggleSelectRow(payment.paymentId)}
                    />
                  </td>
                  <td className="px-4 py-2">{payment.customerRef}</td>
                  <td className="px-4 py-2">{payment.paymntReference}</td>
                  <td className="px-4 py-2">{payment.vendor}</td>
                  <td className="px-4 py-2">{payment.amount}</td>
                  <td className="px-4 py-2">{payment.paymentDate}</td>
                  <td className="px-4 py-2">{payment.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 text-neutral-400">Showing 1 - {payments.length} of {payments.length}</div>
      </div>
      <PaymentDetails
        handleShowPaymentForm={handleShowPaymentForm}
        handleCancelPayment={handleCancelPayment}
        showPaymentForm={showPaymentForm}
      />
    </div>
  );
};

export default Payments;
