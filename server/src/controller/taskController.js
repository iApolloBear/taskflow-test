const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = new Task({ title, description, progress });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server Error" })
  }
}

module.exports = { createTask }
