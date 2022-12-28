import React from "react";
import {  BrowserRouter as Router,Navigate, Routes, Route } from "react-router-dom";
 
//history
// import { history } from './helpers/history';
 
// //pages
// import HomePage from "./pages/HomePage"
// import LoginPage from "./pages/Login"
 
import { history } from "./helpers/history"
import RouteGuard from "./components/RouteGuard"
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage"
function Routers() {
    return (
        <Router>
            <Routes>
                <RouteGuard
                    exact
                    path="/"
                    component={HomePage}
                />
                <Route
                    path="/login"
                    component={LoginPage}
                />
                <Navigate to="/" />
            </Routes>
        </Router>
    );
 }
  
 export default Routers