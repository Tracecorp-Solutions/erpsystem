import React, { useState } from 'react';
import About from '../../components/About';

function Reset({ onSubmit }) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.password || !formData.confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    console.log("Form data being submitted:", formData); // Log form data before the request

    // Helper function to create a timeout promise
    const timeout = (ms, promise) => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error("Request timed out"));
        }, ms);

        promise
          .then((res) => {
            clearTimeout(timer);
            resolve(res);
          })
          .catch((err) => {
            clearTimeout(timer);
            reject(err);
          });
      });
    };

    try {
      const response = await timeout(60000, fetch("http://3.216.182.63:8095/ResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }));

      console.log("Raw response:", response); // Log the raw response

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        setErrorMessage(errorData.message || "Error resetting password.");
        return;
      }

      const data = await response.json();
      console.log("Success response data:", data); // Log the parsed JSON data
      onSubmit(formData);
      setSuccessMessage("Your password has been reset successfully.");
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage(error.message || "Network error. Please try again later.");
    }
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
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

export default Reset;
