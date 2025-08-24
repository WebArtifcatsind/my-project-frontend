import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ClientComplaintForm.css";

const ClientComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    file: null,
  });
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState(""); // State for name validation error

  // This useEffect hook will run once when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top-left corner
  }, []);

  // Regex to check for characters that are NOT letters or spaces
  const invalidNameRegex = /[^a-zA-Z\s]/;

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (invalidNameRegex.test(value)) {
      setNameError("Name can only contain letters and spaces.");
    } else {
      setNameError("");
      setFormData({ ...formData, name: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pre-submission validation
    if (invalidNameRegex.test(formData.name)) {
      setNameError("Name can only contain letters and spaces.");
      return; // Stop form submission
    }

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });
      const res = await axios.post("https://api.webartifacts.in/api/client/complaint", form);
      setStatus("✅ Complaint submitted successfully");
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "", file: null });
    } catch (err) {
      setStatus("❌ Error submitting complaint");
      setIsSuccess(false);
    }
  };

  return (
    <div className="client-complaint-form-page">
      <Navbar />
      <div className="client-complaint-form-container">
        <div className="form-card">
          <h2 className="form-title">📨 Client Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Name" 
                required 
                className="form-input" 
                value={formData.name} 
                onChange={handleNameChange}
              />
             {nameError && <p className="status-error">{nameError}</p>}
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email" 
                required 
                className="form-input" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Subject" 
                required 
                className="form-input" 
                value={formData.subject} 
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
              />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="Message" 
                required 
                className="form-textarea" 
                value={formData.message} 
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <div className="form-group">
              <input 
                type="file" 
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} 
                className="form-file-input" 
              />
            </div>
            <button type="submit" className="submit-button">
              Submit Complaint
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

export default ClientComplaintForm;