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
    const fetchFrontpageData = async () => {
      try {
        await apiService({ url: apiEndpoints.frontpage, method: "GET" });
      } catch (error) {
        console.error("Error fetching frontpage data:", error);
        setError("Error fetching data");
      }
    };

    if (isAuthenticated) {
      fetchFrontpageData();
    }
  }, [isAuthenticated]);

  if (error || !isAuthenticated) {
    return <ErrorComponent />;
  }

  return (
    <div className="mb-24">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Frontpage</h1>
        <p className="text-lg text-gray-600">This is the main page.</p>
      </div>
      <ViewTasks />
    </div>
  );
};

export default Frontpage;
