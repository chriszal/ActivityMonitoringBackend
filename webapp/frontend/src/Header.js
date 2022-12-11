// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>My Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/coordinator">Study Coordinator</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
