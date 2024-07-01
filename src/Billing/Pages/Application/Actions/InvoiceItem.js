import * as React from "react";

function InvoiceItem() {
  return (
    <div className="flex flex-col justify-center items-center pt-4 bg-white rounded-3xl max-w-[720px]">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca01bd141ef3c6838d235f4d5f39236da6fb968e5e8a926fc57ed376a1cf296?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
        className="z-10 self-end mr-12 w-8 aspect-square max-md:mr-2.5"
      />
      <div className="text-2xl font-semibold leading-9 text-neutral-600 max-md:max-w-full">
        Create Invoice Item
      </div>
      <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Material Options
      </div>
      <div className="flex gap-2 justify-between px-4 py-2 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div>Choose Option</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Select Material
      </div>
      <div className="flex gap-2 justify-between px-4 py-2 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div>Choose Material</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Item Quantity
      </div>
      <div className="justify-center items-start px-4 py-2 mt-2 max-w-full text-base leading-6 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5">
        1
      </div>
      <div className="mt-2 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Unit Cost
      </div>
      <div className="flex gap-2 justify-between px-4 py-2 mt-2 max-w-full whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div className="text-base leading-6">0.00</div>
        <div className="my-auto text-xs font-medium tracking-wide uppercase">
          ugx
        </div>
      </div>
      <div className="flex justify-center items-center self-stretch px-12 py-4 mt-6 w-full text-base leading-6 bg-white-100 max-md:px-5 max-md:mt-6 max-md:max-w-full">
        <div className="flex gap-8 max-w-full w-[696px] max-md:flex-wrap">
          <div className="justify-center items-center px-8 py-2 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
            Cancel
          </div>
          <div className="justify-center items-center px-8 py-2 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">
            Add Item
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceItem;
