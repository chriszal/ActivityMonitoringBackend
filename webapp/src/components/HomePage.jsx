import React, { useState ,useEffect } from "react";
import Sidebar from "./Sidebar";
import MainDash from "./MainDash/MainDash";
import '../App.css'
import jwtDecode from 'jwt-decode';

function HomePage() {
  const [selectedTab, setSelectedTab] = useState("users");
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if there is a JWT in local storage
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      setUser(user);
    }
  }, []);
    return (
      <div className="AppGlass">
         {user ? (
        <>
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} roles={user['roles']}/>
          {user['roles'].includes('admin') ? (
            <MainDash selectedTab={selectedTab}/>
          ) : (
            <MainDash selectedTab={selectedTab}/>
          )}
         </>):(<p>Loading</p>)}
      </div>
    );
  }

  export default HomePage;