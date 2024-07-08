import React from "react";
import { Input, Button, Table, Select } from "antd";

const { Option } = Select;

const columns = [
  {
    title: "Billing Type",
    dataIndex: "billingType",
    key: "billingType",
  },
  {
    title: "Billing Date",
    dataIndex: "billingDate",
    key: "billingDate",
  },
  {
    title: "Bill Amount",
    dataIndex: "billAmount",
    key: "billAmount",
  },
  {
    title: "Billed By",
    dataIndex: "billedBy",
    key: "billedBy",
  },
  {
    title: "Invoice No.",
    dataIndex: "invoiceNo",
    key: "invoiceNo",
  },
];

const data = [
  {
    key: "1",
    billingType: "Periodic",
    billingDate: "03/10/2024",
    billAmount: "70,000",
    billedBy: "Ogun Billing",
    invoiceNo: "21310001-OY",
  },
];

const BillProduction = () => {
  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 py-6 rounded-3xl bg-stone-100 max-md:px-5">
      <div className="text-4xl font-semibold leading-[57.6px] text-neutral-600 w-full">
        Billing Printing
      </div>
      <div className="flex flex-wrap gap-4 content-end px-0.5  text-base leading-6 max-md:max-w-full">
        <div className="flex flex-col flex-1 mt-4">
          <div className="font-semibold text-neutral-600">
            Customer Reference
          </div>
          <Input placeholder="Enter Customer Ref" className="p-4" />
        </div>
        <div className="flex flex-col flex-1 mt-5">
          <div className="font-semibold text-neutral-600">Billing Period</div>
          <Select
            placeholder="Choose Billing Period "
            style={{ width: "100%" }}
            className="h-14"
          >
            <Option value="monthly">Monthly</Option>
            <Option value="quarterly">Quarterly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>
        </div>
        <button className="flex-1 justify-center items-center self-end px-4 py-4  font-semibold text-white whitespace-nowrap rounded-3xl bg-slate-500">
          <span>Search</span>
        </button>
      </div>
      <div className="flex flex-col p-6 mt-12 bg-white rounded-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="text-2xl font-semibold leading-10 text-neutral-600 max-md:max-w-full">
          Bill Details
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="mt-4"
        />
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
      </div>
    </div>
  );
};

export default BillProduction;
