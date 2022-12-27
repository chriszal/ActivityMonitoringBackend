import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import React, { useState } from "react";
import LoginPage from './components/LoginPage';

function App() {
  const [selectedTab, setSelectedTab] = useState("users");

  return (
    <div className="App">
      <div className="AppGlass">
        <LoginPage/>
        {/* <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        <MainDash selectedTab={selectedTab}/> */}
        {/* <RightSide/> */}
      </div>
    </div>
  );
}

export default App;
