import React, { useState } from "react";
import { Modal, Input, Select, Button, DatePicker } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const PaymentDetails = ({ handleCancelPayment, showPaymentForm }) => {
  // State for form fields
  const [customerRef, setCustomerRef] = useState("");
  const [paymntReference, setPaymntReference] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [narration, setNarration] = useState("");

  // State for validation result
  const [validationResult, setValidationResult] = useState(null);
  const [name, setName] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);

  const handleValidateCustomer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );
      setValidationResult(response.data);
      setName(response.data.name);
      setAmount(response.data.balance);
      handleCancelPayment();
    } catch (error) {
      console.error("Error validating customer:", error);
      alert("Failed to validate customer. Please try again.");
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        customerRef,
        paymntReference,
        vendor,
        amount,
        paymentDate: paymentDate ? paymentDate.format() : null,
        paymentMethod,
        narration,
        payment: true,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/AddPayment`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        }
      );

      console.log("Payment successfully added:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error adding payment:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <Modal visible={showPaymentForm} closable={false} footer={null}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col self-stretch pt-2 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
            <div>Add Payment Details</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
              onClick={handleCancelPayment}
            />
          </div>
          <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
        </div>

        {/* Scrollable Content */}
        <div className="flex flex-col py-4 px-12  h-[550px] overflow-y-auto">
          {/* Customer Reference */}
          <div className="w-full text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Customer Reference
          </div>
          <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
            <Input
              placeholder="Enter Customer Ref"
              className="flex-grow px-4 py-1 text-base leading-6 bg-white rounded-xl border-none text-neutral-600 focus:border-blue-400 focus:ring-0"
              value={customerRef}
              onChange={(e) => setCustomerRef(e.target.value)}
            />
            <Button
              type="primary"
              className="justify-center items-center px-8 py-2 max-w-full rounded-xl bg-slate-500"
              onClick={handleValidateCustomer}
            >
              Validate Customer
            </Button>
          </div>

          {/* Display Validation Result */}
          {validationResult && (
            <>
              {/* Customer Name */}
              <div className="mt-4 w-full text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
                Customer Name
              </div>
              <Input
                placeholder="Enter Customer's Full Name"
                className="px-4 py-2 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
                value={name}
                disabled
                readOnly
              />

              {/* Amount Paid */}
              <div className="mt-4 w-full text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
                Amount Paid
              </div>
              <div className="flex gap-2 justify-between px-4 py-2 mt-2 w-full whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
                <Input
                  className="text-base leading-6 border-none text-neutral-600 w-full px-2"
                  placeholder="0"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
                <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                  NGN
                </div>
              </div>
            </>
          )}

          {/* Payment Reference */}
          <div className="mt-4 w-full text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Payment Reference
          </div>
          <Input
            placeholder="Enter Payment Reference"
            className="px-4 py-2 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
            value={paymntReference}
            onChange={(e) => setPaymntReference(e.target.value)}
          />

          {/* Vendor */}
          <div className="mt-4 w-full text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Vendor
          </div>
          <Input
            placeholder="Enter Vendor"
            className="px-4 py-2 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />

          {/* Payment Date */}
          <div className="mt-4 w-full text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Payment Date
          </div>
          <DatePicker
            style={{ width: "100%" }}
            className="px-4 py-2 mt-2 text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
            value={paymentDate}
            onChange={(date) => setPaymentDate(date)}
          />

          {/* Payment Method */}
          <div className="mt-4 w-full text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Payment Method
          </div>
          <Select
            placeholder="Choose payment method"
            className="mt-2 w-full text-base  bg-white rounded-xl"
            value={paymentMethod}
            onChange={(value) => setPaymentMethod(value)}
          >
            <Option value="method1">Method 1</Option>
            <Option value="method2">Method 2</Option>
          </Select>

          {/* Narration */}
          <div className="mb-6 mt-3">
            <label
              htmlFor="narration"
              className="block text-sm font-medium text-gray-700"
            >
              Narration
            </label>
            <textarea
              id="narration"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Add a comment ..."
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-4 w-full text-base font-semibold leading-6 text-white bg-stone-100 max-md:px-5 max-md:max-w-full">
          <Button
            type="primary"
            className="justify-center items-center px-8 py-6 max-w-full rounded-3xl bg-slate-500"
            onClick={handleSubmit}
          >
            Update and Authorize Connection
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentDetails;
