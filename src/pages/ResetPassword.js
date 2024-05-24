import React, { useState } from 'react';
import About from '../components/About';

function ResetPassword({ onSubmit }) {
    const [formData, setFormData] = useState({
      password: '',
      confirmPassword: ''
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
                <h2>New Password</h2>
                <img src="/img/padlock.png" alt="signup" />
              </span>
              <p>Create a new password for your account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="label-desc">
                  <label>Password</label>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className="label-desc">
                  <label>Confirm Password</label>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter the same password as above"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="create-btn">Reset Password</button>
            </form>
          </div>
        </div>
        <About />
      </div>
    );

}

export default ResetPassword;