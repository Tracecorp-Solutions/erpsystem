import React, { useState, useEffect } from "react";
import { Modal, Steps, Input, Select, Button, message } from "antd";
import axios from "axios";

const { Step } = Steps;
const { Option } = Select;

const AddTicket = ({ isModalVisible, handleCancel, recordedBy }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerReference, setCustomerReference] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
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

  const [operationalAreas, setOperationalAreas] = useState([]);
  const [branches, setBranches] = useState([]);
  const [territory, setTerritory] = useState([]);
  const [ticketCategory, setTicketCategory] = useState([]);
  const [complaintSubject, setComplaintSubject] = useState("");
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    fetchOperationalAreas();
    fetchBranches();
    fetchTerritory();
    fetchTicketCategory();
    fetchPriorities();
  }, []);

  const fetchOperationalAreas = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetOperationAreas`
      );
      setOperationalAreas(response.data);
    } catch (error) {
      console.error("Error fetching operational areas:", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetBranches`
      );
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchTerritory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetTerritories`
      );
      setTerritory(response.data);
    } catch (error) {
      console.error("Error fetching territories:", error);
    }
  };

  const fetchTicketCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetTicketCategories`
      );
      setTicketCategory(response.data);
    } catch (error) {
      console.error("Error fetching ticket categories:", error);
    }
  };

  const fetchCustomerDetails = async (reference) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ValidateCustomer/${reference}`
      );
      setCustomerDetails(response.data);
      setCustomerName(response.data.name);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const fetchPriorities = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetPriorities`
      );
      setPriorities(response.data);
    } catch (error) {
      console.error("Error fetching priorities:", error);
    }
  };

  const handleCustomerReferenceChange = (value) => {
    setCustomerReference(value);
    setCustomerDetails(null);
    setCustomerName("");
  };

  const handleFetchCustomerDetails = () => {
    if (customerReference) {
      fetchCustomerDetails(customerReference);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const priorityIdToSend = priorityId || 0;

    const formData = {
      customerType: customerType,
      customerRef: customerReference,
      customerName: customerName,
      operationAreaId: operationalAreaId,
      branchId: branchId,
      territoryId: territoryId,
      phoneNumber: phoneNumber,
      address: address,
      ticketCategoryId: ticketCategoryId,
      ticketSource: ticketSource,
      priorityId: priorityIdToSend,
      description: description,
      complaintSubject: complaintSubject,
      recordedBy: recordedBy,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/CreateTicket`, formData)
      .then((response) => {
        message.success("Data successfully saved:");
        handleCancel();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        message.error("Error saving data");
      });
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

        {/* Steps */}
        <Steps current={currentStep} className="w-full mt-4">
          <Step title="Customer Details" />
          <Step title="Ticket Details" />
        </Steps>

        {/* Step 1 - Customer Details */}
        {currentStep === 0 && (
          <div className="flex flex-col items-center pb-16 w-full">
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Customer Type
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select customer type"
              onChange={(value) => setCustomerType(value)}
            >
              <Option value="registered">Registered Customer</Option>
              <Option value="organization">None Registered Customer</Option>
            </Select>

            {/* Customer Reference */}
            {customerType === "registered" && (
              <>
                <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
                  Customer Reference
                </div>

                <div
                  className="flex justify-between gap-4 pl-4"
                  style={{ width: "80%", marginTop: "8px" }}
                >
                  <Input
                    placeholder="Enter customer reference"
                    className="p-3"
                    value={customerReference}
                    classNames="border-none w-full"
                    onChange={(e) =>
                      handleCustomerReferenceChange(e.target.value)
                    }
                  />
                  <button
                    type="submit"
                    onClick={handleFetchCustomerDetails}
                    className="px-8 py-3 mt-1 font-semibold text-white whitespace-nowrap rounded-lg bg-slate-500 max-md:px-5"
                  >
                    Submit
                  </button>
                </div>
                {customerDetails && (
                  <>
                    <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
                      Customer Name:
                    </div>
                    <Input
                      placeholder="Enter customer name"
                      className="p-3"
                      style={{ width: "80%", marginTop: "8px" }}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    {/* Display other customer details as needed */}
                  </>
                )}
              </>
            )}

            {/* Operational Area */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Area
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select operational area"
              onChange={(value) => setOperationalAreaId(value)}
            >
              {operationalAreas.map((area) => (
                <Option key={area.id} value={area.id}>
                  {area.name}
                </Option>
              ))}
            </Select>

            {/* Branch */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Branch
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select branch"
              onChange={(value) => setBranchId(value)}
            >
              {branches.map((branch) => (
                <Option key={branch.id} value={branch.id}>
                  {branch.name}
                </Option>
              ))}
            </Select>

            {/* Territory */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Territory
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Choose territory"
              onChange={(value) => setTerritoryId(value)}
            >
              {territory.map((ter) => (
                <Option key={ter.id} value={ter.id}>
                  {ter.name}
                </Option>
              ))}
            </Select>

            {/* Phone Number */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Phone Number
            </div>
            <Input
              placeholder="Enter phone number"
              className="p-3"
              style={{ width: "80%", marginTop: "8px" }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {/* Address */}
            <div className="mt-4 text-base text-start font-semibold leading-6 text-neutral-600">
              Address
            </div>
            <Input.TextArea
              rows={2}
              placeholder="Enter address"
              style={{ width: "80%", marginTop: "8px" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        )}

        {/* Step 2 - Ticket Details */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center pb-16 w-full">
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Ticket Subject
            </div>
            <Input
              className="p-3"
              placeholder="Enter ticket subject"
              style={{ width: "80%", marginTop: "8px" }}
              value={complaintSubject}
              onChange={(e) => setComplaintSubject(e.target.value)}
            />

            {/* Ticket Category */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Ticket Category
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Choose ticket category"
              onChange={(value) => setTicketCategoryId(value)}
            >
              {ticketCategory.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>

            {/* Ticket Source */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Ticket Source
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select ticket source"
              onChange={(value) => setTicketSource(value)}
            >
              <Option value="Phone call">Phone call</Option>
              <Option value="walk-in">walk-in</Option>
              <Option value="Social media">Social media</Option>
            </Select>

            {/* Priority */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Assign Priority
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select priority"
              onChange={(value) => setPriorityId(value)}
            >
              {priorities.map((priority) => (
                <Option key={priority.id} value={priority.id}>
                  {priority.priorityName}
                </Option>
              ))}
            </Select>

            {/* Description */}
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Description
            </div>
            <Input.TextArea
              rows={2}
              placeholder="Enter ticket details"
              style={{ width: "80%", marginTop: "8px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-16 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex justify-between max-w-full w-full max-md:max-w-full">
            {currentStep > 0 && (
              <Button
                onClick={handleBack}
                className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
              >
                Back
              </Button>
            )}
            {currentStep < 1 ? (
              <Button
                type="primary"
                onClick={nextStep}
                className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
              >
                Save Complainant
              </Button>
            ) : (
              <Button
                type="primary"
                className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
                onClick={handleSubmit}
              >
                Save Complainant
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTicket;
