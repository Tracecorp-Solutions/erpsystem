import React, { useState } from "react";
import About from "../../components/About";
import { Link } from "react-router-dom";

function Login({ onSubmit }) {
  const [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://3.216.182.63:8095/AuthenticateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      setSuccessMessage("Login successful!");
      setErrorMessage("");
      // Assuming onSubmit function handles successful login
      onSubmit(formData);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to login. Please check your credentials.");
      setSuccessMessage("");
      // Handle error appropriately, such as displaying an error message
    }
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
            <div className="form-group mt-0">
              <div className="label-desc mt-0">
                <label> Username</label>
              </div>
              <input
                type="username"
                name="username"
                placeholder="Enter your username or email address"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div class="password-wrapper">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleTogglePassword}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              {successMessage && (
                <div style={{ color: "green" }}>{successMessage}</div>
              )}
            </div>
            <p>
              <Link to="/forgot">Forgot Password?</Link>
            </p>
            <button type="submit" className="create-btn">
              Login
            </button>
          </form>
          <p>
            Don’t have an account? <Link to="/">Register here</Link>
          </p>
        </div>
      </div>
      <About />
    </div>
  );
}

export default Login;
