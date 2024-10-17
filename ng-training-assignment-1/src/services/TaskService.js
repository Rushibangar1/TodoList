// src/services/taskService.js|

let tasks = [
  { id: 1, assignedTo: 'user1', status: 'Pending', dueDate: '2024-09-30', priority: 'High', comments: 'Finish the report' },
  { id: 2, assignedTo: 'user2', status: 'In Progress', dueDate: '2024-10-05', priority: 'Medium', comments: 'Start the project' },
];

export const getTasks = () => Promise.resolve([...tasks]);
// src/Services/UserService.js


export const addTask = (newTask) => {
  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  const task = { id, ...newTask };
  tasks.push(task);
  return Promise.resolve(task);
};

export const updateTask = (updatedTask) => {
  tasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
  return Promise.resolve(updatedTask);
};

export const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  return Promise.resolve();
};
