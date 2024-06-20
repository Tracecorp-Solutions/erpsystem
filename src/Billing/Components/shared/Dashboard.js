import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addOperationalArea,
  getOperationalAreas,
} from "../../Apis/operationAreaApi";
import { getStates, addState } from "../../Apis/stateApi";
import { addBranch, getBranches } from "../../Apis/branchApi";
import { addTerritory, getTerritories } from "../../Apis/territoryApi";
import { addSubTerritory, getSubTerritories } from "../../Apis/subTerritoryApi";
import {
  getApplications,
  getApplicationById,
} from "../../Apis/getApplicationApi";
import {
  addCustomerCategories,
  getCustomerCategories,
} from "../../Apis/customerCategory";

const UploadSection = ({ title, description }) => (
  <div className="mt-4 max-md:max-w-full">
    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-6/12 max-md:w-full">
        <div className="grow max-md:mt-4 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-full max-md:w-full">
              <div className="grow justify-center px-3.5 py-11 w-full text-sm text-center underline rounded-xl border border-dashed bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:mt-6">
                Drag and Drop file here or{" "}
                <span className="underline text-neutral-600">Choose file</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-6/12 max-md:w-full">
        <div className="flex flex-col self-stretch my-auto max-md:mt-10">
          <div className="text-base font-semibold leading-6 text-neutral-600">
            {title}
          </div>
          <div className="mt-1 text-sm text-neutral-400">{description}</div>
        </div>
      </div>
    </div>
  </div>
);

const StepItem = ({ stepNumber, stepTitle, imgSrc, isComplete = false }) => (
  <div className="flex flex-col items-center">
    <div
      className={`flex justify-center items-center px-3 w-12 h-12 rounded-3xl ${
        isComplete ? "bg-lime-400" : "bg-slate-500"
      }`}
    >
      <img
        loading="lazy"
        src={imgSrc}
        alt={`Step ${stepNumber}`}
        className="w-full aspect-square"
      />
    </div>
    <div className="mt-2 text-xs font-medium tracking-wide uppercase text-neutral-400">
      step {stepNumber}
    </div>
    <div className="self-stretch mt-1 text-base font-semibold leading-6 text-neutral-600">
      {stepTitle}
    </div>
  </div>
);

function Step({ stepNumber, stepTitle, imgSrc, isActive }) {
  return (
    <div className="flex flex-col items-center">
      <div
      // className={`flex justify-center items-center px-3 w-12 h-12 rounded-3xl ${
      //   isActive ? "bg-slate-500" : "bg-stone-100"
      // }`}
      >
        {/* <img
          loading="lazy"
          src={imgSrc}
          alt={`Step ${stepNumber} Icon`}
          className="w-full aspect-square"
        /> */}
      </div>
      {/* <div className="mt-2 text-xs font-medium tracking-wide uppercase text-neutral-400">
        step {stepNumber}
      </div> */}
      <div
        className={`self-stretch mt-1 text-base font-semibold leading-6 ${
          isActive ? "text-neutral-600" : "text-neutral-400"
        } `}
      >
        {stepTitle}
      </div>
    </div>
  );
}

function InfoSection({ label, description, children }) {
  return (
    <div className="flex flex-col grow text-base leading-6 text-neutral-400 max-md:mt-4 max-md:max-w-full">
      <div className="font-semibold text-neutral-600 max-md:max-w-full">
        {label}
      </div>
      <div className="mt-1 text-sm max-md:max-w-full">{description}</div>
      {children}
    </div>
  );
}

function Input({ label, description, placeholder, type }) {
  return (
    <section className="flex flex-col grow text-base leading-6 text-neutral-400 max-md:mt-4 max-md:max-w-full">
      <div className="font-semibold text-neutral-600 max-md:max-w-full">
        {label}
      </div>
      <div className="self-start mt-1 text-sm text-neutral-400 max-md:max-w-full">
        {description}
      </div>
      <input
        className="justify-center items-start px-4 py-4 mt-2 text-base leading-6 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 text-neutral-400 max-md:pr-5 max-md:max-w-full"
        placeholder={placeholder}
        type={type}
        aria-label={label}
      />
    </section>
  );
}

