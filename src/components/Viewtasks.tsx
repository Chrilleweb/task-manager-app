import React, { useEffect, useState } from "react";
import apiEndpoints from "../services/apiEndpoints";
import apiService from "../services/apiService";

const ViewTasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiService({
          url: apiEndpoints.viewTasks,
          method: "GET",
        });

        console.log("Full Response:", response); // Log the entire response

        if (response && response.tasks && Array.isArray(response.tasks)) {
          console.log("Tasks:", response.tasks);
          setTasks(response.tasks);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error: any) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="pb-16">
      <div className="text-start mt-10">
        <h1 className="text-4xl font-bold mb-4 text-center">Task List</h1>
        <ul className="grid gap-4">
          {tasks.map((task) => (
            <li key={task._id} className="bg-white p-4 rounded shadow-md">
              <div className="mb-2">
                <strong className="text-lg">{task.title}</strong>
              </div>
              <div className="text-gray-700 mb-2">
                <strong>Description:</strong> {task.description}
              </div>
              <div className="text-gray-700 mb-2">
                <strong>Due Date:</strong>{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "Not specified"}
              </div>
              <div className="text-gray-700 mb-2">
                <strong>Subtasks:</strong>{" "}
                {task.subTasks.length > 0 ? task.subTasks.join(", ") : "None"}
              </div>
              <div className="text-gray-700 mb-2">
                <strong>Created by:</strong> {task.userName}
              </div>
              <div className="text-gray-700 mb-2">
                <strong>Status:</strong>{" "}
                {task.completed ? "Completed" : "Not Completed"}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                //onClick={() => handleEditTask(task._id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewTasks;
