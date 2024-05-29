import React, { useState } from "react";
import About from "../../components/About";

const ResetPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear previous error or success messages when user changes input
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ResetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      setResponse(data);
      if (response.ok) {
        setSuccessMessage("Password reset successful!");
      } else {
        setErrorMessage(data.message || "Error resetting password.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Network error. Please try again later.");
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

            <div className="form-group">
              <div className="label-desc">
                <label htmlFor="email">Email Address</label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="create-btn">
              Create an Account
            </button>
          </form>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

        </div>
      </div>
      <About />
    </div>
  );
};

export default ResetPasswordComponent;
