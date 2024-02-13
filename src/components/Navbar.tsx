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
      <nav className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link
            to="/auth/frontpage"
            className="flex items-center text-2xl font-bold text-gray-800"
          >
            <img
              src={logo}
              alt="Task Manager Logo"
              width="24"
              height="24"
              className="mr-2"
            />
            Task manager
          </Link>
          {isAuthenticated && (
            <Link to="/auth/create-task" className="ml-4 mt-1 p-2 text-center">
              Create Task
            </Link>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center">
              <img src={userIcon} alt="User Icon" width="24" className="mr-2" />
              <p className="mr-4">{usernameUpperCase}</p>
              <button className="p-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
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