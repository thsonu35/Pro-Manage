import React, { useState } from 'react';
import './setting.css';
import Sidebar from '../slidebar/slidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic here to handle form submission
        // For example, you can validate input fields or submit data to a server
        console.log('Form submitted');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmShowPassword(!confirmShowPassword);
    };

    return (
        <div className="settings-container">
            <Sidebar />
            <div className="main-content">
                <h1 className="settings-title">Settings</h1>
                <form className="settings-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <i className="icon">
                            <FontAwesomeIcon icon={faUser} />
                        </i>
                        <input type="text" placeholder="Username" className="form-input" />
                    </div>
                    <div className="input-group">
                        <i className="icon">
                            <FontAwesomeIcon icon={faLock} />
                        </i>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="form-input"
                        />
                        <i className="toggle-password-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </i>
                    </div>
                    <div className="input-group">
                        <i className="icon">
                            <FontAwesomeIcon icon={faLock} />
                        </i>
                        <input
                            type={confirmShowPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="form-input"
                        />
                        <i className="toggle-password-icon" onClick={toggleConfirmPasswordVisibility}>
                            <FontAwesomeIcon icon={confirmShowPassword ? faEyeSlash : faEye} />
                        </i>
                    </div>
                    <button type="submit" className="update-button">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Settings;
