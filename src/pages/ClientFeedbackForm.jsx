// src/pages/ClientFeedbackForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ClientFeedbackForm.css";

const ClientFeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // This useEffect hook will run once when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Regex for name: allows only letters and spaces
  const nameRegex = /^[a-zA-Z\s]*$/;
  // Regex for email: a standard pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required.";
        } else if (!nameRegex.test(value)) {
          error = "Name can only contain letters and spaces.";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required.";
        }
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Re-validate all fields before submission
    const isNameValid = !validateField("name", formData.name);
    const isEmailValid = !validateField("email", formData.email);
    const isMessageValid = !validateField("message", formData.message);

    // If any field is invalid, stop the form submission
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setStatus("❌ Please correct the errors in the form.");
      setIsSuccess(false);
      return;
    }

    try {
      await axios.post("https://api.webartifacts.in/api/client/feedback", formData);
      setStatus("✅ Feedback submitted successfully");
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "" });
    } catch (err) {
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
                name="name"
                required
                className={`form-input ${formErrors.name ? "input-error" : ""}`}
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && (
                <p className="status-error">{formErrors.name}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                className={`form-input ${formErrors.email ? "input-error" : ""}`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="status-error">{formErrors.email}</p>
              )}
            </div>
            <div className="form-group">
              <textarea
                placeholder="Message"
                name="message"
                required
                className={`form-textarea ${formErrors.message ? "input-error" : ""}`}
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              {formErrors.message && (
                <p className="status-error">{formErrors.message}</p>
              )}
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