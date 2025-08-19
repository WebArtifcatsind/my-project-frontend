// D:\office\webartifacts\webartifacts-frontend\src\pages\Login.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // <-- Import useLocation
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Initialize useLocation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Password reset states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'error' or 'success'

  // Add this useEffect to handle the scroll-to-top logic
  useEffect(() => {
    if (location.hash === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]); // Rerun this effect whenever the URL hash changes

  const clearMessages = () => {
    setError("");
    setMessage({ text: "", type: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();
    try {
      const res = await axios.post("https://api.webartifacts.in/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(user.role?.toLowerCase() === "admin" ? "/admin-dashboard" : "/staff-dashboard");
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    clearMessages();
    try {
      await axios.post("https://api.webartifacts.in/api/auth/forgot-password", {
        email: forgotPasswordEmail,
      });
      setMessage({ text: "OTP sent to your email", type: "success" });
      setShowForgotPassword(false);
      setShowOTPVerification(true);
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to send OTP", 
        type: "error" 
      });
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    clearMessages();
    try {
      await axios.post("https://api.webartifacts.in/api/auth/verify-otp", {
        email: forgotPasswordEmail,
        otp,
      });
      setMessage({ text: "OTP verified successfully", type: "success" });
      setShowOTPVerification(false);
      setShowResetPassword(true);
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Invalid OTP", 
        type: "error" 
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearMessages();
    
    if (newPassword !== confirmPassword) {
      setMessage({ text: "Passwords don't match", type: "error" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ text: "Password must be at least 6 characters", type: "error" });
      return;
    }

    try {
      await axios.post("https://api.webartifacts.in/api/auth/reset-password", {
        email: forgotPasswordEmail,
        otp,
        newPassword,
      });
      setMessage({ 
        text: "Password reset successfully! Please login with your new password", 
        type: "success" 
      });
      
      // Reset all states
      setShowResetPassword(false);
      setForgotPasswordEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to reset password", 
        type: "error" 
      });
    }
  };

  const renderMessage = () => {
    if (!message.text) return null;
    return (
      <p className={`message ${message.type === "error" ? "error-message" : "success-message"}`}>
        {message.text}
      </p>
    );
  };

  return (
    // Add an id to the top-level container to act as the scroll target
    <div id="top" className="login-container">
      <Navbar />
      <div className="login-content">
        <div className="login-form-container">
          {/* Login Form */}
          {!showForgotPassword && !showOTPVerification && !showResetPassword && (
            <>
              <h2 className="login-title">Login</h2>
              {error && <p className="error-message">{error}</p>}
              {renderMessage()}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="forgot-password-link">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      clearMessages();
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </>
          )}

          {/* Forgot Password Form */}
          {showForgotPassword && (
            <>
              <h2 className="login-title">Forgot Password</h2>
              {renderMessage()}
              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <label className="form-label" htmlFor="forgotEmail">
                    Email
                  </label>
                  <input
                    id="forgotEmail"
                    type="email"
                    placeholder="Enter your email"
                    className="form-input"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      clearMessages();
                    }}
                  >
                    Back to Login
                  </button>
                  <button type="submit" className="primary-button">
                    Send OTP
                  </button>
                </div>
              </form>
            </>
          )}

          {/* OTP Verification Form */}
          {showOTPVerification && (
            <>
              <h2 className="login-title">Verify OTP</h2>
              {renderMessage()}
              <form onSubmit={handleVerifyOTP}>
                <div className="form-group">
                  <label className="form-label" htmlFor="otp">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter the 6-digit OTP"
                    className="form-input"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                    required
                  />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setShowOTPVerification(false);
                      setShowForgotPassword(true);
                      clearMessages();
                    }}
                  >
                    Back
                  </button>
                  <button type="submit" className="primary-button">
                    Verify OTP
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Reset Password Form */}
          {showResetPassword && (
            <>
              <h2 className="login-title">Reset Password</h2>
              {renderMessage()}
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label className="form-label" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="At least 6 characters"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength="6"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength="6"
                    required
                  />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setShowResetPassword(false);
                      setShowOTPVerification(true);
                      clearMessages();
                    }}
                  >
                    Back
                  </button>
                  <button type="submit" className="primary-button">
                    Reset Password
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;