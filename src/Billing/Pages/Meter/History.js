import * as React from "react";
import { useNavigate } from "react-router-dom";

function History() {
    const navigate = useNavigate();
    const handleNavigate = (screen) => {
        navigate("/billingdashboard", { state: { screen } });
      };
  return (
    <div className="flex flex-col p-6 bg-white rounded-3xl max-md:px-5">
      <div className="flex gap-5 px-16 w-full text-base font-semibold leading-6 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
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
        <div  onClick={() => handleNavigate("history")}
            className="justify-center px-6 py-4 rounded-lg bg-stone-200 text-slate-500 max-md:px-5"
            role="button">
          Meter History
    
        </div>
      </div>
      <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      <div className="mt-8 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Customer Reference
      </div>
      <div className="flex gap-2 justify-between py-1 pr-1 pl-4 mt-2 text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-neutral-400">Enter Customer Ref</div>
        <div className="justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-md:px-5">
          Validate Customer
        </div>
      </div>
      <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
        Customer Information
      </div>
      <div className="mt-4 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Customer Name
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Customer Reference
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Service Address
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-base leading-6 text-neutral-400 max-md:max-w-full">
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Juma John
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 whitespace-nowrap bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                456789123
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                45 Nile Avenue, Juba
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
        Meter Overview
      </div>
      <div className="mt-4 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Meter Number
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Installation Date
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Last Reading Date
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Current Meter Reading
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                Average Monthly Consumption
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-base leading-6 text-neutral-400 max-md:max-w-full">
              <div className="justify-center items-start py-4 pr-1 pl-4 whitespace-nowrap bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                12345
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                January 1, 2022
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                June 30, 2024
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                1500 m³
              </div>
              <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
                50 m³
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
        Meter Reading History
      </div>
      <div className="flex gap-0 mt-4 text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col flex-1 whitespace-nowrap">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold bg-white border border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Date
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            06/30/2024
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            05/31/2024
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            04/30/2024
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-l border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            03/31/2024
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Previous Reading
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1450 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1400 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1350 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1300 m³
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Current Reading
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1500 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1450 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1400 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            1350 m³
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold whitespace-nowrap bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Consumption
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            50 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            50 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            50 m³
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            50 m³
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="justify-center items-start py-4 pr-1 pl-4 font-semibold whitespace-nowrap bg-white border-t border-r border-b border-solid border-neutral-500 border-opacity-30 text-neutral-600 max-md:pr-5">
            Notes
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            Actual Reading
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            Actual Reading
          </div>
          <div className="justify-center items-start py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            Estimated Reading
          </div>
          <div className="justify-center py-4 pr-1 pl-4 bg-white border-r border-b border-solid border-neutral-500 border-opacity-30 max-md:pr-5">
            Customer Self-Reading
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;