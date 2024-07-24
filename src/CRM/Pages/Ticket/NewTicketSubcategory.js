import React from "react";
import { Select, Input, Button } from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const { Option } = Select;

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
          alt="Close Icon"
        />
      </div>
      <div className="mt-4 font-semibold my-2 text-start text-neutral-600 w-full">
        Department
      </div>
        <Select defaultValue="Choose Department" style={{ width: "100%" }} className="h-12">
          <Option value="Technical">Technical</Option>
          <Option value="Maintenance">Maintenance</Option>
          <Option value="Billing">Billing</Option>
          <Option value="Payments">Payments</Option>
        </Select>
      <div className="mt-4 font-semibold my-2 text-start text-neutral-600 w-full">
        Parent Category
      </div>
        <Select defaultValue="Choose Category" style={{ width: "100%" }} className="h-12">
          <Option value="Billing Issue">Billing Issue</Option>
          <Option value="Service Request">Service Request</Option>
          <Option value="Maintenance">Maintenance</Option>
          <Option value="IT Support">IT Support</Option>
          <Option value="General Inquiry">General Inquiry</Option>
        </Select>
      <div className="mt-4 font-semibold my-2 text-start text-neutral-600 w-full">
        Subcategory Name
      </div>
        <Input placeholder="Enter Subcategory Name" className="py-3" />
      <div className="mt-4 text-start my-2 font-semibold text-neutral-600 w-full">
        Description
      </div>
        <Input.TextArea placeholder="Describe the subcategory ..." rows={4} />
      <div className="flex justify-center items-center self-stretch px-16 py-6 mt-10 w-full bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-between w-full max-md:flex-wrap">
          <Button
            type="default"
            className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="px-8 py-4 font-semibold rounded-3xl bg-slate-500 max-md:px-5"
          >
            Save Subcategory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTicketSubcategory;
