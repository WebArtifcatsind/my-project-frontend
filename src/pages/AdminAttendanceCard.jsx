// src/pages/AdminAttendanceCard.jsx (Updated)
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAttendanceCard.css";

const AdminAttendanceCard = () => {
    const token = localStorage.getItem("token");
    const [staffList, setStaffList] = useState([]);
    const [selectedStaffId, setSelectedStaffId] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [attendanceData, setAttendanceData] = useState([]);
    const [message, setMessage] = useState("");

    const fetchStaff = async () => {
        try {
            const res = await axios.get("https://api.webartifacts.in/api/users/staff", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStaffList(res.data);
            if (res.data.length > 0) {
                setSelectedStaffId(res.data[0].id); // Auto-select the first staff member
            }
        } catch (err) {
            console.error("Failed to fetch staff", err);
        }
    };

    const fetchAttendance = async () => {
        if (!selectedStaffId) {
            setAttendanceData([]);
            return;
        }
        try {
            const res = await axios.get(
                `https://api.webartifacts.in/api/attendance/user/${selectedStaffId}?month=${selectedMonth}&year=${selectedYear}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAttendanceData(res.data);
        } catch (err) {
            console.error("Failed to fetch attendance", err);
            setAttendanceData([]);
        }
    };

    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month - 1, 1);
        const days = [];
        while (date.getMonth() === month - 1) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const getStatusForDate = (dateObj) => {
        const iso = formatDate(dateObj);
        const record = attendanceData.find((r) => formatDate(new Date(r.date)) === iso);
        return record ? record.status.charAt(0).toUpperCase() + record.status.slice(1).toLowerCase() : "Absent";
    };

    const formatDate = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleUpdate = async (userId, date, status) => {
        try {
            await axios.put(
                "https://api.webartifacts.in/api/attendance/update",
                { userId, date, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("✅ Updated successfully!");
            setTimeout(() => setMessage(""), 3000);
            await fetchAttendance();
        } catch (err) {
            setMessage("❌ Failed to update");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const downloadExcel = () => {
        // ... (downloadExcel function remains the same)
        const csv = [
            ["Date", "Day", "Status"],
            ...days.map((dateObj) => {
                const date = dateObj.toLocaleDateString("en-IN");
                const day = dateObj.toLocaleDateString("en-IN", { weekday: "long" });
                const status = dateObj.getDay() === 0 ? "Holiday" : getStatusForDate(dateObj);
                return [date, day, status];
            }),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Attendance_${selectedMonth}_${selectedYear}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    useEffect(() => {
        fetchAttendance();
    }, [selectedStaffId, selectedMonth, selectedYear]);

    const days = getDaysInMonth(selectedYear, selectedMonth);

    return (
        <div className="admin-view-card">
            <h2 className="admin-card-title">📅 Staff Attendance</h2>
            <div className="admin-attendance-controls">
                <select
                    value={selectedStaffId}
                    onChange={(e) => setSelectedStaffId(e.target.value)}
                    className="admin-control-select"
                    name="staff" // Added name attribute for specific styling
                >
                    <option value="">Select Staff</option>
                    {staffList.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                            {staff.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="admin-control-select"
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option value={i + 1} key={i}>
                            {new Date(0, i).toLocaleString("en-IN", { month: "long" })}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="admin-control-select"
                >
                    {[2023, 2024, 2025, 2026].map((y) => (
                        <option key={y}>{y}</option>
                    ))}
                </select>
            </div>

            {message && <p className={`status-message ${message.includes("✅") ? "success" : "error"}`}>{message}</p>}

            {selectedStaffId && (
                <div className="admin-attendance-table-wrapper">
                    <div className="admin-attendance-actions">
                        <button onClick={downloadExcel} className="admin-download-button">
                            📥 Download Excel
                        </button>
                        <button onClick={() => window.print()} className="admin-print-button">
                            🖨️ Print
                        </button>
                    </div>

                    <div className="admin-attendance-table-scroll">
                        <table className="admin-attendance-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Day</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {days.map((dateObj) => {
                                    const iso = formatDate(dateObj);
                                    const formatted = dateObj.toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    });
                                    const dayName = dateObj.toLocaleDateString("en-IN", { weekday: "long" });
                                    const isSunday = dateObj.getDay() === 0;
                                    const isFuture = dateObj > new Date();
                                    const status = isSunday ? "Holiday" : getStatusForDate(dateObj);
                                    const statusClass = `status-${status.toLowerCase()}`;

                                    return (
                                        <tr key={iso}>
                                            <td>{formatted}</td>
                                            <td>{dayName}</td>
                                            <td className={statusClass}>{status}</td>
                                            <td>
                                                {!isSunday && !isFuture ? (
                                                    <select
                                                        value={status}
                                                        onChange={(e) => handleUpdate(selectedStaffId, iso, e.target.value)}
                                                        className="admin-status-select"
                                                    >
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                        <option value="Holiday">Holiday</option>
                                                    </select>
                                                ) : (
                                                    <span className="admin-text-muted">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAttendanceCard;