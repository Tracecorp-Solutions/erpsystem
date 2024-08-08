import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function One() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    meterNumber: "",
    customerRef: "",
    readingdate: "2024-07-01",
    readingType: "1", // assuming "1" represents "Normal"
    readingStatus: "PERIODIC", // assuming "PERIODIC" is the default
    readingSource: "1", // assuming "1" represents "Actual"
    readingReason: "Normal",
    readingBy: "",
    isBilled: "YES",
    isEstimate: "",
    isMeterReset: "NO", // assuming "NO" is the default
    isExpectedReadingToday: "",
    previousReading: 0,
    previousReadingDate: "",
    currentReading: ""
  });

  const [meterReaders, setMeterReaders] = useState([]);

  useEffect(() => {
    const fetchMeterReaders = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/GetMeterReaders`);
        setMeterReaders(resp.data);
      } catch (error) {
        
        console.error("Failed to fetch meter readers:", error);
      }
    };
  
    fetchMeterReaders();
  }, []);

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidateCustomer = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API_URL}/ValidateCustomer/${formData.customerRef}`);
      console.log(resp.data);
      // Update state with validated customer data if needed
      setFormData((prevData) => ({
        ...prevData,
        ...resp.data, // Assuming resp.data contains additional customer data
      }));
      message.success("Customer validated successfully");
      console.log("*********************");
      console.log(formData);
    } catch (error) {
      message.error(error.response);
    }
  };

  const handleSaveReading = async () => {
    // Validate required fields
    if (!formData.meterNumber || !formData.customerRef || !formData.readingdate || !formData.currentReading) {
      message.error("Please fill in all required fields.");
      return;
    }
  
    const postData = {
      customerRef: formData.customerRef,
      meterNo: parseInt(formData.meterNumber, 10),
      previousReading: parseInt(formData.previousReading, 10),
      previousReadingDate: formData.previousReadingDate,
      reading: parseInt(formData.currentReading, 10),
      readingType: parseInt(formData.readingType, 10),
      isBilled: formData.isBilled === "YES",
      readingSource: "",
      readingReason: "",
      readingStatus: "",
      isMeterReset: formData.isMeterReset === "YES",
      readingBy: parseInt(formData.readingBy, 10),
      readingDate: formData.readingdate + "T14:28:48.517Z",
    };
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/AddMeterReading`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      message.success("Reading saved successfully");
      console.log("Reading saved:", response.data);
    } catch (error) {
      message.error("Failed to save reading. Please try again.");
      console.error("Error saving reading:", error);
    }
  };
  

  return (
    <div className="flex flex-col p-6 text-base leading-6 bg-white rounded-3xl max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Capture Readings
      </div>
      <div className="flex gap-5 pr-20 font-semibold max-md:flex-wrap max-md:pr-5">
        <div
          onClick={() => handleNavigate("one")}
          className="justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5"
          role="button"
        >
          One by One
        </div>
        <div
          onClick={() => handleNavigate("bulk")}
          className="justify-center px-6 py-4 bg-white rounded-lg text-neutral-400 max-md:px-5"
          role="button"
        >
          Bulk Upload
        </div>
      </div>
      <div className="shrink-0 mt-4 h-px bg-neutral-100 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="mt-8 font-semibold text-neutral-600 max-md:max-w-full">
        Customer Reference
      </div>
      <div className=" ml-8 mr-8 flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 bg-white rounded-xl border border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          name="customerRef"
          value={formData.customerRef}
          onChange={handleChange}
          placeholder="Enter Customer Ref"
        />
        <button
          onClick={handleValidateCustomer}
          className="justify-center px-6 py-3 font-semibold text-white rounded-lg bg-blue-400 max-md:px-5"
        >
          Validate Customer
        </button>
      </div>
      <div className="flex flex-col flex-wrap justify-center px-8 py-6 content-start pb-6 text-base leading-6 w-full">
        <div className="flex gap-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Number
            </div>
            <input
              type="text"
              name="meterNumber"
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={formData.meterNumber}
              onChange={handleChange}
              placeholder="Enter Meter Serial Number"
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Previous Reading
            </div>
            <input
              type="text"
              name="previousReading"
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={formData.previousReading}
              onChange={handleChange}
              placeholder="Enter previous reading"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Previous Reading Date
            </div>
            <input
              type="date"
              name="previousReadingDate"
              className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={formData.previousReadingDate}
              onChange={handleChange}
              placeholder="Previous reading date"
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Current Reading
            </div>
            <input
              type="text"
              name="currentReading"
              className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={formData.currentReading}
              onChange={handleChange}
              placeholder="Latest reading"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full text-neutral-600">
              Reading Type
            </div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="readingType"
              value={formData.readingType}
              onChange={handleChange}
            >
              <option value="1">Normal</option>
              <option value="2">Reversed</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full text-neutral-600">Is Billed?</div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="isBilled"
              value={formData.isBilled}
              onChange={handleChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Reading Source
            </div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="readingSource"
              value={formData.readingSource}
              onChange={handleChange}
            >
              <option value="1">Actual</option>
              <option value="2">Estimate</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">Reading Reason</div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="readingReason"
              value={formData.readingReason}
              onChange={handleChange}
            >
              <option value="Normal">Normal</option>
              <option value="Leak">Leak</option>
              <option value="Tampered">Tampered</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">Reading Status</div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="readingStatus"
              value={formData.readingStatus}
              onChange={handleChange}
            >
              <option value="PERIODIC">PERIODIC</option>
              <option value="DISCONNECTED">DISCONNECTED</option>
              <option value="RECONNECTED">RECONNECTED</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">Reading By</div>
            <select
              name="readingBy"
              value={formData.readingBy}
              onChange={handleChange}
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
            >
              <option value="">Select Meter Reader...</option>
              {meterReaders.map((meterreader) => (
                <option key={meterreader.id} value={meterreader.id}>
                  {meterreader.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">Is Meter Reset?</div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="isMeterReset"
              value={formData.isMeterReset}
              onChange={handleChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Reading Date
            </div>
            <input
              type="date"
              name="readingdate"
              value={formData.readingdate}
              onChange={handleChange}
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 w-full">
        <button
          className="justify-center items-center px-8 py-3 font-semibold text-white rounded-lg bg-blue-400 max-md:px-5"
          onClick={handleSaveReading}
        >
          Save Reading
        </button>
      </div>
    </div>
  );
}

export default One;
