import React, { useState } from "react";
import { Modal, Steps, Input, Select, Button, Spin } from "antd";

const { Step } = Steps;
const { Option } = Select;

const options = [
  { id: 1, name: "Registered" },
  { id: 2, name: "Non Registered" },
];
const optionsTicketSource = [
  { id: 1, name: "Phone Call" },
  { id: 2, name: "Walk-in" },
  { id: 3, name: "Social Media" },
];

const UpdateTicketForm = ({ updateTicketForm, hanndleCancelEscalateModal }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerReference, setCustomerReference] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [operationalAreaId, setOperationalAreaId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [territoryId, setTerritoryId] = useState(null);
  const [customerType, setCustomerType] = useState(null);
  const [ticketCategoryId, setTicketCategoryId] = useState(null);
  const [ticketSource, setTicketSource] = useState(null);
  const [priorityId, setPriorityId] = useState(null);
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [complaintSubject, setComplaintSubject] = useState("");

  return (
    <Modal
      visible={updateTicketForm}
      closable={false}
      footer={null}
      width={700}
      bodyStyle={{ padding: 0 }}
    >
      <Spin spinning={false}>
        <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[820px]">
          <div className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>Update Ticket</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
                onClick={hanndleCancelEscalateModal}
                alt="Cancel"
              />
            </div>
            <div className="mt-6 w-full border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 min-h-[1px] max-md:max-w-full" />
          </div>

          <div className="flex flex-col items-center pb-16 w-full">
            <Select
              label="Customer type"
              value={customerType}
              onChange={setCustomerType}
              className="w-full"
            >
              {options.map(option => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Customer Reference
            </div>
            <div
              className="flex justify-between gap-4"
              style={{ width: "100%", marginTop: "8px" }}
            >
              <Input
                placeholder="Enter customer reference"
                className="p-3"
                value={customerReference}
                onChange={(e) => setCustomerReference(e.target.value)}
              />
              <Button
                type="primary"
                className="mt-1"
                // onClick={handleFetchCustomerDetails} // Removed functionality
              >
                Validate Customer
              </Button>
            </div>
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Customer Name:
            </div>
            <Input
              placeholder="Enter customer name"
              className="p-3"
              style={{ width: "100%", marginTop: "8px" }}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <Select
              label="Area"
              value={operationalAreaId}
              onChange={setOperationalAreaId}
              className="w-full"
            >
              {/* Options should be added here */}
            </Select>
            <Select
              label="Branch"
              value={branchId}
              onChange={setBranchId}
              className="w-full"
            >
              {/* Options should be added here */}
            </Select>
            <Select
              label="Territory"
              value={territoryId}
              onChange={setTerritoryId}
              className="w-full"
            >
              {/* Options should be added here */}
            </Select>
            <Input
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-4"
            />
            <Input.TextArea
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-4"
            />
          </div>

          <div className="flex flex-col items-center pb-16 w-full">
            <Input
              label="Ticket Subject"
              value={complaintSubject}
              onChange={(e) => setComplaintSubject(e.target.value)}
              className="w-full mt-4"
            />
            <Select
              label="Ticket Category"
              value={ticketCategoryId}
              onChange={setTicketCategoryId}
              className="w-full mt-4"
            >
              {/* Options should be added here */}
            </Select>
            <Select
              label="Ticket Source"
              value={ticketSource}
              onChange={setTicketSource}
              className="w-full mt-4"
            >
              {optionsTicketSource.map(option => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
            <Select
              label="Assign Priority"
              value={priorityId}
              onChange={setPriorityId}
              className="w-full mt-4"
            >
              {/* Options should be added here */}
            </Select>
            <Input.TextArea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-4"
            />
          </div>

          <div className="flex justify-center items-center self-stretch px-16 py-6 mt-16 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex justify-between max-w-full w-full max-md:max-w-full">
              <Button
                type="primary"
                onClick={() => { /* Handle Submit */ }} // Removed functionality
                className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
              >
                Save Complainant
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default UpdateTicketForm;
