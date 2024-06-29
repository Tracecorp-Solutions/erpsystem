import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import PaymentDetails from "./Actions/PaymentDetails";

const Payments = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://3.216.182.63:8095/TestApi/GetAllPayments', {
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPayments(data); // Update state with fetched data
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

  const columns = [
    { title: "CUSTOMER REF", dataIndex: "customerRef", key: "customerRef", width: 120 },
    { title: "PAYMENT REF", dataIndex: "paymntReference", key: "paymntReference", width: 150 },
    { title: "VENDOR ID", dataIndex: "vendor", key: "vendor", width: 100 },
    { title: "AMOUNT", dataIndex: "amount", key: "amount", width: 100 },
    { title: "PAYMENT DATE", dataIndex: "paymentDate", key: "paymentDate", width: 120 },
    { title: "PAYMENT METHOD", dataIndex: "paymentMethod", key: "paymentMethod", width: 100 },
    { title: "NARRATION", dataIndex: "narration", key: "narration", width: 120 },
  ];

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
        <Table
          columns={columns}
          dataSource={payments}
          loading={loading}
          pagination={{ pageSize: 10 }}
          className="p-6"
        />
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
