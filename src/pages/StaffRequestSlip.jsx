

// src/pages/StaffRequestSlip.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffRequestSlip = () => {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [pastRequests, setPastRequests] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.post(
        "https://api.webartifacts.in/api/salary/request-slip",
        { request_msg: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("✅ Salary slip request sent!");
      setMessage("");
      fetchMyRequests();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to send request");
    }
  };

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get("https://api.webartifacts.in/api/staff/my-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPastRequests(res.data);
    } catch {
      console.warn("Could not fetch past requests.");
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📨 Request Salary Slip</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          placeholder="Message to Admin (optional)..."
          className="w-full p-2 border rounded mb-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>

      {pastRequests.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">📃 Past Requests</h3>
          <ul className="space-y-2">
            {pastRequests.map((req) => (
              <li key={req.id} className="bg-white p-3 rounded shadow">
                <p>
                  <strong>Message:</strong>{" "}
                  {req.request_msg || <em>No message</em>}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      req.status === "Approved"
                        ? "text-green-600"
                        : req.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {req.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Requested on: {new Date(req.requested_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StaffRequestSlip;
