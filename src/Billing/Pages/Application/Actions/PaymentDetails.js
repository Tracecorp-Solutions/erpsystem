import React from "react";
import { Modal, Input, DatePicker, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const PaymentDetails = ({ handleCancelPayment, showPaymentForm }) => {
  return (
    <Modal
      visible={showPaymentForm}
      closable={false}
      width={600}
      footer={null}
    >
      <div className="flex flex-col items-center max-w-[820px]">
        {/* Header */}
        <div className="flex flex-col self-stretch pt-2 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
            <div>Add Payment Details</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
              className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
              onClick={handleCancelPayment}
            />
          </div>
          <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
        </div>

        {/* Scrollable Content */}
        <div className="mt-6 w-full py-4" 
        style={{
          maxHeight: "50vh",
          overflowY: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}>
          {/* Payment Reference / Invoice No. */}
          <div className="text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Payment Reference / Invoice No.
          </div>
          <Input
            placeholder="Enter Reference number"
            className="px-4 py-3 mt-2 max-w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
          />

          {/* Bank / Vendor */}
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Bank / Vendor
          </div>
          <Select
            placeholder="Choose Bank or Vendor"
            className="h-12 mt-2 w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
          >
            <Option value="bank1">Bank 1</Option>
            <Option value="bank2">Bank 2</Option>
          </Select>

          {/* Amount Paid */}
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Amount Paid
          </div>
          <div className="flex gap-2 justify-between px-4 py-2 mt-2 max-w-full whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30">
            <Input
              className="text-base leading-6 border-none text-neutral-600 w-full px-2"
              placeholder="0"
            />
            <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
              NGN
            </div>
          </div>

          {/* Payment Date */}
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Payment Date
          </div>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="-- / -- / ----"
            className="px-4 py-3 mt-2 text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
          />

          {/* Payment Method */}
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Payment Method
          </div>
          <Select
            placeholder="Choose payment method"
            className="mt-2 w-full h-12 text-base leading-6 bg-white rounded-xl border-neutral-500 border-opacity-30 text-neutral-400"
          >
            <Option value="method1">Method 1</Option>
            <Option value="method2">Method 2</Option>
          </Select>

          {/* Narration */}
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Narration
          </div>
          <Input.TextArea
            className="px-4 pt-3 pb-6 mt-2 w-full text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400"
            placeholder="Add a comment ..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-4 w-full text-base font-semibold leading-6 text-white bg-stone-100 max-md:px-5 max-md:max-w-full">
          <Button
            type="primary"
            className="justify-center items-center px-8 py-6 max-w-full rounded-3xl bg-slate-500"
            // onClick={handleOk}
          >
            Update and Authorize Connection
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default PaymentDetails;
