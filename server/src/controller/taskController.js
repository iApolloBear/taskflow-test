const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message });
  }
}

const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message });
  }
}

const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask }
