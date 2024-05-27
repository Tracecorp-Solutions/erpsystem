import React, { useState } from 'react';
import About from '../../components/About'; // Importing the About component

class AuthenticateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      showPassword: false // New state for toggling password visibility
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    try {
      const response = await fetch('http://3.216.182.63:8095/AuthenticateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate user');
      }

      const data = await response.json();

      this.setState({
        successMessage: 'User authenticated successfully',
        errorMessage: '',
        username: '',
        password: ''
      });

      // Handle additional actions after successful authentication, if needed

    } catch (error) {
      this.setState({ errorMessage: 'Failed to authenticate. Please try again.', successMessage: '' });
    }
  };

  render() {
    const { username, password, errorMessage, successMessage, showPassword } = this.state;

    return (
      <div className="flex">
        <div className="form-side">
          <div className="form-content">
            <form onSubmit={this.handleSubmit}>
              <div className="form-intro">
                <span className="greeting">
                  <h2>Hello</h2>
                  <img src="/img/login.png" alt="login" />
                </span>
                <h5>Welcome back! You were missed.</h5>
              </div>
              <div className="form-group">
                <div className="label-desc">
                  <label>Username</label>
                </div>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="form-group">
                <div className="label-desc">
                  <label>Password</label>
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Show password if checkbox is checked
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={this.handleCheckboxChange}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
              <button type="submit" className="create-btn">Login</button>
            </form>
            {errorMessage && <div className="error-message"><h3>Error</h3><p>{errorMessage}</p></div>}
            {successMessage && <div className="success-message"><h3>Success</h3><p>{successMessage}</p></div>}
          </div>
        </div>
        <About /> {/* Rendering the About component */}
      </div>
    );
  }
}

export default AuthenticateUser;
