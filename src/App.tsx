import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/global.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Frontpage from "./components/Frontpage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App container mx-auto 2xl:px-64 xl:px-32">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthentication={setIsAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Frontpage />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/frontpage"
            element={
              isAuthenticated ? (
                <Frontpage />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
