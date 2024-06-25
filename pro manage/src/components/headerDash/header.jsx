// src/components/Header.js
import React, { useEffect, useState } from 'react';
import './header.css';

// Dummy function to simulate fetching user data
const fetchUserData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Sudhanshu' }); // Replace with actual user fetching logic
        }, 1000);
    });
};

const Header = () => {
    const [userName, setUserName] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Fetch user data when the component mounts
        fetchUserData().then(user => {
            setUserName(user.name);
        });

        // Get and format the current date
        const date = new Date();
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        setCurrentDate(date.toLocaleDateString(undefined, options));
    }, []);

    return (
        <header>
            <h3><b>Welcome! {userName}</b></h3>
            <div className="date">{currentDate}</div>
        </header>
    );
};

export default Header;
