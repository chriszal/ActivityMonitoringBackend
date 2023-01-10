import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { AdminSidebarData } from "../Data/Data";
import { StudySidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { setAuthToken } from '../helpers/setAuthToken'

const Sidebar = ({ selectedTab,setSelectedTab,roles }) => {

  const [expanded, setExpaned] = useState(true)


  const sidebarData = () => {
    if(roles.includes('admin')){
      return AdminSidebarData;
    }else{
      return StudySidebarData;
    }
  }
  const handleLogout = () => {
    // Remove the token from storage (e.g. localStorage)
    localStorage.removeItem('token');
  
    // Remove the token from the Axios default headers
    setAuthToken(null);
    window.location.href = '/login'
  }

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Harokopio<br/>
        <span>University</span>
        </span>
      </div>

      <div className="menu">
        {sidebarData().map((item, index) => {
          return (
            <div
              className={selectedTab === item.heading.toLowerCase() ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelectedTab(item.heading.toLowerCase())}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem"  onClick={handleLogout}>
          <span>Log out</span>
          <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
