import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleSaveReading = async () => {
    try {
      const response = await axios.post(
        "http://3.216.182.63:8095/TestApi/AddMeterReading",
        {
          meterNo: formData.meterNo,
          customerRef: formData.customerRef,
          readingDate: formData.readingDate,
          reading: parseInt(formData.reading, 10),
          readingType: formData.readingType === "PERIODIC" ? 0 : 1,
          readingStatus: formData.readingStatus,
          readingSource: formData.readingSource,
          readingReason: formData.readingReason,
          readingBy: formData.readingBy,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      console.log("Reading saved:", response.data);
    } catch (error) {
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
      <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 bg-white rounded-xl border border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          name="customerRef"
          value={formData.customerRef}
          onChange={handleChange}
          placeholder="Enter Customer Ref"
        />
        <div className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-blue-400 max-md:px-5">
          Validate Customer
        </div>
      </div>
      <div className="flex flex-col flex-wrap justify-center px-8 py-6 content-start pb-6 text-base leading-6 w-full">
        <div className="flex gap-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Serial Number
            </div>
            <input
              type="text"
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
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value="0"
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
              className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value="2024-04-04"
              onChange={handleChange}
              placeholder="Previous reading date"
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full">Consumption</div>
            <input
              type="text"
              className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value="0"
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full">Average Consumption</div>
            <input
              type="text"
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value="0"
              readOnly
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full">Meter Dials</div>
            <input
              type="text"
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              value="0"
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full">Reading Type</div>
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
            <div className="font-semibold w-full">Is Billed?</div>
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
              Current Reading
            </div>
            <input
              type="text"
              className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 w-full"
              name="reading"
              value={formData.reading}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full">Reading Date</div>
            <input
              type="date"
              className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid border-neutral-500 border-opacity-30 w-full"
              name="readingDate"
              value={formData.readingDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex justify-center gap-8 my-8 max-md:flex-wrap max-md:max-w-full">
        <div
          onClick={() => handleNavigate("one")}
          className="justify-center px-8 py-3 font-semibold text-neutral-500 rounded-lg bg-stone-100 max-md:px-5"
          role="button"
        >
          Cancel
        </div>
        <div
          onClick={handleSaveReading}
          className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-blue-400 max-md:px-5"
          role="button"
        >
          Save Reading
        </div>
      </div>
    </div>
  );
}

export default One;
