// src/pages/AdminFeedbackView.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminFeedbackView.css";

const AdminFeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/client/feedbacks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Failed to fetch feedbacks", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/client/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Feedback deleted successfully");
      fetchFeedbacks();
    } catch (err) {
      setMessage("❌ Error deleting feedback");
    }
  };

  const markPublic = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/client/feedback/public/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Feedback marked as public");
      fetchFeedbacks();
    } catch (err) {
      setMessage("❌ Failed to mark as public");
    }
  };

  const handleUnmarkPublic = async (id) => {
    try {
      await axios.put(
        `http://localhost:5001/api/client/feedback/unpublic/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("🔒 Feedback marked as private");
      fetchFeedbacks();
    } catch (err) {
      setMessage("❌ Failed to mark as private");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const privateFeedbacks = feedbacks.filter((f) => !f.is_public);
  const publicFeedbacks = feedbacks.filter((f) => f.is_public);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💬 Admin - Client Feedback</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* 🔒 Private Feedback Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">🔒 Private Feedbacks</h3>
        {privateFeedbacks.length === 0 ? (
          <p className="text-gray-500">No private feedbacks.</p>
        ) : (
          <div className="feedback-grid">
            {privateFeedbacks.map((f) => (
              <div key={f.id} className="feedback-card">
                <p><strong>Name:</strong> {f.name}</p>
                <p><strong>Email:</strong> {f.email}</p>
                <p><strong>Message:</strong> {f.message}</p>
                <p className="private-status"><strong>Status:</strong> 🔒 Private</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => markPublic(f.id)}
                    className="bg-green-600 text-white"
                  >
                    🌍 Mark Public
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="bg-red-600 text-white"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🌍 Public Feedback Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🌍 Public Feedbacks</h3>
        {publicFeedbacks.length === 0 ? (
          <p className="text-gray-500">No public feedbacks.</p>
        ) : (
          <div className="feedback-grid">
            {publicFeedbacks.map((f) => (
              <div key={f.id} className="feedback-card">
                <p><strong>Name:</strong> {f.name}</p>
                <p><strong>Email:</strong> {f.email}</p>
                <p><strong>Message:</strong> {f.message}</p>
                <p className="public-status"><strong>Status:</strong> 🌍 Public</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUnmarkPublic(f.id)}
                    className="bg-yellow-500 text-white"
                  >
                    🔒 Make Private
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedbackView;
