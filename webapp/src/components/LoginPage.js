import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to login
      const res = await axios.post('/api/login', { email, password });

      // If successful, decode the JWT and store it in local storage
      const jwt = res.data.token;
      localStorage.setItem('jwt', jwt);

      // Decode the JWT to get the user's role
      const user = jwtDecode(jwt);

      // Redirect the user to the appropriate dashboard depending on their role
      if (user.role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else if (user.role === 'study coordinator') {
        window.location.href = '/study-coordinator-dashboard';
      }
    } catch (err) {
      // If there was an error, display it
      setError(err.response.data.message);
    }
  }

  return (
    <div className="container">
      {error && (<div className="error-container">{error}</div>)}
      <form className="form" onSubmit={handleLogin}>
      <h1>Login</h1>
      <div className="input-container">
          <label className="label">Email:</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
