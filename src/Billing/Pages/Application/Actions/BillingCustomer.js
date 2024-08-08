import React, { useState, useEffect } from "react";
import { Modal, Input, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";

const BillingCustomer = ({
  custRef,
  showBillingCustomer,
  handleCancelBillingCustomer,
}) => {
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    meterNumber: "",
    meterType: "",
    previousReading: "",
  });
  const [loading, setLoading] = useState(false);
  const [billFrom, setBillFrom] = useState(null);
  const [billTo, setBillTo] = useState(null);

  useEffect(() => {
    const fetchCustomerByRef = async () => {
      if (!custRef) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ValidateCustomer/${custRef}`
        );
        setCustomerDetails(response.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        message.error("Failed to fetch customer details");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerByRef();
  }, [custRef]);

  const handleBillCustomer = async (e) => {
    e.preventDefault();
    if (!custRef || !billFrom || !billTo) {
      message.error("Please enter all required fields");
      return;
    }

    const payload = {
      customerRef: custRef,
      billFrom: moment(billFrom).format("YYYY-MM-DD"),
      billTo: moment(billTo).format("YYYY-MM-DD"),
    };

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

console.log("customerDetails customerDetails customerDetails", customerDetails);
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
          value={custRef}
          readOnly
        />

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
          onChange={(date) => setBillFrom(date)}
        />

        <div className="mt-4 max-md:max-w-full">Bill To</div>
        <DatePicker
          className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Billing Date"
          value={billTo}
          onChange={(date) => setBillTo(date)}
        />

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
