import React, { useState } from "react";
import { DatePicker, Upload, Input, Select, Form } from "antd";

const { Option } = Select;

const BillAdjustment = () => {
  const [customerRef, setCustomerRef] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [attachment, setAttachment] = useState(null);
  const [adjustmentReason, setAdjustmentReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  return (
    <div className="flex flex-col flex-wrap justify-center content-start px-8 pt-6 rounded-3xl bg-stone-100 leading-[160%] max-md:px-5">
      <div className="text-4xl font-semibold text-neutral-600 max-md:max-w-full">
        Adjust Bill
      </div>
      <div className="bg-white rounded-3xl w-full  mt-6">
      <div className="flex gap-5 ml-10 mt-5  text-base font-semibold leading-6 max-md:flex-wrap">
      <div className="justify-center px-6 py-4 rounded-lg bg-stone-100 text-slate-500 max-md:px-5">
        Adjustment Request
      </div>
      <div className="justify-center px-6 py-4 bg-white rounded-lg text-neutral-400 max-md:px-5">
        View Adjustments
      </div>
    </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 text-base"
      >
        {/* Adjustment tabs and separator lines omitted for brevity */}

        <div className="mt-8 font-semibold text-neutral-600 max-w-full">
          Customer Reference
        </div>
        <div className="flex flex-col mt-2 max-w-full">
          <div className="bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-2">
              <Input
                value={customerRef}
                onChange={(e) => setCustomerRef(e.target.value)}
                placeholder="Enter Customer Ref"
                className="my-auto text-neutral-400 flex-1 border-none py-4 px-4 rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  /* Add validation logic here */
                  console.log("Validate Customer clicked!");
                }}
                className="cursor-pointer justify-center px-8 py-3 font-semibold text-white rounded-lg bg-slate-500 max-w-[50%] md:w-[25%] md:ml-2"
              >
                Validate Customer
              </button>
            </div>
          </div>
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
              placeholder="Enter amount to add or subtract"
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Total Amount
            </div>
            <Input
              value={amount}
              className="px-4 py-3 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4 max-md:flex-wrap">
          <Form.Item
            name="attachment"
            className="flex flex-col w-full"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <h6 className="font-semibold text-sm">
              {" "}
              Attach Document (as evidence)
            </h6>
            <div className="flex gap-4 py-2 mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 max-md:flex-wrap w-full">
              <label
                htmlFor="fileInput"
                className="cursor-pointer justify-center items-center px-16 py-2 whitespace-nowrap rounded-md bg-stone-100 text-neutral-600 max-md:px-5"
              >
                Browse
              </label>
              <div className="my-auto text-neutral-400">
                {attachment ? attachment.name : "No file selected"}
              </div>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </Form.Item>
          <div className="flex flex-col w-full">
            <div className="font-semibold text-neutral-600 w-full">
              Reason to Adjust
            </div>
            <Input.TextArea
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              className="justify-center items-start mt-2 rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
              placeholder="Add a comment ..."
            />
          </div>
        </div>

        <div className="flex flex-col pt-2 mt-4 font-semibold bg-white max-md:max-w-full">
          <div className="shrink-0 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
          <div className="flex gap-4 self-end mt-4 max-w-full w-[498px] max-md:flex-wrap">
            <button
              type="button"
              className="justify-center items-center px-8 py-2 whitespace-nowrap rounded-full border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="justify-center px-8 text-white rounded-full bg-slate-500 "
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default BillAdjustment;
