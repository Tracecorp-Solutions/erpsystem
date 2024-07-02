import * as React from "react";
import { DatePicker, Select } from "antd";

const { Option } = Select;

const BillPeriodSetup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 py-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Billing Period Setup
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col p-6 mt-6 text-base bg-white rounded-3xl max-md:px-5 w-full">
        <div className="flex gap-5 pr-20 font-semibold max-md:flex-wrap max-md:pr-5">
          <button
            type="submit"
            className="justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5"
          >
            Add Billing Period
          </button>
          <button
            type="button"
            className="justify-center px-6 py-4 bg-white rounded-lg text-neutral-400 max-md:px-5"
          >
            View Billing Periods
          </button>
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="mt-8 font-semibold text-neutral-600 max-md:max-w-full">
          Operation Area
        </div>
          <Select
            defaultValue="Abeokuta"
            style={{ width: "100%" }}
            className="h-14"
          >
            <Option value="Abeokuta">Abeokuta</Option>
            <Option value="Lagos">Lagos</Option>
            <Option value="Ibadan">Ibadan</Option>
            <Option value="Kano">Kano</Option>
            <Option value="Abuja">Abuja</Option>
          </Select>
          <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col flex-1 max-md:max-w-full">
            <label htmlFor="startDate" className="font-semibold text-neutral-600 max-md:max-w-full">
              Start Date
            </label>
            <DatePicker
              id="startDate"
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-w-full"
            />
          </div>
          <div className="flex flex-col flex-1 max-md:max-w-full">
            <label htmlFor="endDate" className="font-semibold text-neutral-600 max-md:max-w-full">
              End Date
            </label>
            <DatePicker
              id="endDate"
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-w-full"
            />
          </div>
        </div>
        <div className="flex flex-col pt-2 mt-4 font-semibold bg-white max-md:max-w-full">
          <div className="shrink-0 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-4 self-end mt-4 max-w-full w-[498px] max-md:flex-wrap">
            <button
              type="button"
              className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5"
            >
              Add Period
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillPeriodSetup;
