import React, { useState } from 'react';
import About from '../../components/About'; // Importing the About component
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importing the About component


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://3.216.182.63:8095/AuthenticateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data);
      setSuccessMessage('Login successful!');
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse(null);
      setSuccessMessage(''); // Clear any previous success messages
      setErrorMessage('Error: Invalid username or password.'); // Display error message
    }
  };

  return (
    <div className="flex"> {/* Adding the class 'flex' */}
      <div className="form-side"> {/* Adding the class 'form-side' */}
        <div className="form-content"> {/* Adding the class 'form-content' */}
          <div className="form-intro"> {/* Adding the class 'form-intro' */}
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
                type="text"
                name="username"
                placeholder="Enter your username or email address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="label-desc">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {response && (
                <div>
                  <h2>Response:</h2>
                  <p>{JSON.stringify(response)}</p>
                </div>
              )}
            </div>
            {errorMessage && (
              <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message" style={{ color: 'green' }}>{successMessage}</div>
            )}
            <p>
              <a href="/forgot">Forgot Password?</a> {/* Replacing Link with anchor tag */}
            </p>
            <button type="submit" className="create-btn"> {/* Adding the class 'create-btn' */}
              Login
            </button>
          </form>
          <p>
            Don’t have an account? <a href="/">Register here</a> {/* Replacing Link with anchor tag */}
          </p>
        </div>
      </div>
      <About /> {/* Adding the About component */}

    </div>
  );
};

export default Login;
