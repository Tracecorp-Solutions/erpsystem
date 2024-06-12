import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SetPassword() {
    //state management
    const [formData, setFormData] = useState({
        username: sessionStorage.getItem("useremail"),
        newPassord: '',
        repeatPassword: '',
    });
    const [feedback, setFeedback] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //end of state management

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ChangePassword`, formData);
            if (response.status === 200) {

                navigate("/", { state: { screen: "login" } });
            } else {
                setLoading(false);
                setFeedback(response.data);
            }
        } catch (error) {
            setLoading(false);
            setFeedback(error.response.data);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <h2>Set Password</h2>
            {feedback}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="label-desc">
                        <label>New Password:</label>
                    </div>
                    <input type={showPassword ? "text" : "password"} name="newPassord" value={formData.newPassord} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <div className="label-desc">
                        <label>Repeat Password:</label>
                    </div>
                    <input type={showPassword ? "text" : "password"} name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input type="checkbox" checked={showPassword} onChange={handleTogglePassword} />
                    Show Password
                </div>
                <button type="submit" className="create-btn" disabled={loading}>
                    {loading ? "Setting Password ....." : "Set Password"}</button>
            </form>
        </>
    );
}
export default SetPassword;