import React, { useState } from "react";
import apiEndpoints from "../services/apiEndpoints";
import apiService from "../services/apiService";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Initialize the error state
  const [success, setSuccess] = useState<string | null>(null); // Initialize the success state

  const handleRegister = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setSuccess(null);
        return;
      }

      const response = await apiService({
        url: apiEndpoints.register,
        method: "POST",
        body: { username, password },
      });

      if (response) {
        console.log("User registered successfully!");
        setError(null);
        setSuccess("User registered successfully!");
      }
    } catch (error: any) {
      console.error("Error during registration:", error.message);

      // Handle specific error messages from the server
      if (error.message === "Username already taken") {
        setError("Username is already taken. Please choose a different one.");
      } else {
        setError("Internal Server Error");
      }

      setSuccess(null);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {error && (
        <div className="mb-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-500">
          <div className="flex">
            <p className="mr-2">{success}</p>
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600"
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 p-2 border rounded-md w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 p-2 border rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-600"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirm-password"
          className="mt-1 p-2 border rounded-md w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <Link to="/login" className="text-blue-500 mb-2 block">
        Already have an account? Login here.
      </Link>
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
