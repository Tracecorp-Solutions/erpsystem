import React, { useState } from "react";
import RegisterCompany from "./RegisterCompany";
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import ProfileCompletionForm from "./ProfileCompletionForm ";

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const moveToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="">
      <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
        <div className="col-span-1">
          <nav className="flex justify-center" aria-label="Progress" style={{
            position: "relative",
            left: "1px",
            top: "10px"
          }}>
            <ol role="list" className="space-y-6">
              <li>
                <span className="flex items-start">
                  <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                    {currentStep >= 1 ? (
                      <CheckCircleIcon className="h-full w-full text-indigo-600" aria-hidden="true" />
                    ) : (
                      <span className="h-full w-full bg-gray-300" aria-hidden="true" />
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
                      <CheckCircleIcon className="h-full w-full text-indigo-600" aria-hidden="true" />
                    ) : (
                      <span className="h-full w-full bg-gray-300" aria-hidden="true" />
                    )}
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-500">
                    Company Information
                  </span>
                </span>
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-span-1">
          {currentStep === 1 && (
            <ProfileCompletionForm moveToNextStep={moveToNextStep} />
          )}
          {currentStep === 2 && <RegisterCompany />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
