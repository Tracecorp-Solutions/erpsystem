import React, { useState } from "react";
import About from "../../components/About"; // Importing the About component
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state
  const[loading,setloading] = useState(false);// set loading state

  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    //set state to load as you call the api
    setloading(true);
    try
     {
      //call the authenticate user api
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/AuthenticateUser`,{username,password});
      const token = response.data;
      //store token in the session
      sessionStorage.setItem("token",token);
      //navigate profile to process user
      navigate('/profile');
    } catch (error) {
      setFeedback(`Error logging in ${error}`);
    }finally
    {
      setloading(false);
    }
  };

  const handleCheckboxChange = () => {
    // Define handleCheckboxChange function
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex" style={{ height: "95vh" }}> {/* Set height of the page */}
      <div className="form-side">
        <div className="form-content">
          <span className="greeting">
            <h2 style={{ fontFamily: 'sans-serif', marginTop: "20px", marginBottom: "0" }}>Hello</h2> {/* Adjust margin */}
            <img src="/img/wave.png" alt="login" />
          </span>
          {/*  */}

          <div className="form-group" style={{ marginBottom: "" }}> {/* Adjust margin */}
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field" // Apply CSS class for input fields
            />
          </div>
          <div className="form-group" style={{ marginBottom: "" }}> {/* Adjust margin */}
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"} // Show password if checkbox is checked
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field" // Apply CSS class for input fields
            />
          </div>
          <div style={{ marginBottom: "5px" }}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleCheckboxChange}
              style={{ marginBottom: "2px", }}
            />
            <label htmlFor="showPassword" style={{ marginBottom: "2px" }}>Show Password</label>
          </div>
          {feedback && <p>{feedback}</p>}
          <button id="formbutton" type="button" onClick={handleLogin} className="create-btn" disabled={loading}>
          {loading ? 'Authenticating...' : 'Login'}
          </button>
          <p>Don’t have an account? <Link to="/signup">Register here</Link></p>
        </div>
      </div>
      <About />
    </div>
  );
};

export default Login;
