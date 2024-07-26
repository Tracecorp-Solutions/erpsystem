import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Button } from "antd";
import axios from "axios";
import { AiOutlineClose } from 'react-icons/ai'; 

const { Option } = Select;

function CreateEscalation({ isUpdateModalVisible, handleCloseModalVisible }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    levelName: "",
    levelDescription: "",
    departmentId: null,
    ticketCategoryId: null,
    escalationTime: 0,
    priorityId: null,
    notificationType: "",
    departmentLevel: null,
    emailTemplate: "",
  });
  const [departments, setDepartments] = useState([]);
  const [ticketCategories, setTicketCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchTicketCategories();
    fetchPriorities();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetAllDepartments`
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchTicketCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/GetTicketCategories`
      );
      setTicketCategories(response.data);
    } catch (error) {
      console.error("Error fetching ticket categories:", error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFirstForm = () => {
    setCurrentStep(2); // Move to the second step when the first form is saved
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/CreateEscalationMatrix`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        setSuccessMessage("Escalation created successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error(`Failed to create escalation. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to create escalation. Please try again.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };
  

  return (
    <Modal visible={isUpdateModalVisible} closable={false} footer={null}>
       {successMessage && (
        <div className="text-center text-white bg-green-500 p-4 mb-4 rounded">
          {successMessage}
        </div>
      )}
      {currentStep === 1 && (
        <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[720px] h-[calc(100vh - 100px)] overflow-y-auto">
          <div className="flex flex-col self-stretch pt-6 w-full text-2xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>New Escalation Level</div>
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-500"
                onClick={handleCloseModalVisible}
              >
                <AiOutlineClose size={24} />
              </button>
            </div>
          </div>
          <div className="justify-between px-5 pt-4 pb-5 mt-2 max-w-full w-[500px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-4">
                  <div className="flex justify-center items-center self-center px-3 w-12 h-12 bg-gray-400 rounded-3xl">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8638ff9fab467bad1cb0313acaf5a3ce156fc9accd2302209d4e76b24f0549?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                      className="w-full aspect-square"
                    />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-center text-neutral-600">
                    Criteria Settings
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[49%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8dd15a007798c0ac8b43df978931898837b98a2f2a6986c39022ce4de490c93?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                  className="self-stretch mt-6 w-full border-solid aspect-[100] border-[3px] border-neutral-500 border-opacity-30 stroke-[3px] stroke-neutral-500 stroke-opacity-30 max-md:mt-10"
                />
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow font-semibold max-md:mt-4">
                  <div className="justify-center items-center self-center px-5 py-3 w-12 h-12 text-base leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500">
                    2
                  </div>
                  <div className="mt-2 text-sm text-center text-neutral-600">
                    Notification Setup
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-between px-5 pt-4 pb-5 mt-3 max-w-full w-[500px]">
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Department
            </div>
            <Select
              placeholder="Choose the Department"
              className="w-full mt-2"
              onChange={(value) => handleSelectChange("departmentId", value)}
            >
              {departments.map((department) => (
                <Option key={department.id} value={department.id}>
                  {department.name}
                </Option>
              ))}
            </Select>
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Ticket Category
            </div>
            <Select
              placeholder="Choose the Category"
              className="w-full mt-2"
              onChange={(value) =>
                handleSelectChange("ticketCategoryId", value)
              }
            >
              {ticketCategories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Priority
            </div>
            <Select
              placeholder="Assign Priority"
              className="w-full mt-2"
              onChange={(value) => handleSelectChange("priorityId", value)}
            >
              {priorities.map((priority) => (
                <Option key={priority.id} value={priority.id}>
                  {priority.priorityName}
                </Option>
              ))}
            </Select>
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Level Name
            </div>
            <Input
              name="levelName"
              placeholder="Enter Level Name"
              className="w-full mt-2"
              onChange={handleInputChange}
            />
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Description
            </div>
            <Input
              name="levelDescription"
              placeholder="Describe the level"
              className="w-full mt-2"
              onChange={handleInputChange}
            />
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Time Threshold
            </div>
            <Input
              name="escalationTime"
              placeholder="Choose Time period"
              className="w-full mt-2"
              onChange={handleInputChange}
            />
            <div className="flex ml-8 gap-3 mt-4">
              <Button
                className="grow max-w-[136px] max-md:max-w-full justify-center items-center px-4 h-11 text-base leading-6 text-gray-300 border-2 border-solid border-lime-400 rounded-full"
                onClick={handleCloseModalVisible}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="grow max-w-[136px] max-md:max-w-full justify-center items-center px-4 h-11 text-base leading-6 text-white bg-blue-400 border-none rounded-full"
                onClick={handleSaveFirstForm}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col justify-center items-center bg-white rounded-3xl max-w-[720px] h-[calc(100vh - 100px)] overflow-y-auto">
          <div className="flex flex-col self-stretch pt-6 w-full text-2xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-center px-5 w-full max-w-screen-sm max-md:flex-wrap max-md:max-w-full">
              <div>Notification Settings</div>
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-500"
                onClick={handleCloseModalVisible}
              >
                <AiOutlineClose size={24} />
              </button>
            </div>
          </div>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-4">
                <div className="flex justify-center items-center self-center px-3 w-12 h-12 bg-lime-400 rounded-3xl">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8638ff9fab467bad1cb0313acaf5a3ce156fc9accd2302209d4e76b24f0549?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                    className="w-full aspect-square"
                  />
                </div>
                <div className="mt-2 text-sm font-semibold text-center text-neutral-600">
                  Criteria Settings
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[49%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8dd15a007798c0ac8b43df978931898837b98a2f2a6986c39022ce4de490c93?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
                className="self-stretch mt-6 w-full border-solid aspect-[100] border-[3px] border-neutral-500 border-opacity-30 stroke-[3px] stroke-neutral-500 stroke-opacity-30 max-md:mt-10"
              />
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow font-semibold max-md:mt-4">
                <div className="justify-center items-center self-center px-5 py-3 w-12 h-12 text-base leading-6 text-white whitespace-nowrap rounded-3xl bg-slate-500">
                  2
                </div>
                <div className="mt-2 text-sm text-center text-neutral-600">
                  Notification Setup
                </div>
              </div>
            </div>
          </div>
          <div className="justify-between px-5 pt-4 pb-5 mt-2 max-w-full w-[500px]">
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Notification Type
            </div>
            <Select
              name="notificationType"
              placeholder="Choose Notification Type"
              className="w-full mt-2"
              onChange={(value) =>
                handleSelectChange("notificationType", value)
              }
            >
              <Option value="email">Email</Option>
              <Option value="sms">SMS</Option>
              <Option value="push">Push Notification</Option>
            </Select>
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Department
            </div>
            <Select
              placeholder="Choose the Department"
              className="w-full mt-2"
              onChange={(value) => handleSelectChange("departmentLevel", value)}
            >
              {departments.map((department) => (
                <Option key={department.id} value={department.id}>
                  {department.name}
                </Option>
              ))}
            </Select>
            <div className="mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
              Email Template
            </div>
            <Input
              name="emailTemplate"
              placeholder="Enter Email Template"
              className="w-full mt-2"
              onChange={handleInputChange}
            />
            <div className="flex gap-3 mt-4">
              <Button
                className="grow max-w-[136px] max-md:max-w-full justify-center items-center px-4 h-11 text-base leading-6 text-gray-300 border-2 border-solid border-lime-400 rounded-full"
                onClick={() => setCurrentStep(1)}
              >
                Previous
              </Button>
              <Button
                type="primary"
                className="grow max-w-[136px] max-md:max-w-full justify-center items-center px-4 h-11 text-base leading-6 text-white bg-blue-400 border-none rounded-full"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default CreateEscalation;
