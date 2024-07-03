import React, { useState, useEffect } from 'react';
import TodoCard from '../todocard/TodoCard';
import TaskForm from '../TaskForm/TaskForm';
import colaps from '../../../public/codicon.png';
import './board.css';
import Tasks from '../Taskboard';
import { getAllTasks } from '../../services/task';
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [change, setChange] = useState(" ");
  const notify = (data) => toast.success("status update");
  const [timeframe, setTimeframe] = useState();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [collapsedColumns, setCollapsedColumns] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getAllTasks(timeframe);
      if (tasksData) {
        setTasks(tasksData);
      } else {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [change, timeframe]);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  function handleDataFromChild(data) {
    setChange(data);
    notify(`Status changed to ${data}`);
  }



  const handleSaveTask = async (taskData) => {
    try {
      const url = taskData._id 
        ? `http://localhost:3000/api/tasks/${taskData._id}` 
        : 'http://localhost:3000/api/tasks';
      const method = taskData._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const savedTask = await response.json();
      notify(taskData._id ? "Task Updated" : "Task Created");

      setTasks(prevTasks => {
        const updatedTasks = {...prevTasks};
        if (taskData._id) {
          updatedTasks.data = updatedTasks.data.map(task => 
            task._id === savedTask._id ? savedTask : task
          );
        } else {
          updatedTasks.data = [...updatedTasks.data, savedTask];
        }
        return updatedTasks;
      });

      setShowTaskForm(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
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
      await response.json();
      setTasks(prevTasks => ({
        ...prevTasks,
        data: prevTasks.data.filter(task => task._id !== taskId)
      }));
      notify("Task Deleted");
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="board-container">
      <Toaster />
      
      <div className="select-container">
        <l className="board-text"><p1>Board</p1>
        <p className='filterbtn'>  <select id="timeframe" name="timeframe" onChange={handleTimeframeChange}>
        <option value="thisWeek">This Week</option>
          <option value="today">Today</option>
          <option value="thisMonth">This Month</option>
        </select></p></l>
      
      </div>

      <div className="board">
        {['BACKLOG', 'TO DO', 'IN PROGRESS', 'DONE'].map(column => (
          <div className="column" key={column}>
            <div className="column-header">
              <h3>{column}</h3>
              <div className="column-sub-header">
                {column === 'TO DO' && (
                  <span className="create-task-button" onClick={() => { setShowTaskForm(true); setCurrentTask(null); }}>
                    +
                  </span>
                )}
                <span className="collapse-icon" onClick={'this button collaps all the expand checklist inside todo card '}>
                  <img 
                    src={colaps} 
                   
                  />
                </span>
              </div>
            </div>
            
            {!collapsedColumns[column.toLowerCase()] && (
              <div className="cards">
                {tasks.length === 0 ? (
                  <p>No tasks found</p>
                ) : (
                  tasks.data.map((task) => (
                    task.status === column && 
                    <Tasks 
                      key={task._id}
                      id={task._id} 
                      task={task}  
                      sendDataToParent={handleDataFromChild}
                      onEdit={() => {
                        setShowTaskForm(true);
                        setCurrentTask(task);
                      }}
                      onDelete={() => handleDelete(task._id)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showTaskForm && (
        <div className="task-form-overlay">
          <div className="task-form-container">
            <TaskForm 
              task={currentTask} 
              onSave={handleSaveTask} 
              onCancel={() => {
                setShowTaskForm(false);
                setCurrentTask(null);
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
