const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("School Event Management System Backend is running!");
});

// Get all users
app.get("/api/users", (req, res) => {
    const sql = "SELECT userID, name, email, role FROM users";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                error: "Failed to retrieve users"
            });
        }

        res.json(results);
    });
});

// Get all events
app.get("/api/events", (req, res) => {
    const sql = "SELECT * FROM events";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                error: "Failed to retrieve events"
            });
        }

        res.json(results);
    });
});

// Create a new event
app.post("/api/events", (req, res) => {
    const {
        eventName,
        eventDate,
        location,
        description,
        status
    } = req.body;

    const sql = `
        INSERT INTO events
        (eventName, eventDate, location, description, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [eventName, eventDate, location, description, status],
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to create event"
                });
            }

            res.json({
                success: true,
                message: "Event created successfully",
                eventID: result.insertId
            });
        }
    );
});

// Register student for an event
app.post("/api/registrations", (req, res) => {
    const {
        userID,
        eventID
    } = req.body;

    const checkSql = `
        SELECT *
        FROM registrations
        WHERE userID = ? AND eventID = ?
    `;

    db.query(
        checkSql,
        [userID, eventID],
        (err, results) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to check registration"
                });
            }

            if (results.length > 0) {
                return res.json({
                    success: false,
                    message: "You are already registered for this event."
                });
            }

            const registrationDate =
                new Date().toISOString().split("T")[0];

            const status = "Registered";

            const sql = `
                INSERT INTO registrations
                (userID, eventID, registrationDate, status)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                sql,
                [userID, eventID, registrationDate, status],
                (err, result) => {
                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            success: false,
                            message: "Failed to register for event"
                        });
                    }

                    res.json({
                        success: true,
                        message: "Event registration successful",
                        registrationID: result.insertId
                    });
                }
            );
        }
    );
});

// Get all registrations
app.get("/api/registrations", (req, res) => {
    const sql = `
        SELECT
            registrations.registrationID,
            users.name AS studentName,
            users.email,
            events.eventName,
            events.eventDate,
            registrations.registrationDate,
            registrations.status
        FROM registrations
        JOIN users
            ON registrations.userID = users.userID
        JOIN events
            ON registrations.eventID = events.eventID
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to retrieve registrations"
            });
        }

        res.json(results);
    });
});

// Record attendance
app.post("/api/attendance", (req, res) => {
    const {
        registrationID,
        status
    } = req.body;

    const checkSql = `
        SELECT *
        FROM attendance
        WHERE registrationID = ?
    `;

    db.query(
        checkSql,
        [registrationID],
        (err, results) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to check attendance"
                });
            }

            if (results.length > 0) {
                return res.json({
                    success: false,
                    message: "Attendance has already been recorded for this student."
                });
            }

            const attendanceDate =
                new Date().toISOString().split("T")[0];

            const timeIn =
                new Date().toTimeString().split(" ")[0];

            const sql = `
                INSERT INTO attendance
                (registrationID, attendanceDate, timeIn, status)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                sql,
                [registrationID, attendanceDate, timeIn, status],
                (err, result) => {
                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            success: false,
                            message: "Failed to record attendance"
                        });
                    }

                    res.json({
                        success: true,
                        message: "Attendance recorded successfully",
                        attendanceID: result.insertId
                    });
                }
            );
        }
    );
});

// Get all attendance records
app.get("/api/attendance", (req, res) => {
    const sql = `
        SELECT
            attendance.attendanceID,
            users.name AS studentName,
            users.email,
            events.eventName,
            events.eventDate,
            attendance.attendanceDate,
            attendance.timeIn,
            attendance.status AS attendanceStatus
        FROM attendance
        JOIN registrations
            ON attendance.registrationID = registrations.registrationID
        JOIN users
            ON registrations.userID = users.userID
        JOIN events
            ON registrations.eventID = events.eventID
        ORDER BY attendance.attendanceID DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to retrieve attendance records"
            });
        }

        res.json(results);
    });
});

// Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    console.log("Login request received");
    console.log("Email received:", email);

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        console.log("Users found:", results.length);

        // User not found
        if (results.length === 0) {
            console.log("No user found with this email.");

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        // Compare entered password with bcrypt hash
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Bcrypt match:", passwordMatch);

        // Password is incorrect
        if (!passwordMatch) {
            console.log("Password does not match.");

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Do not send the password/hash to React
        delete user.password;

        console.log("Login successful for:", user.email);

        res.json({
            success: true,
            message: "Login successful",
            user: user
        });
    });
});

// Delete an event
app.delete("/api/events/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM events WHERE eventID = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to delete event"
            });
        }

        res.json({
            success: true,
            message: "Event deleted successfully"
        });
    });
});

// Update an event
app.put("/api/events/:id", (req, res) => {
    const { id } = req.params;

    const {
        eventName,
        eventDate,
        location,
        description,
        status
    } = req.body;

    const sql = `
        UPDATE events
        SET
            eventName = ?,
            eventDate = ?,
            location = ?,
            description = ?,
            status = ?
        WHERE eventID = ?
    `;

    db.query(
        sql,
        [eventName, eventDate, location, description, status, id],
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to update event"
                });
            }

            res.json({
                success: true,
                message: "Event updated successfully"
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});