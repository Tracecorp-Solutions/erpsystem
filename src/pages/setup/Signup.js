import React, { useState } from 'react';
import About from '../../components/About';
import { Link } from 'react-router-dom';
import Login from './Login';

function Signup({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullname: '',
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
              <h2>Hi there!</h2>
              <img src="/img/wave.png" alt="signup" />
            </span>
            <p>Get started by creating an Account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label-desc">
                <label>Full name</label>
              </div>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Email Address</label>
              </div>
              <input
                type="text"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="create-btn">Create an Account</button>
          </form>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </div>
      <About />
    </div>
  );
}
  
export default Signup;