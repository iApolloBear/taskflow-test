import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { format } from "date-fns";
import { useUsersLogs } from "../../hooks/useUsersLogs";

const UserLogs = () => {
  const { usersLogs, deleteUserLog } = useUsersLogs();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Logs</h1>

        <div className="bg-white p-4 shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Login Time</th>
                <th className="p-2">Logout Time</th>
                <th className="p-2">JWT Token</th>
                <th className="p-2">Name</th>
                <th className="p-2">Username</th>
                <th className="p-2">Role</th>
                <th className="p-2">IP Address</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersLogs.map((userLog) => (
                <tr key={userLog.id} className="border-b">
                  <td className="p-2">
                    {format(userLog.loginTime, "d/M/yyyy, h:mm:ss a")}
                  </td>
                  <td className="p-2">
                    {userLog.logoutTime
                      ? format(userLog.logoutTime, "d/M/yyyy, h:mm:ss a")
                      : ""}
                  </td>
                  <td className="p-2">
                    <span className="inline-block break-words whitespace-pre-wrap max-w-xs font-mono">
                      {userLog.jwtToken}
                    </span>
                  </td>
                  <td className="p-2">{userLog.user.fullName}</td>
                  <td className="p-2">{userLog.username}</td>
                  <td className="p-2">{userLog.user.role}</td>
                  <td className="p-2">{userLog.ipAddress}</td>
                  <td>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                      onClick={() => deleteUserLog(userLog.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserLogs;
