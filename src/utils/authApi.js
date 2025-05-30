import { axiosAPI } from "../api";

export const login = async (loginData) => {
  try {
    const res = await axiosAPI.post("/api/auth/login", loginData);
    return res;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};

export const signUp = async (signUpData) => {
  try {
    const res = await axiosAPI.post("/api/auth/register", signUpData);
    return res;
  } catch (err) {
    console.error("Error loading tasks", err);
  }
};
