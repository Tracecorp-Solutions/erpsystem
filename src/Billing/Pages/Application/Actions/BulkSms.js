import React, { useState } from "react";
import { Modal, Select, DatePicker } from "antd";

const { Option } = Select;

const BulkSms = ({ showBulkSms, handleCancelBulkSms }) => {
  const [showBillRequestsModal, setShowBillRequestsModal] = useState(false);
  const [operationArea, setOperationArea] = useState("Ogun");
  const [branch, setBranch] = useState("Ibara");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [biller, setBiller] = useState("");

  const handleSendBillRequests = () => {
    setShowBillRequestsModal(true);
  };

  const handleCancelBillRequestsModal = () => {
    setShowBillRequestsModal(false);
  };

  return (
    <>
      <Modal
        visible={showBulkSms}
        closable={false}
        footer={null}
        onCancel={handleCancelBulkSms}
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
            value={operationArea}
            onChange={(value) => setOperationArea(value)}
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
            value={branch}
            onChange={(value) => setBranch(value)}
            placeholder="Select Branch"
          >
            <Option value="ibara">Ibara</Option>
            <Option value="ikeja">Ikeja</Option>
            <Option value="wuse">Wuse</Option>
          </Select>

          {/* Billing Period */}
          <div className="mt-4 max-md:max-w-full">Billing Period</div>
          <Select
            value={billingPeriod}
            onChange={(value) => setBillingPeriod(value)}
            className="flex gap-2 justify-between h-14 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Choose Billing Period"
          >
            <Option value="monthly">Monthly</Option>
            <Option value="quarterly">Quarterly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>

          {/* Scheduled Billing Date */}
          <div className="mt-4 max-md:max-w-full">Scheduled Billing Date</div>
          <DatePicker
            value={scheduledDate}
            onChange={(date) => setScheduledDate(date)}
            className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Select Scheduled Billing Date"
          />

          {/* Biller */}
          <div className="mt-4 max-md:max-w-full">Biller</div>
          <Select
            value={biller}
            onChange={(value) => setBiller(value)}
            className="flex gap-2 justify-between h-14 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Choose Biller’s Name"
          >
            <Option value="ogun state">Ogun State</Option>
            <Option value="lagos state">Lagos State</Option>
            <Option value="abuja state">Abuja State</Option>
          </Select>

          {/* Send Bill Requests Button */}
          <div className="flex justify-center items-center self-stretch px-16 py-6 mt-20 w-full text-white bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <button
              type="button"
              className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5"
              onClick={() => {
                handleSendBillRequests();
                handleCancelBulkSms();
              }}
            >
              Send Bill Requests
            </button>
          </div>
        </div>
      </Modal>

      {/* Bill Requests Modal */}
      <Modal
        visible={showBillRequestsModal}
        closable={false}
        footer={null}
        onCancel={handleCancelBillRequestsModal}
        width={750}
      >
        <div className="flex flex-col items-center text-base font-semibold leading-6 max-w-[820px] text-neutral-600">
          <div className="flex flex-col self-stretch pt-6 w-full text-4xl max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>Review Request</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
                alt="Cancel"
                onClick={handleCancelBillRequestsModal}
              />
            </div>
            <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
          </div>

          {/* Content of Bill Requests Modal */}
          <div className="flex flex-col pb-20 md:w-[900px] text-neutral-600">
            <div className="flex flex-col justify-center self-center px-12 pt-8 pb-10 mt-12 w-full text-base rounded-3xl bg-stone-100 max-w-[500px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="leading-[160%]">
                Are you ready to bill this request?
              </div>
              <div className="mt-6 leading-7">
                <ul>
                  <li>
                    Billing Period:{" "}
                    <span className="font-bold">{billingPeriod}</span>
                  </li>
                  <li>
                    Operation Area:{" "}
                    <span className="font-bold">{operationArea}</span>
                  </li>
                  <li>
                    Branch: <span className="font-bold">{branch}</span>
                  </li>
                  <li>
                    Biller: <span className="font-semibold">{biller}</span>
                  </li>
                  <li>
                    Scheduled Date:{" "}
                    <span className="font-semibold">
                      {scheduledDate ? scheduledDate.format("MM/DD/YYYY") : ""}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
            <div className="flex gap-4 w-full justify-between  md:px-8">
              <button type="button" className="justify-center items-center px-5 py-2 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600" style={{
                width: "200px"
              }}
              onClick={handleCancelBillRequestsModal}
              >
                Not yet
              </button>
              <button type="submit" className="justify-center md:px-8 py-4 text-white rounded-3xl bg-slate-500">
                Yes, Please Schedule
              </button>
            </div>
        </div>
      </Modal>
    </>
  );
};

export default BulkSms;
