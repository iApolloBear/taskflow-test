import { axiosAPI } from "../api";

export const getUsersLogs = async () => {
  try {
    const { data } = await axiosAPI.get("/api/user-logs");
    return data;
  } catch (err) {
    console.error("Error loading user logs", err);
  }
};

export const createUserLog = async (userLog) => {
  try {
    const res = await axiosAPI.post("/api/user-logs", userLog);
    return res;
  } catch (err) {
    console.error("Error creating user log", err);
  }
};

export const updateUserLog = async (userLog) => {
  try {
    const res = await axiosAPI.patch("/api/user-logs", userLog);
    return res;
  } catch (err) {
    console.error("Error updating user log", err);
  }
};

export const deleteUserLog = async (id) => {
  try {
    const res = await axiosAPI.delete(`/api/user-logs/${id}`);
    return res;
  } catch (err) {
    console.error("Error deleting user log", err);
  }
};
