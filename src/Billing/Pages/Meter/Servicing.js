import * as React from "react";
import { useNavigate } from "react-router-dom";

function Servicing() {
  const navigate = useNavigate();

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  return (
    <div className="flex flex-col p-6 text-base leading-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-5 pr-20 font-semibold text-neutral-400 max-md:flex-wrap max-md:pr-5">
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
        <div className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5">
          Approve Requests
        </div>
      </div>
      <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="mt-8 font-semibold text-neutral-600 max-md:max-w-full">
        Customer Reference
      </div>
      <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-neutral-400">Enter Customer Ref</div>
        <div className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-md:px-5">
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
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value="24632628786735"
              readOnly
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
             Meter Serial number
            </div>
            <input
              type="text"
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full"
              value="0"
              readOnly
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
              readOnly
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
              defaultValue="PERIODIC"
              readOnly
            >
              <option value="PERIODIC">PERIODIC</option>
              <option value="SPOT">SPOT</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold w-full">Is Billed?</div>
            <select
              className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full"
              defaultValue="YES"
              readOnly
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
              className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              placeholder="Enter Reading"
            />
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Current Reading Date
            </div>
            <input
              type="date"
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              placeholder="-- / -- / ----"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Meter Reader
            </div>
            <select
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              defaultValue="Select Reader"
            >
              <option value="Select Reader">Select Reader</option>
              <option value="Reader 1">Reader 1</option>
              <option value="Reader 2">Reader 2</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Is the Reading an Estimate?
            </div>
            <select
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              defaultValue="Select your Answer"
            >
              <option value="Select your Answer">Select your Answer</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Was the meter reset?
            </div>
            <select
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              defaultValue="Select your Answer"
            >
              <option value="Select your Answer">Select your Answer</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col px-5 flex-1">
            <div className="font-semibold text-neutral-600 w-full">
              Is the expected reading for today?
            </div>
            <select
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full"
              defaultValue="Select your Answer"
            >
              <option value="Select your Answer">Select your Answer</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end px-16 pt-6 mt-8 font-semibold bg-white max-md:pl-5 max-md:max-w-full">
        <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
          <div className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
            Cancel
          </div>
          <div className="justify-center px-8 py-4 text-white rounded-3xl bg-blue-400 max-md:px-5">
            Submit for Approval
          </div>
        </div>
      </div>
    </div>
  );
}

export default Servicing;
