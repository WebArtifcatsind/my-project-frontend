// D:\office\webartifacts\webartifacts-frontend\src\pages\StaffComplaints.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffComplaints.css"; // External CSS

const StaffComplaints = ({ token }) => {
  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const [error, setError] = useState("");

  const fetchAssignedComplaints = async () => {
    try {
      const res = await axios.get(
        "https://api.webartifacts.in/api/client/complaints/assigned",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignedComplaints(res.data);
    } catch {
      setError("Failed to load assigned complaints");
    }
  };

  const markComplaintResolved = async (id) => {
    try {
      await axios.put(
        `https://api.webartifacts.in/api/client/complaint/resolve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignedComplaints((prev) =>
        prev.map((comp) =>
          comp.id === id ? { ...comp, status: "Resolved" } : comp
        )
      );
    } catch {
      alert("Failed to mark as resolved");
    }
  };

  const deleteStaffComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;
    try {
      await axios.delete(
        `https://api.webartifacts.in/api/client/complaints/staff/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssignedComplaints((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete complaint");
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  return (
    <div className="complaints-container">
      <h2 className="complaints-title">🛠️ Complaints Assigned to You</h2>

      {assignedComplaints.length === 0 ? (
        <p className="no-complaints">No complaints have been assigned yet.</p>
      ) : (
        <div className="complaints-grid">
          {assignedComplaints.map((comp) => (
            <div key={comp.id} className="complaint-card">
              <p>
                <strong>From:</strong> {comp.name} 
              </p>
              <p>
                <strong>Email:</strong>   {comp.email}
              </p>
              <p>
                <strong>Subject:</strong> {comp.subject}
              </p>
              <p>
                <strong>Message:</strong> {comp.message}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(comp.submitted_at).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {comp.status === "Resolved"
                  ? "✅ Resolved"
                  : "⏳ Pending"}
              </p>

              {comp.file && (
                <a
                  href={comp.file}
                  download
                  className="complaint-file-link"
                >
                  📎 Download Attached File
                </a>
              )}

              {comp.status !== "Resolved" && (
                <button
                  onClick={() => markComplaintResolved(comp.id)}
                  className="btn-resolve"
                >
                  ✅ Mark as Resolved
                </button>
              )}

              {comp.status === "Resolved" && (
                <button
                  onClick={() => deleteStaffComplaint(comp.id)}
                  className="btn-delete"
                >
                  🗑️ Delete Complaint
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <p className="complaints-error">{error}</p>}
    </div>
  );
};

export default StaffComplaints;







// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./StaffComplaints.css"; // External CSS

// const StaffComplaints = ({ token }) => {
//   const [assignedComplaints, setAssignedComplaints] = useState([]);
//   const [error, setError] = useState("");

//   const fetchAssignedComplaints = async () => {
//     try {
//       const res = await axios.get(
//         "https://api.webartifacts.in/api/client/complaints/assigned",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAssignedComplaints(res.data);
//     } catch {
//       setError("Failed to load assigned complaints");
//     }
//   };

//   const markComplaintResolved = async (id) => {
//     try {
//       await axios.put(
//         `https://api.webartifacts.in/api/client/complaint/resolve/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAssignedComplaints((prev) =>
//         prev.map((comp) =>
//           comp.id === id ? { ...comp, status: "Resolved" } : comp
//         )
//       );
//     } catch {
//       alert("Failed to mark as resolved");
//     }
//   };

//   const deleteStaffComplaint = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this complaint?"))
//       return;
//     try {
//       await axios.delete(
//         `https://api.webartifacts.in/api/client/complaints/staff/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setAssignedComplaints((prev) => prev.filter((c) => c.id !== id));
//     } catch {
//       alert("Failed to delete complaint");
//     }
//   };

//   useEffect(() => {
//     fetchAssignedComplaints();
//   }, []);

//   return (
//     <div className="complaints-container">
//       <h2 className="complaints-title">🛠️ Complaints Assigned to You</h2>

//       {assignedComplaints.length === 0 ? (
//         <p className="no-complaints">No complaints have been assigned yet.</p>
//       ) : (
//         <div className="complaints-grid">
//           {assignedComplaints.map((comp) => (
//             <div key={comp.id} className="complaint-card">
//               <p>
//                 <strong>From:</strong> {comp.name} 
//               </p>
//               <p>
//                 <strong>Email:</strong>   {comp.email}
//               </p>
//               <p>
//                 <strong>Subject:</strong> {comp.subject}
//               </p>
//               <p>
//                 <strong>Message:</strong> {comp.message}
//               </p>
//               <p>
//                 <strong>Submitted At:</strong>{" "}
//                 {new Date(comp.submitted_at).toLocaleString()}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {comp.status === "Resolved"
//                   ? "✅ Resolved"
//                   : "⏳ Pending"}
//               </p>

//               {comp.file && (
//                 <a
//                   href={`https://api.webartifacts.in/uploads/complaints/${comp.file}`}
//                   download
//                   className="complaint-file-link"
//                 >
//                   📎 Download Attached File
//                 </a>
//               )}

//               {comp.status !== "Resolved" && (
//                 <button
//                   onClick={() => markComplaintResolved(comp.id)}
//                   className="btn-resolve"
//                 >
//                   ✅ Mark as Resolved
//                 </button>
//               )}

//               {comp.status === "Resolved" && (
//                 <button
//                   onClick={() => deleteStaffComplaint(comp.id)}
//                   className="btn-delete"
//                 >
//                   🗑️ Delete Complaint
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {error && <p className="complaints-error">{error}</p>}
//     </div>
//   );
// };

// export default StaffComplaints;
