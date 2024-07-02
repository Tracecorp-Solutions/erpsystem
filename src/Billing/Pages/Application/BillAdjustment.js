import * as React from "react";

const  BillAdjustment = () => {
  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 pt-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Adjust Bill
      </div>
      <div className="flex flex-col p-6 mt-6 text-base bg-white rounded-3xl max-md:px-5 w-full">
        <div className="flex gap-5 pr-20 font-semibold max-md:flex-wrap max-md:pr-5">
          <div className="justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5">
            Adjustment Request
          </div>
          <div className="justify-center px-6 py-4 bg-white rounded-lg text-neutral-400 max-md:px-5">
            View Adjustments
          </div>
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 w-full" />
        <div className="mt-8 font-semibold text-neutral-600 max-md:max-w-full">
          Customer Reference
        </div>
        <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
          <div className="my-auto text-neutral-400">Enter Customer Ref</div>
          <div className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-md:px-5">
            Validate Customer
          </div>
        </div>
        <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 w-full" />
        <div className="flex gap-4 mt-8 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Customer Name
            </div>
            <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full">
              Customer’s Full Name
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Transaction Code
            </div>
            <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
              <div>Select Code</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                className="shrink-0 self-start w-6 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Document Number
            </div>
            <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full">
              Enter Document Number
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Effective Date
            </div>
            <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
              <div>-- / -- / ----</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                className="shrink-0 self-start w-6 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Amount (-/+)
            </div>
            <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full">
              Enter to add or subtract
            </div>
          </div>
          <div className="flex flex-col text-neutral-600 w-full">
            <div className="font-semibold w-full">Total Amount</div>
            <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
              0
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Attach Document (as evidence)
            </div>
            <div className="flex gap-4 py-2 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
              <div className="justify-center items-center px-16 py-2 whitespace-nowrap rounded-md bg-stone-100 text-neutral-600 max-md:px-5">
                Browse
              </div>
              <div className="my-auto text-neutral-400">No file selected</div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Reason to Adjust
            </div>
            <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full">
              Add a comment ...
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-2 mt-4 font-semibold bg-white max-md:max-w-full">
          <div className="shrink-0 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-4 self-end mt-4 max-w-full w-[498px] max-md:flex-wrap">
            <button type="button" className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
              Cancel
            </button>
            <button type="submit" className="justify-center px-8 py-2 text-white rounded-3xl bg-slate-500 max-md:pr-6 max-md:pl-6">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillAdjustment;