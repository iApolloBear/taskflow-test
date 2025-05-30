import React from "react";
import { useTasks } from "../../hooks/useTasks";

const statusStyles = {
  Pending: "bg-red-200 text-red-800 px-2 py-1 rounded",
  "In Progress": "bg-yellow-200 text-yellow-800 px-2 py-1 rounded",
};

const PendingTasks = () => {
  const { pendingTasks: tasks } = useTasks();

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{task.title}</span> {/* ✅ Removed Assigned Name */}
              <span
                className={
                  statusStyles[task.status] ||
                  "bg-gray-200 text-gray-800 px-2 py-1 rounded"
                }
              >
                {task.status || "Pending"}
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No pending tasks</li>
        )}
      </ul>
    </div>
  );
};

export default PendingTasks;
