import React, { useState } from 'react';
import ManagePets from './ManagePets';
import ManageAdoptionRequests from './ManageAdoptionRequests';
import ManageUsers from './ManageUsers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pets');

  return (
    <div className="admin-dashboard container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="tabs flex justify-around mb-8">
        <button onClick={() => setActiveTab('pets')}>Manage Pets</button>
        <button onClick={() => setActiveTab('requests')}>Adoption Requests</button>
        <button onClick={() => setActiveTab('users')}>Manage Users</button>
      </div>

      {activeTab === 'pets' && <ManagePets />}
      {activeTab === 'requests' && <ManageAdoptionRequests />}
      {activeTab === 'users' && <ManageUsers />}
    </div>
  );
};

export default AdminDashboard;
