import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function History() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [customerRef, setCustomerRef] = useState("");
  const [name, setName] = useState("");
  const [previousReadingDate, setPreviousReadingDate] = useState("");

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  const handleValidateCustomer = async () => {
    try {
      // Fetch customer data using Axios
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetMeterServicingByCustomerRef?customerRef=${customerRef}`
      );
      // Set customer data state
      setCustomerData(response.data);

      // Fetch fullname endpoint after customer validation using Axios
      const nameResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`
      );
      // Set fullname state
      setName(nameResponse.data.name);

      // Fetch previous reading date endpoint using Axios
      const previousReadingDateResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`
      );
      // Set previous reading date state
      setPreviousReadingDate(previousReadingDateResponse.data.previousReadingDate);

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
          value={customerRef}
          onChange={(e) => setCustomerRef(e.target.value)}
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
      {customerData && (
        <>
          <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
            Customer Information
          </div>
          <div className="mt-4 max-md:max-w-full">
            <table className="w-full text-base font-semibold leading-6 text-neutral-600">
              <tbody>
                <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">Customer Name</td>
                  <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{name}</td>
                </tr>
                <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">Customer Reference</td>
                  <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{customerData.customerRef}</td>
                </tr>
                <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">Service Address</td>
                  <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{customerData.serviceAddress}</td>
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
                  <td className="py-4 pr-1 pl-4 whitespace-nowrap max-md:pr-5">{customerData.meterNo}</td>
                </tr>
                <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">Installation Date</td>
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">{customerData.dateOfInstallation}</td>
                </tr>
                <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">Current Reading</td>
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">{customerData.initialReading}</td>
                </tr>
                <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">Last Reading Date</td>
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">{previousReadingDate}</td>
                </tr>
                <tr className="bg-white border border-solid border-neutral-500 border-opacity-30">
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">Installed by</td>
                  <td className="py-4 pr-1 pl-4 max-md:pr-5">{customerData.installedBy}</td>
                </tr>
                {/* Add more meter overview fields as needed */}
              </tbody>
            </table>
          </div>

          {/* Example for Meter Reading History */}
          {/* <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
            Meter Reading History
          </div>
          <div className="flex gap-0 mt-4 text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
            {customerData.readingHistory.map((entry, index) => (
              <div className="flex flex-col flex-1" key={index}>
                <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold bg-white border border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
                  {entry.date}
                </div>
                <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
                  {entry.previousReading}
                </div>
                {/* Add more fields */}
          {/* </div>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}

export default History;
