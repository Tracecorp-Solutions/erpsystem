import * as React from "react";
import { useNavigate } from 'react-router-dom';

function Bulk() {
    const navigate = useNavigate();

    const handleNavigate = (screen) => {
      navigate('/billingdashboard', { state: { screen } });
    };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 py-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Capture Readings
      </div>
      <div className="flex flex-col p-6 mt-6 text-base bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
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
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col max-md:max-w-full">
            <div className="font-semibold text-neutral-600 max-md:max-w-full">
              Operation Area
            </div>
            <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
              <div>Choose Area</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 self-start w-6 aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-col max-md:max-w-full">
            <div className="font-semibold text-neutral-600 max-md:max-w-full">
              Branch / Zone
            </div>
            <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
              <div>Choose Branch</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="shrink-0 self-start w-6 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
          Current Period
        </div>
        <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5 max-md:max-w-full">
          04/2024
        </div>
        <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-4 mt-4 max-md:flex-wrap">
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
        </div>
        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col max-md:max-w-full">
            <div className="font-semibold text-neutral-600 max-md:max-w-full">
              Does the file have a header?
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
              Browse File
            </div>
            <div className="flex gap-4 py-2 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
              <div className="justify-center items-center px-16 py-2 whitespace-nowrap rounded-md bg-stone-100 text-neutral-600 max-md:px-5">
                Browse
              </div>
              <div className="my-auto text-neutral-400">No file selected</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-2 mt-4 font-semibold whitespace-nowrap bg-white max-md:max-w-full">
          <div className="shrink-0 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-4 self-end mt-4 max-w-full w-[498px] max-md:flex-wrap">
            <div className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
              Cancel
            </div>
            <div className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5">
              Upload
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bulk;
