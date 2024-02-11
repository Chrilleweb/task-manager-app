import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Frontpage = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);
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
          setIsLoading(false);
        } else {
          // Invalid or missing token
          setError('Invalid token');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching frontpage data:', error);
        setError('Error fetching data');
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      // If authenticated, attempt to fetch frontpage data
      fetchFrontpageData();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    // Loading state, you can show a loading spinner or message here
    return <div>Loading...</div>;
  }

  if (error || !isAuthenticated) {
    // Redirect to login if not authenticated or error occurred
    return <Navigate to="/login" />;
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

