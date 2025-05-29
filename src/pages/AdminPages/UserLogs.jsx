import React, { useState, useEffect } from "react";
import { generateLog, generateUsername } from "../../utils/userLogs";
import Sidebar from "../../components/admin/Sidebar";
import { format } from "date-fns";

const UserLogs = () => {
  const [userLogs, setUserLogs] = useState([]);

  useEffect(() => {
    fetch("https://zidio-task-management-backend.onrender.com/admin/users")
      .then((res) => res.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((user) => {
          return {
            ...user,
            ...generateLog(),
            username: generateUsername(user.fullName)
          }
        })
        setUserLogs(sortedUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const deleteUserLog = async (id) => {
    setUserLogs(userLogs.filter((log) => log._id !== id));
  };

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
              {userLogs.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-2">{format(user.loginTime, "d/M/yyyy, h:mm:ss a")}</td>
                  <td className="p-2">{format(user.logoutTime, "d/M/yyyy, h:mm:ss a")}</td>
                  <td className="p-2">
                    <span className="inline-block break-words whitespace-pre-wrap max-w-xs font-mono">
                      {user.jwtToken}
                    </span>
                  </td>
                  <td className="p-2">{user.fullName}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.ipAddress}</td>
                  <td>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                      onClick={() => deleteUserLog(user._id)}
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
  )
}

export default UserLogs
