const express = require("express");
const router = express.Router();
const { getTasks, getTask, createTask, updateTask, deleteTask } = require("../controller/taskController");

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
