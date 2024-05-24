import React, { useState } from 'react';
import About from '../components/About';

function VerifyAccount({ onSubmit }) {
    const [formData, setFormData] = useState({
      otp: ''
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
  
    return (
      <div className="flex">
        <div className="form-side">
          <div className="form-content">
            <div className="form-intro">
              <span className="greeting">
                <h2>Verify Account</h2>
                <img src="/img/wave.png" alt="signup" />
              </span>
              <p>A one-time password (OTP) has been sent to your email address. Enter the code to verify your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="label-desc">
                  <label>One-time Password</label>
                </div>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="create-btn">Verify Account</button>
            </form>
          </div>
        </div>
        <About />
      </div>
    );

}

export default VerifyAccount;