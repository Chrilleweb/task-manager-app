import React from 'react';
import { Navigate } from 'react-router-dom';

const Frontpage = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
    return (
    <div>
      <h1>Welcome to the Frontpage</h1>
      <p>This is the main page of your application.</p>
    </div>
  );
};

export default Frontpage;
