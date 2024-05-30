import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/AuthenticateUser`,
        { username, password }
      );
      const token = response.data;
      sessionStorage.setItem("token", token);
      navigate("/profile");
    } catch (error) {
      setFeedback(`${error.response.data}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="form-intro">
        <span className="greeting">
          <h2
            style={{
              fontFamily: "sans-serif",
              marginTop: "20px",
              marginBottom: "0",
            }}
          >
            Hello
          </h2>
          <img src="/img/wave.png" alt="login" />
        </span>
      </div>
      <form onSubmit={handleLogin}>
        {feedback && (
          <div
            className={`message ${feedback.startsWith("Error") ? "error-message" : "success-message"}`}
          >
            {feedback}
          </div>
        )}
        <div className="form-group">
          <div className="label-desc">
            <label htmlFor="username">Username:</label>
          </div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <div className="label-desc">
            <label htmlFor="password">Password:</label>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={handleCheckboxChange}
            style={{ marginBottom: "2px" }}
          />
          <label htmlFor="showPassword" style={{ marginBottom: "2px" }}>
            Show Password
          </label>
        </div>
        <button type="submit" className="create-btn" disabled={loading}>
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
      <p>
        Don’t have an account? <Link to={{ pathname: "/layout", state: { screen: "signup" } }}>Register here</Link>

      </p>
    </>
  );
};

export default Login;
