import React, { useState, useEffect } from 'react';
import TodoCard from '../todocard/TodoCard';
import TaskForm from '../TaskForm/TaskForm';
import colaps from '../../../public/codicon.png';
import './board.css';
import Taskboard from '../Taskboard'

const Board = () => {

  




  const [collapsedColumns, setCollapsedColumns] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });

  const [showTaskForm, setShowTaskForm] = useState(false);
  // const [tasks, setTasks] = useState({
  //   backlog: [],
  //   todo: [],
  //  inProgress: [],
  //   done: [],
  // });

  const [currentTask, setCurrentTask] = useState(null);

  // useEffect(() => {
  //   // Function to fetch tasks from your API
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/getall');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch tasks');
  //       }
  //       const data = await response.json();
  //       // Assuming your API response returns tasks grouped by status
  //       setTasks(data); // Update tasks state with API data
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   };

  //   fetchTasks();
  // }, []); // Empty dependency array ensures the effect runs only once on mount

  const toggleCollapse = (column) => {
    setCollapsedColumns({
      ...collapsedColumns,
      [column]: !collapsedColumns[column],
    });
  };

  const handleSaveTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:3000/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Failed to save task');
      }
      const savedTask = await response.json();
      setTasks({
        ...tasks,
        [savedTask.status]: [...tasks[savedTask.status], savedTask],
      });
      setShowTaskForm(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
      const updatedTask = await response.json();
      const updatedTasks = { ...tasks };
      const taskToMove = updatedTasks[updatedTask.status].find(task => task._id === taskId);
      if (taskToMove) {
        taskToMove.status = newStatus;
        updatedTasks[updatedTask.status] = updatedTasks[updatedTask.status].filter(task => task._id !== taskId);
        updatedTasks[newStatus] = [...updatedTasks[newStatus], taskToMove];
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      const deletedTask = await response.json();
      const updatedTasks = { ...tasks };
      Object.keys(updatedTasks).forEach(column => {
        updatedTasks[column] = updatedTasks[column].filter(task => task._id !== taskId);
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="board-container">
      <h1 className="board-text">Board</h1>
      <div className="board">
        {['backlog', 'todo', 'inProgress', 'done'].map(column => (
          <div className="column" key={column}>
            <div className="column-header">
              <h3>{column.charAt(0).toUpperCase() + column.slice(1)}</h3>
              <div className="column-sub-header">
                {column === 'todo' && (
                  <span className="create-task-button" onClick={() => { setShowTaskForm(true); setCurrentTask(null); }}>
                    +
                  </span>
                )}
                <span className="collapse-icon" onClick={() => toggleCollapse(columm)}>
                  {collapsedColumns[column] ? (
                    <img src={colaps} alt="Expand" className="collapse-image" />
                  ) : (
                    <img src={colaps} alt="Collapse" className="collapse-image" />
                  )}
                </span>
              </div>
            </div>
            
            {!collapsedColumns[column] && (
              <div className="cards">
                              <Taskboard/>

                {/* {tasks[column](task => (
                  <TodoCard
                    key={task._id}
                    task={task}
                    onEdit={() => setCurrentTask(task)}
                    onDelete={() => handleDelete(task._id)}
                    onMove={(status) => handleStatusChange(task._id, status)}
                  />
                ))} */}
              </div>
            )}
          </div>
        ))}
      </div>

      {showTaskForm && (
        <div className="task-form-overlay">
          <div className="task-form-container">
            <TaskForm task={currentTask} onSave={handleSaveTask} onCancel={() => setShowTaskForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
