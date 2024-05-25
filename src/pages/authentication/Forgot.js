import React, { useState } from 'react';
import About from '../../components/About';

function Forgot({ onSubmit }) {
    const [formData, setFormData] = useState({
        "username": "",
        "newPassord": "",
        "repeatPassword": ""
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
                  <label>Email Address or username</label>
                </div>
                <input
                  type="username"
                  name="username"
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className="label-desc">
                  <label>New Password</label>
                </div>
                <input
                  type="new password"
                  name="newPassord"
                  placeholder="Enter your email address"
                  value={formData.newPassord}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className="label-desc">
                  <label>Repeat Password</label>
                </div>
                <input
                  type="repeatPassword"
                  name="repeatPassword"
                  placeholder="Enter your password again"
                  value={formData.repeatPassword}
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

export default Forgot;