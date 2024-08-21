import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://flashcard-backend-gamma.vercel.app/api/signup', {
        username: username,
        password: password,
      });

      if (response.data.success) {
        alert('Sign up successful! Please log in.');
        navigate('/');
      } else {
        alert('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error signing up!', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container" id="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button class="button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
