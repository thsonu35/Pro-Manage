import React, { useState, useEffect } from 'react';
import './TodoCard.css';

const TodoCard = ({ task, currentColumn, moveTask }) => {
    const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(true);

    const handleMove = (toColumn) => {
        moveTask(task.id, currentColumn, toColumn);
    };

    const toggleChecklist = () => {
        setIsChecklistCollapsed(!isChecklistCollapsed);
    };

    const completedItems = task.checklist.filter(item => item.completed).length;
    const totalItems = task.checklist.length;

    const isDueDatePassed = new Date(task.dueDate) < new Date();
    const isTaskDone = currentColumn === 'done';

    return (
        <div className="card">
            <div className="card-header">
                <span className={`priority ${task.priority}`}>{task.priority}</span>
                <h3 className="card-title">{task.title}</h3>
            </div>
            <div className="card-body">
                <p>{task.text}</p>
                {task.dueDate && (
                    <div className={`due-date ${isTaskDone ? 'done' : isDueDatePassed ? 'overdue' : ''}`}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                )}
                <div className="checklist">
                    <div className="checklist-summary" onClick={toggleChecklist}>
                        <span>{completedItems}/{totalItems} Checklist Items</span>
                        <button className="collapse-button">{isChecklistCollapsed ? 'Show' : 'Hide'} Checklist</button>
                    </div>
                    {!isChecklistCollapsed && (
                        <ul className="checklist-items">
                            {task.checklist.map((item, index) => (
                                <li key={index} className={item.completed ? 'completed' : ''}>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="card-footer">
                {currentColumn !== 'backlog' && <button onClick={() => handleMove('backlog')}>Backlog</button>}
                {currentColumn !== 'todo' && <button onClick={() => handleMove('todo')}>To Do</button>}
                {currentColumn !== 'inProgress' && <button onClick={() => handleMove('inProgress')}>In Progress</button>}
                {currentColumn !== 'done' && <button onClick={() => handleMove('done')}>Done</button>}
            </div>
        </div>
    );
};

export default TodoCard;
