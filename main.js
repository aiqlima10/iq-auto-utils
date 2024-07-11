import React, { useState, useEffect } from 'react';

const Automation = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    // Load tasks from storage or API
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      setTasks(JSON.parse(tasksFromStorage));
    }
  }, []);

  const handleTaskClick = (task) => {
    setCurrentTask(task);
  };

  const handleTaskComplete = () => {
    // Update task status in storage or API
    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTask.id) {
        task.completed = true;
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskDelete = () => {
    // Delete task from storage or API
    const updatedTasks = tasks.filter((task) => task.id !== currentTask.id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h1>Automation</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <button onClick={() => handleTaskClick(task)}>{task.name}</button>
            {task.completed ? <span>Completed</span> : <span>Not completed</span>}
          </li>
        ))}
      </ul>
      {currentTask && (
        <div>
          <h2>{currentTask.name}</h2>
          <button onClick={handleTaskComplete}>Complete</button>
          <button onClick={handleTaskDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Automation;
