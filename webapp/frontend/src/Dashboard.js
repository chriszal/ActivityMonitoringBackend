import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Header from './Header';
import AdminDashboard from './AdminDashboard';
import StudyCoordinatorDashboard from './StudyCoordinatorDashboard';

function Dashboard() {
    return (
      <Router>
        <div className="dashboard">
          <Header />
          <main>
            <Routes>
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/coordinator" component={StudyCoordinatorDashboard} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
export default Dashboard;
