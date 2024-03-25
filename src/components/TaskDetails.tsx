import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import apiEndpoints from "../services/apiEndpoints";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorPageNotFound from "./errorPages/ErrorPageNotFound";
import ErrorComponent from "./errorPages/ErrorComponent";
import SubtaskCompletionBar from "./SubTaskCompletionBar";
import { ViewTaskResponse } from "./types/types";
import BackButton from "./BackButton";

interface TaskDetailsProps {
  isAuthenticated: boolean;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState<ViewTaskResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        setError("Error fetching task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (!isAuthenticated) {
    return <ErrorComponent />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-top h-screen">
        <div className="text-3xl text-gray-600">Loading...</div>
      </div>
    );
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
    <div className="max-w-2xl mx-auto mt-10 mb-24">
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-600">
        {task.title}
      </h1>
      <div
        className={`bg-${
          task.completed ? "green" : "amber"
        }-200 p-6 rounded-md shadow-md`}
      >
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
            <ul className="list-disc pl-6">
              {task.subTasks.map((subTask) => (
                <li key={subTask._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500"
                    checked={subTask.completed}
                    onChange={() => handleSubtaskCompletionToggle(subTask._id)}
                  />
                  <span
                    className={`ml-2 ${
                      subTask.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {subTask.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span>None</span>
          )}
        </div>
        <SubtaskCompletionBar subtasks={task.subTasks} />
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <strong className="mr-2 text-gray-700">Completed:</strong>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500"
              checked={task.completed}
              onChange={handleTaskCompletionToggle}
            />
          </div>
          <div className="space-x-4">
            <Link
              to={`/auth/edit-task/${task._id}`}
              className="text-blue-500 hover:underline"
            >
              Edit task
            </Link>
            <button
              onClick={handleDeleteClick}
              className="text-red-500 hover:underline"
            >
              Delete task
            </button>
          </div>
        </div>
      </div>
      <BackButton to="/auth/view-tasks" />
    </div>
  );
};

export default TaskDetails;
