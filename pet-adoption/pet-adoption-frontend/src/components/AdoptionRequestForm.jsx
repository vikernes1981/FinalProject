import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createRequest } from '../services/PostServicesAdoption';
import { getUserById } from '../services/PostServicesUsers'; // Ensure the correct path

const AdoptionRequestForm = () => {
  const { name } = useParams(); // Get the pet name from the URL
  const [formData, setFormData] = useState({
    adopterName: '',
    why: '',
    when: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null); // State to hold user data

  // Fetch the logged-in user's details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/admin/user'); // Modify this endpoint as necessary
        setUserData(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch user data. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (formData.adopterName.trim().length < 2) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (formData.why.trim().length < 10) {
      setErrorMessage('Please provide more details on why you want to adopt.');
      return;
    }
    if (formData.when.trim().length === 0) {
      setErrorMessage('Please provide a date for when you can adopt.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(''); // Clear any previous error message

      if (!userData) {
        throw new Error('User data not available.');
      }

      const requestData = {
        user: {
          _id: userData._id, // User ID
          username: userData.username, // User username
          email: userData.email, // User email
          role: userData.role, // User role
        },
        pet: {
          name: name, // Pet name from URL
        },
        message: formData.why, // Message from the form
        status: "Pending", // Default status
      };

      // Use the createRequest function to submit the request
      await createRequest(requestData);

      setSuccessMessage('Your adoption request has been submitted successfully!');
      setFormData({ adopterName: '', why: '', when: '' }); // Reset form fields
    } catch (err) {
      setErrorMessage('There was an issue submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Adoption Request for {name}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Adopter Name */}
        <div>
          <label htmlFor="adopterName" className="block text-lg font-semibold mb-2">Your Name</label>
          <input
            id="adopterName"
            type="text"
            name="adopterName"
            value={formData.adopterName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300"
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
            onChange={handleChange}
            placeholder="Tell us why you want to adopt this pet"
            required
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300"
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
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition duration-300"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 px-6 text-white rounded-lg font-semibold transition duration-300 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-600 mt-4 text-center">
            <p>{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-600 mt-4 text-center">
            <p>{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdoptionRequestForm;
