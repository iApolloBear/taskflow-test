import { useState, useEffect, useMemo } from "react";
import { FaBan, FaCheck, FaPen } from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editedData, setEditedData] = useState({ title: "", description: "", progress: 0 });
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed", progress: 100 } : task
    );
    saveTaskState(updatedTasks);
  };

  const saveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...editedData } : task
    );
    saveTaskState(updatedTasks);
    cancelEdit();
  }

  const saveTaskState = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const startEditing = (task) => {
    setEditTask(task.id);
    setEditedData({ title: task.title, description: task.description, progress: task.progress });
  };

  const cancelEdit = () => {
    setEditTask(null);
    setEditedData({});
  }

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleProgressChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: parseInt(e.target.value) });
  };

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchesTitle = task.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesStatus = (statusFilter === 'all') ||
      (statusFilter === 'completed' && task.progress === 100) ||
      (statusFilter === 'incomplete' && task.progress < 100);
    return matchesTitle && matchesStatus;
  }), [tasks, titleFilter, statusFilter]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Task List</h1>
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col items-start">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-600">Filter by title</label>
            <input onChange={(e) => setTitleFilter(e.target.value)} id="title" className="w-full border border-gray-300 text-gray-600 text-base rounded-lg block py-2 px-4 focus:outline-none" />
          </div>
          <div className="flex flex-col items-end">
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-600">Filter by Status</label>
            <select onChange={(e) => setStatusFilter(e.target.value)} id="status" className="border border-gray-300 text-gray-600 text-base rounded-lg block py-2.5 px-4 focus:outline-none">
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks
                .map((task) => (
                  <tr key={task.id} className="border-b">
                    <td className="p-2">
                      {editTask === task.id ? (
                        <input
                          type="text"
                          name="title"
                          value={editedData.title}
                          onChange={handleChange}
                          className="border p-1 rounded"
                        />
                      ) : (
                        task.title
                      )}
                    </td>
                    <td className="p-2">
                      {editTask === task.id ? (
                        <input
                          type="text"
                          name="description"
                          value={editedData.description}
                          onChange={handleChange}
                          className="border p-1 rounded"
                        />
                      ) : (
                        task.description
                      )}
                    </td>
                    <td className="p-2">
                      {editTask === task.id ?
                        (<>
                          <label className="block text-sm font-medium text-gray-700">Progress:</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={editedData.progress}
                            name="progress"
                            onChange={handleProgressChange}
                            className="w-full mt-2 accent-blue-600"
                          />
                          <span className="text-sm font-medium text-gray-700">{editedData.progress}% Completed</span>
                        </>)
                        : task.progress < 100 ? "Incomplete" : "Completed"}</td>
                    <td className="p-2">
                      {editTask === task.id &&
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            onClick={() => saveTask(task.id)}
                          >
                            <div className="flex items-center gap-2">
                              <FaCheck /> Save
                            </div>
                          </button>
                          <button
                            className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            onClick={() => cancelEdit()}
                          >
                            <div className="flex items-center gap-2">
                              <FaBan /> Cancel
                            </div>
                          </button>
                        </>
                      }

                      {task.progress < 100 && editTask !== task.id &&
                        <button
                          className="mr-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => completeTask(task.id)}
                        >
                          <div className="flex items-center gap-2">
                            <FaCheck /> Complete
                          </div>
                        </button>
                      }
                      {editTask !== task.id &&
                        <button
                          className="items-center justify-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => startEditing(task)}
                        >
                          <div className="flex items-center gap-2">
                            <FaPen /> Edit
                          </div>
                        </button>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>
    </div >
  )
}

export default Tasks
