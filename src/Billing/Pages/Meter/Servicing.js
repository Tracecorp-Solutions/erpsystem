import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Servicing() {
  const navigate = useNavigate();
  const [customerRef, setCustomerRef] = useState("");
  const [customerData, setCustomerData] = useState({
    name: "",
    balance: 0,
    applicationNo: "",
    customerRef: "",
    meterNumber: "",
    tariff: "",
    previousReading: "",
    meterSerial: "",
    meterType: "",
  });

  const [servicingData, setServicingData] = useState({
    newMeterNumber: "",
    newMeterReadingDate: "",
    servicedBy: "",
    comment: "",
  });

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  const handleCustomerValidation = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`
      );
      const data = response.data;
      setCustomerData({
        name: data.name,
        balance: data.balance,
        applicationNo: data.applicationNo,
        customerRef: data.customerRef,
        meterNumber: data.meterNumber,
        tariff: data.tariff,
        previousReading: data.previousReading,
        meterSerial: data.meterSerial,
        meterType: data.meterType,
      });
    } catch (error) {
      console.error('Error occurred while fetching customer data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/TestApi/AddMeterServicing`,
        {
          customerRef: customerData.customerRef,
          newMeterNo: servicingData.newMeterNumber,
          meterSizeId: 0, // Update accordingly
          meterTypeId: 0, // Update accordingly
          dials: customerData.tariff,
          manufactureDate: new Date().toISOString().split('T')[0],
          meterlifeDuration: "5 years", // Update accordingly
          initialReading: parseInt(customerData.previousReading, 10),
          dateOfInstallation: servicingData.newMeterReadingDate,
          installedBy: servicingData.servicedBy,
          comment: servicingData.comment,
        }
      );
      console.log("Form submitted", response.data);
    } catch (error) {
      console.error('Error occurred while submitting servicing data:', error);
    }
  };

  return (
    <div className="flex flex-col p-6 text-base leading-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-5 pr-20 font-semibold text-neutral-400 max-md:flex-wrap max-md:pr-5">
        <div
          onClick={() => handleNavigate("servicing")}
          className="justify-center px-6 py-4 rounded-lg bg-stone-200 text-slate-500 max-md:px-5"
          role="button"
        >
          Meter Servicing
        </div>
        <div className="flex gap-5">
          <div
            onClick={() => handleNavigate("replacement")}
            className="justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5"
            role="button"
          >
            Meter Replacement
          </div>
        </div>
        <div className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5">
          Approve Requests
        </div>
      </div>
      <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="mt-8 font-semibold text-neutral-600 max-md:max-w-full">
        Customer Reference
      </div>
      <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          className="my-auto px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
          placeholder="Enter Customer Ref"
          value={customerRef}
          onChange={(e) => setCustomerRef(e.target.value)}
        />
        <div
          onClick={handleCustomerValidation}
          className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-md:px-5 cursor-pointer"
        >
          Validate Customer
        </div>
      </div>
      <div className="mt-8 text-2xl font-semibold text-neutral-600 max-md:max-w-full">
        Old Meter Details
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex flex-col flex-wrap justify-center px-8 py-6 content-start pb-6 text-base leading-6 w-full">
        <div className="flex gap-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Customer Name
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.name}
              onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Number
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.meterNumber}
              onChange={(e) => setCustomerData({ ...customerData, meterNumber: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Dials
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.tariff}
              onChange={(e) => setCustomerData({ ...customerData, tariff: e.target.value })}
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Type
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value={customerData.meterType}
              onChange={(e) => setCustomerData({ ...customerData, meterType: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Previous Reading
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.previousReading}
              onChange={(e) => setCustomerData({ ...customerData, previousReading: e.target.value })}
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Balance
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.balance}
              onChange={(e) => setCustomerData({ ...customerData, balance: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Reading date
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.meterReadingDate}
              onChange={(e) => setCustomerData({ ...customerData, meterReadingDate: e.target.value })}
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Application No.
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.applicationNo}
              onChange={(e) => setCustomerData({ ...customerData, applicationNo: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 text-2xl font-semibold text-neutral-600 max-md:max-w-full">
        New Meter Details
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex flex-col flex-wrap justify-center px-8 py-6 content-start pb-6 text-base leading-6 w-full">
        <div className="flex gap-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Number
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.newMeterNumber}
              onChange={(e) => setServicingData({ ...servicingData, newMeterNumber: e.target.value })}
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Reading Date
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value={servicingData.newMeterReadingDate}
              onChange={(e) => setServicingData({ ...servicingData, newMeterReadingDate: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Serviced By
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.servicedBy}
              onChange={(e) => setServicingData({ ...servicingData, servicedBy: e.target.value })}
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Comment
            </div>
            <textarea
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.comment}
              onChange={(e) => setServicingData({ ...servicingData, comment: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <div
            onClick={handleSubmit}
            className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-md:px-5 cursor-pointer"
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

export default Servicing;
