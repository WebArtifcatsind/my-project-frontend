// src/pages/AdminRegisterUserPage.jsx
import React from 'react';

import RegisterUserForm from "../components/RegisterUserForm";
import "./AdminDashboard.css"; // We'll keep some general styles here
import "./AdminRegisterUserCard.css";

const AdminRegisterUserPage = () => {
    return (
        
            <div className="admin-dashboard-container">
                <div className="admin-view-card">
                    <h2 className="admin-card-title">➕ Register New User</h2>
                    <RegisterUserForm />
                </div>
            </div>
        
    );
};

export default AdminRegisterUserPage;