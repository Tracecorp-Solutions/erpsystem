import React, { useState } from 'react';
import About from '../../components/About'; // Importing the About component
import axios from 'axios';
import { Link } from 'react-router-dom';


function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    username: '',
    newPassord: '',
    repeatPassword: ''
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://3.216.182.63:8095/ChangePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex">
      <div className="form-side">
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-intro">
              <span className="greeting">
                <h2>Change Password</h2>
                <img src="/img/reset.png" alt="reset" />
              </span>
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Username</label>
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>New Password</label>
              </div>
              <input
                type="password"
                name="newPassord"
                value={formData.newPassord}
                onChange={handleChange}
                placeholder="New PassWord"
                required
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Repeat Password</label>
              </div>
              <input
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repeat Password"
                required
              />
            </div>
            <button type="submit" className="create-btn">Change Password</button>
          </form>
          {response && (
            <div>
              <h3>Response</h3>
              <p>Status: {response.status}</p>
              <p>Message: {response.message}</p>
            </div>
          )}
        </div>
      </div>
      <About /> {/* Rendering the About component */}
    </div>
  );
}

export default ChangePasswordForm;
