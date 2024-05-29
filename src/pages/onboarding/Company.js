import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SideOnboardingNav from '../../components/SideOnboardingNav';

function Company({ onSubmit }) {
    const user = {
      name: 'Nakitto Catherine',
      imageUrl: './img/profile-pic.png',
      imageSize: 40,
    };

    const [formData, setFormData] = useState({
      companyName: '',
      country: '',
      companyLogo: ''
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

    const countryOptions = [
      { id: '1', name: 'Uganda' },
      { id: '2', name: 'Nigeria' },
      { id: '3', name: 'Ethiopia' },
      { id: '4', name: 'South Sudan' },
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
                <h2>Register Company</h2>
                <div className="form-group">
                  <div className="label-desc">
                    <label>Company Name</label>
                    <p>To personalize your experience and communicate with you</p>
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <div className="label-desc">
                    <label>Country of Operation</label>
                    <p>Helps us tailor certain aspects of the app according to your preferences</p>
                  </div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}>
                    <option value="">Select Country</option>
                    {countryOptions.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <div className="label-desc">
                    <label>Company Logo</label>
                    <p>Upload a profile picture to personalize your account and help others recognize you within the app.</p>
                  </div>
                  <input
                    type="file"
                    name="companyLogo"
                    placeholder="Upload company logo"
                    value={formData.companyLogo}
                    onChange={handleChange}
                  />
                </div>
                <div className='CTA-btn'>
                  <button type="submit" className="create-btn">Save Company</button>
                </div>
              </form>
            </div>
          </div>
        </>
    );
}

export default Company;