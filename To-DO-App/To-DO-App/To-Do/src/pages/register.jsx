import React, { useState } from 'react';
import styles from '../CSS/RegisterPage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPass(!showPass);
  const toggleConfirmPassword = () => setShowConfirmPass(!showConfirmPass);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || 'Try again.'));
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} aria-label="Register Form">
        <h2 className={styles.heading}>Register</h2>

        <input
          type="email"
          className={styles.inputField}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          required
        />

        <div className={styles.passwordField}>
          <input
            type={showPass ? 'text' : 'password'}
            className={styles.inputField}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            required
          />
          <span onClick={togglePassword} className={styles.eyeIcon} aria-label="Toggle Password Visibility">
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <div className={styles.passwordField}>
          <input
            type={showConfirmPass ? 'text' : 'password'}
            className={styles.inputField}
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            aria-label="Confirm Password"
            required
          />
          <span onClick={toggleConfirmPassword} className={styles.eyeIcon} aria-label="Toggle Confirm Password Visibility">
            {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
