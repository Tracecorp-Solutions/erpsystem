import * as React from "react";

function Payslip() {
  return (
    <div className="flex flex-col items-center max-w-[820px] text-neutral-600">
      <div className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
          <div>Generate Payslips</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 my-auto w-8 aspect-square"
          />
        </div>
        <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="flex gap-4 justify-between px-5 py-4 mt-4 max-w-full text-base leading-6 w-[500px] max-md:flex-wrap">
        <div className="flex flex-col">
          <div className="font-semibold">Application Number</div>
          <div className="mt-2">APP567890</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Applicant Name</div>
          <div className="mt-2">Grace Eze</div>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">Surveyor’s Name</div>
          <div className="mt-2">Nowembabazi Nickson</div>
        </div>
      </div>
      <div className="shrink-0 mt-4 max-w-full h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 w-[500px]" />
      <div className="mt-4 text-base font-semibold leading-6 max-md:max-w-full">
        New Connection Fee
      </div>
      <div className="mt-1 text-sm text-neutral-400 max-md:max-w-full">
        This is the sum of the total costing of all the materials on the
        customer invoice
      </div>
      <div className="justify-center items-start px-4 py-4 mt-2 max-w-full text-base leading-6 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[500px] max-md:pr-5">
        240,000
      </div>
      <div className="mt-4 text-base font-semibold leading-6 max-md:max-w-full">
        Deposit Fee
      </div>
      <div className="mt-1 text-sm text-neutral-400 w-[500px] max-md:max-w-full">
        This is the required amount that every customer should pay but can be
        updated according to the user’s discretion
      </div>
      <div className="justify-center items-start px-4 py-4 mt-2 max-w-full text-base leading-6 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[500px] max-md:pr-5">
        100,000
      </div>
      <div className="flex gap-2 justify-between px-5 pb-4 mt-8 max-w-full font-semibold w-[500px] max-md:flex-wrap">
        <div className="my-auto text-base leading-6">Total Amount</div>
        <div className="justify-center px-4 py-3.5 text-2xl capitalize whitespace-nowrap rounded-xl bg-stone-100 max-md:px-5">
          340,000
        </div>
      </div>
      <div className="flex justify-center items-center self-stretch px-16 py-6 mt-44 w-full text-base font-semibold leading-6 text-white bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5">
          Confirm and Generate Payslips
        </div>
      </div>
    </div>
  );
}

export default Payslip;
