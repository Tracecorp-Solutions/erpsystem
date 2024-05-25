import React, { useState, useRef } from "react";

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   console.log("Selected file:", file)
  // }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "25px",
        }}
      >
        <div
          className="flex justify-center"
          style={{
            background: "#fff",
            width: "80%",
            padding: "10px",
            borderRadius: "24px",
          }}
        >
          <div className="mx-auto">
            <h2
              className="text-lg font-semibold mb-2"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                fontFamily: "outFit, Sans-serif",
                color: "#505050",
              }}
            >
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <label
                    className="font-semibold"
                    style={{
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Full Name
                  </label>
                  <p
                    style={{
                      color: "#a1a1a1",
                      fontFamily: "400",
                      fontWeight: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    To personalize your experience and communicate with you
                  </p>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    style={{ padding: "10px", borderRadius: "12px" }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="font-semibold"
                    style={{
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Job Title
                  </label>
                  <p
                    style={{
                      color: "#a1a1a1",
                      fontFamily: "400",
                      fontWeight: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Provides context about your professional background and app
                    usage
                  </p>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    style={{ padding: "10px", borderRadius: "12px" }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="font-semibold"
                    style={{
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Gender
                  </label>
                  <p
                    style={{
                      color: "#a1a1a1",
                      fontFamily: "400",
                      fontWeight: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Helps us tailor certain aspects of the app according to your
                    preferences
                  </p>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    style={{ padding: "10px", borderRadius: "12px" }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label
                    className="font-semibold"
                    style={{
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Email Address
                  </label>
                  <p
                    style={{
                      color: "#a1a1a1",
                      fontFamily: "400",
                      fontWeight: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    For account verification, app updates, and communication
                    purposes
                  </p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    style={{ padding: "10px", borderRadius: "12px" }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="font-semibold"
                    style={{
                      color: "#505050",
                      fontFamily: "outFit, Sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Phone Number
                  </label>
                  <p
                    style={{
                      color: "#a1a1a1",
                      fontFamily: "400",
                      fontWeight: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    To help us reach you for account-related matters or
                    notifications
                  </p>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    style={{ padding: "10px", borderRadius: "12px" }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="font-semibold"
                    style={{
                      color: "#505050",
                      fontFamily: "outFit, San-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Date of Birth
                  </label>
                  <p
                    style={{
                      color: "#a1a1a1",
                      fontFamily: "400",
                      fontWeight: "outFit, Sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    To ensure you're of legal age and to send you special offers
                    or birthday wishes
                  </p>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    style={{ padding: "10px", borderRadius: "12px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "14px",
        }}
      >
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "start",
            width: "80%",
            borderRadius: "14px",
            background: "#fff",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <h2
              className="text-center"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                fontFamily: "outFit, Sans-serif",
                color: "#505050",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Profile Image
            </h2>
            <div
              className="w-20 h-20 md:w-32 md:h-32 bg-gray-300 rounded-full mr-4"
              style={{
                backgroundImage: `url(${imagePreview || "placeholder.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginLeft: "10px",
              }}
            ></div>
          </div>
          <div
            style={{
              marginTop: "100px",
            }}
          >
            <p
              style={{
                color: "#a1a1a1",
                fontWeight: "400",
                fontSize: "16px",
                fontFamily: "outFit, Sans-serif",
              }}
            >
              Upload a profile picture to personalize your account and help
              others recognize you within the app.
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              type="button"
              style={{
                padding: "7px 15px 7px 15px",
                background: "#4467a1",
                borderRadius: "28px",
                color: "#fff",
                marginTop: "5px",
              }}
              onClick={handleButtonClick}
            >
              Upload image
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            type="button"
            style={{
              padding: "7px 20px 7px 20px",
              background: "#4467a1",
              borderRadius: "28px",
              color: "#fff",
              marginBottom: "10px"
            }}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
