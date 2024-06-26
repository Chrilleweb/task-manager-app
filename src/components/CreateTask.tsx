import React, { useEffect, useState } from "react";
import apiEndpoints from "../services/apiEndpoints";
import apiService from "../services/apiService";
import ErrorComponent from "./errorPages/ErrorComponent";
import { Link } from "react-router-dom";

interface CreateTaskProps {
  isAuthenticated: boolean;
}

const CreateTask: React.FC<CreateTaskProps> = ({ isAuthenticated }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(""); // Add dueDate state
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newSubTask, setNewSubTask] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [newAssignedUser, setNewAssignedUser] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [userNotFoundError, setUserNotFoundError] = useState<string>("");
  const getUserName = localStorage.getItem("username") || "";

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

    if (isAuthenticated) {
      checkAuthentication();
    }
  }, [isAuthenticated]);

  const handleAddSubTask = () => {
    setSubTasks((prevSubTasks) => [...prevSubTasks, newSubTask]);
    setNewSubTask("");
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

  const handleCreateTask = async () => {
    try {
      const subTasksArray = subTasks.map((subTask) => ({
        name: subTask,
        completed: false,
      }));
      const response = await apiService({
        url: apiEndpoints.createTask,
        method: "POST",
        body: {
          title,
          description,
          dueDate,
          subTasks: subTasksArray,
          userName: getUserName,
          assignedTo,
        }, // Include dueDate in the request body
      });

      if (response) {
        setSuccess("Task created successfully!");
        setTitle("");
        setDescription("");
        setDueDate("");
        setSubTasks([]);
        setNewSubTask("");
        setAssignedTo([]);
        setNewAssignedUser("");
      }
    } catch (error: any) {
      setSuccess(null);
    }
  };

  const handleAddAssignedUser = async () => {
    try {
      setUserNotFoundError("");
      const response = await apiService({
        url: apiEndpoints.searchUsers,
        method: "GET",
      });

      if (!Array.isArray(response)) {
        console.error("Unexpected response format:", response);
        return;
      }

      const userExists = response.includes(newAssignedUser);

      if (userExists) {
        setAssignedTo((prevAssignedUsers) => [
          ...prevAssignedUsers,
          newAssignedUser,
        ]);
        setNewAssignedUser("");
      } else {
        setUserNotFoundError("User does not exist");
      }
    } catch (error: any) {
      console.error("Error adding assigned user:", error);
    }
  };

  return (
    <div>
      {error || !isAuthenticated ? (
        <ErrorComponent />
      ) : (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md mb-24">
          <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
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
              type="date" // You might want to use a date picker component here
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
                  {subTask}
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
            {userNotFoundError && (
              <p className="text-red-500 text-sm mt-1">{userNotFoundError}</p>
            )}
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
          </div>
          <Link to={"/auth/frontpage"}>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleCreateTask}
            >
              Create Task
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
