import React from 'react';
import { Modal, Input, DatePicker, Select, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;

const BillingCustomer = ({ showBillingCustomer, handleCancelBillingCustomer }) => {
  return (
    <Modal visible={showBillingCustomer} closable={false} footer={null}>
      <div className="flex flex-col items-center text-base font-semibold leading-6 max-w-[820px] text-neutral-600">
        <div className="flex flex-col self-stretch pt-6 w-full text-4xl max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
            <div>Bill Customer</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
              onClick={handleCancelBillingCustomer}
              alt="Cancel"
            />
          </div>
          <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
        </div>

        {/* Customer Reference */}
        <div className="mt-8 max-md:max-w-full">Customer Reference</div>
        <Input
          className="justify-center items-start px-4 py-4 mt-2 max-w-full whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 w-[500px] max-md:pr-5"
          value=""
          readOnly
        />

        {/* Customer Name */}
        <div className="mt-4 max-md:max-w-full">Customer Name</div>
        <Input
          className="justify-center items-start px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:pr-5"
          value=""
          
        />

        {/* Operation Area */}
        <div className="mt-4 max-md:max-w-full">Operation Area</div>
        <Select
          className="flex gap-2 justify-between h-14 mt-2 max-w-full whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
          placeholder="Select Operation Area"
        >
          <Option value="ogun">Ogun</Option>
          <Option value="lagos">Lagos</Option>
          <Option value="abuja">Abuja</Option>
        </Select>

        {/* Branch */}
        <div className="mt-4 max-md:max-w-full">Branch</div>
        <Select
          className="flex gap-2 justify-between h-14 mt-2 max-w-full whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
          placeholder="Select Branch"
        >
          <Option value="ibara">Ibara</Option>
          <Option value="ikeja">Ikeja</Option>
          <Option value="wuse">Wuse</Option>
        </Select>

        {/* Billing Period */}
        <div className="mt-4 max-md:max-w-full">Billing Period</div>
        <Select
          className="flex gap-2 justify-between h-14 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Billing Period"
        >
          <Option value="monthly">Monthly</Option>
          <Option value="quarterly">Quarterly</Option>
          <Option value="yearly">Yearly</Option>
        </Select>

        {/* Bill From */}
        <div className="mt-4 max-md:max-w-full">Bill From</div>
        <DatePicker
          className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Billing Date"
        />

        {/* Bill To */}
        <div className="mt-4 max-md:max-w-full">Bill To</div>
        <DatePicker
          className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Billing Date"
        />

        {/* Scheduled Billing Date */}
        <div className="mt-4 max-md:max-w-full">Scheduled Billing Date</div>
        <DatePicker
          className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Billing Date"
        />

        {/* Biller */}
        <div className="mt-4 max-md:max-w-full">Biller</div>
        <Input
          className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 w-[500px] max-md:flex-wrap"
          placeholder="Choose Biller’s Name"
        />

        {/* Bill Button */}
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-8 w-full text-white bg-stone-100 max-md:px-5 max-md:max-w-full">
          <button type="primary" className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5">
            Bill this Customer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BillingCustomer;
