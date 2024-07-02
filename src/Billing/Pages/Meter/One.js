import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function One() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    meterNo: "",
    customerRef: "",
    readingDate: "2024-07-01",
    reading: 0,
    readingType: "PERIODIC",
    readingStatus: 0,
    readingSource: 0,
    readingReason: 0,
    readingBy: "",
    isBilled: "YES",
    isEstimate: "",
    isMeterReset: "",
    isExpectedReadingToday: "",
  });

  const [meterReaders, setMeterReaders] = useState([]);

  useEffect(() => {
    const fetchMeterReaders = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/GetMeterReaders`);
        console.log("*********************");
        console.log(resp);
        console.log("*********************");
        setMeterReaders(resp.data);
      } catch (error) {
        message.error("Failed to fetch meter readers. Please try again.");
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
    // Implement customer validation logic here
  };

  const handleSaveReading = async () => {
    const {
      meterNo,
      customerRef,
      readingDate,
      reading,
      readingType,
      readingStatus,
      readingSource,
      readingReason,
      readingBy,
    } = formData;

    if (
      !meterNo ||
      !customerRef ||
      !readingDate ||
      !reading ||
      !readingBy
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/AddMeterReading`,
        {
          meterNo,
          customerRef,
          readingDate,
          reading: parseInt(reading, 10),
          readingType: readingType === "PERIODIC" ? 0 : 1,
          readingStatus,
          readingSource,
          readingReason,
          readingBy,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      console.log("Reading saved:", response.data);
      alert("Reading saved successfully!");
    } catch (error) {
      console.error("Error saving reading:", error);
      alert("Failed to save reading. Please try again.");
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
      <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 bg-white rounded-xl border border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          name="customerRef"
          value={formData.customerRef}
          onChange={handleChange}
          placeholder="Enter Customer Ref"
        />
        <button onClick={handleValidateCustomer} className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-blue-400 max-md:px-5">Validate Customer</button>
      </div>
      <div className="flex flex-col flex-wrap justify-center px-8 py-6 content-start pb-6 text-base leading-6 w-full">
        <div className="flex gap-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Serial Number
            </div>
            <input
              type="text"
              name="meterNo"
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={formData.meterNo}
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
              name="reading"
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={formData.reading}
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
              name="readingDate"
              className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value={formData.readingDate}
              onChange={handleChange}
              placeholder="Previous reading date"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full text-neutral-600" >Reading Type</div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="readingType"
              value={formData.readingType}
              onChange={handleChange}
            >
              <option value="PERIODIC">PERIODIC</option>
              <option value="SPOT">SPOT</option>
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
              <option value="0">Normal</option>
              <option value="1">Estimate</option>
              <option value="2">Unknown</option>
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
              <option value="0">Normal</option>
              <option value="1">Move In</option>
              <option value="2">Move Out</option>
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
              <option value="0">Normal</option>
              <option value="1">Error</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">Reading By</div>
            <select
              name="readingBy"
              onChange={handleChange}
              value={formData.readingBy}
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
            <div className="font-semibold text-neutral-600 w-full">Is Estimate?</div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="isEstimate"
              value={formData.isEstimate}
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
              Is Expected Reading Today?
            </div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              name="isExpectedReadingToday"
              value={formData.isExpectedReadingToday}
              onChange={handleChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
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
