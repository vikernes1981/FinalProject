import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createRequest } from '../services/PostServicesPostRequest';
import { getUserById } from '../services/PostServicesUsers'; // Fetch user info
import { getPetById } from '../services/PostServicesPets'; // Fetch pet info

const AdoptionRequestForm = () => {
  const { id } = useParams(); // Get pet id from URL
  const [formData, setFormData] = useState({
    email: '',
    why: '',
    when: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [petName, setPetName] = useState('');
  const [userId, setUserId] = useState(null); // To store user ID

  // Fetch the pet and user info
  useEffect(() => {
    const fetchPetAndUser = async () => {
      try {
        // Fetch pet info
        const petResponse = await getPetById(id);
        console.log('PetResponse : ', petResponse)
        if (petResponse) {
          setPetName(petResponse.name);
        } else {
          throw new Error('Failed to fetch pet data');
        }
        const userID = "67163c50e87ae46261c7ee91";
        // Fetch user info (assuming you have a logged-in user with their ID stored)
        const userResponse = await getUserById(userID); // Pass any necessary params like userID
        if (userResponse) {
          setFormData((prevData) => ({
            ...prevData,
            email: userResponse.email, // Populate the form with user's email
          }));
          setUserId(userResponse._id); // Store user ID for later
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchPetAndUser();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); 

    try {
      const requestData = {
        user: userId, // Use the fetched user ID
        pet: id, // Pet ID from URL
        message: formData.why,
        when: new Date(formData.when).toISOString(), // Format the date
        status: "Pending",
      };

      await createRequest(requestData); // Submit the request
      setSuccessMessage('Your adoption request has been submitted successfully!');
      setFormData({ email: '', why: '', when: '' }); // Reset the form
    } catch (err) {
      setErrorMessage('There was an issue submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Adoption Request for {petName}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field (auto-filled from user data) */}
        <div>
          <label htmlFor="email" className="block text-lg font-semibold mb-2">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
            disabled={loading}
          />
        </div>

        {/* Why Adopt Field */}
        <div>
          <label htmlFor="why" className="block text-lg font-semibold mb-2">Why do you want to adopt?</label>
          <textarea
            id="why"
            name="why"
            value={formData.why}
            onChange={(e) => setFormData({ ...formData, why: e.target.value })}
            required
            className="w-full h-32 p-4 border border-gray-300 rounded-lg"
            disabled={loading}
          />
        </div>

        {/* When can you adopt Field */}
        <div>
          <label htmlFor="when" className="block text-lg font-semibold mb-2">When can you adopt?</label>
          <input
            id="when"
            type="date"
            name="when"
            value={formData.when}
            onChange={(e) => setFormData({ ...formData, when: e.target.value })}
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 px-6 bg-green-600 text-white rounded-lg" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>

        {/* Success and Error Messages */}
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AdoptionRequestForm;
