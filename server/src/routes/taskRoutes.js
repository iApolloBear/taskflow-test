const express = require("express");
const router = express.Router();
const { createTask } = require("../controller/taskController");

router.post("/", createTask);

module.exports = router;
