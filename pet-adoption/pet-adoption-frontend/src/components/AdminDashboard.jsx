import React, { useState } from 'react';
import ManagePets from './ManagePets';
import ManageAdoptionRequests from './ManageAdoptionRequests';
import ManageUsers from './ManageUsers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pets');

  return (
    <div className="admin-dashboard container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="tabs flex justify-around mb-8 space-x-4"> {/* Added space-x-4 for spacing */}
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'pets' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setActiveTab('pets')}
        >
          Manage Pets
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setActiveTab('requests')}
        >
          Adoption Requests
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
      </div>

      <div className="content mt-8">
        {activeTab === 'pets' && <ManagePets />}
        {activeTab === 'requests' && <ManageAdoptionRequests />}
        {activeTab === 'users' && <ManageUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
