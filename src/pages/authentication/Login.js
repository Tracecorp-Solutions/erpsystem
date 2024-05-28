import React, { useState } from "react";
import About from "../../components/About"; // Importing the About component
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state

  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/AuthenticateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        setFeedback("Login successful!");
        // Do something after successful login, like redirecting to another page
        navigate('/profile');
      } else {
        setFeedback("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setFeedback("An error occurred while logging in");
    }
  };

  const handleCheckboxChange = () => {
    // Define handleCheckboxChange function
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <div className="form-side">
        <div className="form-content">
          <span className="greeting">
            <h2 style={{ fontFamily: 'sans-serif', marginBottom: "0px" }}>Hello</h2>
            <img src="/img/login.png" alt="login" />
          </span>
          <h5 style={{ fontFamily: 'sans-serif', marginTop: "0px" }}>Welcome back! You were missed.</h5>

          <div className="form-group mb-2">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"} // Show password if checkbox is checked
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div >
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleCheckboxChange}
              style={{ marginBottom: "2px", marginTop: "2px" }}
            />
            <label htmlFor="showPassword" style={{ marginBottom: "2px", marginTop: "2px" }}>Show Password</label>
          </div>
          {feedback && <p>{feedback}</p>}
          <button type="handleLogin" onClick={handleLogin} className="create-btn">
            Login
          </button>
          <p>Don’t have an account? <Link to="/signup">Register here</Link></p>
        </div>
      </div>
      <About />
    </div>
  );
};

export default Login;
