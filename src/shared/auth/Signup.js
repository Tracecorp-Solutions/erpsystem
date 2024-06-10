import React, { useState } from 'react';
// import About from '../../components/About';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const [loading, setloading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/RegisterUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email }),
      });

      if (response.ok) {
        
        sessionStorage.setItem("useremail", email);
        navigate("/layout", { state: { screen: "verify" } });
      } else {
        const errorMessage = await response.text();
        setMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="form-intro">
        <span className="greeting">
          <h2>Hi there!</h2>
          <img src="/img/wave.png" alt="signup" />
        </span>
        <p>Get started by creating an Account</p>
      </div>
      <form onSubmit={handleSubmit}>
        {message && <div className={`message ${message.startsWith('Error') ? 'error-message' : 'success-message'}`}>{message}</div>}
        <div className="form-group">
          <div className="label-desc">
            <label htmlFor="fullName">Full name</label>
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="create-btn" disabled={loading}>

          {loading ? 'Creating account.......' : 'Create an account'}
        </button>
      </form>
      <p>

        Already have an account?<button onClick={() => navigate("/layout", { state: { screen: "login" } })}>
          Login here
        </button>

        {/* <Link to="/layout">Login</Link> */}
      </p>
    </>
  );
}

export default Signup;