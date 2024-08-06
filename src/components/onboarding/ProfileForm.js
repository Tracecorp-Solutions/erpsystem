import React, { useState, useRef } from "react";

const ProfileCompletionForm = ({ HandleSubmit, userData, setUserData, loading }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

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

  const validate = () => {
    const newErrors = {};
    if (!userData.fullName) newErrors.fullName = "Full Name is required.";
    if (!userData.jobTitle) newErrors.jobTitle = "Job Title is required.";
    if (!userData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!userData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(userData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits.";
    }
    if (!userData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required.";
    else if (new Date(userData.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of Birth cannot be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      HandleSubmit(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setUserData({
        ...userData,
        phoneNumber: value,
      });
    }
  };

  // Calculate the minimum date for the date of birth (18 years ago from today)
  const today = new Date();
  const minDate = new Date(today.setFullYear(today.getFullYear() - 18));
  const minDateString = minDate.toISOString().split('T')[0]; // YYYY-MM-DD format

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={userData.jobTitle}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter job title"
            />
            {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter your email address"
              disabled
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handlePhoneNumberChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleChange}
              min={minDateString}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="bg-white p-6 rounded-2xl mt-6 flex items-center">
        <div className="flex-shrink-0 w-32 h-32 bg-gray-300 rounded-full mr-4">
          <div
            className="w-full h-full bg-cover bg-center rounded-full"
            style={{ backgroundImage: `url(${imagePreview || "placeholder.jpg"})` }}
          ></div>
        </div>
        <div className="flex-grow">
          <p className="text-gray-500 text-sm mb-2">
            Upload a profile picture to personalize your account and help others recognize you within the app.
          </p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="bg-blue-600 text-white rounded-lg px-4 py-2"
            onClick={handleButtonClick}
          >
            Upload image
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-6 py-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving Profile...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionForm;
