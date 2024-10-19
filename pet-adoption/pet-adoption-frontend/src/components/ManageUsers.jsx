import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/PostServicesUsers';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };

  return (
    <div className="manage-users">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
