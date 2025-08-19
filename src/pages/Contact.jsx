import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Contact.css'; // Assuming you have a CSS file for styling

const countryCodes = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+61', name: 'Australia' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+86', 'name': 'China' },
  { code: '+81', name: 'Japan' },
  { code: '+55', name: 'Brazil' },
  { code: '+7', name: 'Russia' },
  { code: '+27', name: 'South Africa' },
  { code: '+971', name: 'UAE' },
  { code: '+65', name: 'Singapore' },
  { code: '+34', name: 'Spain' },
  { code: '+39', name: 'Italy' },
  { code: '+52', name: 'Mexico'},
  { code: '+20', name: 'Egypt' },
  { code: '+82', name: 'South Korea' },
  { code: '+90', name: 'Turkey' },
  { code: '+353', name: 'Ireland' },
];

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'validation_error'

  // New states for the error modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required';
        // Client-side validation for phone number length after country code
        // This acts as an immediate feedback before server validation
        if (countryCode === '+91' && value.length !== 10) return 'For India (+91), please enter exactly 10 digits after the country code.';
        if (value.length < 6) return 'Must be a valid phone number, at least 6 digits.'; // General length for other codes
        if (!/^\d+$/.test(value)) return 'Only numbers allowed after the country code.';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus('validation_error');
      setModalTitle('Client-Side Validation Errors');
      const messages = Object.values(newErrors).join('\n');
      setModalMessage(messages);
      setShowErrorModal(true);
      return; // Stop submission if client-side validation fails
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData, phone: countryCode + formData.phone };
      const response = await axios.post('https://my-project-backend.vercel.app/api/contact', payload);
      if (response.status === 201) {
        setSubmitStatus('success');
        setModalTitle('Success!');
        setModalMessage(response.data.message || 'Your message has been sent successfully.');
        setShowErrorModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setCountryCode('+91');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitting(false);

      if (err.response && err.response.status === 400 && err.response.data && err.response.data.errors) {
        // Handle server-side validation errors
        setSubmitStatus('error'); // or 'server_validation_error'
        setModalTitle('Server-Side Validation Failed');
        const serverErrors = err.response.data.errors;
        let errorMessage = 'Please correct the following issues:\n';
        for (const key in serverErrors) {
          if (serverErrors.hasOwnProperty(key)) {
            errorMessage += `- ${serverErrors[key]}\n`;
          }
        }
        setModalMessage(errorMessage);
        setShowErrorModal(true);
        // Optionally, update client-side errors state to highlight fields
        setErrors(serverErrors);
      } else {
        // Handle other network or server errors
        setSubmitStatus('error');
        setModalTitle('Submission Failed');
        setModalMessage(err.response?.data?.message || 'An unexpected error occurred. Please try again later.');
        setShowErrorModal(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field as user types
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
    setIsDropdownOpen(false);
    // Re-validate phone field when country code changes if there was an existing error
    setErrors(prevErrors => ({
      ...prevErrors,
      phone: validateField('phone', formData.phone)
    }));
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setModalTitle('');
    setModalMessage('');
  };

  return (
    <div className="contact-page" id="contact-form">
      <div className="contact-form-container">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p className="form-subtitle">We'll get back to you soon</p>
        </div>

        {/* Existing success/general error messages (can be replaced by modal) */}
        {submitStatus === 'success' && !showErrorModal && (
          <div className="form-message success">
            Message sent successfully!
          </div>
        )}

        {/* The new Modal for displaying errors */}
        {showErrorModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{modalTitle}</h3>
              <p>{modalMessage}</p>
              <button onClick={closeModal} className="modal-close-button">Close</button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate> {/* Added noValidate attribute here */}
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <div className="phone-input-group">
              <div
                className={`custom-dropdown-btn ${isDropdownOpen ? 'open' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {countryCodes.find(c => c.code === countryCode).name} ({countryCode})
                <span className="dropdown-arrow">▼</span>
              </div>
              {isDropdownOpen && (
                <ul className="custom-dropdown-list">
                  {countryCodes.map(c => (
                    <li
                      key={c.code}
                      onClick={() => handleCountryCodeChange(c.code)}
                    >
                      {c.name} ({c.code})
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'input-error' : ''}
                // Only allow numbers to be typed after the country code
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={errors.message ? 'input-error' : ''}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
