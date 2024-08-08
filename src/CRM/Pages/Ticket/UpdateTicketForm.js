import React, { useState, useEffect } from "react";
import { Modal, Steps, Input, Select, Button, message, Spin } from "antd";
import axios from "axios";
import SelectOption from "../../components/SelectOption";
import SelectField from "../../components/SelectField";
import TextAreaField from "../../components/TextAreaField";
import InputField from "../../components/TextInput";
import SelectFields2 from "../../components/SelectedFields2";

const { Step } = Steps;

const optionsCustomerType = [
  { id: 1, name: "Registered" },
  { id: 2, name: "Non Registered" },
];

const optionsTicketSource = [
  { id: 1, name: "Phone Call" },
  { id: 2, name: "Walk-in" },
  { id: 3, name: "Social Media" },
];

const statusOptions = [
  { id: 1, name: "Open" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Resolved" },
  { id: 4, name: "Closed" },
  { id: 5, name: "Escalated" },
];

const UpdateTicketForm = ({
  updateTicketForm,
  handleUpdateTicketCancel,
  ticketDetails,
  fetchTickets
}) => {
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
  const [loading, setLoading] = useState(false);
  const [escalationMatrixId, setEscalationMatrixId] = useState(null);
  const [status, setStatus] = useState(null);
  const [operationalAreas, setOperationalAreas] = useState([]);
  const [branches, setBranches] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);

  useEffect(() => {
    fetchOperationalAreas();
    fetchBranches();
    fetchTerritories();
    fetchTicketCategories();
    fetchPriorities();

    if (ticketDetails) {
      // Populate form with ticketDetails
      setCustomerReference(ticketDetails.customerRef || "");
      setCustomerName(ticketDetails.customerName || "");
      setOperationalAreaId(ticketDetails.operationAreaId || null);
      setBranchId(ticketDetails.branchId || null);
      setTerritoryId(ticketDetails.territoryId || null);
      setPhoneNumber(ticketDetails.phoneNumber || "");
      setAddress(ticketDetails.address || "");
      setTicketCategoryId(ticketDetails.ticketCategoryId || null);
      setTicketSource(ticketDetails.ticketSource || null);
      setPriorityId(ticketDetails.priorityId || null);
      setDescription(ticketDetails.description || "");
      setComplaintSubject(ticketDetails.complaintSubject || "");
      setEscalationMatrixId(ticketDetails.escalationMatrixId || null);
      setStatus(ticketDetails.status || null);
      setCustomerType(ticketDetails.customerType || null);
      setAssignedTo(ticketDetails.assignedTo || null);
      setTicketId(ticketDetails.id || null);
      setDateCreated(ticketDetails.creationDate || null);
    }
  }, [ticketDetails]);

  const fetchData = async (url, setState) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}${url}`
      );
      setState(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOperationalAreas = () =>
    fetchData("/GetOperationAreas", setOperationalAreas);
  const fetchBranches = () => fetchData("/GetBranches", setBranches);
  const fetchTerritories = () => fetchData("/GetTerritories", setTerritories);
  const fetchTicketCategories = () =>
    fetchData("/GetTicketCategories", setTicketCategories);
  const fetchPriorities = () => fetchData("/GetPriorities", setPriorities);

  const handleSubmit = () => {
    if (
      !customerName ||
      !operationalAreaId ||
      !branchId ||
      !territoryId ||
      !complaintSubject ||
      !description
    ) {
      message.error("Please fill all required fields");
      return;
    }

    const formData = {
      customerName,
      operationAreaId: operationalAreaId,
      branchId,
      territoryId,
      phoneNumber,
      address,
      ticketCategoryId,
      ticketSource,
      priorityId: priorityId || 0,
      description,
      complaintSubject,
      customerRef: customerReference,
      escalationMatrixId,
      status,
      customerType,
      assignedTo,
      dateCreated,
      id: ticketId,
    };

    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_API_URL}/UpdateTicket`, formData)
      .then((response) => {
        message.success("Ticket successfully updated");
        fetchTickets();
        handleUpdateTicketCancel();
      })
      .catch((error) => {
        console.error("Error updating ticket:", error);
        message.error("Error updating ticket");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      visible={updateTicketForm}
      closable={false}
      footer={null}
      width={500}
      bodyStyle={{ padding: 0 }}
    >
      <Spin spinning={loading}>
        <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[820px]">
          <div className="flex flex-col self-stretch pt-6 w-full text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>Update Ticket</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cb4c3a052fc4ce0311e93e84c7d1ec0d87c500974fc2472887163b10b65c326?apiKey=0d95acea82cc4b259a61e827c24c5c6c&"
                className="shrink-0 my-auto w-8 aspect-square cursor-pointer"
                onClick={handleUpdateTicketCancel}
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
              <SelectField
                label="Customer Type"
                value={customerType}
                options={optionsCustomerType}
                onChange={setCustomerType}
              />
              <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
                Customer Reference:
              </div>
              <Input
                placeholder="Enter customer reference"
                className="p-3"
                style={{ width: "100%", marginTop: "8px" }}
                value={customerReference}
                onChange={(e) => setCustomerReference(e.target.value)}
              />
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
              <SelectField
                label="Area"
                value={operationalAreaId}
                options={operationalAreas}
                onChange={setOperationalAreaId}
              />
              <SelectField
                label="Branch"
                value={branchId}
                options={branches}
                onChange={setBranchId}
              />
              <SelectField
                label="Territory"
                value={territoryId}
                options={territories}
                onChange={setTerritoryId}
              />
              <InputField
                label="Phone Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <TextAreaField
                label="Address"
                value={address}
                onChange={setAddress}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex flex-col items-center pb-16 w-full">
              <InputField
                label="Ticket Subject"
                value={complaintSubject}
                onChange={setComplaintSubject}
              />
              <SelectField
                label="Ticket Category"
                value={ticketCategoryId}
                options={ticketCategories}
                onChange={setTicketCategoryId}
              />
              <SelectOption
                label="Ticket Source"
                value={ticketSource}
                options={optionsTicketSource}
                onChange={setTicketSource}
              />
              <SelectFields2
                label="Assign Priority"
                value={priorityId}
                options={priorities}
                onChange={setPriorityId}
              />
              <TextAreaField
                label="Description"
                value={description}
                onChange={setDescription}
              />
              <SelectField
                label="Status"
                value={status}
                options={statusOptions}
                onChange={setStatus}
              />
            </div>
          )}

          <div className="flex justify-center items-center self-stretch px-16 py-6 mt-16 w-full text-base leading-6 bg-stone-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex justify-between max-w-full w-full max-md:max-w-full">
              {currentStep > 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                >
                  Back
                </Button>
              )}
              {currentStep < 1 ? (
                <div className="w-full flex justify-center">
                  <Button
                    type="primary"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5 w-full"
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  className="px-8 py-4 font-semibold text-white rounded-3xl bg-slate-500 max-md:px-5"
                >
                  Update Ticket
                </Button>
              )}
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default UpdateTicketForm;
