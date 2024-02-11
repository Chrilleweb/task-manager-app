import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/task-manager-logo.svg";

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, setIsAuthentication }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthentication(false);
    navigate("/login");

    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center py-4">
      <Link
        to="/frontpage"
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
      <div>
        {isAuthenticated ? (
          <button className="p-2" onClick={handleLogout}>
            Logout
          </button>
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