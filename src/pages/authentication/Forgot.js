import React, { useState } from 'react';
import About from '../../components/About'; // Importing the About component

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      newPassord: '',
      repeatPassword: '',
      errorMessage: '',
      successMessage: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, newPassord, repeatPassword } = this.state;

    // Check if passwords match
    if (newPassord !== repeatPassword) {
      this.setState({ errorMessage: 'Passwords do not match' });
      return;
    }

    try {
      const response = await fetch('http://3.216.182.63:8095/ChangePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, newPassord, repeatPassword })
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      this.setState({
        successMessage: 'Password changed successfully',
        errorMessage: '',
        username: '',
        newPassord: '',
        repeatPassword: ''
      });
    } catch (error) {
      this.setState({ errorMessage: error.message, successMessage: '' });
    }
  };

  render() {
    const { username, newPassord, repeatPassword, errorMessage, successMessage } = this.state;

    return (
      <div className="flex">
        <div className="form-side">
          <div className="form-content">
            <form onSubmit={this.handleSubmit}>
              <div className="form-intro">
                <span className="greeting">
                  <h2>Change Password</h2>
                  <img src="/img/reset.png" alt="reset" />
                </span>
              </div>
              <div className="form-group">
                <div className="label-desc">
                  <label>User Email</label>
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
                  <label>New Password</label>
                </div>
                <input
                  type="password"
                  name="newPassord"
                  value={newPassord}
                  onChange={this.handleChange}
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="form-group">
                <div className="label-desc">
                  <label>Repeat Password</label>
                </div>
                <input
                  type="password"
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={this.handleChange}
                  placeholder="Repeat Password"
                  required
                />
              </div>
              <button type="submit" className="create-btn">Create Password</button>
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

export default ChangePassword;
