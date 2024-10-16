// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { sendMessageToBot } from '../services/telegramService';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await sendMessageToBot({ message: '/profile' });
        setProfile(response);
      } catch (error) {
        setError('Failed to load profile. Please try again.');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Profile</h1>

      {/* Show loading state */}
      {loading && <p className="text-gray-500">Loading profile...</p>}

      {/* Show error state */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show profile information */}
      {profile ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p>Name: {profile.name}</p>
          <p>Age: {profile.age}</p>
        </div>
      ) : (
        !loading && <p className="text-gray-500">No profile found. Please register with the bot.</p>
      )}
    </div>
  );
};

export default Dashboard;
