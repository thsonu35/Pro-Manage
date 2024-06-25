// src/components/analytics/Analytics.jsx

import React from 'react';
import './Analytics.css';

const Analytics = () => {
    return (
        <div className="analytics-container">
            <h1>Analytics</h1>
            <div className="analytics-cards">
                <div className="analytics-card">
                    <ul>
                        <li>Backlog Tasks <span>0</span></li>
                        <li>To-do Tasks <span>1</span></li>
                        <li>In-Progress Tasks <span>0</span></li>
                        <li>Completed Tasks <span>0</span></li>
                    </ul>
                </div>
                <div className="analytics-card">
                    <ul>
                        <li>Low Priority <span>1</span></li>
                        <li>High Priority <span>0</span></li>
                        <li>Moderate Priority <span>0</span></li>
                        <li>Due Date Tasks <span>0</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
