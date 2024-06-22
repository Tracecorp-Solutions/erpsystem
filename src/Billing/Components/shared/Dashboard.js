import React, { useState } from 'react';
import axios from 'axios';

const NewApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [ProofOfIdentity, setProofOfIdentity] = useState(null);
  const [ProofOfOwnerShip, setProofOfOwnerShip] = useState(null);
  const [ProofOfInstallationSite, setProofOfInstallationSite] = useState(null);
  const [LocalAuthorizationDocument, setLocalAuthorizationDocument] = useState(null);
  const [application, setApplication] = useState({
    Title: '',
    FullName: '',
    DateOfBirth: '',
    Gender: '',
    EmailAddress: '',
    PhoneNumber: '',
    IdNumber: '',
    StateId: '',
    OperationAreaId: '',
    BranchId: '',
    TerritoryId: '',
    SubTerritoryId: '',
    StreetAddress: '',
    PlotNumber: '',
    NearestLandMark: '',
    CustomerType: '',
    BillDeliveryMethod: '',
    CustomerCategory: ''
  });

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
      'Title', 'Gender', 'FullName', 'IdNumber', 'PlotNumber',
      'PhoneNumber', 'CustomerType', 'EmailAddress', 'StreetAddress',
      'BillDeliveryMethod'
    ];

    for (const field of requiredFields) {
      if (!application[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('files', ProofOfIdentity);
    formData.append('files', ProofOfOwnerShip);
    formData.append('files', ProofOfInstallationSite);
    formData.append('files', LocalAuthorizationDocument);
    formData.append('Title', application.Title);
    formData.append('FullName', application.FullName);
    formData.append('DateOfBirth', application.DateOfBirth);
    formData.append('Gender', application.Gender);
    formData.append('EmailAddress', application.EmailAddress);
    formData.append('PhoneNumber', application.PhoneNumber);
    formData.append('IdNumber', application.IdNumber);
    formData.append('StateId', application.StateId);
    formData.append('OperationAreaId', application.OperationAreaId);
    formData.append('BranchId', application.BranchId);
    formData.append('TerritoryId', application.TerritoryId);
    formData.append('SubTerritoryId', application.SubTerritoryId);
    formData.append('StreetAddress', application.StreetAddress);
    formData.append('PlotNumber', application.PlotNumber);
    formData.append('NearestLandMark', application.NearestLandMark);
    formData.append('CustomerType', application.CustomerType);
    formData.append('BillDeliveryMethod', application.BillDeliveryMethod);
    formData.append('CustomerCategory', application.CustomerCategory);

    try {
      const response = await axios.post('http://3.216.182.63:8095/TestApi/NewApplication', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data); // Show success message
    } catch (error) {
      alert('Error submitting application'); // Show error message
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
          <div className="flex flex-row">
            {/* Step 1: SideNav (if any) goes here */}
            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                Step 1: Basic Information
              </header>
              <form className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col px-8 pt-8 pb-20 max-md:px-5 max-md:max-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-md:gap-4">
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Title</label>
                      <input type="text" name="Title" value={application.Title} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Full Name</label>
                      <input type="text" name="FullName" value={application.FullName} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Date of Birth</label>
                      <input type="date" name="DateOfBirth" value={application.DateOfBirth} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Gender</label>
                      <input type="text" name="Gender" value={application.Gender} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Email Address</label>
                      <input type="email" name="EmailAddress" value={application.EmailAddress} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Phone Number</label>
                      <input type="text" name="PhoneNumber" value={application.PhoneNumber} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">ID Number</label>
                      <input type="text" name="IdNumber" value={application.IdNumber} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">State ID</label>
                      <input type="text" name="StateId" value={application.StateId} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                  </div>
                  <button type="button" onClick={nextStep} className="mt-8 px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5">Next</button>
                </div>
              </form>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-row">
            {/* Step 2: SideNav (if any) goes here */}
            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                Step 2: Additional Information
              </header>
              <form className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col px-8 pt-8 pb-20 max-md:px-5 max-md:max-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-md:gap-4">
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Operation Area ID</label>
                      <input type="text" name="OperationAreaId" value={application.OperationAreaId} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Branch ID</label>
                      <input type="text" name="BranchId" value={application.BranchId} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Territory ID</label>
                      <input type="text" name="TerritoryId" value={application.TerritoryId} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Sub-Territory ID</label>
                      <input type="text" name="SubTerritoryId" value={application.SubTerritoryId} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="mt-8 px-8 py-4 text-neutral-600 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:px-5">Previous</button>
                    <button type="button" onClick={nextStep} className="mt-8 px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5">Next</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-row">
            {/* Step 3: SideNav (if any) goes here */}
            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                Step 3: Customer Details
              </header>
              <form className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col px-8 pt-8 pb-20 max-md:px-5 max-md:max-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-md:gap-4">
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Street Address</label>
                      <input type="text" name="StreetAddress" value={application.StreetAddress} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Plot Number</label>
                      <input type="text" name="PlotNumber" value={application.PlotNumber} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Nearest Landmark</label>
                      <input type="text" name="NearestLandMark" value={application.NearestLandMark} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Customer Type</label>
                      <input type="text" name="CustomerType" value={application.CustomerType} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Bill Delivery Method</label>
                      <input type="text" name="BillDeliveryMethod" value={application.BillDeliveryMethod} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Customer Category</label>
                      <input type="text" name="CustomerCategory" value={application.CustomerCategory} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="mt-8 px-8 py-4 text-neutral-600 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:px-5">Previous</button>
                    <button type="button" onClick={nextStep} className="mt-8 px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5">Next</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );

        
      case 4:
        return (
          <div className="flex flex-row">
            {/* Step 4: SideNav (if any) goes here */}
            <div className="flex-1 overflow-auto px-6 py-5 bg-stone-100 ml-5 rounded-3xl max-md:px-5">
              <header className="text-4xl font-semibold leading-[57.6px] text-neutral-600 max-md:max-w-full">
                Step 4: Attachments
              </header>
              <form className="flex flex-col mt-6 bg-white rounded-3xl max-md:max-w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col px-8 pt-8 pb-20 max-md:px-5 max-md:max-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-md:gap-4">
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Proof of Identity</label>
                      <input type="file" name="proofOfIdentity" onChange={handleFile1Change} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Proof of Ownership</label>
                      <input type="file" name="ProofOfOwnerShip" onChange={handleFile2Change} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Proof of Installation Site</label>
                      <input type="file" onChange={handleFile3Change} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-medium mb-2">Local Authorization Document</label>
                      <input type="file" name="LocalAuthorizationDocument" onChange={handleFile4Change} className="border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="mt-8 px-8 py-4 text-neutral-600 rounded-3xl border border-solid bg-stone-100 border-neutral-500 border-opacity-30 max-md:px-5">Previous</button>
                    <button type="submit" className="mt-8 px-8 py-4 text-white rounded-3xl bg-slate-500 max-md:px-5">Submit Application</button>
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
    <div>
      {/* Progress bar or steps indicator (if desired) */}
      <div className="mb-4 bg-white rounded-md shadow-md p-4">
        <span className={`text-lg font-semibold ${step >= 1 ? 'text-slate-500' : 'text-gray-400'}`}>Step 1</span>
        <span className={`text-lg font-semibold mx-4 ${step >= 2 ? 'text-slate-500' : 'text-gray-400'}`}>Step 2</span>
        <span className={`text-lg font-semibold mx-4 ${step >= 3 ? 'text-slate-500' : 'text-gray-400'}`}>Step 3</span>
        <span className={`text-lg font-semibold ${step === 4 ? 'text-slate-500' : 'text-gray-400'}`}>Step 4</span>
      </div>

      {/* Render the current step */}
      {renderStep()}
    </div>
  );
};

export default NewApplicationForm;
