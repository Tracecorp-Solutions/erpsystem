import React, { useState,useEffect } from "react";
import RegisterCompany from "./RegisterCompany";
import { CheckCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import ProfileCompletionForm from "./ProfileCompletionForm ";
import UserGroup from "./UserGroup";
// import UserInvitation from "./UserInvitation";
import CongratulationsCard from "./CongratulationMessage";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
// import "."

const Profile = () => {
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
  console.log("State testing ********************************");
  console.log(userData);
  console.log("State testing ********************************");
  //declare state to navigate through pages
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('token');// get token received from the login
    if (!token) {
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetUserByToken/${token}`);// get all the user details using the token
        setUserData(response.data);
        if(userData.organisation && userData.verified && userData.active && userData.isAdmin)// navigate to the dashboard if the user is active and verified
        {
          navigate('/Dashboard');
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
        <div className="">
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
            <ProfileCompletionForm moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} loading={loading} />
          )}
          {currentStep === 2 && <RegisterCompany moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} loading={loading} />}
          {currentStep === 3 && <UserGroup moveToNextStep={moveToNextStep} HandleSubmit={HandleSubmit} userData={userData} setUserData={setUserData} loading={loading} />}
          {currentStep > maxSteps && <CongratulationsCard />}

        </div>
      </div>
    </div>
  );
};

export default Profile;
