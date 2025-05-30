import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const getTasks = async () => {
  try {
    const { data } = await axiosAPI.get("/api/tasks");
    return data;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};
