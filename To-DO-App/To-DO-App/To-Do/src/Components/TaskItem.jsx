import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../utils/authHeader';
import styles from '../CSS/TaskItem.module.css'; 

function TaskItem() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', { headers: authHeader() });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, { headers: authHeader() });
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleMarkComplete = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: 'Completed' },
        { headers: authHeader() }
      );
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error('Failed to mark task as complete', err);
    }
  };

  return (
    <div className={styles.taskListContainer}>
      <h2 className={styles.taskListTitle}>My Tasks</h2>
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className={styles.taskRow}>
              <td className={styles.taskCell}>{task.title}</td>
              <td className={styles.taskCell}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</td>
              <td className={`${styles.taskCell} ${task.status === 'Completed' ? styles.completedStatus : ''}`}>
                {task.status}
              </td>
              <td className={styles.taskActions}>
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => handleMarkComplete(task._id)}
                    className={`${styles.completeButton} ${styles.actionButton}`}
                  >
                    Mark as Complete
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task._id)}
                  className={`${styles.deleteButton} ${styles.actionButton}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskItem;
