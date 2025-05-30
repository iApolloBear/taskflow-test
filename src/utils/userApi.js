import { axiosAPI } from "../api";

export const getUsers = async () => {
  try {
    const { data } = await axiosAPI.get("/admin/users");
    return data;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};
