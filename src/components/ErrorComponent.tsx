import React from 'react';

const ErrorComponent = () => (
  <div className="max-w-md mx-auto my-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <p className="mt-2">
      Please <a href="/login" className="text-blue-500 underline">login</a> to access the frontpage.
    </p>
  </div>
);

export default ErrorComponent;

