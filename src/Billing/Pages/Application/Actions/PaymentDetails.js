import React, { useState } from "react";
import { Modal, Input, DatePicker, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PaymentDetails = ({isModalVisible, handleOk, handleCancel }) =>{
  return (
    <Modal
    visible={isModalVisible}
    closable={false}
    width={600}
    footer={null}
  >
    <div className="flex flex-col items-center max-w-[820px]">
      <div className="flex flex-col self-stretch pt-2 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
          <div>Add Payment Details</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
            className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
            onClick={handleCancel}
          />
        </div>
        <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="mt-8 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Payment Reference / Invoice No.
      </div>
      <div className="justify-center items-start px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
        Enter Reference number
      </div>
      <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Bank / Vendor
      </div>
      <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div>Choose Bank or Vendor</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Amount Paid
      </div>
      <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 w-[500px] max-md:flex-wrap">
        <div className="text-base leading-6 text-neutral-600">0</div>
        <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
          NGN
        </div>
      </div>
      <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Payment Date
      </div>
      <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div>-- / -- / ----</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Payment Method
      </div>
      <div className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap">
        <div>Choose payment method</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8721aa8c44b81e6b2348dce4fb02570aeacf025a99ab01d6575684f8de43c45?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </div>
      <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
        Narration
      </div>
      <div className="items-start px-4 pt-3 pb-6 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:pr-5">
        Add a comment ...
      </div>
      <div className="flex justify-center items-center self-stretch px-16 py-6 mt-4 w-full text-base font-semibold leading-6 text-white bg-stone-100 max-md:px-5 max-md:max-w-full">
        <button type="submit" className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5">
          Update and Authorize Connection
        </button>
      </div>
    </div>
    </Modal>
  );
}

export default PaymentDetails;
