import React, { useState } from 'react';
import About from '../../components/About'; // Importing the About component
import axios from 'axios';
import { Link } from 'react-router-dom';

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    repeatPassword: ''
  });
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState('');

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
      if (response.status === 200) {
        setMessage('Password changed successfully!');
      } else if (response.status === 400) {
        setMessage('Invalid username or passwords do not match.');
      } else {
        setMessage(data.message); // Set error message from server
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
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
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
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
          {message && (
            <div className={response && response.status === 200 ? 'success-message' : 'error-message'}>
              <h3>Response</h3>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
      <About /> {/* Rendering the About component */}
    </div>
  );
}

export default ChangePasswordForm;
