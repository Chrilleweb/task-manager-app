import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

const Frontpage = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFrontpageData = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/frontpage', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
          },
        });

        if (response.ok) {
          // Frontpage data is successfully fetched
        } else {
          // Invalid or missing token
          setError('Invalid token');
        }
      } catch (error) {
        console.error('Error fetching frontpage data:', error);
        setError('Error fetching data');
      }
    };

    if (isAuthenticated) {
      // If authenticated, attempt to fetch frontpage data
      fetchFrontpageData();
    }
  }, [isAuthenticated]);

  if (error || !isAuthenticated) {
    // Display error component
    return <ErrorComponent />;
  }

  // Render the frontpage content here
  return (
    <div>
      <h1>Welcome to the Frontpage</h1>
      <p>This is the main page of your application.</p>
    </div>
  );
};

export default Frontpage;