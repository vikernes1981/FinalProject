import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    profilePicture: '',
    contactInfo: ''
  });

  useEffect(() => {
    // Fetch the user's current profile information when the component mounts
    axios.get('/api/user/profile')
      .then(response => {
        // Ensure that all profile fields are defined, fallback to an empty string if any field is missing
        setProfile({
          bio: response.data.bio || '',
          profilePicture: response.data.profilePicture || '',
          contactInfo: response.data.contactInfo || ''
        });
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/user/profile', profile)
      .then(response => alert('Profile updated successfully!'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePicture"
            value={profile.profilePicture}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            name="contactInfo"
            value={profile.contactInfo}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
