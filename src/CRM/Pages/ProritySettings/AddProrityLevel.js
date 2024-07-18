import React from "react";
import { Modal, Button } from "antd";

const AddProrityLevel = ({ handleCancel, visible }) => {
  return (
    <Modal
      title={
        <div className="flex gap-5 justify-between items-center">
          <div>New Priority Level</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 my-auto w-8 aspect-square"
            alt="Priority Level Icon"
            onClick={handleCancel}
          />
        </div>
      }
      visible={visible}
      closable={false}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="flex flex-col items-center pb-20 text-base font-semibold leading-6 max-w-[820px] text-neutral-600">
        <div className="mt-8 text-start w-full">Priority Level Name</div>
        <div className="justify-center items-start px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
          Enter Level Name
        </div>
        <div className="mt-4 text-start w-full">Color Code</div>
        <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
          <div>Choose Color</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 self-start w-6 aspect-square"
            alt="Color Code Icon"
          />
        </div>
        <div className="mt-4 text-start w-full">Description</div>
        <div className="justify-center p-4 mt-2 max-w-full leading-7 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:max-w-full">
          Describe the priority ...
        </div>
      </div>
    </Modal>
  );
};

export default AddProrityLevel;
