import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const RegisterCompany = ({
  HandleSubmit,
  goBack,
  userData,
  setUserData,
  loading,
  handleGoBack
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data.map((country) => country.name.common);
        setCountries(countryList.sort());
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        file: file,
      });
      setImagePreview(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // Check if company name is provided
    if (!userData.OrganizationName || !userData.OrganizationName.trim()) {
      newErrors.OrganizationName = "Company Name is required";
      valid = false;
    }

    // Check if country is selected
    if (!userData.CountryOfOperation) {
      newErrors.CountryOfOperation = "Country of Operation is required";
      valid = false;
    }

    // Check if file is uploaded
    if (!userData.file) {
      newErrors.file = "Company Logo is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      HandleSubmit(); // Proceed with form submission
    } else {
      message.error("Please fix the errors in the form.");
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        file: file,
      });
      setImagePreview(imageUrl);
      return false; // Prevent automatic upload
    },
    showUploadList: false, // Hide default upload list
  };

  return (
    <div className="flex flex-col items-center pt-8 pb-36 max-w-[700px] max-md:pb-24">
      {/* Form Content */}
      <div className="flex flex-col w-full max-w-[500px] bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <div className="text-base font-semibold text-neutral-600">Company Name</div>
          <div className="mt-1 text-sm text-neutral-400">
            To personalize your experience and communicate with you
          </div>
          <input
            type="text"
            name="OrganizationName"
            placeholder="Enter company name"
            value={userData.OrganizationName || ""}
            onChange={handleChange}
            className={`mt-2 px-4 py-2 border rounded-lg w-full ${errors.OrganizationName ? 'border-red-500' : 'border-gray-300'} text-neutral-400 bg-white`}
          />
          {errors.OrganizationName && <div className="text-red-500 text-sm mt-1">{errors.OrganizationName}</div>}
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold text-neutral-600">Country of Operation</div>
          <div className="mt-1 text-sm text-neutral-400">
            Helps us tailor certain aspects of the app according to your preferences
          </div>
          <select
            name="CountryOfOperation"
            value={userData.CountryOfOperation || ""}
            onChange={handleChange}
            className={`mt-2 px-4 py-2 border rounded-lg w-full ${errors.CountryOfOperation ? 'border-red-500' : 'border-gray-300'} text-neutral-400 bg-white`}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.CountryOfOperation && <div className="text-red-500 text-sm mt-1">{errors.CountryOfOperation}</div>}
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex flex-col flex-grow">
            <div className="text-base font-semibold text-neutral-600">Company Logo</div>
            <div className="mt-1 text-sm text-neutral-400">
              Upload a company logo to customize the experience
            </div>
          </div>
          <div
            className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              backgroundImage: `url(${imagePreview || "/placeholder.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={handleButtonClick}
          >
            {!imagePreview && (
              <UploadOutlined className="text-neutral-500 text-3xl" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {errors.file && <div className="text-red-500 text-sm mt-1">{errors.file}</div>}
        </div>

        <div className="flex justify-between mt-8">
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
            onClick={handleSubmit}
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
