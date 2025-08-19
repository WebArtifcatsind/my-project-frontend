// src/pages/AdminContactView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminContactView.css';

const AdminContactView = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchContacts = async () => {
    try {
      const res = await axios.get('https://webartifacts.in/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(res.data.data);
    } catch (err) {
      console.error('Failed to fetch contacts', err);
      setMessage('❌ Failed to load contacts');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://webartifacts.in/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Contact deleted successfully');
      setTimeout(() => setMessage(''), 3000);
      fetchContacts();
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setMessage(`❌ Error: ${err.response?.data?.message || 'Failed to delete contact'}`);
    }
  };

  const printContact = (contact) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Contact Details - ${contact.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .contact-info { margin-top: 20px; }
            .contact-info p { margin: 5px 0; }
            .timestamp { margin-top: 30px; font-size: 0.9em; color: #666; }
          </style>
        </head>
        <body>
          <h1>Contact Details</h1>
          <div class="contact-info">
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
            <p><strong>Message:</strong> ${contact.message}</p>
          </div>
          <div class="timestamp">
            Submitted on: ${new Date(contact.created_at).toLocaleString()}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            }
          </script>
        </body>
      </html>
    `);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📩 Contact Submissions</h2>
      {message && (
        <p className={`mb-4 ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      {contacts.length === 0 ? (
        <p className="text-gray-500">No contact submissions found</p>
      ) : (
        <div className="contact-grid">
          {contacts.map(contact => (
            <div key={contact.id} className="contact-card">
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone || 'N/A'}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p className="timestamp">
                Submitted on: {new Date(contact.created_at).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => printContact(contact)}
                  className="bg-blue-600 text-white"
                >
                  🖨️ Print
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
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
  );
};

export default AdminContactView;
