import * as React from "react";

const UpdateStatus = ({ handleUpdateStatusCancel}) => {
return (
  <div className="flex flex-col items-center self-stretch pb-16 text-base font-semibold leading-6 max-w-[700px] text-neutral-600">
    <div className="flex flex-col self-stretch pt-6 w-full text-4xl max-md:max-w-full">
      <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
        <div>Update Ticket Status</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
          className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
          onClick={handleUpdateStatusCancel}
        />
      </div>
      <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
    </div>
    <div className="mt-8 max-md:max-w-full">Change Status</div>
    <div className="flex gap-2 justify-between px-4 py-4 mt-2 w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-w-[500px] text-neutral-600 max-md:flex-wrap max-md:max-w-full">
      <div>In Progress</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
        className="shrink-0 self-start w-6 aspect-square"
      />
    </div>
    <div className="mt-4 max-md:max-w-full">Comments</div>
    <div className="p-4 mt-2 w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-w-[500px] text-neutral-400 max-md:max-w-full">
      Leave your comment here ...
    </div>
  </div>
);
}

export default UpdateStatus;
