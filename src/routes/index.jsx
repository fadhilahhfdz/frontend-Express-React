// import useContext
import React, { useContext } from "react";

// import context
import { AuthContext } from "../context/AuthContext";

// import react router dom
import { Routes, Route, Navigate } from "react-router-dom";

// import view
import Home from "../views/home";
import Register from "../views/auth/register";
import Login from "../views/auth/login";
import Dashboard from "../views/admin/dashboard";
import UsersIndex from "../views/admin/users";
import UsersCreate from "../views/admin/users/create";
import UsersEdit from "../views/admin/users/edit";

export default function AppRoutes() {
    // destructure context 'isAuthenticated'
    const {isAuthenticated} = useContext(AuthContext)

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />} />

            {/* route "/login" */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />} />

            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />

            {/* route "/admin/users" */}
            <Route path="/admin/users" element={isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace />}  />

            {/* route "/admin/users/create" */}
            <Route path="/admin/users/create" element={isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace />}  />

            {/* route "/admin/users/edit" */}
            <Route path="/admin/users/edit:id" element={isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace />}  />
        </Routes>
    )
}