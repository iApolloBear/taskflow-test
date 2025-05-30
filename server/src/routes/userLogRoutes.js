const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllUserLogs,
  getUserLog,
  createUserLog,
  updateUserLog,
  deleteUserLog,
} = require("../controller/userLogController");

router.get("/", protect, getAllUserLogs);
router.get("/:id", protect, getUserLog);
router.post("/", protect, createUserLog);
router.patch("/:id", protect, updateUserLog);
router.delete("/:id", protect, deleteUserLog);

module.exports = router;
