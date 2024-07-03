import React, { useState } from 'react';
import './setting.css';
import Sidebar from '../slidebar/slidebar'; // Ensure the path matches your directory structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Settings = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [showPassword, setShowPassword] = useState(false);
    const name = localStorage.getItem('name');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const oldPassword = formData.get('oldPassword');
        const newPassword = formData.get('newPassword');

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await axios.put(
                'http://localhost:3000/api/auth/updatepassword',
                { oldPassword, newPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                }
            );

            if (response.status === 200) {
                console.log('Password updated:', response.data);
                alert('Password updated successfully!');
            } else {
                console.error('Password update failed:', response.data);
                alert('Failed to update password');
            }
        } catch (error) {
            console.error('Password update failed:', error);
            alert('Failed to update password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        <input
                            type="text"
                            name="username"
                            placeholder={name}
                            className="form-input"
                            
                        />
                    </div>
                    <div className="input-group">
                        <i className="icon">
                            <FontAwesomeIcon icon={faLock} />
                        </i>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="oldPassword"
                            placeholder="Old Password"
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
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="New Password"
                            className="form-input"
                        />
                        <i className="toggle-password-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </i>
                    </div>
                    <button type="submit" className="update-button">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Settings;
