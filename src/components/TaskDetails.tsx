import apiService from "../services/apiService";
import apiEndpoints from "../services/apiEndpoints";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorPageNotFound from "./errorPages/ErrorPageNotFound";

interface ViewTaskResponse {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  subTasks: string[];
  assignedTo: string[];
  userName: string;
  completed: boolean;
}

const TaskDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState<ViewTaskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiService({
          url: apiEndpoints.taskDetails(id || ""),
          method: "GET",
        });

        if (response && response.task) {
          setTask(response.task);
        } else {
          setError("Invalid response");
        }
      } catch (error: any) {
        console.error("Error fetching task:", error);
        console.log(id);
        setError("Error fetching task");
      }
    };

    fetchTask();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!task) {
    return <ErrorPageNotFound />;
  }

  const handleDelete = async () => {
    try {
        await apiService({
        url: apiEndpoints.deleteTask(id || ""),
        method: "DELETE",
      });

    } catch (error: any) {
      console.error("Error deleting task:", error);
      setError("Error deleting task");
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      handleDelete();
      navigate("/auth/frontpage");
    }
  };

  return (
    <div className="text-start mt-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Task Details</h1>
      <div className="bg-slate-200 p-4 rounded shadow-md">
        <div className="mb-2">
          <strong className="text-lg">{task.title}</strong>
        </div>
        <div className="text-gray-700 mb-2">
          <strong>Created by:</strong> {task.userName}
        </div>
        <div className="text-gray-700 mb-2">
          <strong>Assigned to:</strong>{" "}
          {task.assignedTo && task.assignedTo.length > 0
            ? task.assignedTo.join(", ")
            : "None"}
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
          <strong>Status:</strong>{" "}
          {task.completed ? "Completed" : "Not Completed"}
        </div>
        <div className="text-gray-700 mb-2">
          <strong>Subtasks:</strong>
          {task.subTasks && task.subTasks.length > 0 ? (
            <ul>
              {task.subTasks.map((subTask, index) => (
                <li key={index}>{subTask}</li>
              ))}
            </ul>
          ) : (
            <span>None</span>
          )}
        </div>
        <div className="flex">
        <Link to={`/auth/edit-task/${task._id}`} className="text-blue-500">
          Edit task
          </Link>
          <button onClick={handleDeleteClick} className="text-red-500 ml-auto">
            Delete task
          </button>
          </div>
      </div>
      <Link to="/auth/frontpage" className="text-blue-500">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mt-6">
            Go back
          </button>
        </Link>
    </div>
  );
};

export default TaskDetails;
