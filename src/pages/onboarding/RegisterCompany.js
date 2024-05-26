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
    <div
      style={{
        marginRight: "15px",
      }}
    >
      <h1
        style={{
          width: "80%",
          fontSize: "36px",
          color: "#505050",
          fontFamily: "outFit, Sans-serif",
          fontWeight: "600",
          textAlign: "start",
        }}
      >
        Register Company
      </h1>
      <div>
        <div
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "24px",
            paddingBottom: "30px",
          }}
        >
          <div>
            <h2
              className="text-lg font-semibold mb-2"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                fontFamily: "outFit, Sans-serif",
                color: "#505050",
              }}
            >
              Basic Information
            </h2>
            <div className="flex flex-col md:flex-row justify-between">
              <div
                className="mt-4"
                style={{
                  marginRight: "10px",
                }}
              >
                <label
                  className="font-semibold"
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Company Name
                </label>
                <br />
                <p
                  style={{
                    marginRight: "10px",
                    fontSize: "14px",
                    fontFamily: "outFit, Sans-serif",
                    fontWeight: "400",
                    marginBottom: "10px"
                  }}
                >
                  To personalize your experience and communicate with you
                </p>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-1 w-full md:w-300 mb-4 md:mb-0 mr-0 md:mr-4"
                  style={{
                    padding: "10px"
                  }}
                />
              </div>
              <div className="mt-4" style={{}}>
                <label
                  className="font-semibold"
                  style={{
                    color: "#505050",
                    fontFamily: "outFit, Sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Country of Operation
                </label>
                <br />
                <p
                  style={{
                    marginRight: "10px",
                    fontSize: "14px",
                    fontFamily: "outFit, Sans-serif",
                    fontWeight: "400",
                    marginBottom: "10px"
                  }}
                >
                  Helps us tailor certain aspects of the app according to your
                  preferences
                </p>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-1 w-full md:w-300 mb-4 md:mb-0 mr-0 md:mr-4"
                  style={{
                    padding: "10px"
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
            marginTop: "30px",
            display: "flex",
            justifyContent: "start",
            borderRadius: "14px",
            background: "#fff",
            marginBottom: "15px",
            width: "100%"
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
              marginBottom: "10px",
            }}
            onClick={handleSaveProfile}
          >
            Save Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
