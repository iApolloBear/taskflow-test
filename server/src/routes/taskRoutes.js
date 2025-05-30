const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getTasks);
router.get("/:id", protect, getTask);
router.post("/", protect, createTask);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
