import React, { useState, useEffect } from 'react';
import './setting.css';
import Sidebar from '../slidebar/slidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Settings = () => {
    const [user, setUser] = useState({});
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem(response.data.token);

            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

          

             
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const oldPassword = formData.get('oldPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');

        if (newPassword !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await axios.post('http://localhost:3000/api/auth/updatepassword', {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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
                        <input
                            type="text"
                            name="username"
                            value={userName}
                            className="form-input"
                            disabled
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
                            type={confirmShowPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="New Password"
                            className="form-input"
                        />
                        <i className="toggle-password-icon" onClick={toggleConfirmPasswordVisibility}>
                            <FontAwesomeIcon icon={confirmShowPassword ? faEyeSlash : faEye} />
                        </i>
                    </div>
                    <div className="input-group">
                        <i className="icon">
                            <FontAwesomeIcon icon={faLock} />
                        </i>
                        <input
                            type={confirmShowPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm New Password"
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
