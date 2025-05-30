import { useState, useEffect, useMemo, useCallback } from "react";
import {
  updateTask as updateSavedTask,
  createTask as createNewTask,
  deleteTask as deleteSavedTask,
  getTasks,
} from "../utils/taskApi.js";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
    progress: 0,
  });
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categorizedTasks, setCategorizedTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Completed: [],
  });

  // Fetch tasks from backend
  const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      if (data) setTasks(data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    const categorizedTasks = {
      "To Do": tasks.filter((task) => task.progress <= 40),
      "In Progress": tasks.filter(
        (task) => task.progress > 40 && task.progress <= 80,
      ),
      Completed: tasks.filter((task) => task.progress > 80),
    };
    setCategorizedTasks(categorizedTasks);
  }, [tasks]);

  const completeTask = async (id) => {
    try {
      await updateSavedTask(id, { progress: 100 });
      loadTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const createTask = async (task) => {
    try {
      await createNewTask(task);
      loadTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      cancelEdit();
    }
  };

  const updateTask = async (id) => {
    try {
      await updateSavedTask(id, editedData);
      loadTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      cancelEdit();
    }
  };

  const updateTaskData = async (id, data) => {
    try {
      await updateSavedTask(id, data);
      loadTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      cancelEdit();
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteSavedTask(id);
      loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      cancelEdit();
    }
  };

  const startEditing = (task) => {
    setEditTask(task.id);
    setEditedData({
      title: task.title,
      description: task.description,
      progress: task.progress,
    });
  };

  const cancelEdit = () => {
    setEditTask(null);
    setEditedData({});
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleProgressChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: parseInt(e.target.value) });
  };

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesTitle = task.title
          .toLowerCase()
          .includes(titleFilter.toLowerCase());
        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "completed" && task.progress === 100) ||
          (statusFilter === "incomplete" && task.progress < 100);
        return matchesTitle && matchesStatus;
      }),
    [tasks, titleFilter, statusFilter],
  );

  return {
    tasks,
    filteredTasks,
    editTask,
    editedData,
    titleFilter,
    statusFilter,
    startEditing,
    cancelEdit,
    handleChange,
    handleProgressChange,
    updateTask,
    completeTask,
    setTitleFilter,
    setStatusFilter,
    categorizedTasks,
    setCategorizedTasks,
    createTask,
    deleteTask,
    updateTaskData,
    setTasks,
  };
};
