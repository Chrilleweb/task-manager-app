import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Login failed:", response.status, data.message);
        setError(data.message);
        setSuccess(null);
        return;
      }

      // Login successful
      const data = await response.json();
      console.log("Login successful. Token:", data.token);
      if (data.token) {
        setError(null);
        setSuccess("Login successful!");
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/frontpage");
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError("Internal Server Error");
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && (
        <div className="mb-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-500">
          <p>{success}</p>
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="login-username"
          className="block text-sm font-medium text-gray-600"
        >
          Username:
        </label>
        <input
          type="text"
          id="login-username"
          className="mt-1 p-2 border rounded-md w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-600"
        >
          Password:
        </label>
        <input
          type="password"
          id="login-password"
          className="mt-1 p-2 border rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
