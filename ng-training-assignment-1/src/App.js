// src/App.js "name": "ng-training-assignment-1",
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import TaskManager from './Components/TaskManager';
import { getTasks, addTask, updateTask, deleteTask } from './services/TaskService';

function App() {
  const [tasks, setTasks] = useState([]); // Ensure tasks is initialized as an empty array

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskList = await getTasks();
    setTasks(taskList);
  };

  const handleAddOrEditTask = async (task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await addTask(task);
    }
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleEditTask = (task) => {
    // You can implement this function to set the task to edit
    // or you can directly pass it as a prop to the TaskManager
  };

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <TaskManager
        tasks={tasks}
        onAddOrEditTask={handleAddOrEditTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}

export default App;
