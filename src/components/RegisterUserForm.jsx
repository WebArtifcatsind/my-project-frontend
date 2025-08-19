// src/components/RegisterUserForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./RegisterUserForm.css"; // <-- Import the new CSS file

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for this field as the user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    // Clear success/error messages on change
    setMessage({ text: "", type: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ text: "Please fix the errors in the form.", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "https://my-project-backend-tan.vercel.app/api/auth/register",
        {
          ...formData,
          requesterRole: currentUser?.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ text: res.data.message, type: "success" });
      setFormData({ name: "", email: "", password: "", role: "staff" });
      setErrors({}); // Clear any previous errors
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Registration failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-user-form">
      {/* Display general messages */}
      {message.text && (
        <p className={`submit-message ${message.type}`}>
          {message.text}
        </p>
      )}

      {/* Name Input */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          className={`form-input ${errors.name ? "input-error" : ""}`}
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className={`form-input ${errors.email ? "input-error" : ""}`}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Password Input */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className={`form-input ${errors.password ? "input-error" : ""}`}
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      {/* Role Select */}
      <div className="form-group">
        <label htmlFor="role" className="form-label">Role</label>
        <select
          id="role"
          name="role"
          className="form-select"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register User"}
      </button>
    </form>
  );
};

export default RegisterUserForm;