function NewConnection() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const [selectedGender, setSelectedGender] = useState("Choose Gender");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [operationalAreas, setOperationalAreas] = useState([]);
  const [branches, setBranches] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subTerritories, setSubTerritories] = useState([]);
  const [states, setStates] = useState([]);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setDropdownVisible(false);
  };

  const [startDate, setStartDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleDateChange = (date) => {
    setStartDate(date);
    setCalendarVisible(false);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedStates = await getStates();
        setStates(fetchedStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      }

      try {
        const fetchedOperationalAreas = await getOperationalAreas();
        setOperationalAreas(fetchedOperationalAreas);
      } catch (error) {
        console.error("Error fetching operational areas:", error);
      }

      try {
        const fetchedBranches = await getBranches();
        setBranches(fetchedBranches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }

      try {
        const fetchedTerritories = await getTerritories();
        setTerritories(fetchedTerritories);
      } catch (error) {
        console.error("Error fetching territories:", error);
      }

      try {
        const categories = await getCustomerCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching customer categories:", error);
      }

      try {
        const subTerritories = await getSubTerritories();
        setSubTerritories(subTerritories);
      } catch (error) {
        console.error("Error fetching sub-territories:", error);
      }
    };

    fetchInitialData();
  }, []);

  const [formData, setFormData] = useState({
    id: 0,
    applicationNumber: "",
    title: "",
    fullName: "",
    dateOfBirth: "2024-06-14",
    gender: "",
    emailAddress: "",
    phoneNumber: "",
    idNumber: "",
    stateId: 0,
    operationAreaId: 0,
    branchId: 0,
    territoryId: 0,
    subTerritoryId: 0,
    streetAddress: "",
    plotNumber: "",
    nearestLandMark: "",
    customerType: 0,
    billDeliveryMethod: 0,
    customerCategory: 0,
    proofOfIdentity: null,
    proofOfOwnerShip: null,
    proofOfInstallationSite: null,
    localAuthorizationDocument: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data being submitted:", formData);

      const formDataToSend = new FormData();

      // Append all form fields to the FormData object
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        "http://3.216.182.63:8095/TestApi/NewApplication",
        formDataToSend
      );
      console.log("Response:", response.data);

      await addState({ id: 0, name: formData.stateName });
      await addOperationalArea({
        id: 0,
        name: formData.operationalAreaName,
        stateId: formData.stateId,
      });
      await addBranch({
        id: 0,
        name: formData.branchName,
        operationAreaId: formData.operationAreaId,
      });
      await addTerritory({
        id: 0,
        name: formData.territoryName,
        branchId: formData.branchId,
      });
      await addSubTerritory({
        id: 0,
        name: formData.subTerritoryName,
        territoryId: formData.territoryId,
      });

      alert("Application submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  const handleFetch = async (id) => {
    try {
      const applicationData = await getApplicationById(id);
      setFormData(applicationData);
    } catch (error) {
      console.error("Error fetching application:", error);
    }

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  }}


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="AppContainer">
              <SideNav />
              <div className="flex flex-col h-screen">
                <TopNav />
                <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
                  <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                    Application Form
                  </header>

                  <main className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full overflow-auto">
                    <section className="flex flex-col px-8 pt-8 pb-3 max-md:px-5 max-md:max-w-full">
                      <div className="flex gap-4 justify-between px-0.5 max-md:flex-wrap">
                        <Step
                          stepNumber="1"
                          stepTitle="Personal Information"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/199c93b6c6f6722d44a5034345d6f2fe17ea88a437145380dc5f98b5469fa385?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          isActive
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="2"
                          stepTitle="Residential Information"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/862b2af2f85bf4edd9fd3f7941052c1aa2536819b5b2e767f16c1bc6550cc70b?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="3"
                          stepTitle="Connection Details"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/83274c9c51ec56a522950907f75568e73c7b12ee0f3761bc68e72c153fee5091?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="4"
                          stepTitle="Supporting Documents"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/700b08a5ca31bc1a0e4f23e30dfcf37c6bac8fd9279bc171b2668f0266d9b6a5?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                      </div>
                      <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full"></div>

                      {/* <div className="flex flex-wrap gap-16 max-md:flex-col mt-6 max-md:gap-0 w-full"> */}
                      <div className="flex gap-5 max-md:flex-col mt-4 max-md:gap-0">
                        <div className="flex flex-col w-6/12 max-md:w-full">
                          <label
                            htmlFor="nearestLandmark"
                            className="font-semibold text-gray-700 mb-2"
                          >
                            Title
                          </label>
                          <p className="text-gray-500 text-sm mt-1">
                            Add your title for example Mr, Mrs, Dr
                          </p>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div className="flex flex-col w-6/12 max-md:w-full">
                          <label
                            htmlFor="fullName"
                            className="font-semibold text-gray-700 mb-2"
                          >
                            Full Name
                          </label>
                          <p className="text-gray-500 text-sm mt-1">
                            Please input your full names
                          </p>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fullName: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      {/* <div className="flex flex-wrap gap-8 max-md:flex-col mt-6 max-md:gap-0 w-full"> */}
                      <div className="flex gap-5 max-md:flex-col mt-5 max-md:gap-0">
                        <div className="flex flex-col mr-5 w-6/12 max-md:w-full">
                          <label
                            htmlFor="emailAddress"
                            className="font-semibold text-gray-700 mb-2"
                          >
                            Email Address
                          </label>
                          <p className="text-gray-500 text-sm mt-1">
                            Please input your personal email
                          </p>
                          <input
                            type="text"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                emailAddress: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div className="flex flex-col w-6/12 max-md:w-full">
                          <label
                            htmlFor="phoneNumber"
                            className="font-semibold text-gray-700 mb-2"
                          >
                            Phone Number
                          </label>
                          <p className="text-gray-500 text-sm mt-1">
                            Please input your personal phone number
                          </p>
                          <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phoneNumber: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-8 mt-2 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-6/12 max-md:w-full">
                          <label
                            htmlFor="idNumber"
                            className="font-semibold text-gray-700 mb-2"
                          >
                            ID number
                          </label>
                          <p className="text-gray-500 text-sm mt-1">
                            Please input your national ID or passport number
                            number.
                          </p>
                          <input
                            type="text"
                            description="National Id or passport number"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                idNumber: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>

                        <section description="The applicant's gender identity">
                          <label
                            htmlFor="gender"
                            className="font-semibold text-gray-700 mb-2"
                          >
                            Gender
                          </label>
                          <p className="text-gray-500 text-sm mt-1">
                            Please select a gender that best describes you.
                          </p>
                          <div
                            className="relative"
                            onClick={() => setDropdownVisible(!dropdownVisible)}
                          >
                            <div className="flex gap-4 justify-between px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 cursor-pointer">
                              <div>{selectedGender || "Select gender"}</div>
                            </div>
                            {dropdownVisible && (
                              <div className="absolute mt-2 bg-white rounded-xl shadow-md w-full z-10">
                                <div
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                  onClick={() => handleGenderSelect("Male")}
                                >
                                  Male
                                </div>
                                <div
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                  onClick={() => handleGenderSelect("Female")}
                                >
                                  Female
                                </div>
                                <div
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                  onClick={() => handleGenderSelect("Other")}
                                >
                                  Other
                                </div>
                              </div>
                            )}
                          </div>
                        </section>
                      </div>

                      <section>
                        <label
                          htmlFor="Date"
                          className="font-semibold text-gray-700 mb-2"
                          description="The applicant's date of birth for identity verification"
                        >
                          Date
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          Please select the date of creation.
                        </p>
                        <div
                          className="flex gap-2 justify-between px-2 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 cursor-pointer "
                          onClick={() => setCalendarVisible(!calendarVisible)}
                        >
                          <div>
                            {startDate
                              ? startDate.toLocaleDateString()
                              : "-- / -- / ----"}
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7515d0e48a8702b0a75494e4c7e35f39776b5b1f5e110f501c8205396c6041?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                            alt="Calendar icon"
                            className="w-6 h-6"
                          />
                        </div>
                        {calendarVisible && (
                          <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            inline
                          />
                        )}
                      </section>

                      <section className="flex flex-col justify-center items-end px-16 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                        <div className="flex gap-4 px-8 max-w-full w-[232px] max-md:flex-wrap max-md:px-5">
                          <button className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5">
                            Cancel
                          </button>
                          <button
                            className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5"
                            onClick={nextStep}
                          >
                            Next
                          </button>
                        </div>
                      </section>
                    </section>
                  </main>
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="flex flex-row">
              <SideNav />
              <div className="flex flex-col h-screen">
                <TopNav />
                <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
                  <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                    Application
                  </header>
                  <main className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full overflow-auto">
                    <section className="flex flex-col px-8 pt-8 pb-3 max-md:px-5 max-md:max-w-full">
                      <div className="flex gap-4 justify-between px-0.5 max-md:flex-wrap">
                        <Step
                          stepNumber="1"
                          stepTitle="Personal Information"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/199c93b6c6f6722d44a5034345d6f2fe17ea88a437145380dc5f98b5469fa385?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          isActive
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="2"
                          stepTitle="Residential Information"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/862b2af2f85bf4edd9fd3f7941052c1aa2536819b5b2e767f16c1bc6550cc70b?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="3"
                          stepTitle="Connection Details"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/83274c9c51ec56a522950907f75568e73c7b12ee0f3761bc68e72c153fee5091?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="4"
                          stepTitle="Supporting Documents"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/700b08a5ca31bc1a0e4f23e30dfcf37c6bac8fd9279bc171b2668f0266d9b6a5?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                      </div>
                      <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full"></div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="stateId"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              State Name
                            </label>
                            <select
                              name="stateId"
                              value={formData.stateId}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  stateId: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-2"
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="operationalAreaId"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              Operational Area Name
                            </label>
                            <select
                              name="operationalAreaId"
                              value={formData.operationalAreaId}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  operationalAreaId: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-2"
                            >
                              <option value="">Select Operational Area</option>
                              {operationalAreas.map((area) => (
                                <option key={area.id} value={area.id}>
                                  {area.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="branchId"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              Branch Name
                            </label>
                            <select
                              name="branchId"
                              value={formData.branchId}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  branchId: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-2"
                            >
                              <option value="">Select Branch</option>
                              {branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                  {branch.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="territoryId"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              Territory Name
                            </label>
                            <select
                              name="territoryId"
                              value={formData.territoryId}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  territoryId: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-2"
                            >
                              <option value="">Select Territory</option>
                              {territories.map((territory) => (
                                <option key={territory.id} value={territory.id}>
                                  {territory.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="subTerritoryId"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              SubTerritory
                            </label>
                            <select
                              name="subTerritoryId"
                              value={formData.subTerritoryId}
                              onChange={handleChange}
                              className="border border-gray-300 rounded-md px-3 py-2"
                            >
                              <option value="">Select SubTerritory</option>
                              {subTerritories.map((subTerritory) => (
                                <option
                                  key={subTerritory.id}
                                  value={subTerritory.id}
                                >
                                  {subTerritory.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="plotNumber"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              Street Address
                            </label>
                            <input
                              type="text"
                              name="streetAddress"
                              value={formData.streetAddress}
                              onChange={handleChange}
                              className="border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="plotNumber"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              Plot Number
                            </label>
                            <input
                              type="text"
                              name="plotNumber"
                              value={formData.plotNumber}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  plotNumber: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="nearestLandmark"
                              className="font-semibold text-gray-700 mb-2"
                            >
                              Nearest Landmark
                            </label>
                            <input
                              type="text"
                              name="nearestLandmark"
                              value={formData.nearestLandMark}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nearestLandMark: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>
                        </div>
                        <section className="flex flex-col justify-center items-end px-16 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                          <div className="flex gap-4 px-8 max-w-full w-[232px] max-md:flex-wrap max-md:px-5">
                            <button
                              className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                              onClick={prevStep}
                            >
                              Previous
                            </button>
                            <button
                              className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5"
                              onClick={nextStep}
                            >
                              Next
                            </button>
                          </div>
                        </section>
                      </div>
                    </section>
                  </main>
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="flex flex-row">
              <SideNav />
              <div className="flex flex-col h-screen">
                <TopNav />
                <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
                  <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                    Application Form
                  </header>
                  <main className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full overflow-auto">
                    <section className="flex flex-col px-8 pt-8 pb-3 max-md:px-5 max-md:max-w-full">
                      <div className="flex gap-4 justify-between px-0.5 max-md:flex-wrap">
                        <Step
                          stepNumber="1"
                          stepTitle="Personal Information"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/199c93b6c6f6722d44a5034345d6f2fe17ea88a437145380dc5f98b5469fa385?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          isActive
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="2"
                          stepTitle="Residential Information"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/862b2af2f85bf4edd9fd3f7941052c1aa2536819b5b2e767f16c1bc6550cc70b?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="3"
                          stepTitle="Connection Details"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/83274c9c51ec56a522950907f75568e73c7b12ee0f3761bc68e72c153fee5091?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                          alt=""
                          className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                        />
                        <Step
                          stepNumber="4"
                          stepTitle="Supporting Documents"
                          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/700b08a5ca31bc1a0e4f23e30dfcf37c6bac8fd9279bc171b2668f0266d9b6a5?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        />
                      </div>
                      <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full"></div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="customerType"
                              className="text-sm font-medium text-gray-700 mb-1"
                            >
                              Customer Type
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                              The category of the customer
                            </p>
                            <select
                              id="customerType"
                              name="customerType"
                              value={formData.customerType}
                              onChange={handleChange}
                              className="block w-full px-5 py-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value="">Select customer type</option>
                              <option value="Flat">Flat</option>
                              <option value="Post-paid">Post-paid</option>
                              <option value="Pre-paid">Pre-paid</option>
                            </select>
                          </div>

                          <div className="flex flex-col w-6/12 max-md:w-full">
                            <label
                              htmlFor="billDeliveryMethod"
                              className="text-sm font-medium text-gray-700 mb-1"
                            >
                              Bill Delivery Method
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                              The preferred bill delivery method
                            </p>
                            <select
                              id="billDeliveryMethod"
                              name="billDeliveryMethod"
                              value={formData.billDeliveryMethod}
                              onChange={handleChange}
                              className="block w-full px-5 py-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value="">
                                Select bill delivery method
                              </option>
                              <option value="Flat">SMS</option>
                              <option value="Post-paid">Email</option>
                              <option value="Pre-paid">Hand Delivery</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex flex-col w-6/12 max-md:w-full">
                          <label
                            htmlFor="customerCategory"
                            className="font-semibold text-gray-700 mb-2"
                          >
                            Customer Category
                          </label>
                          <p className="text-xs text-gray-500">
                            The category of the customer
                          </p>
                          <select
                            id="customerCategory"
                            name="customerCategory"
                            value={formData.customerCategory}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2"
                          >
                            <option value="">Select customer category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <section className="flex flex-col justify-end items-end px-16 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                          <div className="flex gap-4 px-8 max-w-full w-[232px] max-md:flex-wrap max-md:px-5">
                            <button
                              className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                              onClick={prevStep}
                            >
                              Previous
                            </button>
                            <button
                              className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5"
                              onClick={nextStep}
                            >
                              Next
                            </button>
                          </div>
                        </section>
                      </div>
                    </section>
                  </main>
                </div>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <div className="flex flex-row">
            <SideNav />
            <div className="flex flex-col h-screen w-full">
              <TopNav />
              <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
                <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                  Application Form
                </header>
                <div className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full">
                  <section className="flex flex-col px-8 pt-8 pb-20 max-md:px-5 max-md:max-w-full">
                    <div className="flex flex-row gap-4 justify-between px-0.5 max-md:flex-wrap">
                      <StepItem
                        stepNumber="1"
                        stepTitle="Personal Information"
                        imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8638ff9fab467bad1cb0313acaf5a3ce156fc9accd2302209d4e76b24f0549?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        isComplete
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/29e775b8417bcbfed9697896a5b81879c830b3fdb9810856fcd8fe58283c0d10?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        alt=""
                        className="shrink-0 self-start mt-6 border-lime-400 border-solid aspect-[20] border-[5px] stroke-[5px] stroke-lime-400 w-[95px]"
                      />
                      <StepItem
                        stepNumber="2"
                        stepTitle="Residential Information"
                        imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/896d7c72c5db9f415b855cd888fa335bfb8fdc56b4d44efa441eadd83ce334a8?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        isComplete
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/29e775b8417bcbfed9697896a5b81879c830b3fdb9810856fcd8fe58283c0d10?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        alt=""
                        className="shrink-0 self-start mt-6 border-lime-400 border-solid aspect-[20] border-[5px] stroke-[5px] stroke-lime-400 w-[95px]"
                      />
                      <StepItem
                        stepNumber="3"
                        stepTitle="Connection Details"
                        imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0b0b7159a0f61d422ff56dbcb32e5eecb7b99995bb6d508381cd689eb8d6a1d6?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        isComplete
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/29e775b8417bcbfed9697896a5b81879c830b3fdb9810856fcd8fe58283c0d10?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        alt=""
                        className="shrink-0 self-start mt-6 border-lime-400 border-solid aspect-[20] border-[5px] stroke-[5px] stroke-lime-400 w-[95px]"
                      />
                      <StepItem
                        stepNumber="4"
                        stepTitle="Supporting Documents"
                        imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/dfc58e5687c0ddcaba8cf8f5e2db12dbfdd52044e4566ce96f4b20c4b2e0d362?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        isComplete={false}
                      />
                    </div>
                    <div className="flex flex-wrap gap-8 mt-16 max-md:gap-4">
                      <div className="w-full md:w-1/2">
                        <label className="block text-neutral-600 font-medium mb-2">
                          Proof of Identity
                        </label>
                        <input type="file" onChange={handleFileChange}  className="border border-gray-300 rounded-md px-3 py-2"/>
                        <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of your identity document.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="block text-neutral-600 font-medium mb-2">
                          Proof of Ownership
                        </label>
                        <input type="file" onChange={handleFileChange} className="border border-gray-300 rounded-md px-3 py-2"/>
                        <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of the ownership document.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="block text-neutral-600 font-medium mb-2">
                          Proof of Installation Site
                        </label>
                        <input type="file" onChange={handleFileChange} className="border border-gray-300 rounded-md px-3 py-2"/>
                        <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of the installation site
                          document.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="block text-neutral-600 font-medium mb-2">
                          Local Authorization Document
                        </label>
                        <input type="file" onChange={handleFileChange} className="border border-gray-300 rounded-md px-3 py-2"/>
                        <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of the local authorization
                          document.
                        </p>
                      </div>
                    </div>
                  </section>
                  <footer className="flex flex-col justify-center items-end px-12 py-5 text-base font-semibold leading-6 bg-white max-md:pl-5 max-md:max-w-full">
                    <div className="flex gap-4 px-8 max-w-full w-[582px] max-md:flex-wrap max-md:px-5">
                      <button
                        className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                        onClick={prevStep}
                      >
                        Previous
                      </button>
                      <button
                        className="justify-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5"
                        onClick={handleSubmit}
                      >
                        Submit Application
                      </button>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Step
        stepNumber={currentStep}
        stepTitle={`Step ${currentStep}`}
        imgSrc="image.jpg"
        isActive={true}
      />
      <form onSubmit={handleSubmit}>{renderStep()}</form>
    </div>
  );
}

export default NewConnection;
