import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signin', {
        username,
        password,
      });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setErrorMessage('');

        // Redirect to the homepage (or another page) after successful login
        navigate('/');  // Redirect to the root (home) endpoint
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setErrorMessage('Incorrect credentials');
      } else {
        setErrorMessage('An error occurred, please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSignin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Signin</button>
      </form>
      {token && <p>Logged in successfully!</p>}
    </div>
  );
};

export default Signin;
