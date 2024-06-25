import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth'; // Import the login function
import './login.css'; // Import the CSS file
import {toast} from 'react-hot-toast';
const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log('Login response:', response);
            
            if (response.status === 200) {
                console.log('Login successful:', response);
                navigate('/dashboard'); // Navigate to dashboard on successful login
                toast.success('Login successful');
            } else {
                
                console.error('Login error:', response);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An error occurred while logging in');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-welcome">
                    <img src="Artastronot.png" alt="Astronaut" className="astronaut-img" />
                    <h1>Welcome back</h1>
                    <p>Log in to continue your journey</p>
                </div>
            </div>
            <div className="login-right">
                <div className="login-form-container">
                    <h2>Log in</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label htmlFor="email">
                                <svg viewBox="0 0 1024 1024" className="icon">
                                    <path d="M..." />
                                </svg>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">
                                <svg viewBox="0 0 1024 1024" className="icon">
                                    <path d="M..." />
                                </svg>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>
                        <button type="submit" className="login-button">Log in</button>

                    </form>
                    <footer>
                        <p>Don't have an account?</p>
                        <a href="/register">Register</a>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
