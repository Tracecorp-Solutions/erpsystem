import React, { useState } from 'react';
import About from '../../components/About';
import { Link } from 'react-router-dom';

function Login({ onSubmit }) {
  const [formData, setFormData] = useState({
    password: '',
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
              <h2>Hello!</h2>
              <img src="/img/wave.png" alt="signup" />
            </span>
            <p>Welcome back, you have been missed!</p>
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
            <div className="form-group">
              <div className="label-desc">
                <label>Password</label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <p><Link to="/forgot">Forgot Password?</Link></p>
            <button type="submit" className="create-btn">Login</button>
          </form>
          <p>Don’t have an account? <Link to="/signup">Register here</Link></p>
        </div>
      </div>
      <About />
    </div>
  );
}
  
export default Login;