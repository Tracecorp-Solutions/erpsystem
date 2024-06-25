import * as React from "react";

function MaterialItem() {
  return (
    <div className="flex flex-col items-start text-base leading-6 max-w-[920px]">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full text-left">
        Add Expenditure Item
      </div>
      <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full text-left">
        Select Material
      </div>
      <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div className="text-left">Choose Material</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full text-left">
        Item Quantity
      </div>
      <div className="justify-start items-start px-4 py-4 mt-2 max-w-full whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5 text-left">
        1
      </div>
      <div className="flex justify-center items-start self-stretch px-16 py-6 mt-20 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
          <div className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5 text-left">
            Cancel
          </div>
          <div className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 text-left">
            Submit Item
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaterialItem;
