import React, { useState } from "react";
import { DatePicker, Upload, Input, Select } from "antd";

const { Option } = Select;

const BillAdjustment = () => {
  const [customerRef, setCustomerRef] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [adjustmentReason, setAdjustmentReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      console.log(`${info.file.name} uploaded successfully`);
      setAttachment(info.file.originFileObj);
    } else if (info.file.status === "error") {
      console.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 pt-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Adjust Bill
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col p-6 mt-6 text-base bg-white rounded-3xl max-md:px-5 w-full">
        {/* Adjustment tabs and separator lines omitted for brevity */}

        <div className="mt-8 font-semibold text-neutral-600 max-md:max-w-full">
          Customer Reference
        </div>
        <div className="flex gap-2 justify-between mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
          <Input
            value={customerRef}
            onChange={(e) => setCustomerRef(e.target.value)}
            placeholder="Enter Customer Ref"
            className="my-auto text-neutral-400 w-3/4 border-none py-4"
          />
          <button
            type="button"
            onClick={() => {
              /* Add validation logic here */
              console.log("Validate Customer clicked!");
            }}
            className="cursor-pointer justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 w-2/4"
          >
            Validate Customer
          </button>
        </div>

        {/* Separator line and other sections omitted for brevity */}

        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Customer Name
            </div>
            <Input
              value={"Customer's Full Name"}
              disabled
              className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Transaction Code
            </div>
            <Select
              value={transactionCode}
              onChange={(value) => setTransactionCode(value)}
              className="flex gap-2 justify-between h-14 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full"
            >
              <Option value="">Select Code</Option>
              <Option value="code1">Code 1</Option>
              <Option value="code2">Code 2</Option>
              <Option value="code3">Code 3</Option>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Document Number
            </div>
            <Input
              value={customerRef}
              onChange={(e) => setCustomerRef(e.target.value)}
              placeholder="Enter Document Number"
              className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Effective Date
            </div>
            <DatePicker
              value={effectiveDate}
              onChange={(date, dateString) => setEffectiveDate(date)}
              className="flex gap-2 justify-between px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:flex-wrap max-md:max-w-full"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Amount (-/+)
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter to add or subtract"
              className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Total Amount
            </div>
            <div className="justify-center items-start px-4 py-4 mt-2 whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:pr-5 max-md:max-w-full">
              0
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Attach Document (as evidence)
            </div>
            <Upload
              onChange={handleFileChange}
              className="gap-4 py-2 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 w-full"
              showUploadList={false}
            >
              <div className="cursor-pointer justify-center items-center px-16 py-2 whitespace-nowrap rounded-md bg-stone-100 text-neutral-600 max-md:px-5">
                Browse
              </div>
              <div className="my-auto text-neutral-400">
                {attachment ? attachment.name : "No file selected"}
              </div>
            </Upload>
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Reason to Adjust
            </div>
            <Input.TextArea
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              className="justify-center items-start px-4 py-4 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
              placeholder="Add a comment ..."
            />
          </div>
        </div>

        <div className="flex flex-col pt-2 mt-4 font-semibold bg-white max-md:max-w-full">
          <div className="shrink-0 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-4 self-end mt-4 max-w-full w-[498px] max-md:flex-wrap">
            <button
              type="button"
              className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="justify-center px-8 py-2 text-white rounded-3xl bg-slate-500 max-md:pr-6 max-md:pl-6"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillAdjustment;
