import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './css/global.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Frontpage from './components/Frontpage';
import Footer from './components/Footer';
import CreateTask from './components/CreateTask';
import ErrorPageNotFound from './components/errorPages/ErrorPageNotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  
  return (
    <Router>
      <div className="App container mx-auto">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthentication={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/auth/frontpage" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/frontpage" element={<Frontpage />} />
          <Route path="/auth/create-task" element={<CreateTask isAuthenticated={isAuthenticated} />} />
          <Route path="*" element={<ErrorPageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
