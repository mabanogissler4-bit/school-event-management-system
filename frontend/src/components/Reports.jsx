import { useEffect, useState } from "react";
import { statusPillClass } from "./utils/statusBadge";

function Reports() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const usersResponse = await fetch(
        "http://localhost:5000/api/users"
      );

      const eventsResponse = await fetch(
        "http://localhost:5000/api/events"
      );

      const registrationsResponse = await fetch(
        "http://localhost:5000/api/registrations"
      );

      const attendanceResponse = await fetch(
        "http://localhost:5000/api/attendance"
      );

      const usersData = await usersResponse.json();
      const eventsData = await eventsResponse.json();
      const registrationsData = await registrationsResponse.json();
      const attendanceData = await attendanceResponse.json();

      setUsers(usersData);
      setEvents(eventsData);
      setRegistrations(registrationsData);
      setAttendance(attendanceData);
    } catch (error) {
      console.error("Error loading reports:", error);
    }
  };

  const presentCount = attendance.filter(
    (record) => record.attendanceStatus === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.attendanceStatus === "Absent"
  ).length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>System-wide summary and attendance history.</p>
        </div>
      </div>

      <div className="reports-summary">
        <div className="stat-card">
          <div className="stat-top">
            <span>TOTAL USERS</span>
            <div className="stat-icon users">U</div>
          </div>
          <strong>{users.length}</strong>
          <p>Registered accounts</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>TOTAL EVENTS</span>
            <div className="stat-icon events">E</div>
          </div>
          <strong>{events.length}</strong>
          <p>Events in the system</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>REGISTRATIONS</span>
            <div className="stat-icon participants">P</div>
          </div>
          <strong>{registrations.length}</strong>
          <p>Total sign-ups</p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>ATTENDANCE</span>
            <div className="stat-icon participants">✓</div>
          </div>
          <strong>{presentCount} / {presentCount + absentCount}</strong>
          <p>{presentCount} present · {absentCount} absent</p>
        </div>
      </div>

      <div className="reports-section-title">
        <h2>Attendance Report</h2>
      </div>

      <div className="card">
        {attendance.length === 0 ? (
          <div className="empty-state">No attendance records found.</div>
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((record) => (
                  <tr key={record.attendanceID}>
                    <td><strong>{record.studentName}</strong></td>
                    <td>{record.eventName}</td>
                    <td className="muted">{record.attendanceDate}</td>
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

export default Reports;