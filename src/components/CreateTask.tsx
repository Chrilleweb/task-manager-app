import React, { useState } from 'react';
import apiEndpoints from '../services/apiEndpoints';
import apiService from '../services/apiService';

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>(''); // Add dueDate state
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newSubTask, setNewSubTask] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string[]>([]); 
  const [newAssignedUser, setNewAssignedUser] = useState<string>(''); 
  const [success, setSuccess] = useState<string | null>(null);
  const getUserName = localStorage.getItem('username') || '';

  const handleAddSubTask = () => {
    setSubTasks((prevSubTasks) => [...prevSubTasks, newSubTask]);
    setNewSubTask('');
  };

  const handleAddAssignedUser = () => {
    setAssignedTo((prevAssignedUsers) => [...prevAssignedUsers, newAssignedUser]);
    setNewAssignedUser('');
  };


  const handleCreateTask = async () => {
    try {
      const response = await apiService({
        url: apiEndpoints.createTask,
        method: 'POST',
        body: { title, description, dueDate, subTasks, userName: getUserName, assignedTo, }, // Include dueDate in the request body
      });

      if (response) {
        setSuccess('Task created successfully!');
        setTitle('');
        setDescription('');
        setDueDate('');
        setSubTasks([]);
        setNewSubTask('');
        setAssignedTo([]);
        setNewAssignedUser('');
      }
    } catch (error: any) {
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md mb-24">
      <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
      {success && (
        <div className="mb-4 text-green-600">
          {success}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
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
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-600">
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
        <label htmlFor="subTask" className="block text-sm font-medium text-gray-600">
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
            <li key={index}>{subTask}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-600">
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
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        onClick={handleCreateTask}
      >
        Create Task
      </button>
    </div>
  );
};

export default CreateTask;
