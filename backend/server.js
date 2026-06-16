const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// MongoDB
mongoose.connect('mongodb://localhost:27017/tasknest')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Task Model
const Task = mongoose.model('Task', {
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  tag: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do'
  }
});

// Focus Session Model
const FocusSession = mongoose.model('FocusSession', {
  start: Date,
  end: Date,
  duration: Number
});

// CREATE TASK
app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// GET TASKS
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// MOVE TO IN PROGRESS
app.put('/api/tasks/:id/start', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: 'In Progress' },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to start task' });
  }
});

// COMPLETE TASK
app.put('/api/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed' },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

// SAVE POMODORO SESSION
app.post('/api/session', async (req, res) => {
  const session = new FocusSession(req.body);
  await session.save();
  res.status(201).json(session);
});

// SERVER START
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () =>
  console.log(`Backend running on ${HOST}:${PORT}`)
);