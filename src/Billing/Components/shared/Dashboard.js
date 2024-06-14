import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UploadSection = ({ title, description }) => (
  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="grow max-md:mt-4 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
            <div className="grow justify-center px-3.5 py-11 w-full text-sm text-center underline rounded-xl border border-dashed bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:mt-6">
              Drag and Drop file here or{" "}
              <span className="underline text-neutral-600">Choose file</span>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10">
              <div className="text-base font-semibold leading-6 text-neutral-600">
                {title}
              </div>
              <div className="mt-1 text-sm text-neutral-400">{description}</div>
            </div>
          </div>
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

function FormInput({ label, description, placeholder, type }) {
  return (
    <section className="self-start mt-4 text-base font-semibold leading-6 text-neutral-600 max-md:max-w-full">
      {label}
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

  const [selectedGender, setSelectedGender] = useState("Choose Gender");
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    proofOfIdentity: "",
    proofOfOwnerShip: "",
    proofOfInstallationSite: "",
    localAuthorizationDocument: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://3.216.182.63:8095/TestApi/NewApplication",
        formData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFetch = async (id) => {
    try {
      const response = await axios.get(
        `http://3.216.182.63:8095/TestApi/GetApplications/${id}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
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
                      <div>
                        <form onSubmit={handleSubmit}>
                          <div className="mt-4 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                              <FormInput
                                label="ID"
                                description="The unique ID for the application"
                                placeholder="Enter ID"
                                type="number"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                              />
                              <FormInput
                                label="Application Number"
                                description="The application number"
                                placeholder="Enter application number"
                                type="text"
                                name="applicationNumber"
                                value={formData.applicationNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="mt-4 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                              <FormInput
                                label="Title"
                                description="The title of the application"
                                placeholder="Enter title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                              />
                              <FormInput
                                label="Full Name"
                                description="The applicant's full legal name"
                                placeholder="Enter your full name"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="mt-4 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                              <InfoSection
                                label="Date of Birth"
                                description="The applicant's date of birth for identity verification"
                              >
                                <div
                                  className="flex gap-2 justify-between px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 cursor-pointer max-md:flex-wrap max-md:max-w-full"
                                  onClick={() =>
                                    setCalendarVisible(!calendarVisible)
                                  }
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
                              </InfoSection>
                              <InfoSection
                                label="Gender"
                                description="The applicant's gender identity"
                              >
                                <div
                                  className="relative"
                                  onClick={() =>
                                    setDropdownVisible(!dropdownVisible)
                                  }
                                >
                                  <div className="flex gap-2 justify-between px-4 py-4 mt-2 bg-white rounded-xl border border-solid border-neutral-500 border-opacity-30 cursor-pointer">
                                    <div>
                                      {selectedGender || "Select gender"}
                                    </div>
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4ed265a29e27e6f4e2bcf78f195fb23ba16a388a1e5b9b8cdb07f252241bc18?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                                      alt="Dropdown icon"
                                      className="w-6 h-6"
                                    />
                                  </div>
                                  {dropdownVisible && (
                                    <div className="absolute mt-2 bg-white rounded-xl shadow-md w-full z-10">
                                      <div
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() =>
                                          handleGenderSelect("Male")
                                        }
                                      >
                                        Male
                                      </div>
                                      <div
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() =>
                                          handleGenderSelect("Female")
                                        }
                                      >
                                        Female
                                      </div>
                                      <div
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() =>
                                          handleGenderSelect("Other")
                                        }
                                      >
                                        Other
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </InfoSection>
                            </div>
                          </div>
                          <div className="mt-4 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                              <FormInput
                                label="Email Address"
                                description="The applicant's email address for contact"
                                placeholder="Enter your email address"
                                type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                              />
                              <FormInput
                                label="Phone Number"
                                description="The applicant's phone number for contact"
                                placeholder="Enter your phone number"
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <FormInput
                            label="ID Number"
                            description="The applicant's national ID number"
                            placeholder="Enter your ID number"
                            type="text"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleChange}
                          />
                        </form>

                        <section className="flex flex-col justify-center items-end px-16 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                          <div className="flex gap-4 px-8 max-w-full w-[562px] max-md:flex-wrap max-md:px-5">
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
                      </div>
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
                          <FormInput
                            label="State ID"
                            description="The ID of the state where the applicant resides"
                            placeholder="Enter state ID"
                            type="number"
                            name="stateId"
                            value={formData.stateId}
                            onChange={handleChange}
                          />

                          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <FormInput
                              label="Operation Area ID"
                              description="The ID of the operation area"
                              placeholder="Enter operation area ID"
                              type="number"
                              name="operationAreaId"
                              value={formData.operationAreaId}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <FormInput
                            label="Branch ID"
                            description="The ID of the branch"
                            placeholder="Enter branch ID"
                            type="number"
                            name="branchId"
                            value={formData.branchId}
                            onChange={handleChange}
                          />

                          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <FormInput
                              label="Territory ID"
                              description="The ID of the territory"
                              placeholder="Enter territory ID"
                              type="number"
                              name="territoryId"
                              value={formData.territoryId}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <FormInput
                            label="Sub Territory ID"
                            description="The ID of the sub territory"
                            placeholder="Enter sub territory ID"
                            type="number"
                            name="subTerritoryId"
                            value={formData.subTerritoryId}
                            onChange={handleChange}
                          />

                          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <FormInput
                              label="Street Address"
                              description="The applicant's street address"
                              placeholder="Enter your street address"
                              type="text"
                              name="streetAddress"
                              value={formData.streetAddress}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <FormInput
                            label="Plot Number"
                            description="The plot number of the applicant's residence"
                            placeholder="Enter your plot number"
                            type="text"
                            name="plotNumber"
                            value={formData.plotNumber}
                            onChange={handleChange}
                          />

                          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <FormInput
                              label="Nearest Landmark"
                              description="A nearby landmark for easier identification"
                              placeholder="Enter nearest landmark"
                              type="text"
                              name="nearestLandMark"
                              value={formData.nearestLandMark}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <section className="flex flex-col justify-center items-end px-16 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                          <div className="flex gap-4 px-8 max-w-full w-[562px] max-md:flex-wrap max-md:px-5">
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
                          <FormInput
                            label="Customer Type"
                            description="The type of customer"
                            placeholder="Enter customer type"
                            type="number"
                            name="customerType"
                            value={formData.customerType}
                            onChange={handleChange}
                          />

                          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <FormInput
                              label="Bill Delivery Method"
                              description="The preferred bill delivery method"
                              placeholder="Enter bill delivery method"
                              type="number"
                              name="billDeliveryMethod"
                              value={formData.billDeliveryMethod}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <FormInput
                            label="Customer Category"
                            description="The category of the customer"
                            placeholder="Enter customer category"
                            type="number"
                            name="customerCategory"
                            value={formData.customerCategory}
                            onChange={handleChange}
                          />
                        </div>
                        <section className="flex flex-col justify-center items-end px-16 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                          <div className="flex gap-4 px-8 max-w-full w-[562px] max-md:flex-wrap max-md:px-5">
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
            <div className="flex flex-col h-screen">
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
                        imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/282ab0917add290fc858a899d72a7723cd2b1edaa74b87f6224bde750a75c890?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        isComplete
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b54045018ad575579a22acd36a3ab79789b2d22bda7c14c51157473741f6225?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                        alt=""
                        className="shrink-0 self-start mt-6 border-solid aspect-[20] border-[5px] border-neutral-500 border-opacity-30 stroke-[5px] stroke-neutral-500 stroke-opacity-30 w-[95px]"
                      />
                      <StepItem
                        stepNumber="4"
                        stepTitle="Supporting Documents"
                        imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0618cda44dc55270c347b99023da949dd92e2e0f2510b60ba7f7e800d3824181?apiKey=27ec22b9382040ef8580a5e340d3a921&"
                      />
                    </div>
                    <div className="shrink-0 mt-8 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
                    <form
                      onSubmit={handleSubmit}
                      className="mt-8 max-md:max-w-full"
                    >
                      <FormInput
                        label="Proof of Identity"
                        description="Upload proof of identity"
                        placeholder="Upload proof of identity"
                        type="file"
                        name="proofOfIdentity"
                        value={formData.proofOfIdentity}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Proof of Ownership"
                        description="Upload proof of ownership"
                        placeholder="Upload proof of ownership"
                        type="file"
                        name="proofOfOwnerShip"
                        value={formData.proofOfOwnerShip}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Proof of Installation Site"
                        description="Upload proof of installation site"
                        placeholder="Upload proof of installation site"
                        type="file"
                        name="proofOfInstallationSite"
                        value={formData.proofOfInstallationSite}
                        onChange={handleChange}
                      />
                      <FormInput
                        label="Local Authorization Document"
                        description="Upload local authorization document"
                        placeholder="Upload local authorization document"
                        type="file"
                        name="localAuthorizationDocument"
                        onChange={handleChange}
                      />
                    </form>
                  </section>
                  <footer className="flex flex-col justify-center items-end px-12 py-5 text-base font-semibold leading-6 bg-white max-md:pl-5 max-md:max-w-full">
                    <div className="flex gap-4 px-8 max-w-full w-[562px] max-md:flex-wrap max-md:px-5">
                      <button
                        className="justify-center items-center px-8 py-4 whitespace-nowrap rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5"
                        onClick={prevStep}
                      >
                        Previous
                      </button>
                      <button className="justify-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5">
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
      {renderStep()}
    </div>
  );
}

export default NewConnection;
