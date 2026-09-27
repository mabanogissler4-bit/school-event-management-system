import { useEffect, useState } from "react";

function ManageAttendance() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = () => {
    fetch("http://localhost:5000/api/registrations")
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
      })
      .catch((error) => {
        console.error("Error loading registrations:", error);
      });
  };

  const handleAttendance = async (registrationID, status) => {
    const response = await fetch(
      "http://localhost:5000/api/attendance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationID: registrationID,
          status: status,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Attendance recorded successfully!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Record Attendance</h1>
          <p>Mark students present or absent for each event.</p>
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
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Event Date</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((registration) => (
                  <tr key={registration.registrationID}>
                    <td><strong>{registration.studentName}</strong></td>
                    <td className="muted">{registration.email}</td>
                    <td>{registration.eventName}</td>
                    <td>{registration.eventDate}</td>

                    <td>
                      <div className="row-actions">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            handleAttendance(
                              registration.registrationID,
                              "Present"
                            )
                          }
                        >
                          Present
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleAttendance(
                              registration.registrationID,
                              "Absent"
                            )
                          }
                        >
                          Absent
                        </button>
                      </div>
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

export default ManageAttendance;