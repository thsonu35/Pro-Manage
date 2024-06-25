import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../components/slidebar/slidebar';
import Header from '../components/headerDash/header';
import Board from '../components/board/board';
import TaskForm from '../components/TaskForm/TaskForm';

function Dashboard() {
    const [showTaskForm, setShowTaskForm] = useState(false);

    const handleSaveTask = (task) => {
        // Save the task (this would be done via state management or context in a real application)
        console.log('Saved task:', task);
        setShowTaskForm(false);
    };

    const handleCancelTask = () => {
        setShowTaskForm(false);
    };

    return (
        <div>
                <Sidebar />
            <div className="main-content">
        

                <Header />
                <Board />
                <Routes>
                    <Route path="board" element={
                        <>
                           
                            <button className="add-task-btn" onClick={() => setShowTaskForm(true)}>+ Add Task</button>
                            {showTaskForm && (
                                <div className="task-form-overlay">
                                    <TaskForm onSave={handleSaveTask} onCancel={handleCancelTask} />
                                </div>
                            )}
                        </>
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;
