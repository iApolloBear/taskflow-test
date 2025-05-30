import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { useTasks } from "../../hooks/useTasks";

const AdminStats = () => {
  const { userCount } = useUsers();
  const { completedTasksCount, tasksCount } = useTasks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Users */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">{userCount}</p>
      </div>

      {/* Total Tasks */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Tasks</h3>
        <p className="text-3xl font-bold text-purple-600">{tasksCount}</p>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Completed Tasks</h3>
        <p className="text-3xl font-bold text-green-600">
          {completedTasksCount}
        </p>
      </div>
    </div>
  );
};

export default AdminStats;
