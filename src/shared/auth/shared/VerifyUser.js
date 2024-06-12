import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function VerifyUser() {
    //state declaration
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // useNavigate hook to programmatically navigate
    //end of state declaration

    const handleVerify = async () => {
        try {
            setLoading(true);
            const email = sessionStorage.getItem("useremail");
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/VerifyUser`, {
                email,
                otp,
            });
            setFeedback('User verified successfully!');
            // call the set password screen
            navigate("/", { state: { screen: "SetPassword" } });
        } catch (error) {
            setLoading(false);
            setFeedback(`Failed ${error.response.data}` );
        }
    };

    return (
        <>
            <div className="form-intro">
                <span className="greeting">
                    <h2>Verify your account</h2>
                </span>
            </div>
            {feedback && (
                <div className={`message ${feedback.startsWith("Failed") ? "error-message" : "success-message"}`}>
                    <p>{feedback}</p>
                </div>
            )}

            <div className="form-group">
                <div className="label-desc">
                    <label htmlFor="otp">OTP:</label>
                </div>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required

                    placeholder='Enter your OTP to verify your account.'
                />
            </div>
            <button className="create-btn" onClick={handleVerify} type='submit' disabled={loading}>
                {loading ? "Verifying....." : "Verify"}
            </button>

            <p>
                Don't have an account? <button onClick={() => navigate("/", { state: { screen: "signup" } })}> Signup</button>
            </p>
        </>
    );

}

export default VerifyUser;