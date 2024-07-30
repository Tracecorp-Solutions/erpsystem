import React, { useState, useRef } from "react";

const RegisterCompany = ({
  HandleSubmit,
  goBack,
  userData,
  setUserData,
  loading,
  handleGoBack
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUserData({
      ...userData,
      file: file,
    });
    setImagePreview(imageUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center bg-gray">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
          Register Company
        </h1>

        <div className="p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Basic Information
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Company Name
              </label>
              <p className="text-gray-500 text-sm mb-4">
                To personalize your experience and communicate with you
              </p>
              <input
                type="text"
                name="OrganizationName"
                placeholder="Company Name"
                required
                value={userData.OrganizationName}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Country of Operation
              </label>
              <p className="text-gray-500 text-sm mb-4">
                Helps us tailor certain aspects of the app according to your
                preferences
              </p>
              <select
                name="CountryOfOperation"
                value={userData.CountryOfOperation}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                required
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Uganda">Uganda</option>
              </select>
            </div>
          </div>
        </div>
        <div className="max-w-[500px]">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[79%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch px-5 my-auto max-md:mt-10">
                <div className="text-base font-semibold leading-6 text-neutral-600">
                  Company Logo
                </div>
                <div className="mt-1 text-sm text-neutral-400">
                  Upload a company logo to customize the experience
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[21%] max-md:ml-0 max-md:w-full">
              <div
                className="w-20 h-20 bg-gray-300 rounded-full mb-4"
                style={{
                  backgroundImage: `url(${imagePreview || "/placeholder.jpg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={handleButtonClick}
              ></div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded-full"
            onClick={handleGoBack}
          >
            Review Profile
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded-full"
            onClick={HandleSubmit}
            disabled={loading}
          >
            {loading ? "Saving company information....." : "Save Company"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
