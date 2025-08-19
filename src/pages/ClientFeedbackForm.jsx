// src/pages/ClientFeedbackForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ClientFeedbackForm.css";

const ClientFeedbackForm = () => {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // This useEffect hook will run once when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top-left corner
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api.webartifacts.in/api/client/feedback", data);
      setStatus("✅ Feedback submitted successfully");
      setIsSuccess(true);
      setData({ name: "", email: "", message: "" });
    } catch {
      setStatus("❌ Error submitting feedback");
      setIsSuccess(false);
    }
  };

  return (
    <div className="client-feedback-page">
      <Navbar />
      <div className="feedback-container">
        <div className="feedback-card">
          <h2 className="feedback-title">💬 Client Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                required
                className="form-input"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                required
                className="form-input"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Message"
                required
                className="form-textarea"
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </form>
          {status && (
            <p className={`status-message ${isSuccess ? "status-success" : "status-error"}`}>
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientFeedbackForm;