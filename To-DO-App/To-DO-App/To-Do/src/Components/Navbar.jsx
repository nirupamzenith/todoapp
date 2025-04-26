import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/Navbar.module.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');  
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main Navigation">
      <strong className={styles.logo}>Task Manager</strong>

      <div className={styles.navButtons}>
        {/* If user is not logged in, show Login and Register buttons */}
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/login')} aria-label="Login">Login</button>
            <button onClick={() => navigate('/register')} aria-label="Register">Register</button>
          </>
        ) : (
          <>
            {/* If user is logged in, show Create Task and My Tasks buttons */}
            <button onClick={() => navigate('/create-task')} aria-label="Create Task">Create Task</button>
            <button onClick={() => navigate('/tasks')} aria-label="View Tasks">My Tasks</button>
            <button onClick={handleLogout} aria-label="Logout">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
