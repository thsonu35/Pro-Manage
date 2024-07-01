import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('Board');

    const handleLinkClick = (link) => {
        setActiveLink(link);
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
                <Link to="/logout" onClick={() => handleLinkClick('Logout')}>Logout</Link>
            </div>
        </div>
        </div>
    );
};

export default Sidebar;
