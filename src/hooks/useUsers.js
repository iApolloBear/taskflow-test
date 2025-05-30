import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getUsers,
  updateUser as updateSavedUser,
  deleteUser as deleteSavedUser,
} from "../utils/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      if (data) setUsers(data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateUser = async (email, user) => {
    try {
      await updateSavedUser(email, user);
      loadUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const deleteUser = async (email) => {
    try {
      await deleteSavedUser(email);
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const userCount = useMemo(() => users.length, [users]);

  return { users, userCount, updateUser, deleteUser };
};
