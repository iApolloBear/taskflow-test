import { axiosAPI } from "../api";

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
