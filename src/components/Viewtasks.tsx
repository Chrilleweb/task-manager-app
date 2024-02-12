import React, { useEffect, useState } from 'react';
import apiEndpoints from '../services/apiEndpoints';
import apiService from '../services/apiService';

const ViewTasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiService({ 
          url: apiEndpoints.viewTasks,
          method: 'GET'
        });
  
        console.log('Full Response:', response); // Log the entire response
  
        if (response && response.tasks && Array.isArray(response.tasks)) {
          console.log('Tasks:', response.tasks);
          setTasks(response.tasks);
        } else {
          console.error('Invalid response format:', response);
          setError('Error fetching tasks');
        }
      } catch (error: any) {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks');
      }
    };
  
    fetchTasks();
  }, []);
  
  
       

  return (
    <div className="pb-16">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">Task List</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>Title:</strong> {task.title} <br />
              <strong>Description:</strong> {task.description} <br />
              <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not specified'} <br />
              <strong>Subtasks: {task.subTasks}</strong> <br />
              <strong>Created by:</strong> {task.userName} <br />
              <strong>Status:</strong> {task.completed} <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewTasks;

