import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/task-manager-logo.svg";
import userIcon from "../images/user-icon.svg";

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  setIsAuthentication,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername ? storedUsername : "");
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthentication(false);
    setUsername("");
    navigate("/login");
  };

  const usernameUpperCase = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : "";

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center py-4 2xl:px-8 border-b-2 border-slate-300">
      <div className="flex items-center">
        <Link
          to="/auth/frontpage"
          className="flex items-center text-2xl font-bold text-gray-800"
        >
          <img
            src={logo}
            alt="Task Manager Logo"
            width="50"
            height="50"
            className="mr-2"
          />
        </Link>
      </div>
      <div className="flex items-center">
        {isAuthenticated && (
          <>
            <Link to="/auth/frontpage" className="p-2">
              Home
            </Link>
            <Link to="/auth/view-tasks" className="p-2">
              View
            </Link>
            <Link to="/auth/create-task" className="p-2">
              Create
            </Link>
            <div className="flex items-center ml-4">
              <img src={userIcon} alt="User Icon" width="14" className="mr-2" />
              <p className="mr-4">{usernameUpperCase}</p>
              <button className="p-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="p-2">
              Login
            </Link>
            <Link to="/register" className="p-2">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;