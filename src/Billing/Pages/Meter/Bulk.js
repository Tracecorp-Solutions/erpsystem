import * as React from "react";
import { useNavigate } from "react-router-dom";

function Bulk() {
  const navigate = useNavigate();

  const handleNavigate = (screen) => {
    navigate("/billingdashboard", { state: { screen } });
  };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 py-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Capture Readings
      </div>
      <div className="flex flex-col p-6 mt-6 text-base px-8 py-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full"style={{ width: '90%' }} >
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
        <div className="flex flex-col flex-wrap justify-center px-8 py-6 content-start pb-6 text-base leading-6 w-full">
          <div className="flex gap-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Meter Serial Number
              </div>
              <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full">
                24632628786735
              </div>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Previous Reading
              </div>
              <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full">
                0
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Previous Reading Date
              </div>
              <div className="flex gap-2 justify-between px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-full">
                <div>04/04/2024</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="shrink-0 self-start w-6 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold w-full">Consumption</div>
              <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full">
                0
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold w-full">Average Consumption</div>
              <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full">
                0
              </div>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold w-full">Meter Dials</div>
              <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full">
                0
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold w-full">Reading Type</div>
              <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full">
                PERIODIC
              </div>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold w-full">Is Billed?</div>
              <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-full">
                YES
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Current Reading
              </div>
              <div className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full">
                Enter Reading
              </div>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Current Reading Date
              </div>
              <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full">
                <div>-- / -- / ----</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="shrink-0 self-start w-6 aspect-square"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Meter Reader
              </div>
              <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full">
                <div>Select Reader</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="shrink-0 self-start w-6 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Is the Reading an Estimate?
              </div>
              <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full">
                <div>Select your Answer</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="shrink-0 self-start w-6 aspect-square"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-md:flex-wrap w-full">
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Was the meter reset?
              </div>
              <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full">
                <div>Select your Answer</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="shrink-0 self-start w-6 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col px-5 flex-1">
              <div className="font-semibold text-neutral-600 w-full">
                Is the expected reading for today?
              </div>
              <div className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-full">
                <div>Select your Answer</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="shrink-0 self-start w-6 aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bulk;
