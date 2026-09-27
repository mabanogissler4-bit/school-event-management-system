import { useState } from "react";

function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Upcoming");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventDate,
        location,
        description,
        status,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Event created successfully!");

      setEventName("");
      setEventDate("");
      setLocation("");
      setDescription("");
      setStatus("Upcoming");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Create Event</h1>
          <p>Add a new event for students to register for.</p>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;