import { useEffect, useState } from "react";
import { statusPillClass } from "./utils/statusBadge";

function ManageParticipants() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/registrations")
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
      })
      .catch((error) => {
        console.error("Error loading registrations:", error);
      });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Manage Participants</h1>
          <p>Everyone registered for an event.</p>
        </div>
      </div>

      <div className="card">
        {registrations.length === 0 ? (
          <div className="empty-state">No registered participants.</div>
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
                  <th>Registration Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((registration) => (
                  <tr key={registration.registrationID}>
                    <td className="muted">{registration.registrationID}</td>
                    <td><strong>{registration.studentName}</strong></td>
                    <td className="muted">{registration.email}</td>
                    <td>{registration.eventName}</td>
                    <td>{registration.eventDate}</td>
                    <td className="muted">{registration.registrationDate}</td>
                    <td>
                      <span className={statusPillClass(registration.status)}>
                        {registration.status}
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

export default ManageParticipants;