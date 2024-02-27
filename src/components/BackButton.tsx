import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step
  };

  return (
    <button
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mt-6"
      onClick={handleGoBack}
    >
      Go back
    </button>
  );
};

export default BackButton;
