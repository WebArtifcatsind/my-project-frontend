import React, { useState, useEffect } from "react";
import StaffAttendance from "../components/StaffAttendance";
import StaffComplaints from "../components/StaffComplaints";
import StaffTraining from "../components/StaffTraining";
import "./StaffDashboard.css";

const StaffDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const token = localStorage.getItem("token") || null;

  const [activeTab, setActiveTab] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [error, setError] = useState("");

  // Fetch monthly attendance for the logged-in user
  const fetchAttendance = async () => {
    if (!user?.id || !token) return;
    setLoadingAttendance(true);
    setError("");
    try {
      const res = await fetch(
        `https://my-project-backend-tan.vercel.app/api/attendance/user/${user.id}?month=${selectedMonth}&year=${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Status ${res.status}`);
      }
      const data = await res.json();
      setAttendanceRecords(data || []);
    } catch (err) {
      console.error("fetchAttendance error:", err);
      setError("Failed to load attendance. Check console for details.");
    } finally {
      setLoadingAttendance(false);
    }
  };

  // Auto-fetch when Attendance tab is opened or month/year changes
  useEffect(() => {
    if (activeTab === "attendance") fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, selectedMonth, selectedYear]);

  return (
    <>
      {/* StaffDashboard header and tabs fixed below navbar */}
      <div className="staff-dashboard-container">
        <h1 className="dashboard-title"> Welcome Staff {user?.name || "User"}!</h1>

        <div className="staff-dashboard-tabs">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`staff-tab-button ${activeTab === "attendance" ? "active" : ""}`}
          >
            📅 Attendance
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`staff-tab-button ${activeTab === "materials" ? "active" : ""}`}
          >
            📚 Training Materials
          </button>
          <button
            onClick={() => setActiveTab("complaints")}
            className={`staff-tab-button ${activeTab === "complaints" ? "active" : ""}`}
          >
            🛠️ Assigned Complaints
          </button>
        </div>
      </div>

      {/* Scrollable content area below fixed header+tabs */}
      <div className="staff-dashboard-content-wrapper">
        <div className="staff-dashboard-content">
          {activeTab === "attendance" && (
            <StaffAttendance
              attendanceRecords={attendanceRecords}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              fetchAttendance={fetchAttendance}
              token={token}
              user={user}
              loadingAttendance={loadingAttendance}
            />
          )}

          {activeTab === "materials" && <StaffTraining token={token} />}

          {activeTab === "complaints" && <StaffComplaints token={token} />}

          {!activeTab && <p>Select an option from the tabs above to get started.</p>}

          {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default StaffDashboard;










// // src/pages/StaffDashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "../components/Layout"; 
// import "./StaffDashboard.css"; 

// const StaffDashboard = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");

//     const [activeTab, setActiveTab] = useState(null); 
//     const [materials, setMaterials] = useState([]);
//     const [attendanceMessage, setAttendanceMessage] = useState("");
//     const [todayStatus, setTodayStatus] = useState("");
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [assignedComplaints, setAssignedComplaints] = useState([]);
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [showAttendanceTable, setShowAttendanceTable] = useState(false);
//     const [error, setError] = useState("");

//     const getFileURL = (filename) =>
//         `http://localhost:5001/uploads/training/${filename}`;

//     const isVideo = (f) => f.endsWith(".mp4");
//     const isImage = (f) => /\.(jpg|jpeg|png|avif)$/i.test(f);
//     const isPDF = (f) => f.endsWith(".pdf");
//     const isDoc = (f) => /\.(doc|docx)$/i.test(f);

//     const fetchMaterials = async () => {
//         try {
//             const res = await axios.get("http://localhost:5001/api/training/all", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMaterials(res.data);
//         } catch {
//             setError("Failed to load training materials");
//         }
//     };

//     const fetchAssignedComplaints = async () => {
//         try {
//             const res = await axios.get("http://localhost:5001/api/client/complaints/assigned", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setAssignedComplaints(res.data);
//         } catch {
//             setError("Failed to load assigned complaints");
//         }
//     };

//     const markComplaintResolved = async (id) => {
//         try {
//             await axios.put(
//                 `http://localhost:5001/api/client/complaint/resolve/${id}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setAssignedComplaints((prev) =>
//                 prev.map((comp) =>
//                     comp.id === id ? { ...comp, status: "Resolved" } : comp
//                 )
//             );
//         } catch (err) {
//             alert("Failed to mark as resolved");
//             console.error(err);
//         }
//     };

//     const deleteStaffComplaint = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this complaint?")) return;
//         try {
//             await axios.delete(`http://localhost:5001/api/client/complaints/staff/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setAssignedComplaints((prev) => prev.filter((c) => c.id !== id));
//         } catch (err) {
//             alert("Failed to delete complaint");
//             console.error(err);
//         }
//     };

//     const fetchAttendance = async () => {
//         try {
//             const res = await axios.get(
//                 `http://localhost:5001/api/attendance/user/${user.id}?month=${selectedMonth}&year=${selectedYear}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setAttendanceRecords(res.data);
//             const today = new Date();
//             const todayISO = today.toISOString().split("T")[0];
//             const currentTime = today.getHours() * 60 + today.getMinutes();
//             const record = res.data.find((a) => {
//                 const recordISO = new Date(a.date).toISOString().split("T")[0];
//                 return recordISO === todayISO;
//             });
//             if (today.getDay() === 0) setTodayStatus("📴 Sunday (Holiday)");
//             else if (record?.status.toLowerCase() === "present")
//                 setTodayStatus("✅ Present");
//             else if (record?.status.toLowerCase() === "holiday")
//                 setTodayStatus("📴 Holiday");
//             else if (!record && currentTime > 630)
//                 setTodayStatus("❌ Absent");
//             else setTodayStatus("Not marked yet");
//         } catch {
//             setError("Failed to load attendance history");
//         }
//     };

//     const handleAttendance = async () => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:5001/api/attendance/mark",
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setAttendanceMessage(res.data.message);
//             fetchAttendance();
//         } catch (err) {
//             setAttendanceMessage(err.response?.data?.message || "Error marking attendance");
//         }
//     };

//     const getDaysInMonth = (year, month) => {
//         const date = new Date(year, month - 1, 1);
//         const days = [];
//         while (date.getMonth() === month - 1) {
//             days.push(new Date(date));
//             date.setDate(date.getDate() + 1);
//         }
//         return days;
//     };

//     const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

//     const formatDate = (date) =>
//         date.toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//         });

//     const getStatusForDate = (date) => {
//         const iso = date.toISOString().split("T")[0];
//         const today = new Date();
//         if (date > today) return "—";
//         if (date.getDay() === 0) return "📴 Sunday (Holiday)";
//         const record = attendanceRecords.find((r) => {
//             const recISO = new Date(r.date).toISOString().split("T")[0];
//             return recISO === iso;
//         });
//         return record?.status?.toLowerCase() === "present"
//             ? "✅ Present"
//             : record?.status?.toLowerCase() === "holiday"
//             ? "📴 Holiday"
//             : "❌ Absent";
//     };

//     useEffect(() => {
//         fetchMaterials();
//         fetchAssignedComplaints();
//         fetchAttendance();
//     }, []);

//     useEffect(() => {
//         fetchAttendance();
//     }, [selectedMonth, selectedYear]);

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case "attendance":
//                 return (
//                     <>
//                         <div>
//                             <button onClick={handleAttendance}>
//                                 ✅ Mark Attendance
//                             </button>
//                             {attendanceMessage && (
//                                 <p>{attendanceMessage}</p>
//                             )}
//                             <p>
//                                 Today's Status: <span>{todayStatus}</span>
//                             </p>
//                         </div>
//                         <div>
//                             <button onClick={() => setShowAttendanceTable(!showAttendanceTable)}>
//                                 {showAttendanceTable ? "🔽 Hide Monthly Attendance" : "📅 View Monthly Attendance"}
//                             </button>
//                         </div>
//                         {showAttendanceTable && (
//                             <div>
//                                 <div>
//                                     <select
//                                         value={selectedMonth}
//                                         onChange={(e) => setSelectedMonth(Number(e.target.value))}
//                                     >
//                                         {Array.from({ length: 12 }, (_, i) => (
//                                             <option value={i + 1} key={i}>
//                                                 {new Date(0, i).toLocaleString("en-IN", { month: "long" })}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     <select
//                                         value={selectedYear}
//                                         onChange={(e) => setSelectedYear(Number(e.target.value))}
//                                     >
//                                         {Array.from({ length: 5 }, (_, i) => {
//                                             const year = new Date().getFullYear() - 2 + i;
//                                             return (
//                                                 <option key={year} value={year}>
//                                                     {year}
//                                                 </option>
//                                             );
//                                         })}
//                                     </select>
//                                 </div>
//                                 <table>
//                                     <thead>
//                                         <tr>
//                                             <th>📅 Date</th>
//                                             <th>🗓️ Day</th>
//                                             <th>✅ Status</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {daysInMonth.map((day) => (
//                                             <tr key={day.toISOString()}>
//                                                 <td>{formatDate(day)}</td>
//                                                 <td>
//                                                     {day.toLocaleDateString("en-IN", { weekday: "long" })}
//                                                 </td>
//                                                 <td>{getStatusForDate(day)}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </>
//                 );

//             case "materials":
//                 return (
//                     <div>
//                         <h2>📚 Training Materials</h2>
//                         {materials.length === 0 ? (
//                             <p>No training files uploaded yet.</p>
//                         ) : (
//                             <div>
//                                 {materials.map((item) => (
//                                     <div key={item.id}>
//                                         <p>{item.filename}</p>
//                                         {isVideo(item.filename) ? (
//                                             <video controls>
//                                                 <source
//                                                     src={getFileURL(item.filename)}
//                                                     type="video/mp4"
//                                                 />
//                                                 Your browser does not support video playback.
//                                             </video>
//                                         ) : isImage(item.filename) ? (
//                                             <img
//                                                 src={getFileURL(item.filename)}
//                                                 alt={item.filename}
//                                             />
//                                         ) : isPDF(item.filename) ? (
//                                             <iframe
//                                                 src={getFileURL(item.filename)}
//                                                 title={item.filename}
//                                             ></iframe>
//                                         ) : isDoc(item.filename) ? (
//                                             <p>Word document. Please download to view.</p>
//                                         ) : (
//                                             <p>Unsupported file format.</p>
//                                         )}
//                                         <a
//                                             href={getFileURL(item.filename)}
//                                             download
//                                         >
//                                             Download
//                                         </a>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 );

//             case "complaints":
//                 return (
//                     <div>
//                         <h2>🛠️ Complaints Assigned to You</h2>
//                         {assignedComplaints.length === 0 ? (
//                             <p>No complaints have been assigned yet.</p>
//                         ) : (
//                             <div>
//                                 {assignedComplaints.map((comp) => (
//                                     <div key={comp.id}>
//                                         <p><strong>From:</strong> {comp.name} ({comp.email})</p>
//                                         <p><strong>Subject:</strong> {comp.subject}</p>
//                                         <p><strong>Message:</strong> {comp.message}</p>
//                                         <p><strong>Submitted At:</strong> {new Date(comp.submitted_at).toLocaleString()}</p>
//                                         <p><strong>Status:</strong> {comp.status === "Resolved" ? "✅ Resolved" : "⏳ Pending"}</p>
//                                         {comp.file && (
//                                             <a
//                                                 href={`http://localhost:5001/uploads/complaints/${comp.file}`}
//                                                 download
//                                             >
//                                                 📎 Download Attached File
//                                             </a>
//                                         )}
//                                         {comp.status !== "Resolved" && (
//                                             <button onClick={() => markComplaintResolved(comp.id)}>
//                                                 ✅ Mark as Resolved
//                                             </button>
//                                         )}
//                                         {comp.status === "Resolved" && (
//                                             <button onClick={() => deleteStaffComplaint(comp.id)}>
//                                                 🗑️ Delete Complaint
//                                             </button>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 );
            
//             case null:
//             default:
//                 return (
//                     <div>
//                         <p>
//                             Select an option from the tabs above to get started.
//                         </p>
//                     </div>
//                 );
//         }
//     };

//     return (
//         <div className="staff-dashboard-container">
//             <h1>👑 Welcome Staff {user?.name}!</h1>
//             <div className="staff-dashboard-tabs">
//                 <button
//                     onClick={() => setActiveTab("attendance")}
//                     className={`staff-tab-button ${activeTab === "attendance" ? "active" : ""}`}
//                 >
//                     📅 Attendance
//                 </button>
//                 <button
//                     onClick={() => setActiveTab("materials")}
//                     className={`staff-tab-button ${activeTab === "materials" ? "active" : ""}`}
//                 >
//                     📚 Training Materials
//                 </button>
//                 <button
//                     onClick={() => setActiveTab("complaints")}
//                     className={`staff-tab-button ${activeTab === "complaints" ? "active" : ""}`}
//                 >
//                     🛠️ Assigned Complaints
//                 </button>
//             </div>
//             <div className="staff-dashboard-content">
//                 {renderTabContent()}
//                 {error && <p>{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default StaffDashboard;
