import React from 'react';
import { Route, Navigate } from 'react-router-dom';
 
const RouteGuard = ({ Component}) => {
 
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
      
       return flag
   }
 
   return  hasJWT() ? <Component/>:<Navigate to="/login"  />;
        
}
export default RouteGuard;