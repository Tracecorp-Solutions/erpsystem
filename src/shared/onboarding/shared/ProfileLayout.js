import React, { useState,useEffect } from "react";
import axios from "axios";
import ProfileCompletionForm from "../../../components/onboarding/ProfileForm";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../../../components/onboarding/ProfileSidebar";
import RegisterCompany from "../../../components/onboarding/RegisterCompany";
import InviteUser from "../../../components/onboarding/InviteUser";
import CongratulationsCard from "../../../components/onboarding/CongratulationsCard";

const ProfileLayout = () => {
  const[loading,setloading] = useState(false);// set loading state
  //declare states
  const [user, setUser] = useState(null);
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
    file: ""
  });

  //declare state to navigate through pages
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('token');// get token received from the login
    console.log("Profile token", token);
    if (!token) {
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetUserByToken/${token}`);// get all the user details using the token
        setUserData(response.data);
        if(response.data.organisation && response.data.verified && response.data.active)// navigate to the dashboard if the user is active and verified
        {
          navigate('/landing');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        //navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);
  const maxSteps = 3;
  const moveToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formData = new FormData();
      formData.append('fullName', userData.fullName);
      formData.append('email', userData.email);
      formData.append('phoneNumber', userData.phoneNumber);
      formData.append('dateOfBirth', userData.dateOfBirth);
      formData.append('countryOfOperation', userData.countryOfOperation);
      formData.append('organizationName', userData.organizationName);
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
      setloading(false);// reset the state to false
      moveToNextStep();
      
    } catch (error) {
      console.error("Error creating user:", error.data);
    }
  };
  

  return (
    <div>
      {currentStep <= maxSteps && <Header userData={userData} />}
      <div
        style={{
          justifyContent: "space-between",
          display: "flex"
        }}
      >
        <ProfileSidebar currentStep={currentStep} maxSteps={maxSteps} />
        <div
          style={{
            width: "80%",
            margin: "0 auto",
          }}
        >
          {currentStep === 1 && (
            <ProfileCompletionForm moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} loading={loading} />
          )}
          {currentStep === 2 && <RegisterCompany moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} loading={loading} />}
          {currentStep === 3 && <InviteUser moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} loading={loading} />}
          {currentStep > maxSteps && <CongratulationsCard />}

        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;