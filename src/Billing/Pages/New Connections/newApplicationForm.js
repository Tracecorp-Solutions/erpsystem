import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../../shared/navigations/SideNav";
import TopNav from "../../shared/navigations/TopNav";
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
import { addCustomerType, getCustomerTypes } from "../../Apis/customerTypes";
import {
  addBillDeliveryMethod,
  getBillDeliveryMethods,
} from "../../Apis/billDeliveryMethod";


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


const NewApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [ProofOfIdentity, setProofOfIdentity] = useState(null);
  const [ProofOfOwnerShip, setProofOfOwnerShip] = useState(null);
  const [ProofOfInstallationSite, setProofOfInstallationSite] = useState(null);
  const [LocalAuthorizationDocument, setLocalAuthorizationDocument] =
    useState(null);
  const [application, setApplication] = useState({
    Title: "",
    FullName: "",
    DateOfBirth: "",
    Gender: "",
    EmailAddress: "",
    PhoneNumber: "",
    IdNumber: "",
    StateId: "",
    OperationAreaId: "",
    BranchId: "",
    TerritoryId: "",
    SubTerritoryId: "",
    StreetAddress: "",
    PlotNumber: "",
    NearestLandMark: "",
    CustomerType: "",
    BillDeliveryMethod: "",
    CustomerCategory: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [operationalAreas, setOperationalAreas] = useState([]);
  const [branches, setBranches] = useState([]);
  const [territories, setTerritories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subTerritories, setSubTerritories] = useState([]);
  const [billDeliveryMethods, setBillDeliveryMethods] = useState([]);
  const [states, setStates] = useState([]);
  const [types, setTypes] = useState([]);

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
        const types = await getCustomerTypes();
        setTypes(types);
      } catch (error) {
        console.error("Error fetching customer Types:", error);
      }

      try {
        const subTerritories = await getSubTerritories();
        setSubTerritories(subTerritories);
      } catch (error) {
        console.error("Error fetching sub-territories:", error);
      }

      try {
        const billDeliveryMethods = await getBillDeliveryMethods();
        setBillDeliveryMethods(billDeliveryMethods);
      } catch (error) {
        console.error("Error fetching bill delivery method:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleFile1Change = (e) => {
    setProofOfIdentity(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setProofOfOwnerShip(e.target.files[0]);
  };

  const handleFile3Change = (e) => {
    setProofOfInstallationSite(e.target.files[0]);
  };

  const handleFile4Change = (e) => {
    setLocalAuthorizationDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    const requiredFields = [
      "Title",
      "Gender",
      "FullName",
      "IdNumber",
      "PlotNumber",
      "PhoneNumber",
      "CustomerType",
      "EmailAddress",
      "StreetAddress",
      "BillDeliveryMethod",
    ];

    for (const field of requiredFields) {
      if (!application[field]) {
        setErrorMessage(`Please fill in the ${field} field.`);
        return;
      }
    }

    const formData = new FormData();
    formData.append("files", ProofOfIdentity);
    formData.append("files", ProofOfOwnerShip);
    formData.append("files", ProofOfInstallationSite);
    formData.append("files", LocalAuthorizationDocument);
    formData.append("Title", application.Title);
    formData.append("FullName", application.FullName);
    formData.append("DateOfBirth", application.DateOfBirth);
    formData.append("Gender", application.Gender);
    formData.append("EmailAddress", application.EmailAddress);
    formData.append("PhoneNumber", application.PhoneNumber);
    formData.append("IdNumber", application.IdNumber);
    formData.append("StateId", application.StateId);
    formData.append("OperationAreaId", application.OperationAreaId);
    formData.append("BranchId", application.BranchId);
    formData.append("TerritoryId", application.TerritoryId);
    formData.append("SubTerritoryId", application.SubTerritoryId);
    formData.append("StreetAddress", application.StreetAddress);
    formData.append("PlotNumber", application.PlotNumber);
    formData.append("NearestLandMark", application.NearestLandMark);
    formData.append("CustomerType", application.CustomerType);
    formData.append("BillDeliveryMethod", application.BillDeliveryMethod);
    formData.append("CustomerCategory", application.CustomerCategory);

    try {
      const response = await axios.post(
        "http://3.216.182.63:8095/TestApi/NewApplication",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data); // Show success message
    } catch (error) {
      setErrorMessage("Error submitting application"); // Set error message
      console.error(error);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-row ">
            {/* <SideNav /> */}
            {/* Step 1: SideNav (if any) goes here */}

            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl">
              {/* <TopNav /> */}
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
                Step 1: Basic Information on user
              </header>
              <form
                className="flex flex-col mt-6 bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                
                <div className="flex flex-col px-8 pt-8 pb-10 ml-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Title
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add your title for example Mr, Mrs, Dr
                      </p>
                      <input
                        type="text"
                        name="Title"
                        value={application.Title}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Full Name
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Please input your full names
                      </p>
                      <input
                        type="text"
                        name="FullName"
                        value={application.FullName}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Date of Birth
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Please select your date of birth
                      </p>
                      <input
                        type="date"
                        name="DateOfBirth"
                        value={application.DateOfBirth}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Gender
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Select your gender
                      </p>
                      <select
                        name="Gender"
                        value={application.Gender}
                        onChange={handleChange}
                        className="border border-gray-200 rounded-md px-3 py-2 w-72" // Adjust h-10 to increase height
                      >

                        <option value="select gender">
                          Select your gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm mt-1">
                        Please input your personal email
                      </p>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="EmailAddress"
                        value={application.EmailAddress}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Phone Number
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Please input phone number or mobile number
                      </p>
                      <input
                        type="text"
                        name="PhoneNumber"
                        value={application.PhoneNumber}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        ID Number
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Please input nationaal Id number or driving permit
                        number
                      </p>
                      <input
                        type="text"
                        name="IdNumber"
                        value={application.IdNumber}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                  </div>
                  <section className="flex flex-col justify-end items-end px-8 py-5 text-base font-semibold leading-6 whitespace-nowrap bg-gray max-md:pl-5 max-md:max-w-full">
                    <div className="flex gap-4 px-8 max-w-full w-[232px] max-md:flex-wrap max-md:px-5">
                      
                      <button
                        className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5 w-72"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </section>
                </div>
              </form>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-row">

           
            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl">
           
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
                Step 2: Additional Information
              </header>
              <form
                className="flex flex-col mt-6 bg-white rounded-2xl"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col px-5 pt-8 pb-8 ml-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="flex flex-col w-6/12 max-md:w-full">
                      <label
                        htmlFor="stateId"
                        className="font-semibold text-gray-700 mb-2"
                      >
                        State Name
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add the State name
                      </p>
                      <select
                        name="stateId"
                        value={application.StateId}
                        onChange={(e) =>
                          setApplication({
                            ...application,
                            StateId: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
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
                        htmlFor="BranchId"
                        className="font-semibold text-gray-700 mb-2"
                      >
                        Branch Name
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add the branch name
                      </p>
                      <select
                        name="BranchId"
                        value={application.BranchId}
                        onChange={(e) =>
                          setApplication({
                            ...application,
                            BranchId: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
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
                        htmlFor="operationAreaId"
                        className="font-semibold text-gray-700 mb-2"
                      >
                        Operational Area Name
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add the Operational Area
                      </p>
                      <select
                        name="OperationAreaId"
                        value={application.OperationAreaId}
                        onChange={(e) =>
                          setApplication({
                            ...application,
                            OperationAreaId: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      >
                        <option value="">Select Operation Area</option>
                        {operationalAreas.map((area) => (
                          <option key={area.id} value={area.id}>
                            {area.name}
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
                      <p className="text-gray-500 text-sm mt-1">
                        Add the territory
                      </p>
                      <select
                        name="TerritoryId"
                        value={application.TerritoryId}
                        onChange={(e) =>
                          setApplication({
                            ...application,
                            TerritoryId: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      >
                        <option value="">Select Territory</option>
                        {territories.map((territory) => (
                          <option key={territory.id} value={territory.id}>
                            {territory.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col w-6/12 max-md:w-full">
                      <label
                        htmlFor="subTerritoryId"
                        className="font-semibold text-gray-700 mb-2"
                      >
                        SubTerritory
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add the sub-territory
                      </p>
                      <select
                        name="SubTerritoryId"
                        value={application.SubTerritoryId}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      >
                        <option value="">Select SubTerritory</option>
                        {subTerritories.map((SubTerritory) => (
                          <option key={SubTerritory.id} value={SubTerritory.id}>
                            {SubTerritory.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Street Address
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add the street Address
                      </p>
                      <input
                        type="text"
                        name="StreetAddress"
                        value={application.StreetAddress}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Plot Number
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add the plot number
                      </p>
                      <input
                        type="text"
                        name="PlotNumber"
                        value={application.PlotNumber}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Nearest Landmark
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        Add nearest Landmark using longitudes and latitudes
                      </p>
                      <input
                        type="text"
                        name="NearestLandMark"
                        value={application.NearestLandMark}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      />
                    </div>
                  </div>
                  <section className="flex flex-col justify-between items-end px-8 py-5 text-base mt-12 font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                    <div className="flex gap-4 px-8 max-w-full max-md:flex-wrap max-md:px-5">
                      <button
                        className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5 w-52"
                        onClick={prevStep}
                      >
                        Previous
                      </button>
                      <button
                        className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5 w-52"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </section>
                </div>
              </form>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-row">

            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl">
             
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
                Step 3: Customer Details
              </header>
              <form
                className="flex flex-col mt-6 bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col px-8 pt-8 pb-14 ml-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="flex flex-col w-6/12 max-md:w-full">
                      <label
                        htmlFor="CustomerType"
                        className="text-sm font-medium text-gray-700 mb-1"
                      >
                        Customer Type
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        The category of the customers
                      </p>
                      <select
                        id="CustomerType"
                        name="CustomerType"
                        value={application.CustomerType}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      >
                        <option value="">Select customer type</option>
                        {types.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="BillDeliveryMethod"
                        className="text-sm font-medium text-gray-700 mb-1"
                      >
                        Bill Delivery Method
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Select how you would like to receive your bills
                      </p>
                      <select
                        id="BillDeliveryMethod"
                        name="BillDeliveryMethod"
                        value={application.BillDeliveryMethod}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      >
                        <option value="">Select bill delivery method</option>
                        {billDeliveryMethods.map((bill) => (
                          <option key={bill.id} value={bill.id}>
                            {bill.name}
                          </option>
                        ))}
                      </select>
                    </div>
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
                        id="CustomerCategory"
                        name="CustomerCategory"
                        value={application.CustomerCategory}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-72"
                      >
                        <option value="">Select customer category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <section className="flex flex-col justify-between items-end px-8 py-5 mt-12 text-base font-semibold leading-6 whitespace-nowrap bg-white max-md:pl-5 max-md:max-w-full">
                    <div className="flex gap-4 px-8 max-w-full  max-md:flex-wrap max-md:px-5">
                      <button
                        className="justify-center items-center px-8 py-4 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 text-neutral-600 max-md:px-5 w-52"
                        onClick={prevStep}
                      >
                        Previous
                      </button>
                      <button
                        className="justify-center items-center px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5 w-52"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </section>
                </div>
              </form>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-row">
         
            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl">
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
                Step 4: Attachments
              </header>
              <form
                className="flex flex-col mt-6 bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col px-8 pt-8 pb-20">
                  {errorMessage && (
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Proof of Identity
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of your identity document.
                        </p>
                      <input
                        type="file"
                        name="proofOfIdentity"
                        onChange={handleFile1Change}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Proof of Ownership
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of the ownership document.
                        </p>
                      <input
                        type="file"
                        name="ProofOfOwnerShip"
                        onChange={handleFile2Change}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Proof of Installation Site
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of the installation site
                          document.
                        </p>
                      <input
                        type="file"
                        onChange={handleFile3Change}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">
                        Local Authorization Document
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                          Attach a scanned copy of the local authorization
                          document.
                        </p>
                      <input
                        type="file"
                        name="LocalAuthorizationDocument"
                        onChange={handleFile4Change}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="mt-8 px-8 py-4 text-neutral-600 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="mt-8 px-8 py-4 text-white rounded-3xl bg-slate-500"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Progress bar or steps indicator (if desired) */}
      {/* <div className="mb-4 bg-white rounded-md shadow-md p-4">
        <span className={`text-lg font-semibold ${step >= 1 ? 'text-slate-500' : 'text-gray-400'}`}>Step 1</span>
        <span className={`text-lg font-semibold mx-4 ${step >= 2 ? 'text-slate-500' : 'text-gray-400'}`}>Step 2</span>
        <span className={`text-lg font-semibold mx-4 ${step >= 3 ? 'text-slate-500' : 'text-gray-400'}`}>Step 3</span>
        <span className={`text-lg font-semibold ${step === 4 ? 'text-slate-500' : 'text-gray-400'}`}>Step 4</span>
      </div> */}

      {/* Render the current step */}
      {renderStep()}
    </div>
  );
};

export default NewApplicationForm;
