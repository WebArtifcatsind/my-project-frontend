// D:\office\webartifacts\webartifacts-frontend\src\components\StaffAttendance.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffAttendance.css";

const StaffAttendance = ({
  attendanceRecords = [],
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  fetchAttendance,
  token,
  user,
  loadingAttendance,
}) => {
  const [todayStatus, setTodayStatus] = useState(null);
  const [marking, setMarking] = useState(false);
  const [message, setMessage] = useState("");

  // Generate days in month
  const getDaysInMonth = (year, month) => {
    const d = new Date(year, month - 1, 1);
    const days = [];
    while (d.getMonth() === month - 1) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  };

  // Format date dd-mm-yyyy
  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });

  // Get status for a date
  const getStatusForDate = (date) => {
    const iso = date.toISOString().split("T")[0];
    const today = new Date();
    if (date > today) return "—";
    if (date.getDay() === 0) return "📴 Sunday (Holiday)";

    const rec = attendanceRecords.find((r) => {
      const recISO = new Date(r.date).toISOString().split("T")[0];
      return recISO === iso;
    });

    return rec?.status?.toLowerCase() === "present"
      ? "✅ Present"
      : rec?.status?.toLowerCase() === "holiday"
      ? "📴 Holiday"
      : "❌ Absent";
  };

  // Fetch today's status
  useEffect(() => {
    if (!user?.id || !token) return;
    const fetchToday = async () => {
      try {
        const res = await axios.get(`https://my-project-backend-tan.vercel.app/api/attendance/today/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodayStatus(res.data?.status || null);
      } catch {
        const todayIso = new Date().toISOString().split("T")[0];
        const rec = attendanceRecords.find((r) => new Date(r.date).toISOString().split("T")[0] === todayIso);
        setTodayStatus(rec?.status || null);
      }
    };
    fetchToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token, attendanceRecords]);

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

  const markAttendance = async () => {
    if (!user?.id || !token) {
      setMessage("Not logged in or missing token.");
      return;
    }
    setMarking(true);
    setMessage("");
    try {
      const res = await axios.post(
        "https://my-project-backend-tan.vercel.app/api/attendance/mark",
        { staffId: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data?.message || "Attendance marked.");
      if (typeof fetchAttendance === "function") {
        await fetchAttendance();
      }
      setTodayStatus("Present");
    } catch (err) {
      console.error("markAttendance error:", err);
      const serverMsg = err.response?.data?.message;
      if (err.response?.status === 403) {
        setMessage(serverMsg || "You are not authorized to mark attendance.");
      } else {
        setMessage(serverMsg || "Failed to mark attendance. Check console.");
      }
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="staff-attendance-component">
      <h2>📅 Attendance — {selectedMonth}/{selectedYear}</h2>

      <div className="attendance-controls">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("en-IN", { month: "long" })}
            </option>
          ))}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => {
            const y = new Date().getFullYear() - 2 + i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>

        <div className="attendance-status">
          {todayStatus ? (
            <span className="today-status">Today's status: {todayStatus}</span>
          ) : (
            <button className="mark-btn" onClick={markAttendance} disabled={marking}>
              {marking ? "Marking..." : "✅ Mark Attendance"}
            </button>
          )}
        </div>
      </div>

      {message && <p className={message.includes("Failed") ? "error-message" : "success-message"}>{message}</p>}

      {loadingAttendance ? (
        <p>Loading records...</p>
      ) : (
        <div className="attendance-table-scroll">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>📅 Date</th>
                <th>🗓 Day</th>
                <th>✅ Status</th>
              </tr>
            </thead>
            <tbody>
              {daysInMonth.map((d) => (
                <tr key={d.toISOString()}>
                  <td>{formatDate(d)}</td>
                  <td>{d.toLocaleDateString("en-IN", { weekday: "long" })}</td>
                  <td>{getStatusForDate(d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffAttendance;
