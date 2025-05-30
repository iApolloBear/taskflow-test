import { useState, useEffect, useCallback, useMemo } from "react";
import { getUsers } from "../utils/userApi";

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

  const userCount = useMemo(() => users.length, [users]);

  return { users, userCount };
};
