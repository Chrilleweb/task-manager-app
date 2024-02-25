import React, { useEffect, useState } from "react";
import ErrorComponent from "./errorPages/ErrorComponent";
import apiEndpoints from "../services/apiEndpoints";
import apiService from "../services/apiService";
import ViewTasks from "./Viewtasks";

interface FrontpageProps {
  isAuthenticated: boolean;
}

const Frontpage: React.FC<FrontpageProps> = ({ isAuthenticated }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await apiService({ url: apiEndpoints.frontpage, method: "GET" });
      } catch (error) {
        console.error("Error fetching frontpage data:", error);
        setError("Error fetching data");
      }
    };

    if (isAuthenticated) {
      fetchData();
    } else {
      setError("Not authenticated");
    }
  }, []);

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="mb-24">
      <div className="mt-10 p-8">
        <h1 className="text-center text-4xl font-bold mb-4 text-slate-600">
          Welcome to Task Manager
        </h1>
        <p className="text-lg text-gray-600">
          Organize your tasks efficiently with Task Manager. Easily manage,
          track, and complete your tasks. Stay on top of your to-do list,
          prioritize effectively, and boost your productivity. Task Manager
          simplifies task management, making it effortless to stay organized and
          focused on your goals.
        </p>
        <p className="text-lg text-gray-600">Features:</p>
        <ul className="text-left list-disc pl-6 text-gray-600">
          <li>Create and manage tasks with ease.</li>
          <li>Set due dates to stay organized and meet deadlines.</li>
          <li>Track subtasks completion for a detailed overview.</li>
          <li>Quickly identify completed tasks with the green highlight.</li>
        </ul>
      </div>
      <ViewTasks />
    </div>
  );
};

export default Frontpage;
