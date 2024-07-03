// Sidebar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import PopupComponent from '../popup/popup'; // Adjust path as per your file structure

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('Board');
    const [showPopup, setShowPopup] = useState(false); // State for showing the popup
    const navigate = useNavigate();

    const handleLinkClick = (link) => {
        if (link === 'Logout') {
            setShowPopup(true); // Show the popup if logout link is clicked
        } else {
            setActiveLink(link);
        }
    };

    const handleOpen = () => {
        setShowPopup(true); // Show the popup if logout link is clicked
    };

    const closePopup = () => {
        setShowPopup(false); // Close the popup
    };

    const handleLogoutConfirm = () => {
        // Perform logout actions here, such as clearing session, etc.
        // Example: window.location.href = '/logout'; // Redirect to logout route
        localStorage.removeItem("token");
        console.log('Logout confirmed');
        navigate("/login");
        setShowPopup(false); // Close the popup after logout
    };

    const handleLogoutCancel = () => {
        setShowPopup(false); // Close the popup if user cancels logout
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="logo">
                    <img src="codesandboxpromanagelogo.png" alt="pro manage" />
                    <h1> Pro Manage</h1>
                </div>
                <nav>
                    <ul>
                        <li className=''>
                            <Link
                                to="/dashboard"
                                className={`${activeLink === 'Board' ? 'active' : ''} sidebar-sub-container`}
                                onClick={() => handleLinkClick('Board')}
                            >
                                <img src="layoutboard.png" alt="" />
                                <b>Board</b>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/analytics"
                                className={`${activeLink === 'Analytics' ? 'active' : ''} sidebar-sub-container`}
                                onClick={() => handleLinkClick('Analytics')}
                            >
                                <img src="databaseAnalytics.png" alt="" />
                                <b>Analytics</b>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/setting"
                                className={`${activeLink === 'Settings' ? 'active' : ''} sidebar-sub-container`}
                                onClick={() => handleLinkClick('Settings')}
                            >
                                <img src="settingssetting.png" alt="" />
                                <b>Settings</b>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="logout">
                    <img src="Logoutlogout.png" alt="Logout" />
                    <span onClick={() => handleOpen()}>Logout</span>
                </div>
            </div>
            {/* PopupComponent */}
            {showPopup && (
                <PopupComponent
                    actionText="Logout"
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                />
            )}
        </div>
    );
};

export default Sidebar;
