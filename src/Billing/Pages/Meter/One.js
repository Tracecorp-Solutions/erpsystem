import * as React from "react";
import { useNavigate } from 'react-router-dom';

function One() {
    const navigate = useNavigate();

    const handleNavigate = (screen) => {
      navigate('/billingdashboard', { state: { screen } });
    };

  return (
    <div className="flex flex-col p-6 text-base leading-6 bg-white rounded-3xl max-md:px-5">
       <div className="flex gap-5 pr-20 font-semibold max-md:flex-wrap max-md:pr-5">
       <div className="flex gap-5 pr-20 font-semibold max-md:flex-wrap max-md:pr-5">
        <div
        onClick={() => handleNavigate('one')}
        className="justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5"
        role="button"
      >
        One by One
      </div>
      <div
        onClick={() => handleNavigate('bulk')}
        className="justify-center px-6 py-4 bg-white rounded-lg text-neutral-400 max-md:px-5"
        role="button"
      >
        Bulk Upload
      </div>
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
      <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="flex gap-4 mt-8 max-md:flex-wrap">
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Meter Serial Number
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5 max-md:max-w-full">
            24632628786735
          </div>
        </div>
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Previous Reading
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5 max-md:max-w-full">
            0
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 max-md:flex-wrap">
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Previous Reading Date
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:flex-wrap max-md:max-w-full">
            <div>04/04/2024</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </div>
        <div className="flex flex-col whitespace-nowrap text-neutral-600 max-md:max-w-full">
          <div className="font-semibold max-md:max-w-full">Consumption</div>
          <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
            0
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-neutral-600 max-md:flex-wrap">
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold max-md:max-w-full">
            Average Consumption
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
            0
          </div>
        </div>
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold max-md:max-w-full">Meter Dials</div>
          <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
            0
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-neutral-600 max-md:flex-wrap">
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold max-md:max-w-full">Reading Type</div>
          <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
            PERIODIC
          </div>
        </div>
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold max-md:max-w-full">Is Billed?</div>
          <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
            YES
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 max-md:flex-wrap">
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Current Reading
          </div>
          <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full">
            Enter Reading
          </div>
        </div>
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Current Reading Date
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
            <div>-- / -- / ----</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 max-md:flex-wrap">
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Meter Reader
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
            <div>Select Reader</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </div>
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Is the Reading an Estimate?
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
            <div>Select your Answer</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 max-md:flex-wrap">
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Was the meter reset?
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
            <div>Select your Answer</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </div>
        <div className="flex flex-col max-md:max-w-full">
          <div className="font-semibold text-neutral-600 max-md:max-w-full">
            Is the expected consumption negative?
          </div>
          <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
            <div>Select your Answer</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
        Comments
      </div>
      <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full">
        Add a comment ...
      </div>
      <div className="flex flex-col pt-2 mt-4 font-semibold bg-white max-md:max-w-full">
        <div className="shrink-0 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-4 self-end mt-4 max-w-full w-[496px] max-md:flex-wrap">
          <div className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
            Cancel
          </div>
          <div className="justify-center px-11 py-4 text-white rounded-3xl bg-slate-500 max-md:px-8">
            Save Reading
          </div>
        </div>
      </div>
    </div>
  );
}

export default One;
