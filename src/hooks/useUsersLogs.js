import { useEffect, useState, useCallback } from "react";
import {
  getUsersLogs,
  deleteUserLog as deleteSavedUserLog,
} from "../utils/userLogApi";

export const useUsersLogs = () => {
  const [usersLogs, setUsersLogs] = useState([]);

  const loadUsersLogs = useCallback(async () => {
    try {
      const data = await getUsersLogs();
      if (data) setUsersLogs(data);
    } catch (err) {
      console.error("Error loading users logs", err);
    }
  }, []);

  const deleteUserLog = async (id) => {
    try {
      await deleteSavedUserLog(id);
      loadUsersLogs();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsersLogs();
  }, [loadUsersLogs]);

  return {
    usersLogs,
    deleteUserLog,
  };
};
