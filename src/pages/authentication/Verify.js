import React, { useState } from 'react';
import axios from 'axios';
import About from '../../components/About';
import { Link } from 'react-router-dom';


function VerifyUserComponent() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://3.216.182.63:8095/VerifyUser', {
        email: email,
        otp: otp
      });

      if (response.status === 200) {
        setVerificationStatus('User verified successfully!');
      } else {
        setVerificationStatus('Failed to verify user.');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setVerificationStatus('Failed to verify user.');
    }
  };

  return (
    <div className="flex">
      <div className="form-side">
        <div className="form-content">
          <div className="form-intro">
            <span className="greeting">
              <h2>Verify User</h2>
              <img src="/img/verify.png" alt="verify" />
            </span>
            <p>Enter your email and OTP to verify your account.</p>
          </div>
          <div className="form-group">
            <div className="label-desc">
              <label>Email:</label>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className="label-desc">
              <label>OTP:</label>
            </div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button className="create-btn" onClick={handleVerify}>Verify</button>
          {verificationStatus && <p>{verificationStatus}</p>}
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
      <About />
    </div>
  );
}

export default VerifyUserComponent;
