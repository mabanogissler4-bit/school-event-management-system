import { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
      });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Manage Users</h1>
          <p>All accounts registered in the system.</p>
        </div>
      </div>

      <div className="card">
        {users.length === 0 ? (
          <div className="empty-state">No users found.</div>
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.userID}>
                    <td className="muted">{user.userID}</td>
                    <td><strong>{user.name}</strong></td>
                    <td className="muted">{user.email}</td>
                    <td>{user.role}</td>
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

export default ManageUsers;