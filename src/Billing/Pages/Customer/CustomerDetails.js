import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CustomerDetails() {
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
          <button
            className="justify-center px-6 py-4 bg-white rounded-lg max-md:px-5"
            onClick={() => handleNavigate("customer-transactions")}
          >
            Transactions
          </button>
        
      </div>
      <div className="flex flex-col px-6 pt-4 pb-5 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
          Customer Details
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex flex-wrap gap-2 content-center mt-4">
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              application number
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              999102234
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              creation date
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              11/02/2024
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              customer reference
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              21110911
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              customer contact
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              0803-713-2836
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 content-center mt-6">
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              Email address
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              graceeze@email.com
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              location coordinates
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              534949.6761, 788759.3074
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center whitespace-nowrap">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              territory
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Opic
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              physical address
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Moyosure Oke Street
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 pt-4 pb-5 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
          Billing Details
        </div>
        <div className="shrink-0 mt-4 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex flex-wrap gap-2 content-center mt-4">
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              customer type
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              FlatRate
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              operation area
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Ogun
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              branch / zone
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Ibara
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              property reference
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              211/77/54/1
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 content-center mt-6">
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              meter number
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-400">
              Not Assigned
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              meter make
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-400">
              Not Assigned
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              meter size
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-400">
              Not Assigned
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              tariff
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Flats/Building with Extension
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 content-center mt-6">
          <div className="flex flex-col flex-1 justify-center whitespace-nowrap">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              category
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">
              Domestic
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              outstanding balance
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-700">
              0.00
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-center whitespace-nowrap">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              active?
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">Yes</div>
          </div>
          <div className="flex flex-col flex-1 justify-center whitespace-nowrap">
            <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
              closed?
            </div>
            <div className="mt-2 text-base leading-6 text-neutral-600">No</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;