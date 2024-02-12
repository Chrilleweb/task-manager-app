import React, { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import apiEndpoints from "../services/apiEndpoints";
import apiService from "../services/apiService";

const Frontpage = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
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
    <div>
      <h1>Welcome to the Frontpage</h1>
      <p>This is the main page of your application.</p>
    </div>
  );
};

export default Frontpage;
