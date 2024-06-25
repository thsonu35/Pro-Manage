import React, { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm'; // Import TaskForm component
import TodoCard from '../todocard/TodoCard';
import './board.css';

// Initial tasks for testing
const initialTasks = {
    backlog: [
        { id: 1, title: 'Research', text: 'Research the new project requirements.', priority: 'high', dueDate: '2024-06-20', checklist: [{ text: 'Read documents', completed: true }, { text: 'Interview stakeholders', completed: false }] },
        { id: 2, title: 'Setup', text: 'Setup the project repository.', priority: 'medium', dueDate: '2024-06-25', checklist: [{ text: 'Create repository', completed: true }, { text: 'Setup CI/CD', completed: false }] }
    ],
    todo: [
        { id: 3, title: 'Design', text: 'Create initial design mockups.', priority: 'medium', dueDate: '2024-06-30', checklist: [{ text: 'Sketch wireframes', completed: false }, { text: 'Create mockups', completed: false }] }
    ],
    inProgress: [
        { id: 4, title: 'Development', text: 'Start developing the application.', priority: 'low', dueDate: '2024-07-05', checklist: [{ text: 'Setup development environment', completed: true }, { text: 'Develop core features', completed: false }] }
    ],
    done: [
        { id: 5, title: 'Deployment', text: 'Deploy the application to the server.', priority: 'low', dueDate: '2024-06-15', checklist: [{ text: 'Setup server', completed: true }, { text: 'Deploy application', completed: true }] }
    ]
};



const Board = () => {
    const [collapsedColumns, setCollapsedColumns] = useState({
        backlog: false,
        todo: false,
        inProgress: false,
        done: false,
    });

    const [showTaskForm, setShowTaskForm] = useState(false); // State to manage showing task form
    const [tasks, setTasks] = useState(initialTasks); // State to store tasks
    const [currentColumn, setCurrentColumn] = useState(null); // State to track the current column for new task

    const toggleCollapse = (column) => {
        setCollapsedColumns({
            ...collapsedColumns,
            [column]: !collapsedColumns[column],
        });
    };

    const handleCreateTask = (column) => {
        setCurrentColumn(column); // Set the current column for new task
        setShowTaskForm(true); // Show task form when "Create Task" button is clicked
    };

    const handleSaveTask = (task) => {
        setTasks({
            ...tasks,
            [currentColumn]: [...tasks[currentColumn], { ...task, id: new Date().getTime() }] // Assign a unique ID
        }); // Add the new task to tasks array
        setShowTaskForm(false); // Hide task form after saving
    };

    const handleCancelTask = () => {
        setShowTaskForm(false); // Hide task form when cancel button is clicked
    };

    const moveTask = (taskId, fromColumn, toColumn) => {
        const taskToMove = tasks[fromColumn].find(task => task.id === taskId);
        const updatedFromColumn = tasks[fromColumn].filter(task => task.id !== taskId);
        const updatedToColumn = [...tasks[toColumn], taskToMove];

        setTasks({
            ...tasks,
            [fromColumn]: updatedFromColumn,
            [toColumn]: updatedToColumn
        });
    };

    return (
        <div className="board-container">
            <h1><b>Board</b></h1>
            <div className="board">
                {['backlog', 'todo', 'inProgress', 'done'].map(column => (
                    <div className="column" key={column}>
                        <div className="column-header">
                            <h3>{column.charAt(0).toUpperCase() + column.slice(1)}</h3>
                            {column === 'todo' && (
                                <span className="create-task-button" onClick={() => handleCreateTask(column)}>
                                    <img src='./Group10create.png' alt="Create Task" />
                                </span>
                            )}
                            <span className="collapse-icon" onClick={() => toggleCollapse(column)}>
                                {collapsedColumns[column] ? <img src="codicon_collapse-allcolaps.png" alt="" /> : <img src="codicon_collapse-allcolaps.png" alt="" /> }
                            </span>
                        </div>
                        {!collapsedColumns[column] && (
                            <div className="cards">
                                {tasks[column].map(task => (
                                    <TodoCard key={task.id} task={task} currentColumn={column} moveTask={moveTask} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Conditional rendering of TaskForm */}
            {showTaskForm && (
                <div className="task-form-overlay">
                    <div className="task-form-container">
                        <TaskForm onSave={handleSaveTask} onCancel={handleCancelTask} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board;
