import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface BackButtonProps {
    to: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(to);
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
