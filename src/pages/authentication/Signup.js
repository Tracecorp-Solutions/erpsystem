import React, { useState } from "react";
import About from "../../components/About";
import { Link } from "react-router-dom";

function Signup({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.fullName || !formData.email) {
      setErrorMessage("Please fill in all fields.");
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
      const response = await timeout(60000, fetch("http://3.216.182.63:8095/RegisterUser", {
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
        setErrorMessage(errorData.message || "Error registering user.");
        return;
      }

      const data = await response.json();
      console.log("Success response data:", data); // Log the parsed JSON data
      onSubmit(formData);
      setSuccessMessage("An OTP has been sent to your email. Please open your email and verify.");
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
              <h2>Hi there!</h2>
              <img src="/img/wave.png" alt="signup" />
            </span>
            <p>Get started by creating an Account</p>
          </div>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="form-group">
              <div className="label-desc">
                <label>Full name</label>
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
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
            <button type="submit" className="create-btn">
              Create an Account
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <About />
    </div>
  );
}

export default Signup;
