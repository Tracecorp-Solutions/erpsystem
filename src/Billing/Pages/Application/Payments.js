import React, { useState } from "react";
import PaymentDetails from "./Actions/PaymentDetails";

const Payments = () => {
    const [showPaymentForm, setShowPaymentForm] = useState(false)

    const handleShowPaymentForm = () => {
        setShowPaymentForm(true);
    }

    const handleCancelPayment = () => {
        setShowPaymentForm(false);
    }

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-6 py-5 rounded-3xl bg-stone-100 max-md:px-5">
      <div className="flex gap-4 justify-between w-full font-semibold leading-[160%] max-md:flex-wrap max-md:max-w-full">
        <div className="text-4xl text-neutral-600">Payments</div>
        <button type="button" onClick={handleShowPaymentForm} className="flex gap-2 justify-center py-3 pr-6 pl-4 my-auto text-base text-white rounded-3xl bg-slate-500">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a6fbf858a262ca173836b28ea1635646ad60c82456acd8cee2b922f3be3bea7?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 self-start w-6 aspect-square"
          />
          <div>Add Payment</div>
        </button>
      </div>
      <div className="flex flex-col p-6 mt-6 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2 justify-between w-full text-base leading-6 text-neutral-400 max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-2 py-3 pr-6 pl-4 rounded-3xl border border-solid border-neutral-500 border-opacity-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb6743209ad7a4460b7da992e953dee79d5f6df9f03f043737eb518dbf54436f?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
            <div>Search Payment Ref...</div>
          </div>
          <div className="flex gap-2 px-6 py-3 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-30 max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f02b79592faed7d699dd0b3b194f3c1ae722683f5fba56d39d1ae55c28f9d41?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 self-start w-6 aspect-square"
            />
            <div>Filter</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex shrink gap-5 justify-between basis-auto grow-0">
            <div className="flex gap-4">
              <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
              <div className="my-auto">customer ref</div>
            </div>
            <div className="my-auto">customer name</div>
          </div>
          <div className="flex flex-auto gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
            <div>amount</div>
            <div>payment date</div>
            <div>trans ref</div>
            <div>vender ID</div>
            <div>status</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="justify-center py-2">Grace Eze</div>
          <div className="justify-center py-2 whitespace-nowrap">20,000</div>
          <div className="justify-center py-1.5">5th May, 2024</div>
          <div className="justify-center py-2 whitespace-nowrap">478530</div>
          <div className="justify-center py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="justify-center px-3 py-1 rounded-xl bg-stone-100">
              completed
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex gap-2 justify-between mt-4 w-full bg-white max-md:flex-wrap max-md:max-w-full">
          <div className="my-auto text-base leading-6 text-neutral-400">
            Showing 1 - 10 of 150
          </div>
          <div className="flex gap-2">
            <div className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff1835eab83aaba4b3b28c08f4efdfa5b5b13efe57cf4ba87e34e28be72ba65d?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-6 aspect-square"
              />
            </div>
            <div className="justify-center items-center px-4 w-12 h-12 text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500 max-md:px-5">
              1
            </div>
            <div className="justify-center items-start px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
              2
            </div>
            <div className="flex justify-center items-center px-4 py-3 rounded-3xl border border-solid border-neutral-500 border-opacity-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c19c09b34073900dfacfc3a10ceab301e637c63c0b80eb00f201bc01a698a5ef?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-6 aspect-square"
              />
            </div>
            <div className="justify-center px-4 py-3 text-base font-semibold leading-6 whitespace-nowrap rounded-3xl border border-solid border-neutral-500 border-opacity-10 text-neutral-400">
              9
            </div>
            <div className="flex justify-center items-center px-4 w-12 h-12 rounded-3xl bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5638cce5b32f789274ceeb5d277945e2b48f65a50c7c69d40aaa318a0cb3751a?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="w-6 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
      <PaymentDetails handleShowPaymentForm={handleShowPaymentForm} handleCancelPayment={handleCancelPayment} showPaymentForm={showPaymentForm} />
    </div>
  );
}

export default Payments;
