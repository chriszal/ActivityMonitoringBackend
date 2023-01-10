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
                <Route
                    exact
                    path="/"
                    element={<RouteGuard Component={HomePage} />}
                />
                <Route
                    path="/login"
                    element={<LoginPage/>}
                />
                {/* <Navigate to="/" /> */}
            </Routes>
        </Router>
    );
 }
  
 export default Routers