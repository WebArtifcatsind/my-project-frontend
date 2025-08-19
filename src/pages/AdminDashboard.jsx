// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
// import Layout from "../components/Layout"; // Import the Layout component
import "./AdminDashboard.css";

// Import all the components that will be rendered inside the dashboard
import AdminRegisterUserPage from "./AdminRegisterUserCard";
import AdminTrainingMaterialPage from "./AdminTrainingMaterialCard";
import AdminAttendanceCard from "./AdminAttendanceCard";
import AdminComplaintView from "./AdminComplaintView";
import AdminFeedbackView from "./AdminFeedbackView";
import AdminContactView from "./AdminContactView";

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeTab, setActiveTab] = useState("register-user");

    const renderTabContent = () => {
        switch (activeTab) {
            case "register-user":
                return <AdminRegisterUserPage />;
            case "training-materials":
                return <AdminTrainingMaterialPage />;
            case "attendance":
                return <AdminAttendanceCard />;
            case "complaints":
                return <AdminComplaintView />;
            case "feedbacks":
                return <AdminFeedbackView />;
            case "contacts":
                return <AdminContactView />;
            default:
                return <AdminRegisterUserPage />;
        }
    };

    return (
        // Wrap the entire dashboard content with the Layout component
        
            <div className="admin-dashboard-container">
                <h1 className="admin-dashboard-title"> Welcome Admin {user?.name}!</h1>

                <div className="admin-dashboard-tabs">
                    <button
                        onClick={() => setActiveTab("register-user")}
                        className={`admin-tab-button ${activeTab === "register-user" ? "active" : ""}`}
                    >
                        ➕ Register User
                    </button>
                    <button
                        onClick={() => setActiveTab("training-materials")}
                        className={`admin-tab-button ${activeTab === "training-materials" ? "active" : ""}`}
                    >
                        📤 Training Materials
                    </button>
                    <button
                        onClick={() => setActiveTab("attendance")}
                        className={`admin-tab-button ${activeTab === "attendance" ? "active" : ""}`}
                    >
                        📅 Staff Attendance
                    </button>
                    <button
                        onClick={() => setActiveTab("complaints")}
                        className={`admin-tab-button ${activeTab === "complaints" ? "active" : ""}`}
                    >
                        📨 Complaints
                    </button>
                    <button
                        onClick={() => setActiveTab("feedbacks")}
                        className={`admin-tab-button ${activeTab === "feedbacks" ? "active" : ""}`}
                    >
                        💬 Feedbacks
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`admin-tab-button ${activeTab === "contacts" ? "active" : ""}`}
                    >
                        📩 Contacts
                    </button>
                </div>

                <div className="admin-dashboard-content">
                    {renderTabContent()}
                </div>
            </div>
        
    );
};

export default AdminDashboard;