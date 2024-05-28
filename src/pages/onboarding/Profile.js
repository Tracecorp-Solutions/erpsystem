import React, { useState } from "react";
import RegisterCompany from "./RegisterCompany";
import { CheckCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import ProfileCompletionForm from "./ProfileCompletionForm ";
import UserGroup from "./UserGroup";
// import UserInvitation from "./UserInvitation";
import CongratulationsCard from "./CongratulationMessage";
import Header from "./Header";

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    Username: "",
    FullName: "",
    OrganizationName: "",
    CountryOfOperation: "",
    Email: "",
    Verified: false,
    Active: false,
    Title: "",
    Gender: "",
    IsAdmin: false,
    PhoneNumber: "",
    DateOfBirth: "",
    file: ""
  });

  const maxSteps = 3;

  const moveToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('FullName', userData.FullName);
      formData.append('Email', userData.Email);
      formData.append('PhoneNumber', userData.PhoneNumber);
      formData.append('DateOfBirth', userData.DateOfBirth);
      formData.append('CountryOfOperation', userData.CountryOfOperation);
      formData.append('OrganizationName', userData.OrganizationName);
      formData.append('file', userData.file);
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/UpdateUserDetails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*"
          }
        }
      );
      console.log("User created:", response.data);
      moveToNextStep();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  

  return (
    <div>
      {currentStep <= maxSteps && <Header />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="col-span-1">
          {currentStep <= maxSteps && (
            <nav
              className="hidden md:flex justify-center"
              aria-label="Progress"
              style={{
                position: "relative",
                left: "1px",
                background: "#fff",
                height: "100vh",
              }}
            >
              <ol
                role="list"
                className="space-y-6"
                style={{
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                {[1, 2, 3].map(stepNumber => (
                  <li key={stepNumber}>
                    <span className="flex items-start">
                      <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                        {currentStep >= stepNumber ? (
                          <CheckCircleOutlined className="text-green-500" style={{
                            fontSize: "30px",
                          }} />
                        ) : (
                          <span
                            className="h-full w-full bg-gray-300 rounded-full flex items-center justify-center"
                            style={{ fontSize: "0.75rem", color: "#fff", padding: "15px" }}
                          >
                            {stepNumber}
                          </span>
                        )}
                      </span>
                      <span className="ml-3 text-sm font-medium text-gray-500">
                        {stepNumber === 1 && "Personal Information"}
                        {stepNumber === 2 && "Company Information"}
                        {stepNumber === 3 && "Invite Users"}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>

        <div
          style={{
            width: "80%",
            margin: "0 auto",
          }}
        >
          {currentStep === 1 && (
            <ProfileCompletionForm moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} />
          )}
          {currentStep === 2 && <RegisterCompany moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} />}
          {currentStep === 3 && <UserGroup moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} />}
          {currentStep > maxSteps && <CongratulationsCard />}

        </div>
      </div>
    </div>
  );
};

export default Profile;
