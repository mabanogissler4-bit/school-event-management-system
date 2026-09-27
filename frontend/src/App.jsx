import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    if (user.role === "Admin") {
      return (
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
        />
      );
    }

    if (user.role === "Student") {
      return (
        <StudentDashboard
          user={user}
          onLogout={handleLogout}
        />
      );
    }
  }

  return (
    <div className="app">
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default App;