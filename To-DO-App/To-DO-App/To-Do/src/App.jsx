import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import TaskPage from './pages/taskpage.jsx';
import TaskItem from './Components/TaskItem.jsx'; 
import Navbar from './Components/Navbar.jsx';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/create-task"
          element={isAuthenticated ? <TaskPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskItem /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
