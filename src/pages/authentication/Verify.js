import React, { useState } from "react";
import About from "../../components/About";

function Verify({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
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
    try {
      const response = await fetch("http://3.216.182.63:8095/VerifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Call the onSubmit function passed as prop
        onSubmit(formData);
        setSuccessMessage("Verification successful!");
      } else {
        // Handle error response
        setErrorMessage(data.message || "Error verifying user.");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error verifying user:", error.message);
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex">
      <div className="form-side">
        <div className="form-content">
          <div className="form-intro">
            <span className="greeting">
              <h2>Verify Account</h2>
              <img src="/img/wave.png" alt="signup" />
            </span>
            <p>
              A one-time password (OTP) has been sent to your email address.
              Enter the code to verify your account.
            </p>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <div className="label-desc">
                <label>One-time Password</label>
              </div>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="create-btn">
              Verify Account
            </button>
          </form>
        </div>
      </div>
      <About />
    </div>
  );
}

export default Verify;
