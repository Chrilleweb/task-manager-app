import apiService from "../services/apiService";
import apiEndpoints from "../services/apiEndpoints";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorPageNotFound from "./errorPages/ErrorPageNotFound";
import ErrorComponent from "./errorPages/ErrorComponent";

interface SubTask {
  _id: string;
  name: string;
  completed: boolean;
}

interface ViewTaskResponse {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  subTasks: SubTask[];
  assignedTo: string[];
  userName: string;
  completed: boolean;
}

interface TaskDetailsProps {
  isAuthenticated: boolean;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ isAuthenticated }) => {
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

  if (!isAuthenticated) {
    return <ErrorComponent />;
  }
  if (error || !task) {
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

  const handleTaskCompletionToggle = async () => {
    try {
      const updatedCompletedStatus = !task?.completed;

      await apiService({
        url: apiEndpoints.completeTask(id || ""),
        method: "PATCH",
        body: {
          completed: updatedCompletedStatus,
        },
      });

      console.log("Task completion request successful");

      // Update the task locally
      setTask((prevTask) =>
        prevTask ? { ...prevTask, completed: updatedCompletedStatus } : prevTask
      );
    } catch (error: any) {
      console.error("Error updating task completion:", error);
    }
  };

  const handleSubtaskCompletionToggle = async (subTaskId: string) => {
    try {
      const updatedSubtasks = task.subTasks.map((subTask) => {
        if (subTask._id === subTaskId) {
          return { ...subTask, completed: !subTask.completed };
        }
        return subTask;
      });

      await apiService({
        url: apiEndpoints.completeSubtask(id || "", subTaskId),
        method: "PATCH",
      });

      // Update the task locally
      setTask((prevTask) =>
        prevTask ? { ...prevTask, subTasks: updatedSubtasks } : prevTask
      );
    } catch (error: any) {
      console.error("Error updating subtask completion:", error);
    }
  };

  return (
    <div className="text-start mt-10 mb-24">
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
          <strong>Subtasks:</strong>
          {task.subTasks && task.subTasks.length > 0 ? (
            <ul>
              {task.subTasks.map((subTask) => (
                <li key={subTask._id}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={subTask.completed}
                      onChange={() =>
                        handleSubtaskCompletionToggle(subTask._id)
                      }
                    />
                    <span
                      className={`ml-2 ${
                        subTask.completed ? "text-green-500" : ""
                      }`}
                    >
                      {subTask.name}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <span>None</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <strong className="mr-2">Completed:</strong>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                checked={task.completed}
                onChange={handleTaskCompletionToggle}
              />
            </label>
          </div>
          <div className="text-end">
            <Link
              to={`/auth/edit-task/${task._id}`}
              className="text-blue-500 mr-4"
            >
              Edit task
            </Link>
            <button onClick={handleDeleteClick} className="text-red-500">
              Delete task
            </button>
          </div>
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
