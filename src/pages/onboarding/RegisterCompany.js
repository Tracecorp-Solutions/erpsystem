import React, { useState, useRef } from "react";

const RegisterCompany = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    country: "",
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    // Here you can perform actions like saving the profile
    console.log("Profile saved!");
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
            <div className="flex flex-col md:flex-row" style={{
                width: "100%"
            }}>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-1 w-full md:w-auto mb-4 md:mb-0 mr-0 md:mr-4"
                style={{
                    width: "300px"
                }}
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-1 w-full md:w-auto"
                style={{
                    width: "300px"
                }}
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
              </select>
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
              Company Logo
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
              Upload Logo
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
            onClick={handleSaveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
