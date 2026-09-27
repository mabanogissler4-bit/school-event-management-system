import { useEffect, useState } from "react";
import { statusPillClass } from "./utils/statusBadge";

function AttendanceRecords() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = () => {
    fetch("http://localhost:5000/api/attendance")
      .then((response) => response.json())
      .then((data) => {
        setAttendance(data);
      })
      .catch((error) => {
        console.error("Error loading attendance:", error);
      });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Attendance Records</h1>
          <p>Full history of recorded attendance.</p>
        </div>
      </div>

      <div className="card">
        {attendance.length === 0 ? (
          <div className="empty-state">No attendance records found.</div>
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Event Date</th>
                  <th>Attendance Date</th>
                  <th>Time In</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((record) => (
                  <tr key={record.attendanceID}>
                    <td className="muted">{record.attendanceID}</td>
                    <td><strong>{record.studentName}</strong></td>
                    <td className="muted">{record.email}</td>
                    <td>{record.eventName}</td>
                    <td>{record.eventDate}</td>
                    <td>{record.attendanceDate}</td>
                    <td>{record.timeIn}</td>
                    <td>
                      <span className={statusPillClass(record.attendanceStatus)}>
                        {record.attendanceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceRecords;