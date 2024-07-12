import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [customerRefInput, setCustomerRefInput] = useState("");

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  const handleValidateCustomer = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRefInput}`);
      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }
      const data = await response.json();
      setCustomerData(data);
    } catch (error) {
      console.error("Error validating customer:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex flex-col p-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-5 px-16 w-full text-base font-semibold leading-6 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div
          onClick={() => handleNavigate("servicing")}
          className="justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5"
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
        <div
          onClick={() => handleNavigate("history")}
          className="justify-center px-6 py-4 rounded-lg bg-stone-200 text-slate-500 max-md:px-5"
          role="button"
        >
          Meter History
        </div>
      </div>
      <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="mt-8 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Customer Reference
      </div>
      <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          value={customerRefInput}
          onChange={(e) => setCustomerRefInput(e.target.value)}
          placeholder="Enter Customer Ref"
          className="my-auto text-neutral-400 px-2 py-3"
        />
        <div
          onClick={handleValidateCustomer}
          className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 cursor-pointer"
        >
          Validate Customer
        </div>
      </div>
      <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
        Customer Information
      </div>
      <div className="mt-4 max-md:max-w-full">
        <table className="w-full text-base font-semibold leading-6 text-neutral-600">
          <tbody>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">Customer Name</td>
              <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{customerData ? customerData.name : ""}</td>
            </tr>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">Customer Reference</td>
              <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{customerData ? customerData.customerRef : ""}</td>
            </tr>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">Service Address</td>
              <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{customerData ? customerData.serviceAddress : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
        Meter Overview
      </div>
      <div className="mt-4 max-md:max-w-full">
        <table className="w-full text-base font-semibold leading-6 text-neutral-600">
          <tbody>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">Meter Number</td>
              <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{customerData ? customerData.meterNumber : ""}</td>
            </tr>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">Installation Date</td>
              <td className="py-4 pr-1 pl-4 max-md:pr-5">{customerData ? customerData.installationDate : ""}</td>
            </tr>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">Last Reading Date</td>
              <td className="py-4 pr-1 pl-4 max-md:pr-5">{customerData ? customerData.lastReadingDate : ""}</td>
            </tr>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">
                Current Meter Reading
              </td>
              <td className="py-4 pr-1 pl-4 max-md:pr-5">{customerData ? customerData.currentMeterReading : ""}</td>
            </tr>
            <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
              <td className="py-4 pr-1 pl-4 max-md:pr-5">
                Average Monthly Consumption
              </td>
              <td className="py-4 pr-1 pl-4 max-md:pr-5">{customerData ? customerData.averageMonthlyConsumption : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
        Meter Reading History
      </div>
      <div className="flex gap-0 mt-4 text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col flex-1 whitespace-nowrap">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold bg-white border border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Date
          </div>
          {/* Add dynamically fetched data here */}
          {/* Example: */}
          {/* <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5">{customerData ? customerData.date : ""}</div> */}
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Previous Reading
          </div>
          {/* Add dynamically fetched data here */}
          {/* Example: */}
          {/* <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">{customerData ? customerData.previousReading : ""}</div> */}
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Current Reading
          </div>
          {/* Add dynamically fetched data here */}
          {/* Example: */}
          {/* <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">{customerData ? customerData.currentReading : ""}</div> */}
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold whitespace-nowrap bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Consumption
          </div>
          {/* Add dynamically fetched data here */}
          {/* Example: */}
          {/* <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">{customerData ? customerData.consumption : ""}</div> */}
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold whitespace-nowrap bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Notes
          </div>
          {/* Add dynamically fetched data here */}
          {/* Example: */}
          {/* <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">{customerData ? customerData.notes : ""}</div> */}
        </div>
      </div>
    </div>
  );
}

export default History;
