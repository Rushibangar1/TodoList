// src/server.js

const express = require('express');
const bodyParser = require('body-parser');
const { getTasks, addTask, updateTask, deleteTask } = require('./Services/TaskService');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Get all tasks
app.get('/api/tasks', (req, res) => { 
  getTasks().then(tasks => res.json(tasks));
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  addTask(req.body).then(task => res.status(201).json(task));
});

// Update an existing task
app.put('/api/tasks/:id', (req, res) => {
  const updatedTask = { ...req.body, id: parseInt(req.params.id) };
  updateTask(updatedTask).then(task => res.json(task));
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  deleteTask(parseInt(req.params.id)).then(() => res.status(204).send());
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
