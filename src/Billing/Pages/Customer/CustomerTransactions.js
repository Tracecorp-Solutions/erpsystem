import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CustomerTransactions() {
  const navigate = useNavigate();

  const handleNavigate = (screen) => {
      navigate("/billingdashboard", { state: { screen } });
    };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start p-6 rounded-3xl bg-stone-100 max-md:px-5">
      <div className="flex gap-4 justify-between items-center w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-4 self-stretch font-semibold">
          <div className="justify-center items-center px-3.5 text-2xl text-white capitalize whitespace-nowrap bg-lime-400 h-[60px] rounded-[50px] w-[60px]">
            GE
          </div>
          <div className="text-4xl leading-[57.6px] text-neutral-600">
            Grace Eze
          </div>
        </div>
        <div className="flex flex-col justify-center self-stretch my-auto">
          <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
            Connection Status
          </div>
          <div className="justify-center px-4 py-1 mt-2 text-base leading-6 text-lime-400 whitespace-nowrap bg-white rounded-2xl max-md:px-5">
            Active
          </div>
        </div>
        <div className="flex gap-2 justify-center self-stretch py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500">
          <div>Actions</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd69caf513a031a441b0ae2c28050f8e01024dfd2f15fb76144d64f2f7d9df8f?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between mt-6 text-base font-semibold leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
        <button
          className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5"
          onClick={() => handleNavigate("customer-details")}
        >
          Customer Details
        </button>
        <button
          className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5"
          onClick={() => handleNavigate("customer-readings")}
        >
          Meter Readings
        </button>
        <button
          className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5"
          onClick={() => handleNavigate("customer-bills")}
        >
          Bills
        </button>
        <div className="justify-center px-6 py-4 whitespace-nowrap bg-white rounded-lg text-slate-500 max-md:px-5">
          Transactions
        </div>
        
      </div>
      <div className="flex flex-col p-6 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
          Grace’s Transactions
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between items-center px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-stretch">
            <div className="flex gap-4">
              <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
              <div className="my-auto">customer ref</div>
            </div>
            <div className="my-auto">billing period</div>
          </div>
          <div className="self-stretch my-auto">BILLing type</div>
          <div className="self-stretch my-auto">transaction name</div>
          <div className="flex gap-5 justify-between self-stretch my-auto">
            <div>transaction AMOUNT</div>
            <div>invoice no.</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between items-center px-6 py-2 mt-2 w-full rounded-3xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-stretch my-auto text-base leading-6 whitespace-nowrap text-neutral-600">
            <div className="flex gap-4 bg-white">
              <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
              <div>21310001</div>
            </div>
            <div>01/2024</div>
          </div>
          <div className="flex gap-5 justify-between self-stretch px-px my-auto text-base leading-6 text-neutral-600 max-md:flex-wrap">
            <div className="justify-center whitespace-nowrap bg-white">
              Periodic
            </div>
            <div className="justify-center bg-white">Service charge</div>
            <div className="justify-center whitespace-nowrap bg-white">
              0.00
            </div>
            <div className="justify-center whitespace-nowrap bg-white">
              21310001-OY
            </div>
          </div>
          <div className="flex justify-center items-center self-stretch px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f250d71008ed233affe9f8bafd8c493757f0ac3c10f38fe68b1757a8d765ec9?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="w-5 aspect-square"
            />
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between items-center px-6 py-2 mt-2 w-full rounded-3xl max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-stretch my-auto text-base leading-6 whitespace-nowrap text-neutral-600">
            <div className="flex gap-4 bg-white">
              <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
              <div>21310001</div>
            </div>
            <div>01/2024</div>
          </div>
          <div className="flex gap-5 justify-between self-stretch px-px my-auto text-base leading-6 text-neutral-600 max-md:flex-wrap">
            <div className="justify-center whitespace-nowrap bg-white">
              Periodic
            </div>
            <div className="justify-center bg-white">Water charge</div>
            <div className="justify-center whitespace-nowrap bg-white">
              70,000
            </div>
            <div className="justify-center whitespace-nowrap bg-white">
              21310001-OY
            </div>
          </div>
          <div className="flex justify-center items-center self-stretch px-1.5 w-8 h-8 rounded-3xl bg-stone-100">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f250d71008ed233affe9f8bafd8c493757f0ac3c10f38fe68b1757a8d765ec9?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="w-5 aspect-square"
            />
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      </div>
    </div>
  );
}

export default CustomerTransactions;
