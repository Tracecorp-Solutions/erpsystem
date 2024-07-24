import * as React from "react";

const NewTicketSubcategory = ({ handleCancel }) => {
  return (
    <div className="flex flex-col justify-center items-center pt-8 text-base leading-6 bg-white rounded-3xl w-full">
      <div className="w-full flex justify-between">
        <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
          New Ticket Subcategory
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca01bd141ef3c6838d235f4d5f39236da6fb968e5e8a926fc57ed376a1cf296?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
          className="z-10 self-end mr-12 w-8 aspect-square max-md:mr-2.5 cursor-pointer"
          onClick={handleCancel}
        />
      </div>
      <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
        Department
      </div>
      <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div>Choose Department</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
        Parent Category
      </div>
      <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div>Choose Category</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
        Subcategory Name
      </div>
      <div className="px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
        Enter Subcategory Name
      </div>
      <div className="mt-4 font-semibold text-neutral-600 max-md:max-w-full">
        Description
      </div>
      <div className="p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full">
        Describe the subcategory ...
      </div>
      <div className="flex justify-center items-center self-stretch px-16 py-6 mt-40 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
          <div className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
            Cancel
          </div>
          <div className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5">
            Save Subcategory
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTicketSubcategory;
