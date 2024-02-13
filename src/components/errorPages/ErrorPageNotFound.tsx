import React from 'react';

const ErrorPageNotFound: React.FC = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">Sorry, the requested page does not exist.</p>
    </div>
  );
};

export default ErrorPageNotFound;