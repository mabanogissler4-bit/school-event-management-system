import { useEffect, useState } from "react";

import ManageUsers from "./ManageUsers";
import ManageEvents from "./ManageEvents";
import CreateEvent from "./CreateEvent";
import ManageParticipants from "./ManageParticipants";
import ManageAttendance from "./ManageAttendance";
import AttendanceRecords from "./AttendanceRecords";
import Reports from "./Reports";

function AdminDashboard({ user, onLogout }) {
    const [activePage, setActivePage] = useState("dashboard");

    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err));

        fetch("http://localhost:5000/api/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error(err));

        fetch("http://localhost:5000/api/registrations")
            .then((res) => res.json())
            .then((data) => setRegistrations(data))
            .catch((err) => console.error(err));
    }, [activePage]);

    const totalUsers = users.length;
    const totalEvents = events.length;
    const totalParticipants = registrations.length;

    const upcomingEvents = events
        .filter((event) => event.status !== "Completed")
        .slice(0, 5);

    const renderPage = () => {
        switch (activePage) {
            case "users":
                return <ManageUsers />;

            case "events":
                return <ManageEvents />;

            case "create-event":
                return <CreateEvent />;

            case "participants":
                return <ManageParticipants />;

            case "attendance":
                return <ManageAttendance />;

            case "attendance-records":
                return <AttendanceRecords />;

            case "reports":
                return <Reports />;

            default:
                return (
                    <div className="admin-dashboard">

                        {/* HERO */}
                        <section className="dashboard-hero">

                            <div>
                                <span className="dashboard-eyebrow">
                                    ADMINISTRATOR PORTAL
                                </span>

                                <h1>
                                    Welcome back,{" "}
                                    {user?.name || "Administrator"}
                                </h1>

                                <p>
                                    Manage school events, participants,
                                    attendance, and reports from one place.
                                </p>
                            </div>

                        </section>


                        {/* STATISTICS */}
                        <section className="stats-grid">

                            <div className="stat-card">

                                <div className="stat-top">
                                    <h3>Total Users</h3>

                                    <div className="stat-icon users">
                                        👥
                                    </div>
                                </div>

                                <div className="stat-number">
                                    {totalUsers}
                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-top">
                                    <h3>Total Events</h3>

                                    <div className="stat-icon events">
                                        📅
                                    </div>
                                </div>

                                <div className="stat-number">
                                    {totalEvents}
                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-top">
                                    <h3>Participants</h3>

                                    <div className="stat-icon participants">
                                        🎓
                                    </div>
                                </div>

                                <div className="stat-number">
                                    {totalParticipants}
                                </div>

                            </div>

                        </section>


                        {/* EVENTS */}
                        <section className="card dashboard-events-card">

                            <div className="section-heading">

                                <div>
                                    <span className="section-label">
                                        EVENT OVERVIEW
                                    </span>

                                    <h2>
                                        Upcoming Events
                                    </h2>

                                    <p>
                                        Monitor the latest school activities.
                                    </p>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        setActivePage("events")
                                    }
                                >
                                    View All Events
                                </button>

                            </div>


                            {upcomingEvents.length === 0 ? (

                                <div className="empty-state">
                                    No upcoming events available.
                                </div>

                            ) : (

                                <div className="table-scroll">

                                    <table className="data-table">

                                        <thead>
                                            <tr>
                                                <th>Event Name</th>
                                                <th>Date</th>
                                                <th>Location</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {upcomingEvents.map((event) => (

                                                <tr key={event.eventID}>

                                                    <td>
                                                        <strong>
                                                            {event.eventName}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {new Date(
                                                            event.eventDate
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric"
                                                            }
                                                        )}
                                                    </td>

                                                    <td>
                                                        {event.location}
                                                    </td>

                                                    <td>
                                                        <span className="status-pill status-upcoming">
                                                            {event.status}
                                                        </span>
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </section>


                        {/* QUICK ACTIONS */}
                        <section className="quick-actions-section">

                            <div className="section-heading">

                                <div>
                                    <span className="section-label">
                                        QUICK ACTIONS
                                    </span>

                                    <h2>
                                        Manage School Events
                                    </h2>

                                    <p>
                                        Quickly access the most used
                                        management functions.
                                    </p>
                                </div>

                            </div>


                            <div className="quick-actions-grid">

                                <button
                                    className="quick-action-card"
                                    onClick={() =>
                                        setActivePage("create-event")
                                    }
                                >
                                    <span className="quick-action-icon">
                                        +
                                    </span>

                                    <span>
                                        <strong>
                                            Create Event
                                        </strong>

                                        <small>
                                            Add a new school event
                                        </small>
                                    </span>
                                </button>


                                <button
                                    className="quick-action-card"
                                    onClick={() =>
                                        setActivePage("participants")
                                    }
                                >
                                    <span className="quick-action-icon">
                                        👥
                                    </span>

                                    <span>
                                        <strong>
                                            Participants
                                        </strong>

                                        <small>
                                            View registered students
                                        </small>
                                    </span>
                                </button>


                                <button
                                    className="quick-action-card"
                                    onClick={() =>
                                        setActivePage("attendance")
                                    }
                                >
                                    <span className="quick-action-icon">
                                        ✓
                                    </span>

                                    <span>
                                        <strong>
                                            Attendance
                                        </strong>

                                        <small>
                                            Record event attendance
                                        </small>
                                    </span>
                                </button>


                                <button
                                    className="quick-action-card"
                                    onClick={() =>
                                        setActivePage("reports")
                                    }
                                >
                                    <span className="quick-action-icon">
                                        ▤
                                    </span>

                                    <span>
                                        <strong>
                                            Reports
                                        </strong>

                                        <small>
                                            View system reports
                                        </small>
                                    </span>
                                </button>

                            </div>

                        </section>

                    </div>
                );
        }
    };


    return (
        <div className="admin-layout">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                {/* LOGO */}

                <div className="admin-brand">

                    <div className="brand-logo">

                        <img
                                src="/event-logo.png"
                                alt="School Event Management System"
                         />

                    </div>

                    <div className="brand-text">

                        <h2>
                            School Event
                        </h2>

                        <p>
                            Management System
                        </p>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="admin-nav">

                    <div className="nav-section-title">
                        OVERVIEW
                    </div>


                    <button
                        className={
                            activePage === "dashboard"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("dashboard")
                        }
                    >
                        <span className="nav-icon">
                            ⌂
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </button>


                    <div className="nav-section-title">
                        MANAGEMENT
                    </div>


                    <button
                        className={
                            activePage === "users"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("users")
                        }
                    >
                        <span className="nav-icon">
                            ♙
                        </span>

                        <span>
                            Users
                        </span>
                    </button>


                    <button
                        className={
                            activePage === "events"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("events")
                        }
                    >
                        <span className="nav-icon">
                            ▣
                        </span>

                        <span>
                            Events
                        </span>
                    </button>


                    <button
                        className={
                            activePage === "create-event"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("create-event")
                        }
                    >
                        <span className="nav-icon">
                            ＋
                        </span>

                        <span>
                            Create Event
                        </span>
                    </button>


                    <button
                        className={
                            activePage === "participants"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("participants")
                        }
                    >
                        <span className="nav-icon">
                            ♟
                        </span>

                        <span>
                            Participants
                        </span>
                    </button>


                    <div className="nav-section-title">
                        ATTENDANCE
                    </div>


                    <button
                        className={
                            activePage === "attendance"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("attendance")
                        }
                    >
                        <span className="nav-icon">
                            ✓
                        </span>

                        <span>
                            Record Attendance
                        </span>
                    </button>


                    <button
                        className={
                            activePage === "attendance-records"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("attendance-records")
                        }
                    >
                        <span className="nav-icon">
                            ▤
                        </span>

                        <span>
                            Attendance Records
                        </span>
                    </button>


                    <div className="nav-section-title">
                        REPORTING
                    </div>


                    <button
                        className={
                            activePage === "reports"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActivePage("reports")
                        }
                    >
                        <span className="nav-icon">
                            ▥
                        </span>

                        <span>
                            Reports
                        </span>
                    </button>

                </nav>


                {/* USER PROFILE */}

                <div className="admin-sidebar-footer">

                    <div className="admin-profile">

                        <div className="profile-avatar">

                            {(user?.name || "A")
                                .charAt(0)
                                .toUpperCase()}

                        </div>

                        <div className="profile-info">

                            <strong>
                                {user?.name || "Administrator"}
                            </strong>

                            <span>
                                {user?.role || "Admin"}
                            </span>

                        </div>

                    </div>


                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        <span>
                            ↪
                        </span>

                        Logout
                    </button>

                </div>

            </aside>


            {/* MAIN CONTENT */}

            <main className="admin-main">

                <header className="admin-topbar">

                    <div>

                        <span className="topbar-label">
                            SCHOOL EVENT PORTAL
                        </span>

                        <h1>
                            {activePage === "dashboard"
                                ? "Dashboard"
                                : activePage
                                    .replace("-", " ")
                                    .replace(/\b\w/g, (char) =>
                                        char.toUpperCase()
                                    )}
                        </h1>

                    </div>


                    <div className="admin-user">

                        <div className="topbar-avatar">

                            {(user?.name || "A")
                                .charAt(0)
                                .toUpperCase()}

                        </div>

                        <div>

                            <strong>
                                {user?.name || "Administrator"}
                            </strong>

                            <span>
                                {user?.role || "Admin"}
                            </span>

                        </div>

                    </div>

                </header>


                {renderPage()}

            </main>

        </div>
    );
}

export default AdminDashboard;