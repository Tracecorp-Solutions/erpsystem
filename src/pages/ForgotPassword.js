import React, { useState } from 'react';
import About from '../components/About';

function ForgotPassword({ onSubmit }) {
    const [formData, setFormData] = useState({
      email: ''
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
                <h2>Forgot Password?</h2>
                <img src="/img/reset.png" alt="signup" />
              </span>
              <p>No worries! Let us send you instructions to help you reset it.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="label-desc">
                  <label>Email Address</label>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="create-btn">Send Reset Instructions</button>
            </form>
          </div>
        </div>
        <About />
      </div>
    );

}

export default ForgotPassword;