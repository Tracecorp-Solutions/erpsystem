import React, { useState } from "react";
import { Modal, Steps, Input, Select, Button } from "antd";
import axios from "axios";

const { Step } = Steps;
const { Option } = Select;

const AddTicket = ({ isModalVisible, handleCancel }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [customerReference, setCustomerReference] = useState("");
    const [customerDetails, setCustomerDetails] = useState(null);
    const [customerName, setCustomerName] = useState("");
  
    const fetchCustomerDetails = async (reference) => {
      try {
        const response = await axios.get(
          `http://3.216.182.63:8095/TestApi/ValidateCustomer/${reference}`
        );
        setCustomerDetails(response.data);
        setCustomerName(response.data.name);
      } catch (error) {
        console.error("Error fetching customer details:", error);
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
      const formData = {
        customerName: customerName,
        // Add other fields as needed
      };
      
      axios.post('http://example.com/saveCustomerDetails', formData)
        .then(response => {
          console.log('Data successfully saved:', response.data);
          handleCancel();
        })
        .catch(error => {
          console.error('Error saving data:', error);
        });
    };
  
    const nextStep = () => {
      setCurrentStep(currentStep + 1);
    };
  

  console.log("customerDetails customerDetails", customerDetails);

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

        <Steps current={currentStep} className="w-full mt-4">
          <Step title="Customer Details" />
          <Step title="Ticket Details" />
        </Steps>

        {currentStep === 0 && (
          <div className="flex flex-col items-center pb-16 w-full">
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Customer Type
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select customer type"
              onChange={(value) => console.log(value)}
            >
              <Option value="registered">Registered Customer</Option>
              <Option value="organization">None Registered Customer</Option>
            </Select>

            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Customer Reference
            </div>
            <Input
              placeholder="Enter customer reference"
              className="p-3"
              style={{ width: "80%", marginTop: "8px" }}
              value={customerReference}
              onChange={(e) => handleCustomerReferenceChange(e.target.value)}
            />
            <Button
              type="primary"
              className="ml-3"
              onClick={handleFetchCustomerDetails}
            >
              Fetch Details
            </Button>
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
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Area
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select area"
              onChange={(value) => console.log(value)}
            >
              <Option value="area1">Area 1</Option>
              <Option value="area2">Area 2</Option>
            </Select>

            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Branch
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select branch"
              onChange={(value) => console.log(value)}
            >
              <Option value="branch1">Branch 1</Option>
              <Option value="branch2">Branch 2</Option>
            </Select>

            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Territory
            </div>
            <Input
              placeholder="Enter territory"
              className="p-3"
              style={{ width: "80%", marginTop: "8px" }}
            />

            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Phone Number
            </div>
            <Input
              placeholder="Enter phone number"
              className="p-3"
              style={{ width: "80%", marginTop: "8px" }}
            />

            <div className="mt-4 text-base text-start font-semibold leading-6 text-neutral-600">
              Address
            </div>
            <Input.TextArea
              rows={2}
              placeholder="Enter address"
              style={{ width: "80%", marginTop: "8px" }}
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
            />

            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Ticket Category
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
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
              className="h-12"
              placeholder="Select ticket source"
              onChange={(value) => console.log(value)}
            >
              <Option value="source1">Source 1</Option>
              <Option value="source2">Source 2</Option>
            </Select>

            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Assign Priority
            </div>
            <Select
              style={{ width: "80%", marginTop: "8px" }}
              className="h-12"
              placeholder="Select priority"
              onChange={(value) => console.log(value)}
            >
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>

            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Description
            </div>
            <Input.TextArea
              rows={2}
              placeholder="Enter ticket details"
              style={{ width: "80%", marginTop: "8px" }}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center self-stretch px-16 py-6 mt-16 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex justify-between max-w-full w-full max-md:max-w-full">
            {currentStep > 0 && (
              <Button onClick={handleBack} className="mr-4">
                Back
              </Button>
            )}
            {currentStep < 1 ? (
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddTicket;
