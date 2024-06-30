import React from 'react';
import { Modal, Select, Input, DatePicker, Button } from 'antd';

const { Option } = Select;

const BulkSms = ({
    showBulkSms,
    handleCancelBulkSms,
}) => {
  return (
    <Modal
     visible={
        showBulkSms
     }
     closable={false}
     footer={null}
    >
        <div className="flex flex-col items-center text-base font-semibold leading-6 max-w-[820px] text-neutral-600">
      <div className="flex flex-col self-stretch pt-6 w-full text-4xl max-md:max-w-full">
        <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
          <div>Bulk Billing</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
            className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
            alt="Cancel"
            onClick={handleCancelBulkSms}
          />
        </div>
        <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
      </div>

      {/* Operation Area */}
      <div className="mt-8 max-md:max-w-full">Operation Area</div>
      <Select
        className="flex gap-2 justify-between h-14 mt-2 max-w-full whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
        defaultValue="Ogun"
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
        defaultValue="Ibara"
        placeholder="Select Branch"
      >
        <Option value="ibara">Ibara</Option>
        <Option value="ikeja">Ikeja</Option>
        <Option value="wuse">Wuse</Option>
      </Select>

      {/* Billing Period */}
      <div className="mt-4 max-md:max-w-full">Billing Period</div>
      <Input
        className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
        placeholder="Choose Billing Period"
      />

      {/* Scheduled Billing Date */}
      <div className="mt-4 max-md:max-w-full">Scheduled Billing Date</div>
      <DatePicker
        className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
        placeholder="Select Scheduled Billing Date"
      />

      {/* Biller */}
      <div className="mt-4 max-md:max-w-full">Biller</div>
      <Input
        className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
        placeholder="Choose Biller’s Name"
      />

      {/* Send Bill Requests Button */}
      <div className="flex justify-center items-center self-stretch px-16 py-6 mt-20 w-full text-white bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <button type="button"
          className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5"
        >
          Send Bill Requests
        </button>
      </div>
    </div>
    </Modal>
  );
}

export default BulkSms;
