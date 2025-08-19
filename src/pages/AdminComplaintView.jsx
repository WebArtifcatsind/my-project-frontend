// src/pages/AdminComplaintView.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminComplaintView.css"; // <-- Add this import

const AdminComplaintView = () => {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [assigningId, setAssigningId] = useState(null);
  const [assignedStaffId, setAssignedStaffId] = useState("");
  const [message, setMessage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    setIsRefreshing(true);
    try {
      const res = await axios.get("https://api.webartifacts.in/api/client/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("https://api.webartifacts.in/api/users/staff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaffList(res.data);
    } catch (err) {
      console.error("Failed to fetch staff list", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this complaint?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://api.webartifacts.in/api/client/complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Complaint deleted successfully");
      fetchComplaints();
    } catch (err) {
      setMessage("Error deleting complaint");
    }
  };

  const assignComplaint = async (complaintId) => {
    try {
        await axios.post(
            `https://api.webartifacts.in/api/client/complaint/assign`,
            { 
                complaintId, 
                staffId: assignedStaffId,
                status: "Pending" // <-- This is the crucial line.
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("✅ Complaint assigned successfully");
        setAssigningId(null);
        setAssignedStaffId("");
        fetchComplaints();
    } catch (err) {
        setMessage("❌ Failed to assign complaint");
        // It's a good practice to log the full error for debugging
        console.error(err); 
    }
};

  useEffect(() => {
    fetchComplaints();
    fetchStaff();

    const interval = setInterval(fetchComplaints, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchComplaints();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="admin-complaint-view">
      <div className="header-container">
        <h2 className="page-title">🛠 Admin - Client Complaints</h2>
        <button
          onClick={fetchComplaints}
          disabled={isRefreshing}
          className="refresh-button"
        >
          {isRefreshing ? (
            <>
              <svg className="refresh-icon h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </>
          ) : (
            "Refresh List"
          )}
        </button>
      </div>
      {message && (
        <p className={`status-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>
      )}

      {complaints.length === 0 ? (
        <p className="no-complaints-message">No complaints found</p>
      ) : (
        <div className="complaint-card-list">
          {complaints.map((c) => (
            <div key={c.id} className="complaint-card">
              <p className="complaint-info-row"><strong className="complaint-label">Name:</strong> {c.name}</p>
              <p className="complaint-info-row"><strong className="complaint-label">Email:</strong> {c.email}</p>
              <p className="complaint-info-row"><strong className="complaint-label">Subject:</strong> {c.subject}</p>
              <p className="complaint-info-row"><strong className="complaint-label">Message:</strong> {c.message}</p>

              {c.file && (
                <p className="complaint-info-row">
                  <a
                    href={`https://api.webartifacts.in/uploads/complaints/${c.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="complaint-file-link"
                  >
                    📎 Download Attachment
                  </a>
                </p>
              )}

              {c.assigned_staff && (
                <p className="complaint-info-row"><strong className="complaint-label">Assigned to:</strong> {c.assigned_staff}</p>
              )}

              <p className="complaint-info-row">
                <strong className="complaint-label">Status:</strong>{" "}
                <span
                  className={`status-text ${c.status === "Resolved" ? "resolved" : "pending"}`}
                >
                  {c.status === "Resolved" ? "✅ Resolved" : "⏳ Pending"}
                  {isRefreshing && <span className="ml-2 text-xs text-gray-500">(updating...)</span>}
                </span>
              </p>

              <div className="card-actions">
                {assigningId === c.id ? (
                  <>
                    <select
                      className="assign-select"
                      value={assignedStaffId}
                      onChange={(e) => setAssignedStaffId(e.target.value)}
                    >
                      <option value="">Select Staff</option>
                      {staffList.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => assignComplaint(c.id)}
                      className="assign-button"
                    >
                      Assign
                    </button>
                    <button
                      onClick={() => setAssigningId(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setAssigningId(c.id)}
                    className="assign-button bg-blue-600"
                  >
                    Assign to Staff
                  </button>
                )}

                <button
                  onClick={() => handleDelete(c.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComplaintView;