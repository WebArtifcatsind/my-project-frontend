// D:\office\webartifacts\webartifacts-frontend\src\pages\ClientComplaintForm.jsx
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

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // This useEffect hook will run once when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top-left corner
  }, []);

  // Regex for name: allows only letters and spaces
  const nameRegex = /^[a-zA-Z\s]*$/;
  // Regex for email: a standard pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Regex for subject/message: blocks some special characters, numbers, and emojis
  const textRegex = /^[a-zA-Z0-9\s!@#$%,.?&-_()]*$/;

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
      case "subject":
        if (!value.trim()) {
          error = "Subject is required.";
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
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Re-validate all fields before submission
    const isNameValid = !validateField("name", formData.name);
    const isEmailValid = !validateField("email", formData.email);
    const isSubjectValid = !validateField("subject", formData.subject);
    const isMessageValid = !validateField("message", formData.message);

    // If any field is invalid, stop the form submission
    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      setStatus("❌ Please correct the errors in the form.");
      setIsSuccess(false);
      return;
    }

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });
      const res = await axios.post(
        "https://api.webartifacts.in/api/client/complaint",
        form
      );
      setStatus("✅ Complaint submitted successfully");
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "", file: null });
      setFormErrors({ name: "", email: "", subject: "", message: "" });
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
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                required
                className={`form-input ${
                  formErrors.subject ? "input-error" : ""
                }`}
                value={formData.subject}
                onChange={handleInputChange}
              />
              {formErrors.subject && (
                <p className="status-error">{formErrors.subject}</p>
              )}
            </div>
            <div className="form-group">
              <textarea
                placeholder="Message"
                name="message"
                required
                className={`form-textarea ${
                  formErrors.message ? "input-error" : ""
                }`}
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              {formErrors.message && (
                <p className="status-error">{formErrors.message}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="file"
                name="file"
                onChange={handleInputChange}
                className="form-file-input"
              />
            </div>
            <button type="submit" className="submit-button">
              Submit Complaint
            </button>
          </form>
          {status && (
            <p
              className={`status-message ${
                isSuccess ? "status-success" : "status-error"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientComplaintForm;