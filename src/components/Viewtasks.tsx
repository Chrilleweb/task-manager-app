import React, { useEffect, useState } from "react";
import apiEndpoints from "../services/apiEndpoints";
import apiService from "../services/apiService";
import { Link } from "react-router-dom";
import { ViewTaskResponse } from "./types/types";
import SubtaskCompletionBar from "./SubTaskCompletionBar";

const ViewTasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiService({
          url: apiEndpoints.viewTasks,
          method: "GET",
        });

        if (response && response.tasks && Array.isArray(response.tasks)) {
          setTasks(response.tasks);
        }
      } catch (error: any) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen p-8">
    <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-600">
          Projects
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <Link to={`/auth/view-task/${task._id}`} key={task._id}>
              <li
                className={`p-4 rounded shadow-md ${
                  task.completed ? 'bg-green-200' : 'bg-amber-200'
                }`}
              >
                <div className="mb-4">
                  <strong className="text-xl text-slate-600">{task.title}</strong>
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
                  <strong>Subtasks completion:</strong>
                  <SubtaskCompletionBar subtasks={task.subTasks} />
                </div>
                <div className="text-gray-700 mb-2">
                  <strong>Task Status:</strong>{" "}
                  {task.completed ? "Completed" : "Not Completed"}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );  
};

export default ViewTasks;
