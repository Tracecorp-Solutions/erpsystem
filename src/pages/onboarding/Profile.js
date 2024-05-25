import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SideOnboardingNav from '../../components/SideOnboardingNav';

function Profile({ onSubmit }) {
  const user = {
    name: 'Nakitto Catherine',
    imageUrl: './img/profile-pic.png',
    imageSize: 40,
  };

  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    phone: '',
    amount: '',
    email: '',
    dob: '',
    profileImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Sample list of accounts (Replace with your actual data)
  const genderOptions = [
    { id: '1', name: 'Female' },
    { id: '2', name: 'Male' },
  ];

  return (
    <>
      <SideOnboardingNav />
      <div className="content">
        <div className="topnav">
          <ul>
            <li>
              <Link to="/" className="profile">
              <img
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                  width: user.imageSize,
                  height: user.imageSize
                }} />
                <span>Hello, {user.name}!</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="top-content complete-form">
          <form onSubmit={handleSubmit}>
            <h2>Complete your profile</h2>
            <div className="form-group">
              <div className="label-desc">
                <label>Full Name</label>
                <p>To personalize your experience and communicate with you</p>
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Job Title</label>
                <p>Provides context about your professional background and app usage</p>
              </div>
              <input
                type="text"
                name="jobTitle"
                placeholder="Enter your job title"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Email Address</label>
                <p>For account verification, app updates, and communication purposes</p>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Phone Number</label>
                <p>To help us reach you for account-related matters or notifications</p>
              </div>
              <input
                type="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Gender</label>
                <p>Helps us tailor certain aspects of the app according to your preferences</p>
              </div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}>
                <option value="">Select Gender</option>
                {genderOptions.map(gender => (
                  <option key={gender.id} value={gender.id}>{gender.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Date of Birth</label>
                <p>To ensure you're of legal age and to send you special offers or birthday wishes</p>
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Profile Image</label>
                <p>Upload a profile picture to personalize your account and help others recognize you within the app.</p>
              </div>
              <input
                type="file"
                name="profileImage"
                placeholder="Upload your profile image"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>
            <div className='CTA-btn'>
              <button type="submit" className="create-btn">Save Profile</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile;