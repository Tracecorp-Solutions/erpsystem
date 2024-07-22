import React, { useState } from "react";
import { Modal, Steps, Input, Select } from "antd";

const { Step } = Steps;
const { Option } = Select;

const AddTicket = ({ isModalVisible, handleCancel }) => {
  const [currentStep, setCurrentStep] = useState(0); // Start from 0 for Ant Design Steps

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Implement submit functionality here
    // This function should save or process the ticket data
    // Once done, you might want to close the modal or reset the form
    handleCancel(); // Example: Close the modal after submit
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={null}
      width={700}
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[820px]">
        {/* Header */}
        <div className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
            <div>New Ticket</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
              className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
              onClick={handleCancel}
              alt="Cancel"
            />
          </div>
          <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
        </div>

        {/* Steps Indicator */}
        <Steps current={currentStep} className="w-full mt-4">
          <Step title="Customer Details" />
          <Step title="Ticket Details" />
        </Steps>

        {/* Step 1 - Customer Details */}
        {currentStep === 0 && (
          <div className="flex flex-col items-center pb-16 w-full">
            {/* Customer Type - Select */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Customer Type
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              placeholder="Select customer type"
              onChange={(value) => console.log(value)} // Handle change as needed
            >
              <Option value="individual">Individual</Option>
              <Option value="organization">Organization</Option>
            </Select>

            {/* Customer Name - Input */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Customer Name
            </div>
            <Input
              placeholder="Enter customer name"
              style={{ width: "80%", marginTop: "8px" }}
            />

            {/* Area - Select */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Area
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              placeholder="Select area"
              onChange={(value) => console.log(value)}
            >
              <Option value="area1">Area 1</Option>
              <Option value="area2">Area 2</Option>
            </Select>

            {/* Branch - Select */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Branch
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              placeholder="Select branch"
              onChange={(value) => console.log(value)}
            >
              <Option value="branch1">Branch 1</Option>
              <Option value="branch2">Branch 2</Option>
            </Select>

            {/* Territory - Input */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Territory
            </div>
            <Input
              placeholder="Enter territory"
              style={{ width: "80%", marginTop: "8px" }}
            />

            {/* Phone Number - Input */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Phone Number
            </div>
            <Input
              placeholder="Enter phone number"
              style={{ width: "80%", marginTop: "8px" }}
            />

            {/* Address - Input */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Address
            </div>
            <Input.TextArea
              rows={4}
              placeholder="Enter address"
              style={{ width: "80%", marginTop: "8px" }}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="flex flex-col items-center pb-16 w-full">
          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Ticket Subject
          </div>
          <Input
            placeholder="Enter ticket subject"
            style={{ width: "80%", marginTop: "8px" }}
          />

          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Ticket Category
          </div>
          <Select
            style={{ width: "80%", marginTop: "8px" }}
            placeholder="Select ticket category"
            onChange={(value) => console.log(value)}
          >
            <Option value="category1">Category 1</Option>
            <Option value="category2">Category 2</Option>
          </Select>

          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Ticket Source
          </div>
          <Select
            style={{ width: "80%", marginTop: "8px" }}
            placeholder="Select ticket source"
            onChange={(value) => console.log(value)} // Handle change as needed
          >
            <Option value="source1">Source 1</Option>
            <Option value="source2">Source 2</Option>
          </Select>

          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Assign Priority
          </div>
          <Select
            style={{ width: "80%", marginTop: "8px" }}
            placeholder="Select priority"
            onChange={(value) => console.log(value)} // Handle change as needed
          >
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>

          <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
            Description
          </div>
          <Input.TextArea
            rows={4}
            placeholder="Enter ticket details"
            style={{ width: "80%", marginTop: "8px" }}
          />
        </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-16 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 max-w-full w-[496px] max-md:flex-wrap">
            {currentStep > 0 && (
              <div
                className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                onClick={handleBack}
              >
                Back
              </div>
            )}
            {currentStep < 1 && (
              <div
                className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
                onClick={nextStep}
              >
                Next
              </div>
            )}
            {currentStep === 1 && (
              <div
                className="justify-center items-center px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
                onClick={handleSubmit}
              >
                Submit
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTicket;
