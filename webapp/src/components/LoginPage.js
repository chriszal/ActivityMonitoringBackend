import React, { useState } from 'react';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import config from '../config/config';

import './Login.css';

axios.defaults.baseURL = config.apiUrl;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
  
      const res = await axios.post('/login', { username, password });

      
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      console.log(token);

      // // Decode the JWT to get the user's role
      // const user = jwtDecode(jwt);

      // // Redirect the user to the appropriate dashboard depending on their role
      // if (user.role === 'admin') {
      //   window.location.href = '/admin-dashboard';
      // } else if (user.role === 'study coordinator') {
      //   window.location.href = '/study-coordinator-dashboard';
      // }
    } catch (err) {
      // If there was an error, display it
      console.log(err.message);
      setError(err.message);
      
    }
  }

  return (
    <div className="container">
      {error && (<div class="error-container">
                    <div class="error-message">{error}</div>
                  </div>)}
      <form className="form" onSubmit={handleLogin}>
      
      <h1>Login</h1>
      <div className="input-container">
          <label className="label">Username:</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
