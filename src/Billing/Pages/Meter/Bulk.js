
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Bulk() {
  const navigate = useNavigate();
  const [operationalArea, setOperationalArea] = useState("");
  const [branch, setBranch] = useState("");
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [currentReadingDate, setCurrentReadingDate] = useState("");
  const [meterReader, setMeterReader] = useState("");
  const [fileHasHeader, setFileHasHeader] = useState("");

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/billingdashboard", {
      state: {
        operationalArea,
        branch,
        currentPeriod,
        currentReadingDate,
        meterReader,
        fileHasHeader,
      },
    });
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
              className="cursor-pointer justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5"
              role="button"
            >
              One by One
            </div>
            <div
              onClick={() => handleNavigate("bulk")}
              className="cursor-pointer justify-center px-6 py-4 bg-white rounded-lg text-neutral-400 max-md:px-5"
              role="button"
            >
              Bulk Upload
            </div>
          </div>
          <div className="flex gap-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <label htmlFor="operationalArea" className="font-semibold text-neutral-600 w-full">
                Operational Area
              </label>
              <input
                type="text"
                id="operationalArea"
                value={operationalArea}
                placeholder="Enter Operational Area"
                onChange={(e) => setOperationalArea(e.target.value)}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              />
            </div>
            <div className="flex flex-col px-5 flex-1">
              <label htmlFor="branchZone" className="font-semibold text-neutral-600 w-full">
                Branch/Zone
              </label>
              <input
                type="text"
                id="branch"
                placeholder="Enter your branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <label htmlFor="currentPeriod" className="font-semibold text-neutral-600 w-full">
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
              <label htmlFor="currentReadingDate" className="font-semibold w-full">
                Current Reading Date
              </label>
              <input
                type="text"
                id="currentReadingDate"
                value={currentReadingDate}
                placeholder="Enter current date"
                onChange={(e) => setCurrentReadingDate(e.target.value)}
                className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <label htmlFor="meterReader" className="font-semibold w-full">
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
              <label htmlFor="fileHasHeader" className="font-semibold text-neutral-600 w-full">
                Does this file have a header?
              </label>
              <input
                type="text"
                id="fileHasHeader"
                placeholder="does the file have a header"
                value={fileHasHeader}
                onChange={(e) => setFileHasHeader(e.target.value)}
                className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold w-full">Browse File</div>
              <div className="flex gap-2 justify-between px-4 py-2 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full">
                <div className="justify-center items-center px-12 py-2 whitespace-nowrap rounded-md bg-stone-200 text-neutral-600 max-md:px-5">
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={(e) => console.log(e.target.files[0])}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse
                  </label>
                </div>
                <div className="my-auto text-neutral-400">No file selected</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-2 text-base font-semibold leading-6 whitespace-nowrap bg-white">
            <div className="w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
            <div className="flex gap-4 self-end mt-4 max-w-full w-[496px] max-md:flex-wrap">
              <div className="justify-center items-center px-12 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
                Cancel
              </div>
              <div className="justify-center items-center px-12 py-4 text-white rounded-3xl bg-blue-400 max-md:px-5">
                Upload
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Bulk;
