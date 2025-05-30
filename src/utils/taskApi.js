import { axiosAPI } from "../api";

export const getTasks = async () => {
  try {
    const { data } = await axiosAPI.get("/api/tasks");
    return data;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};

export const getTask = async (id) => {
  try {
    const { data } = await axiosAPI.get(`/api/tasks/${id}`);
    return data;
  } catch (err) {
    console.error("Error loading task", err);
  }
};

export const createTask = async (task) => {
  try {
    const { data } = await axiosAPI.post(`/api/tasks/`, task);
    return data;
  } catch (err) {
    console.error("Error creating task", err);
  }
};

export const updateTask = async (id, task) => {
  try {
    const { data } = await axiosAPI.patch(`/api/tasks/${id}`, task);
    return data;
  } catch (err) {
    console.error("Error updating task", err);
  }
};

export const deleteTask = async (id) => {
  try {
    const { data } = await axiosAPI.delete(`/api/tasks/${id}`);
    return data;
  } catch (err) {
    console.error("Error deleting task", err);
  }
};
