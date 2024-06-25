import React from 'react';

const AddMeter = () => {
  return (
    <div className="flex flex-col justify-center pt-6 pb-12 px-4 text-base leading-6 bg-stone-100 rounded-3xl sm:px-6 lg:px-8">
      {/* Applications section */}
      <div className="flex items-center gap-2 px-6 font-semibold text-neutral-600 max-md:flex-wrap max-md:px-5">
        <div className="self-stretch my-auto">Applications</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="self-stretch my-auto w-6 h-6"
          alt="Icon"
        />
        <div className="justify-center self-stretch px-4 py-1 whitespace-nowrap bg-white rounded-2xl">
          APP567890
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d86f4adfe62571b3a93bdc441d8816afef791164dcc95e442522025a86a279bf?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="self-stretch my-auto w-6 h-6"
          alt="Icon"
        />
        <div className="self-stretch my-auto">Docket Initiation</div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col mt-6 space-y-6 bg-white rounded-3xl shadow-lg pb-10">
        {/* Section title */}
        <div className="self-start px-6 pt-6 text-3xl font-semibold capitalize text-neutral-600 sm:px-8 lg:px-10">
          Docket Initiation
        </div>

        {/* Form section */}
        <div className="grid grid-cols-1 gap-6 px-6 pb-6 sm:grid-cols-2 sm:px-8 lg:px-10">
          {/* Placeholder for your inputs */}
          <div className="flex flex-col space-y-4">
            <label htmlFor="customerType" className="font-semibold text-neutral-600">
              Customer Type
            </label>
            <input
              id="customerType"
              type="text"
              placeholder="Prepaid"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="blockNumber" className="font-semibold text-neutral-600">
              Block Number
            </label>
            <input
              id="blockNumber"
              type="text"
              placeholder="Select block number"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="customerRef" className="font-semibold text-neutral-600">
              Customer References
            </label>
            <input
              id="customerRef"
              type="text"
              placeholder="Generated Customer Reference"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="meterType" className="font-semibold text-neutral-600">
              Meter Type
            </label>
            <input
              id="meterType"
              type="text"
              placeholder="Select meter type"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="meterNumber" className="font-semibold text-neutral-600">
              Meter Number
            </label>
            <input
              id="meterNumber"
              type="text"
              placeholder="Enter meter number"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="meterSize" className="font-semibold text-neutral-600">
              Meter Size
            </label>
            <input
              id="meterSize"
              type="text"
              placeholder="Enter meter size"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="location" className="font-semibold text-neutral-600">
              Location Coordinated
            </label>
            <input
              id="location"
              type="text"
              placeholder="Latitude, Longitude"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="initialReading" className="font-semibold text-neutral-600">
              Meter Initial Reading
            </label>
            <input
              id="initialReading"
              type="text"
              placeholder="Enter meter reading"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="dials" className="font-semibold text-neutral-600">
              Dials
            </label>
            <input
              id="dials"
              type="text"
              placeholder="Enter Dials"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="manufactureDate" className="font-semibold text-neutral-600">
              Meter Manufacture Date
            </label>
            <input
              id="manufactureDate"
              type="date"
              placeholder="Enter manufacture date"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="installationDate" className="font-semibold text-neutral-600">
              Dates of Installation
            </label>
            <input
              id="installationDate"
              type="date"
              placeholder="Select installation date"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="installedBy" className="font-semibold text-neutral-600">
              Installed by
            </label>
            <input
              id="installedBy"
              type="text"
              placeholder="Choose Field Officer"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Remarks Section */}
        <div className="flex flex-col px-6 mt-6">
          <label htmlFor="remarks" className="font-semibold text-neutral-600">
            Remarks
          </label>
          <textarea
            id="remarks"
            rows={1}
            placeholder="Enter Remarks"
            className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end mt-6 px-6">
          <button className="px-6 py-3 mr-4 text-sm font-semibold text-neutral-600 bg-stone-100 rounded-xl border border-solid border-neutral-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
            Cancel
          </button>
          <button className="px-6 py-3 text-sm font-semibold text-white bg-slate-500 rounded-xl hover:bg-slate-600 focus:outline-none focus:bg-slate-600">
            Save Docket
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMeter;
