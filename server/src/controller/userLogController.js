const UserLog = require("../models/UserLog.js");

const getAllUserLogs = async (req, res) => {
  try {
    const userLogs = await UserLog.find().populate(
      "user",
      "fullName email role",
    );
    res.json(userLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getUserLog = async (req, res) => {
  try {
    const userLog = await UserLog.findById(req.params.id);
    if (!userLog)
      return res.status(404).json({ message: "User log not found" });
    res.json(userLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const createUserLog = async (req, res) => {
  try {
    const { jwtToken, ipAddress } = req.body;
    const user = req.user;
    await UserLog.findOneAndDelete({ user: user._id });

    const newLog = await UserLog.create({
      loginTime: new Date(),
      jwtToken,
      name: user.fullName,
      role: user.role,
      ipAddress,
      user: user._id,
    });

    res.status(201).json(newLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateUserLog = async (req, res) => {
  try {
    const userId = req.user._id;
    const userLog = await UserLog.findOneAndUpdate({ user: userId }, req.body, {
      new: true,
    });
    if (!userLog)
      return res.status(404).json({ message: "User log not found" });
    res.json(userLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteUserLog = async (req, res) => {
  try {
    const userLog = await UserLog.findByIdAndDelete(req.params.id);
    if (!userLog)
      return res.status(404).json({ message: "User log not found" });
    res.json({ message: "User log deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUserLogs,
  getUserLog,
  createUserLog,
  updateUserLog,
  deleteUserLog,
};
