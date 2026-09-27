import { useEffect, useState } from "react";
import { statusPillClass } from "./utils/statusBadge";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
      });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  // Delete event
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/events/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Event deleted successfully!");

      loadEvents();
    } else {
      alert(data.message);
    }
  };

  const handleChange = (e) => {
    setEditingEvent({
      ...editingEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/events/${editingEvent.eventID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingEvent),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Event updated successfully!");

      setEditingEvent(null);

      loadEvents();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Manage Events</h1>
          <p>Edit details or remove events from the system.</p>
        </div>
      </div>

      <div className="card">
        {events.length === 0 ? (
          <div className="empty-state">No events available.</div>
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
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
                    <td className="muted">{event.eventID}</td>
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
                      <div className="row-actions">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(event.eventID)}
                        >
                          Delete
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

      {editingEvent && (
        <div className="modal-overlay" onClick={() => setEditingEvent(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Event</h2>

            <form onSubmit={handleUpdate} className="form-grid">
              <div className="form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  value={editingEvent.eventName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={editingEvent.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editingEvent.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editingEvent.description || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={editingEvent.status}
                  onChange={handleChange}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingEvent(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEvents;