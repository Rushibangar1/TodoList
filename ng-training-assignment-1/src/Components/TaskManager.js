import React, { useState } from 'react';
import TaskForm from './TaskForm/TaskForm';
import TaskList from './TaskList/TaskList';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleTaskSubmit = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...task, id: editingTask.id } : t)));
      setEditingTask(null);
    } else {
      const newTask = { ...task, id: new Date().getTime() };
      setTasks([...tasks, newTask]);
    }
    setIsFormVisible(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleDelete = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    // Show confirmation popup
    if (window.confirm(`Are you sure you want to delete the task: "${taskToDelete.assignedTo}"?`)) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setIsFormVisible(false);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="slds-box slds-p-around_medium">
      <button 
        className="slds-button slds-button_brand slds-m-bottom_medium" 
        onClick={toggleForm}
      >
        {isFormVisible ? 'Cancel' : 'Add Task'}
      </button>
      {isFormVisible && (
        <TaskForm taskToEdit={editingTask} onSubmit={handleTaskSubmit} onCancel={handleCancel} />
      )}
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TaskManager;
