import React, { useState } from "react";
import About from "../../components/About"; // Importing the About component

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://3.216.182.63:8095/AuthenticateUser",
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
            <h2 style={{ fontFamily: 'sans-serif' }}>Hello</h2>
            <img src="/img/login.png" alt="login" />
          </span>
          <h5 style={{ fontFamily: 'sans-serif' }} >Welcome back! You were missed.</h5>

          <div className="form-group">
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
          <div style={{ marginBottom: "2px", marginTop: "2px" }}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="showPassword" style={{ marginBottom: "2px", marginTop: "2px" }}>Show Password</label>
          </div>
          <button onClick={handleLogin} className="create-btn">
            Login
          </button>
          {feedback && <p>{feedback}</p>}
        </div>
      </div>
      <About />
    </div>
  );
};

export default Login;
