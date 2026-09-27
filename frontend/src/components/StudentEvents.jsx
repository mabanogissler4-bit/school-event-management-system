import { useEffect, useState } from "react";
import { statusPillClass } from "./utils/statusBadge";

function StudentEvents({ user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
      });
  }, []);

  const handleRegister = async (eventID) => {
    const response = await fetch(
      "http://localhost:5000/api/registrations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user.userID,
          eventID: eventID,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Event registration successful!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="card">
      {events.length === 0 ? (
        <div className="empty-state">No events available.</div>
      ) : (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.eventID}>
                  <td><strong>{event.eventName}</strong></td>
                  <td>{event.eventDate}</td>
                  <td>{event.location}</td>
                  <td className="muted">{event.description}</td>
                  <td>
                    <span className={statusPillClass(event.status)}>
                      {event.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-brass btn-sm"
                      onClick={() => handleRegister(event.eventID)}
                    >
                      Register
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentEvents;