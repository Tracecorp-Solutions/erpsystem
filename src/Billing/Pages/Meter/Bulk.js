import { message, DatePicker } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Bulk() {
  const navigate = useNavigate();
  const [operationalArea, setOperationalArea] = useState("");
  const [branch, setBranch] = useState("");
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [currentReadingDate, setCurrentReadingDate] = useState("");
  const [meterReader, setMeterReader] = useState("");
  const [fileHasHeader, setFileHasHeader] = useState("");
  const [file, setFile] = useState(null);

  // States to handle drop downs
  const [operationAreas, setOperationAreas] = useState([]);
  const [branches, setBranches] = useState([]);

  // Handle date change for DatePicker
  const handleDateChange = (date, dateString) => {
    setCurrentReadingDate(dateString);
  };

  // Handle navigation to different screens
  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  // Fetch operation areas
  const GetOperationAreas = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetOperationAreas`
      );
      setOperationAreas(resp.data);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to fetch operation areas");
    }
  };

  // Fetch branches
  const GetBranches = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBranches`
      );
      setBranches(resp.data);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to fetch branches");
    }
  };

  useEffect(() => {
    GetOperationAreas();
    GetBranches();
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FileName", file?.name || "");
    formData.append("MeterReaderId", meterReader);
    formData.append("Name", file ? file.name : "");
    formData.append("OperationAreaId", operationalArea);
    formData.append("filelocation", file ? file.name : "");
    formData.append("ContentType", file?.type || "");
    formData.append("ReadingDate", currentReadingDate);
    formData.append("BranchId", branch);
    formData.append("ContentDisposition", `attachment; filename=${file?.name || ""}`);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/BulkMeterReading`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("File uploaded successfully!");
      navigate("/billingdashboard");
    } catch (error) {
      message.error("Failed to upload file. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col flex-wrap justify-center content-start px-8 py-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
        <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
          Capture Readings
        </div>
        <div
          className="flex flex-col p-6 mt-6 text-base px-8 py-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full"
          style={{ width: "90%" }}
        >
          <div className="flex gap-5 pr-20 font-semibold max-md:flex-wrap max-md:pr-5">
            <div
              onClick={() => handleNavigate("one")}
              className="cursor-pointer justify-center px-6 py-4 bg-white rounded-lg text-neutral-400 max-md:px-5"
              role="button"
            >
              One by One
            </div>
            <div
              onClick={() => handleNavigate("bulk")}
              className="cursor-pointer justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5"
              role="button"
            >
              Bulk Upload
            </div>
          </div>
          <div className="flex gap-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <label
                htmlFor="operationalArea"
                className="font-semibold text-neutral-600 w-full"
              >
                Operational Area
              </label>
              <select
                name="operationalArea"
                value={operationalArea}
                onChange={(e) => setOperationalArea(e.target.value)}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              >
                <option value="">Select Operation Area..</option>
                {operationAreas.map((operationarea) => (
                  <option key={operationarea.id} value={operationarea.id}>
                    {operationarea.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <label
                htmlFor="branchZone"
                className="font-semibold text-neutral-600 w-full"
              >
                Branch/Zone
              </label>
              <select
                name="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              >
                <option value="">Select Branch..</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <label
                htmlFor="currentPeriod"
                className="font-semibold text-neutral-600 w-full"
              >
                Current Period
              </label>
              <input
                type="text"
                id="currentPeriod"
                placeholder="Enter current period"
                value={currentPeriod}
                onChange={(e) => setCurrentPeriod(e.target.value)}
                className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              />
            </div>
            <div className="flex flex-col px-5 flex-1">
              <label
                htmlFor="currentReadingDate"
                className="font-semibold text-neutral-600 w-full"
              >
                Current Reading Date
              </label>
              <DatePicker
                id="currentReadingDate"
                value={
                  currentReadingDate
                    ? moment(currentReadingDate, "YYYY-MM-DD")
                    : null
                }
                placeholder="Select current date"
                onChange={handleDateChange}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <label
                htmlFor="meterReader"
                className="font-semibold text-neutral-600 w-full"
              >
                Meter Reader
              </label>
              <input
                type="text"
                id="meterReader"
                value={meterReader}
                placeholder="Enter meter reader"
                onChange={(e) => setMeterReader(e.target.value)}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              />
            </div>
            <div className="flex flex-col px-5 flex-1">
              <label
                htmlFor="fileHasHeader"
                className="font-semibold text-neutral-600 w-full"
              >
                Does this file have a header?
              </label>
              <input
                type="text"
                id="fileHasHeader"
                placeholder="Does the file have a header"
                value={fileHasHeader}
                onChange={(e) => setFileHasHeader(e.target.value)}
                className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 w-full max-md:flex-wrap">
            <div className="flex flex-col px-5 flex-1">
              <label
                htmlFor="uploadFile"
                className="font-semibold text-neutral-600 w-full"
              >
                Upload File
              </label>
              <input
                type="file"
                id="uploadFile"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 w-full max-md:flex-wrap">
            <button
              type="submit"
              className="w-full text-center flex items-center justify-center cursor-pointer bg-blue-500 text-white rounded-xl px-5 py-4 mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Bulk;
