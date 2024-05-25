import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center" style={{ marginTop: "30px" }}>
      <div className="mx-auto">
        <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
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
                  style={{
                    padding: "10px",
                    borderRadius: "12px"
                  }}
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
                  style={{
                    padding: "10px",
                    borderRadius: "12px"
                  }}
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
                  style={{
                    padding: "10px",
                    borderRadius: "12px"
                  }}
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
                  style={{
                    padding: "10px",
                    borderRadius: "12px"
                  }}
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
                  style={{
                    padding: "10px",
                    borderRadius: "12px"
                  }}
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
                  style={{
                    padding: "10px",
                    borderRadius: "12px"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
