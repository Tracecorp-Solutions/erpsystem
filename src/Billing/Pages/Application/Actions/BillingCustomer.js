import React, { useState, useEffect } from "react";
import { Modal, Input, Select, DatePicker, Button, message, Spin } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const BillingCustomer = ({
  showBillingCustomer,
  handleCancelBillingCustomer,
}) => {
  const [customerRef, setCustomerRef] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    balance: "",
    applicationNo: "",
    dateConnected: "",
    meterNumber: "",
    meterSerial: "",
    meterType: "",
    previousReading: "",
    previousReadingDate: "",
    tariff: "",
  });
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [billFrom, setBillFrom] = useState(null);
  const [billTo, setBillTo] = useState(null);

  useEffect(() => {
    fetchCustomerReferences();
  }, []);

  const fetchCustomerReferences = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetConnectedCustomers`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      setCustomerList(response.data);
    } catch (error) {
      console.error("Error fetching customer references:", error);
      message.error("Failed to fetch customer references");
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async () => {
    if (!customerRef) {
      message.error("Please enter a valid Customer Reference");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      setCustomerDetails(response.data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
      message.error("Failed to fetch customer details");
    } finally {
      setLoading(false);
    }
  };

  const handleBillCustomer = async () => {
    if (!customerRef || !billFrom || !billTo) {
      message.error("Please enter all required fields");
      return;
    }

    const payload = {
      customerRef: customerRef,
      billFrom: billFrom.format('YYYY-MM-DD'),
      billTo: billTo.format('YYYY-MM-DD')
    };

    console.log("payloadpayload", payload);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/BillCustomer`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        }
      );
      console.log("Bill Customer Response:", response.data);
      message.success("Customer billed successfully!");
      handleCancelBillingCustomer();
    } catch (error) {
      console.error("Error billing customer:", error);
      message.error("Failed to bill customer");
    } finally {
      setLoading(false);
    }
  };

  const onSelectCustomer = (value) => {
    setCustomerRef(value);
    fetchCustomerDetails();
  };

  return (
    <Modal visible={showBillingCustomer} closable={false} footer={null}>
      <div className="flex flex-col items-center text-base font-semibold leading-6 max-w-[820px] text-neutral-600">
        <div className="flex flex-col self-stretch pt-6 w-full text-4xl max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
            <div>Bill Customer</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
              onClick={handleCancelBillingCustomer}
              alt="Cancel"
            />
          </div>
          <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
        </div>

        {/* Customer Reference Input */}
        <div className="mt-8 max-md:max-w-full">Customer Reference</div>
        <Input
          className="justify-center items-start px-4 py-4 mt-2 max-w-full whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-[500px] max-md:pr-5"
          value={customerRef}
          onChange={(e) => setCustomerRef(e.target.value)}
          placeholder="Enter Customer Reference"
        />

        {/* Fetch Button */}
        {/* <Button
          type="primary"
          className="mt-4 max-w-full w-[500px] max-md:px-5"
          onClick={fetchCustomerDetails}
          disabled={!customerRef || loading}
        >
          {loading ? <Spin /> : "Fetch Customer Details"}
        </Button> */}

        {/* Customer Name */}
        <div className="mt-4 max-md:max-w-full">Customer Name</div>
        <Input
          className="justify-center items-start px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5"
          value={customerDetails.name}
          readOnly
        />

        {/* Meter Number */}
        <div className="mt-4 max-md:max-w-full">Meter Number</div>
        <Input
          className="justify-center items-start px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5"
          value={customerDetails.meterNumber}
          readOnly
        />

        {/* Meter Type */}
        <div className="mt-4 max-md:max-w-full">Meter Type</div>
        <Input
          className="justify-center items-start px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5"
          value={customerDetails.meterType}
          readOnly
        />

        {/* Previous Reading */}
        <div className="mt-4 max-md:max-w-full">Previous Reading</div>
        <Input
          className="justify-center items-start px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5"
          value={customerDetails.previousReading}
          readOnly
        />

        {/* Bill From and Bill To */}
        <div className="mt-4 max-md:max-w-full">Bill From</div>
        <DatePicker
          className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Billing Date"
          value={billFrom}
          onChange={(date, dateString) => setBillFrom(date)} // Use 'date' object directly for 'value'
        />

        <div className="mt-4 max-md:max-w-full">Bill To</div>
        <DatePicker
          className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Billing Date"
          value={billTo}
          onChange={(date, dateString) => setBillTo(date)}
        />

        {/* List of Customers */}
        {/* <div className="mt-4 max-md:max-w-full">
          List of Connected Customers:
        </div>
        {customerList.map((customer) => (
          <div
            key={customer.customerRef}
            className="mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5 px-4 py-2 cursor-pointer"
            onClick={() => onSelectCustomer(customer.customerRef)} // Set customerRef and fetch details on click
          >
            <div>Customer Reference: {customer.customerRef}</div>
            <div>Full Name: {customer.fullName}</div>
            <div>Application Number: {customer.applicationNo}</div>
            <div>Balance: {customer.balance}</div>
            <div>Date Connected: {customer.dateConnected}</div>
          </div>
        ))} */}

        {/* Bill Button */}
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-8 w-full text-white bg-stone-100 max-md:px-5 max-md:max-w-full">
          <button
            type="submit"
            className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5"
            onClick={handleBillCustomer}
          >
            Bill this Customer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BillingCustomer;
