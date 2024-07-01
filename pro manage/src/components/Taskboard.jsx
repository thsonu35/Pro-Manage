import React, { useEffect, useState } from 'react';
import { getAllTasks } from "../services/task";
import TodoCard from './todocard/TodoCard'; // Assuming the TodoCard component is in the same directory

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getAllTasks();
      if (tasksData) {
        setTasks(tasksData);
      } else {
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.data.map((task) => (
          <TodoCard
            key={task._id}
            task={task}
            onEdit={() => console.log('Edit', task._id)}
            onDelete={() => console.log('Delete', task._id)}
            onMove={(status) => console.log('Move', task._id, status)}
          />
        ))
      )}
    </div>
  );
}
