import React, { useState } from "react";
import RegisterCompany from "./RegisterCompany";
import ProfileCompletionForm from "./ProfileCompletionForm ";

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const moveToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      {currentStep === 1 && (
        <ProfileCompletionForm moveToNextStep={moveToNextStep} />
      )}
      {currentStep === 2 && <RegisterCompany />}
    </div>
  );
};

export default Profile;
