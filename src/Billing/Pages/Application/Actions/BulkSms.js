import React, { useState, useEffect } from "react";
import { Modal, Select, DatePicker, message } from "antd";
import axios from "axios";

const { Option } = Select;

const BulkSms = ({ showBulkSms, handleCancelBulkSms }) => {
  const [showBillRequestsModal, setShowBillRequestsModal] = useState(false);
  const [operationAreaId, setOperationAreaId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [billingPeriodId, setBillingPeriodId] = useState(null);
  const [scheduledBillingDate, setScheduledBillingDate] = useState(null);
  const [biller, setBiller] = useState(null);
  const [operationAreas, setOperationAreas] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchOperationAreas();
    fetchBranches();
  }, []);

  const fetchOperationAreas = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetOperationAreas`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      setOperationAreas(response.data);
    } catch (error) {
      console.error("Error fetching Operation Areas:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBranches`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching Branches:", error);
    }
  };

  const handleSubmtBillRequests = async (event) => {
    event.preventDefault();

    const data = {
      operationAreaId,
      branchId,
      billingPeriodId,
      scheduledBillingDate: scheduledBillingDate
        ? scheduledBillingDate.format("YYYY-MM-DD")
        : null,
      biller,
    };


    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/AddBillingRequest`,
        data,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      message.success("Request sent successfully");

      setShowBillRequestsModal(false);
    } catch (error) {
      console.error("Error sending request:", error);
      message.error("Error sending request");
    }
  };

  const handleSendBillRequests = () => {
    setShowBillRequestsModal(true);
    handleCancelBulkSms();
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
          <div className="mt-8 w-full text-start">Operation Area</div>
          <Select
            value={operationAreaId}
            onChange={(value) => setOperationAreaId(value)}
            className="flex gap-2 justify-between h-14 mt-2 max-w-full whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Select Operation Area"
          >
            {operationAreas.map((area) => (
              <Option key={area.id} value={area.id}>
                {area.name}
              </Option>
            ))}
          </Select>

          {/* Branch */}
          <div className="mt-4 w-full text-start">Branch</div>
          <Select
            value={branchId}
            onChange={(value) => setBranchId(value)}
            className="flex gap-2 justify-between h-14 mt-2 max-w-full whitespace-nowrap rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Select Branch"
          >
            {branches.map((branch) => (
              <Option key={branch.id} value={branch.id}>
                {branch.name}
              </Option>
            ))}
          </Select>

          {/* Billing Period */}
          <div className="mt-4 w-full text-start">Billing Period</div>
          <Select
            value={billingPeriodId}
            onChange={(value) => setBillingPeriodId(value)}
            className="flex gap-2 justify-between h-14 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Choose Billing Period"
          >
            <Option value={1}>Monthly</Option>
            <Option value={2}>Quarterly</Option>
            <Option value={3}>Yearly</Option>
          </Select>

          {/* Scheduled Billing Date */}
          <div className="mt-4 w-full text-start">Scheduled Billing Date</div>
          <DatePicker
            value={scheduledBillingDate}
            onChange={(date) => setScheduledBillingDate(date)}
            className="flex gap-2 justify-between px-4 py-4 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Select Scheduled Billing Date"
          />

          {/* Biller */}
          <div className="mt-4 w-full text-start">Biller</div>
          <Select
            value={biller}
            onChange={(value) => setBiller(value)}
            className="flex gap-2 justify-between h-14 mt-2 max-w-full rounded-xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 w-[500px] max-md:flex-wrap"
            placeholder="Choose Biller’s Name"
          >
            <Option value={1}>Ogun State</Option>
            <Option value={2}>Lagos State</Option>
            <Option value={3}>Abuja State</Option>
          </Select>

          {/* Send Bill Requests Button */}
          <div className="flex justify-center items-center self-stretch px-16 py-6 mt-20 w-full text-white bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <button
              type="button"
              onClick={handleSendBillRequests}
              className="justify-center items-center px-8 py-4 max-w-full rounded-3xl bg-slate-500 w-[500px] max-md:px-5"
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
                    Operation Area:{" "}
                    <span className="font-bold">
                      {operationAreas.find((area) => area.id === operationAreaId)?.name || ""}
                    </span>
                  </li>
                  <li>
                    Branch:{" "}
                    <span className="font-bold">
                      {branches.find((branch) => branch.id === branchId)?.name || ""}
                    </span>
                  </li>
                  <li>
                    Billing Period:{" "}
                    <span className="font-bold">
                      {billingPeriodId === 1
                        ? "Monthly"
                        : billingPeriodId === 2
                        ? "Quarterly"
                        : billingPeriodId === 3
                        ? "Yearly"
                        : ""}
                    </span>
                  </li>
                  <li>
                    Biller:{" "}
                    <span className="font-bold">
                      {biller === 1
                        ? "Ogun State"
                        : biller === 2
                        ? "Lagos State"
                        : biller === 3
                        ? "Abuja State"
                        : ""}
                    </span>
                  </li>
                  <li>
                    Scheduled Billing Date:{" "}
                    <span className="font-bold">
                      {scheduledBillingDate
                        ? scheduledBillingDate.format("YYYY-MM-DD")
                        : ""}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center mt-12 w-full text-center">
                <button
                  type="button"
                  className="px-8 py-4 rounded-3xl bg-stone-100 border w-full"
                  onClick={handleCancelBillRequestsModal}
                >
                  No, Yet
                </button>
                <button
                  type="button"
                  className="px-8 py-4 ml-6 rounded-3xl bg-slate-500 w-full text-white"
                  onClick={handleSubmtBillRequests}
                >
                  Yes, Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BulkSms;
