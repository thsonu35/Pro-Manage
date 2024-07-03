import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './share.css'; // Import your custom CSS file
import logo from '../../../public/codesandboxpromanagelogo.png';

const Sidebar = () => {
    const { id } = useParams(); // Get the taskId from URL parameters
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/share/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch task data');
                }
                const data = await response.json();
                setTaskData(data);
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        fetchTaskData();
    }, [id]);

    if (!taskData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <section className="sidebar-container">
                <div className="sidebar-header">
                    <div className="logo-container">
                        <img src={logo} alt="logo" />
                        <p className="company-name">Pro Manage</p>
                    </div>
                </div>
                <div className="task-details">
                    <p className="priority"><span>{taskData.priority} priority</span></p>
                    <p className="task-title" data-tooltip-id="title" data-tooltip-content={taskData.title} data-tooltip-variant="dark">{taskData.title}</p>
                    <p className="checklist-status"><span>Checklist</span>({taskData.checklist.filter(item => item.checked).length}/{taskData.checklist.length})</p>
                    <div className="checklist">
                        {taskData.checklist.map((item, index) => (
                            <div key={index} className="task-item">
                                <input type="checkbox" className="checkbox" checked={item.checked} readOnly />
                                <p className="task-name">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="due-date"><span className="date-label">Due Date</span><span className={`date-value ${new Date(taskData.dueDate) < new Date() ? 'exceeded' : ''}`}>{new Date(taskData.dueDate).toLocaleDateString()}</span></p>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;
