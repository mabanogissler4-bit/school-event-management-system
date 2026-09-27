import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-hero">

        <div className="hero-content">

          <div className="brand">
            <span>School Event</span>
            <strong>Management System</strong>
          </div>

          <div className="hero-label">
            SCHOOL EVENT PORTAL
          </div>

          <h1>
            Everything your school
            <br />
            needs for events.
          </h1>

          <p className="hero-description">
            Organize school activities, manage participants,
            monitor attendance, and keep event information
            in one place.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <span className="feature-number">01</span>
              <span>Event Management</span>
            </div>

            <div className="feature-item">
              <span className="feature-number">02</span>
              <span>Student Registration</span>
            </div>

            <div className="feature-item">
              <span className="feature-number">03</span>
              <span>Attendance Tracking</span>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-panel">

        <div className="login-card">

          <div className="login-heading">
            <span>WELCOME BACK</span>

            <h2>Sign in</h2>

            <p>
              Sign in to access your school event portal.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              <span>Sign In</span>
              <span className="login-arrow">→</span>
            </button>

          </form>

          <div className="login-footer">
            Secure school management portal
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;