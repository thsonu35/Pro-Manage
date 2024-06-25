import React, { useState } from 'react';
import { register } from '../services/auth'; // Import your register function
import './Register.css'; // Import the CSS file
import astronautImage from '../../public/Artastronot.png';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            console.log('Registration successful:', response);
            // Redirect or show success message
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.error('User already registered');
                // Show an error message to the user
            } else {
                console.error('Registration failed:', error);
            }
        }
    };


    return (
        <div className="register-container">
            <div className="register-left">
                <div className="register-welcome">
                    <div className='img-Div'>
                    <img src='Artastronot.png' alt="Astronaut" className="astronaut-img" /></div>
                    <div className='onbording-msg'>
                    <h1>Welcome aboard my friend</h1>
                    <p>Just a couple of clicks and we start</p>
                    </div>
                  
                </div>
            </div>
            <div className="register-right">
                <div className="register-form-container">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label htmlFor="name">
                                <svg viewBox="0 0 1024 1024" className="icon">
                                    <path d="M..." />
                                </svg>
                            </label>
                            <input type="text" name="name" id="name" placeholder="Name" onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="email">
                                <svg viewBox="0 0 1024 1024" className="icon">
                                    <path d="M..." />
                                </svg>
                            </label>
                            <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">
                                <svg viewBox="0 0 1024 1024" className="icon">
                                    <path d="M..." />
                                </svg>
                            </label>
                            <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="confirmPassword">
                                <svg viewBox="0 0 1024 1024" className="icon">
                                    <path d="M..." />
                                </svg>
                            </label>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={handleChange} />
                        </div>
                        <button type="submit" onClick={handleSubmit} className="register-button">Register</button>
                    </form>
                    <footer>
                        <p>Already have an account? <a href="/login">Log in</a></p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Register;
