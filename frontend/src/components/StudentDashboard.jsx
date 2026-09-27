import React from "react";
import StudentEvents from "./StudentEvents";
import "./StudentDashboard.css";

function StudentDashboard({ user, onLogout }) {
    return (
        <div className="student-dashboard">

            {/* ================= NAVBAR ================= */}

            <header className="student-navbar">

                {/* LOGO AND SYSTEM NAME */}
                <div className="student-brand">

                    <div className="student-logo">
                        <img
                            alt="School Event Management System"
                        />
                    </div>

                    <div className="student-brand-text">
                        <strong>School Event</strong>
                        <span>Management System</span>
                    </div>

                </div>


                {/* STUDENT ACCOUNT */}
                <div className="student-nav-user">

                    <div className="student-avatar">
                        {(user?.name || "S")
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div className="student-user-info">

                        <strong>
                            {user?.name || "Student"}
                        </strong>

                        <span>
                            {user?.email || "student@school.com"}
                        </span>

                    </div>

                    <button
                        className="student-logout"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* ================= MAIN CONTENT ================= */}

            <main className="student-main">


                {/* ================= HERO SECTION ================= */}

                <section className="student-welcome">

                    <p className="student-welcome-label">
                        STUDENT DASHBOARD
                    </p>

                    <h1>
                        Welcome, {user?.name || "Student"}!
                    </h1>

                    <p className="student-welcome-description">
                        Browse school events, register for activities,
                        and keep track of your participation.
                    </p>

                </section>


                {/* ================= ACCOUNT INFORMATION ================= */}

                <section className="student-info-grid">


                    {/* NAME */}

                    <div className="student-info-card">

                        <div className="student-info-icon">
                            👤
                        </div>

                        <div>
                            <span>Name</span>

                            <strong>
                                {user?.name || "Student"}
                            </strong>
                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="student-info-card">

                        <div className="student-info-icon">
                            ✉
                        </div>

                        <div>
                            <span>Email</span>

                            <strong>
                                {user?.email || "student@school.com"}
                            </strong>
                        </div>

                    </div>


                    {/* ROLE */}

                    <div className="student-info-card">

                        <div className="student-info-icon">
                            🎓
                        </div>

                        <div>
                            <span>Account Role</span>

                            <strong>
                                {user?.role || "Student"}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ================= EVENTS ================= */}

                <section className="student-events-section">

                    <div className="student-section-header">

                        <p className="student-section-label">
                            EVENTS
                        </p>

                        <h2>
                            Available School Events
                        </h2>

                        <p>
                            View upcoming events and register for
                            activities you want to attend.
                        </p>

                    </div>


                    {/* EXISTING EVENT SYSTEM */}

                    <StudentEvents user={user} />

                </section>

            </main>

        </div>
    );
}

export default StudentDashboard;