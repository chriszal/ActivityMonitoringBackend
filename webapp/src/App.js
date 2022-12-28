import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import React, { useState ,useEffect } from "react";

import LoginPage from './components/LoginPage';
import jwtDecode from 'jwt-decode';
import Routers from './routes'

import {setAuthToken} from './helpers/setAuthToken'

function App() {
  const [selectedTab, setSelectedTab] = useState("users");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there is a JWT in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // const user = jwtDecode(jwt);
      // setUser(user);
    }
  }, []);
  return (
    <div className="App">
      <div className="AppGlass">
        <Routers/>
        {/* {!user ? (
          <LoginPage  />
        ) : (
          <React.Fragment>
            <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {user.role === 'admin' && (
              <MainDash selectedTab={selectedTab}/>
            )}
          </React.Fragment>
        )
        } */}
        {/* <LoginPage/> */}
        {/* <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        <MainDash selectedTab={selectedTab}/> */}
        {/* <RightSide/> */}
      </div>
    </div>
  );
}

export default App;
