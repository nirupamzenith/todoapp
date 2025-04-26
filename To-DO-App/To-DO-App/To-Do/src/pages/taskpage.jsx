import React, { useState } from 'react';
import axios from 'axios';
import authHeader from '../utils/authHeader';
import { useNavigate } from 'react-router-dom'; 
import styles from '../CSS/TaskPage.module.css';

function TaskPage() {
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
  });

  const navigate = useNavigate(); 

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      if (newTask.title.trim()) {
        await axios.post(
          'http://localhost:5000/api/tasks',
          newTask,
          { headers: authHeader() }
        );
        setNewTask({ title: '', dueDate: '' });
        navigate('/tasks');
      }
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Add Task</h1>
      <form onSubmit={handleAddTask} className={styles.taskForm}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          required
          aria-label="Task Title"
          className={styles.inputField}
        />
       
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
          aria-label="Due Date"
          className={styles.inputField}
        />
        <button type="submit" className={styles.button}>
          Add Task
        </button>
      </form>
    </main>
  );
}

export default TaskPage;
