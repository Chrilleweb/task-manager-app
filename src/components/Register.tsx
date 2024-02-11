import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Initialize the error state
  const [success, setSuccess] = useState<string | null>(null); // Initialize the success state

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Registration failed:', response.status, data.message);
        setError(data.message); // Set the error in the component state
        setSuccess(null); // Clear any previous success message
        return;
      }

      // Registration successful
      console.log('User registered successfully!');
      setError(null); // Clear any previous error
      setSuccess('User registered successfully!'); // Set the success message
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Internal Server Error'); // Set a generic error message
      setSuccess(null); // Clear any previous success message
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
          <p>{success}</p>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 p-2 border rounded-md w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 p-2 border rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
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
