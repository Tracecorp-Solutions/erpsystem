import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import About from '../../components/About';

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    newPassord: '',
    repeatPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ChangePassword`, formData);
      if (response.status === 200) {
        setMessage('Password changed successfully.');
        navigate('/');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="form-side">
        <div className="form-content">
          <h2>Forgot Password</h2>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label-desc">
                <label>Username:</label>
              </div>
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>New Password:</label>
              </div>
              <input type={showPassword ? "text" : "password"} name="newPassord" value={formData.newPassord} onChange={handleChange} />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Repeat Password:</label>
              </div>
              <input type={showPassword ? "text" : "password"} name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <input type="checkbox" checked={showPassword} onChange={handleTogglePassword} />
              Show Password
            </div>
            <button type="submit" className="create-btn">Submit</button>
          </form>
        </div>
      </div>
      <About /> {/* Rendering the About component */}
    </div>
  );
};

export default ForgotPasswordPage;
