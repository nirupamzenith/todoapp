const express = require('express');
const Task = require('../Models/task');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

// Create Task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const task = new Task({ title,  dueDate, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Task
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { title, status, dueDate }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
