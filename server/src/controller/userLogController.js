const UserLog = require("../models/UserLog.js");
const User = require("../models/User.js");

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
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const { jwtToken } = req.body;
    const user = req.user;
    await UserLog.findOneAndDelete({ user: user.userId });
    const userDb = await User.findById(user.userId);

    const newLog = await UserLog.create({
      loginTime: new Date(),
      jwtToken,
      role: user.role,
      username: generateUsername(userDb.fullName),
      ipAddress: ip,
      user: user.userId,
    });

    res.status(201).json(newLog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateUserLog = async (req, res) => {
  try {
    const userId = req.user.userId;
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

const generateUsername = (fullName) => {
  const newName = fullName.toLowerCase().replace(/ /g, "_");
  const randomNumber = Math.floor(10 + Math.random() * 90);
  return `${newName}@${randomNumber}`;
};

module.exports = {
  getAllUserLogs,
  getUserLog,
  createUserLog,
  updateUserLog,
  deleteUserLog,
};
