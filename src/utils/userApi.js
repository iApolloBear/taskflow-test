import { axiosAPI } from "../api";

export const getUsers = async () => {
  try {
    const { data } = await axiosAPI.get("/admin/users");
    return data;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};

export const updateUser = async (email, user) => {
  try {
    const res = await axiosAPI.put(`/admin/users/${email}`, user);
    return res;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};

export const deleteUser = async (email) => {
  try {
    const res = await axiosAPI.delete(`/admin/users/${email}`);
    return res;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};
