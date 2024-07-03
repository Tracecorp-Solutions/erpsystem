import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getMeterMakes } from "../../Apis/getMeterMakes";
import { getMeterTypes } from "../../Apis/getMeterTypes";
import { getMeterSizes } from "../../Apis/getMeterSize";
import { message } from "antd";

function Replacement() {
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
    meterMake: "",
  });

  const [servicingData, setServicingData] = useState({
    meterNo: "",
    dateOfInstallation: "",
    meterTypeId: 0,
    meterSizeId: 0,
    dials: "",
    manufactureDate: "",
    meterlifeDuration: "",
    initialReading: 0,
    installedBy: "",
    meterMakes: 0,
  });

  const [meterMakes, setMeterMakes] = useState([]);
  const [meterTypes, setMeterTypes] = useState([]);
  const [meterSizes, setMeterSizes] = useState([]);

  useEffect(() => {
    fetchMeterMakes();
    fetchMeterTypes();
    fetchMeterSizes();
  }, []);

  const fetchMeterMakes = async () => {
    try {
      const makes = await getMeterMakes();
      setMeterMakes(makes);
    } catch (error) {
      console.error("Error fetching meter makes:", error);
    }
  };

  const fetchMeterTypes = async () => {
    try {
      const types = await getMeterTypes();
      setMeterTypes(types);
    } catch (error) {
      console.error("Error fetching meter types:", error);
    }
  };

  const fetchMeterSizes = async () => {
    try {
      const sizes = await getMeterSizes();
      setMeterSizes(sizes);
    } catch (error) {
      console.error("Error fetching meter sizes:", error);
    }
  };

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  const handleCustomerValidation = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ValidateCustomer/${customerRef}`
      );

      message.success("Customer validated successfully");
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
        meterMake: data.meterMake,
      });

    } catch (error) {
      console.error("Error occurred while fetching customer data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/AddMeterServicing`,
        {
          customerRef: customerData.customerRef,
          meterNo: servicingData.meterNo,
          meterSizeId: servicingData.meterSizeId,
          meterTypeId: servicingData.meterTypeId,
          dials: servicingData.dials,
          //manufactureDate: servicingData.manufactureDate,
          meterlifeDuration: servicingData.meterlifeDuration,
          initialReading: servicingData.initialReading,
         // dateOfInstallation: servicingData.dateOfInstallation,
          installedBy: servicingData.installedBy,
          isMeterServiced: true,
          meterMakes: servicingData.meterMakes,
        }

      );
      message.success(response.data);
    } catch (error) {
      message.error(error.response.statusText);
      console.error("Error occurred while submitting servicing data:", error);
    }
  };

  return (
    <div className="flex flex-col p-6 text-base leading-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-5 pr-20 font-semibold text-neutral-400 max-md:flex-wrap max-md:pr-5">
        <div
          onClick={() => handleNavigate("servicing")}
          className="justify-center px-6 py-4 rounded-lg bg-stone-200 text-slate-600 max-md:px-5"
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
              onChange={(e) =>
                setCustomerData({ ...customerData, name: e.target.value })
              }
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
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  meterNumber: e.target.value,
                })
              }
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
              onChange={(e) =>
                setCustomerData({ ...customerData, tariff: e.target.value })
              }
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
              New Meter Initial Reading
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.initialReading}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  initialReading: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Reading Date
            </div>
            <input
              type="date"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.dateOfInstallation}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  dateOfInstallation: e.target.value,
                })
              }
            />
          </div>
        </div>
        {/* <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Type
            </div>
            <select
              className="px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value={servicingData.meterTypeId}
              onChange={(e) =>
                setServicingData({ ...servicingData, meterTypeId: e.target.value })
              }
            >
              <option value="">Select Meter Type</option>
              {meterTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.meterType}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Size
            </div>
            <select
              className="px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value={servicingData.meterSizeId}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  meterSizeId: e.target.value,
                })
              }
            >
              <option value="">Select New Meter Size</option>
              {meterSizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.size}
                </option>
              ))}
            </select>
          </div>
        </div> */}
        {/* <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Dials
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.dials}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  dials: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Manufacture Date
            </div>
            <input
              type="date"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.manufactureDate}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  manufactureDate: e.target.value,
                })
              }
            />
          </div>
        </div> */}
        {/* <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Life Duration
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.meterlifeDuration}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  meterlifeDuration: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              New Meter Number
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.meterNo}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  meterNo: e.target.value,
                })
              }
            />
          </div>
        </div> */}
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
        <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Number
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={customerData.meterNumber}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  meterNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Installed By
            </div>
            <input
              type="text"
              className="px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={servicingData.installedBy}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  installedBy: e.target.value,
                })
              }
            />
          </div>

          {/* <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Make
            </div>
            <select
              className="px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value={servicingData.meterMakes}
              onChange={(e) =>
                setServicingData({
                  ...servicingData,
                  meterMakes: e.target.value,
                })
              }
            >
              <option value="">Select Meter Make</option>
              {meterMakes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.make}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">

        </div>
        <div className="flex justify-end mt-8 gap-4 w-full max-md:flex-wrap">
          <div className="px-8 py-4 font-semibold text-white rounded-lg bg-gray-300 cursor-pointer max-md:px-5">
            Clear Form
          </div>
          <div
            onClick={handleSubmit}
            className="px-8 py-4 font-semibold text-white rounded-lg bg-blue-400 cursor-pointer max-md:px-5"
          >
            Submit
          </div>

        </div>

      </div>
    </div>
  );
}

export default Replacement;
