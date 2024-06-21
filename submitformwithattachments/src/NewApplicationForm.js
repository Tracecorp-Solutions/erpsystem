import React, { useState } from 'react';
import axios from 'axios';

const NewApplicationForm = () => {
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
    formData.append('file', ProofOfIdentity);
    formData.append('file', ProofOfOwnerShip);
    formData.append('file', ProofOfInstallationSite);
    formData.append('file',LocalAuthorizationDocument);
    formData.append('Title',application.Title);
    formData.append('FullName',application.FullName);
    formData.append('DateOfBirth',application.DateOfBirth);
    formData.append('Gender',application.Gender);
    formData.append('EmailAddress',application.EmailAddress);
    formData.append('PhoneNumber',application.PhoneNumber);
    formData.append('IdNumber',application.IdNumber);
    formData.append('StateId',application.StateId);
    formData.append('OperationAreaId',application.OperationAreaId);
    formData.append('BranchId',application.BranchId);
    formData.append('TerritoryId',application.TerritoryId);
    formData.append('SubTerritoryId',application.SubTerritoryId);
    formData.append('StreetAddress',application.StreetAddress);
    formData.append('PlotNumber',application.PlotNumber);
    formData.append('NearestLandMark',application.NearestLandMark);
    formData.append('CustomerType',application.CustomerType);
    formData.append('BillDeliveryMethod',application.BillDeliveryMethod);
    formData.append('CustomerCategory',application.CustomerCategory);

    try {
      const response = await axios.post('http://localhost:5102/NewApplication', formData, {
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="Title" value={application.Title} onChange={handleChange} />
      </div>
      <div>
        <label>Full Name:</label>
        <input type="text" name="FullName" value={application.FullName} onChange={handleChange} />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="DateOfBirth" value={application.DateOfBirth} onChange={handleChange} />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" name="Gender" value={application.Gender} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="EmailAddress" value={application.EmailAddress} onChange={handleChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="PhoneNumber" value={application.PhoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label>idNumber:</label>
        <input type="text" name="IdNumber" value={application.IdNumber} onChange={handleChange} />
      </div>
      <div>
        <label>stateId:</label>
        <input type="text" name="StateId" value={application.StateId} onChange={handleChange} />
      </div>
      <div>
        <label>operationAreaId:</label>
        <input type="text" name="OperationAreaId" value={application.OperationAreaId} onChange={handleChange} />
      </div>
      <div>
        <label>braanchId:</label>
        <input type="text" name="BranchId" value={application.BranchId} onChange={handleChange} />
      </div>
      <div>
        <label>territoryId:</label>
        <input type="text" name="TerritoryId" value={application.TerritoryId} onChange={handleChange} />
      </div>
      <div>
        <label>subTerritoryId:</label>
        <input type="text" name="SubTerritoryId" value={application.SubTerritoryId} onChange={handleChange} />
      </div>
      <div>
        <label>streetAddress:</label>
        <input type="text" name="StreetAddress" value={application.StreetAddress} onChange={handleChange} />
      </div>
      <div>
        <label>plotNumber:</label>
        <input type="text" name="PlotNumber" value={application.PlotNumber} onChange={handleChange} />
      </div>
      <div>
        <label>nearestLandMark:</label>
        <input type="text" name="NearestLandMark" value={application.NearestLandMark} onChange={handleChange} />
      </div>
      <div>
        <label>customerType:</label>
        <input type="text" name="CustomerType" value={application.CustomerType} onChange={handleChange} />
      </div>
      <div>
        <label>billDeliveryMethod:</label>
        <input type="text" name="BillDeliveryMethod" value={application.BillDeliveryMethod} onChange={handleChange} />
      </div>
      <div>
        <label>customerCategory:</label>
        <input type="text" name="CustomerCategory" value={application.CustomerCategory} onChange={handleChange} />
      </div>
      <div>
        <label>ProofOfIdentity:</label>
        <input type="file" name='proofOfIdentity' onChange={handleFile1Change} />
      </div>
      <div>
        <label>ProofOfOwnerShip:</label>
        <input type="file" name='ProofOfOwnerShip' onChange={handleFile2Change} />
      </div>
      <div>
        <label>ProofOfInstallationSite:</label>
        <input type="file" onChange={handleFile3Change} />
      </div>
      <div>
        <label>LocalAuthorizationDocument:</label>
        <input type="file" name='LocalAuthorizationDocument' onChange={handleFile4Change} />
      </div>
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default NewApplicationForm;
