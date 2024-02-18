import React, { useEffect, useState } from "react";
import apiEndpoints from "../services/apiEndpoints";
import apiService from "../services/apiService";
import ErrorComponent from "./errorPages/ErrorComponent";
import { Link, useNavigate, useParams } from "react-router-dom";

interface SubTask {
  _id?: string;
  name: string;
  completed: boolean;
}

interface EditTaskProps {
  isAuthenticated: boolean;
}

const EditTask: React.FC<EditTaskProps> = ({ isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [newSubTask, setNewSubTask] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [newAssignedUser, setNewAssignedUser] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const getUserName = localStorage.getItem("username") || "";

  const formatDate = (date: string | undefined) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (!isAuthenticated) {
          setError(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setError(true);
      }
    };

    const fetchTaskDetails = async () => {
      try {
        const response = await apiService({
          url: apiEndpoints.taskDetails(id || ""),
          method: "GET",
        });

        if (response) {
          const taskDetails = response.task;

          setTitle(taskDetails.title || "");
          setDescription(taskDetails.description || "");
          setDueDate(formatDate(taskDetails.dueDate || "") || "");
          setSubTasks(taskDetails.subTasks || []);
          setAssignedTo(taskDetails.assignedTo || []);
          setCompleted(taskDetails.completed || false);
        } else {
          console.error("Invalid or empty response from the API");
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
        // Handle error, show an error message, etc.
      }
    };

    if (isAuthenticated) {
      checkAuthentication();
      fetchTaskDetails();
    }
  }, [isAuthenticated, id]);

  const handleAddSubTask = () => {
    setSubTasks((prevSubTasks) => [...prevSubTasks, { name: newSubTask, completed: false }]);
    setNewSubTask("");
  };

  const handleAddAssignedUser = () => {
    setAssignedTo((prevAssignedUsers) => [
      ...prevAssignedUsers,
      newAssignedUser,
    ]);
    setNewAssignedUser("");
  };

  const handleRemoveSubTask = (index: number) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks.splice(index, 1);
    setSubTasks(updatedSubTasks);
  };

  const handleRemoveAssignedUser = (index: number) => {
    const updatedAssignedTo = [...assignedTo];
    updatedAssignedTo.splice(index, 1);
    setAssignedTo(updatedAssignedTo);
  };

  const handleEditTask = async () => {
    try {
      const response = await apiService({
        url: apiEndpoints.editDetails(id || ""),
        method: "PUT",
        body: {
          title,
          description,
          dueDate,
          subTasks,
          userName: getUserName,
          assignedTo,
          completed,
        },
      });

      if (response) {
        setSuccess("Task edited successfully!");
        navigate(`/auth/view-task/${id}`);
      }
    } catch (error: any) {
      setSuccess(null);
    }
  };

  return (
    <div>
      {error || !isAuthenticated ? (
        <ErrorComponent />
      ) : (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md mb-24">
          <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
          {success && <div className="mb-4 text-green-600">{success}</div>}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 border rounded-md w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description:
            </label>
            <textarea
              id="description"
              className="mt-1 p-2 border rounded-md w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-600"
            >
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              className="mt-1 p-2 border rounded-md w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subTask"
              className="block text-sm font-medium text-gray-600"
            >
              Sub Tasks:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="subTask"
                className="mt-1 p-2 border rounded-md w-full"
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
              />
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
                onClick={handleAddSubTask}
              >
                Add
              </button>
            </div>
            <ul className="list-disc pl-6">
  {subTasks.map((subTask, index) => (
    <li key={index}>
      {subTask.name}
      <button
        className="text-red-500 ml-2"
        onClick={() => handleRemoveSubTask(index)}
      >
        Remove Subtask
      </button>
    </li>
  ))}
</ul>

          </div>
          <div className="mb-4">
            <label
              htmlFor="assignedTo"
              className="block text-sm font-medium text-gray-600"
            >
              Assigned To:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="assignedTo"
                className="mt-1 p-2 border rounded-md w-full"
                value={newAssignedUser}
                onChange={(e) => setNewAssignedUser(e.target.value)}
              />
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
                onClick={handleAddAssignedUser}
              >
                Add
              </button>
            </div>
            <ul className="list-disc pl-6">
              {assignedTo.map((user, index) => (
                <li key={index}>
                  {user}
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleRemoveAssignedUser(index)}
                  >
                    Remove User
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <strong>Completed:</strong> {completed}
            <input
              type="checkbox"
              id="completed"
              className="ml-2"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>
          <div className="flex justify-between">
          <Link to={`/auth/view-task/${id}`} className="text-blue-500 mr-4">
            <button className="bg-red-300 text-gray-700 px-4 py-2 rounded hover:bg-red-400">Go Back</button>
          </Link>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleEditTask}
          >
            Edit Task
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTask;
