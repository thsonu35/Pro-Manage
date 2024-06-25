import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './sidebar.css';

const Sidebar = () => {
    
    const [activeLink, setActiveLink] = useState('Analytics');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <img src="codesandboxpromanagelogo.png" alt="pro manage" />
                <b> Pro Manage</b>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link
                            to="/dashboard"  // Specify the route to your dashboard component
                            className={activeLink === 'Board' ? 'active' : ''}
                            onClick={() => handleLinkClick('Board')}
                        >
                            <img src="layoutboard.png" alt="" />
                            <b>Board</b>
                        </Link>
                    </li>
                    <li>
                    <Link
                            to="/analytics"  // Specify the route to your analytics component
                            className={activeLink === 'Analytics' ? 'active' : ''}
                            onClick={() => handleLinkClick({Anal})}
                        >
                            <img src="databaseAnalytics.png" alt="" />
                            <b> Analytics</b>
                        </Link>
                    </li>
                    <li>
                    <Link
                            to="/setting"  // Specify the route to your analytics component
                            className={activeLink === 'Settings' ? 'active' : ''}
                            onClick={() => handleLinkClick('Settings')}
                        >
                            <img src="settingssetting.png" alt="" />
                            <b>Settings</b>
                        </Link>
                        
                    </li>
                </ul>
            </nav>
            <div className="logout">
                <img src="Logoutlogout.png" alt="" />
                <a href="#">Logout</a>
            </div>
        </div>
    );
};

export default Sidebar;
