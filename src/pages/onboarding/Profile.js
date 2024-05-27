import React, { useState } from "react";
import RegisterCompany from "./RegisterCompany";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import ProfileCompletionForm from "./ProfileCompletionForm ";
import UserGroup from "./UserGroup";
import UserInvitation from "./UserInvitation";
import CongratulationsCard from "./CongratulationMessage";
import Header from "./Header";

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    organizationName: "",
    countryOfOperation: "",
    email: "",
    verified: false,
    active: false,
    title: "",
    gender: "",
    isAdmin: false,
    phoneNumber: "",
    dateOfBirth: "",
    profilePic: ""
  });

  console.log("email addresses test", userData);

  const maxSteps = 4;

  const moveToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullName', userData.fullName);
      formData.append('email', userData.email);
      formData.append('phoneNumber', userData.phoneNumber);
      formData.append('dateOfBirth', userData.dateOfBirth);
      formData.append('profilePic', userData.profilePic);
      
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
                <li>
                  <span className="flex items-start">
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      {currentStep >= 1 ? (
                        <CheckCircleIcon
                          className="h-full w-full text-indigo-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-full w-full bg-gray-300"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      Personal Information
                    </span>
                  </span>
                </li>
                <li>
                  <span className="flex items-start">
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      {currentStep >= 2 ? (
                        <CheckCircleIcon
                          className="h-full w-full text-indigo-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-full w-full bg-gray-300"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      Company Information
                    </span>
                  </span>
                </li>
                <li>
                  <span className="flex items-start">
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      {currentStep >= 3 ? (
                        <CheckCircleIcon
                          className="h-full w-full text-indigo-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-full w-full bg-gray-300"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      User Groups
                    </span>
                  </span>
                </li>
                <li>
                  <span className="flex items-start">
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      {currentStep >= 4 ? (
                        <CheckCircleIcon
                          className="h-full w-full text-indigo-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-full w-full bg-gray-300"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      User Invitation
                    </span>
                  </span>
                </li>
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
          {currentStep === 2 && <RegisterCompany moveToNextStep={moveToNextStep} />}
          {currentStep === 3 && <UserGroup moveToNextStep={moveToNextStep} />}
          {currentStep === 4 && <UserInvitation moveToNextStep={moveToNextStep} />}
          {currentStep > maxSteps && <CongratulationsCard />}

        </div>
      </div>
    </div>
  );
};

export default Profile;
