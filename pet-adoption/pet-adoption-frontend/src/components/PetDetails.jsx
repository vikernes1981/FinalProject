import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { getPetById } from '../services/PostServicesPets'; 

// ContactForm Component
const ContactForm = ({ id }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' }); // State to hold form data
  const [submitting, setSubmitting] = useState(false); // State to indicate form submission

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Set form to submitting state
    try {
      await axios.post(`/api/pets/${id}/inquiry`, formData); // Send form data to the backend
      alert('Inquiry submitted successfully'); // Show success message
      setFormData({ name: '', email: '', message: '' }); // Clear form data
    } catch (err) {
      console.error(err);
      alert('Failed to submit inquiry'); // Show error message
    } finally {
      setSubmitting(false); // Stop submitting
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="btn btn-primary mt-4" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Send Inquiry'}
      </button>
    </form>
  );
};

// PetDetails Component
const PetDetails = () => {
  const { id } = useParams(); // Get the pet id from the URL
  const [pet, setPet] = useState(null); // State to hold pet data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the pet data when the component loads
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petData = await getPetById(id); // Fetch the pet data
        console.log('Pet Data:', petData); // Debug log
        setPet(petData); // Set pet directly from the returned data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pet data:', error);
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  // If the data is still loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // If the pet data is null (i.e., not found or failed to load), show an error
  if (!pet) return <h2>Pet not found 420</h2>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="card shadow-lg rounded-lg overflow-hidden">
        <img src={pet.image} alt={pet.name} className="object-contain h-96 w-full" />
        <div className="p-6">
          <h1 className="text-3xl font-bold">{pet.name}</h1>
          <p className="text-xl">{pet.breed}</p>
          <p className="mt-4">{pet.description}</p>

          {/* Additional Pet Details */}
          <p className="mt-4"><strong>Age:</strong> {pet.age} years old</p>
          {/* <p className="mt-2"><strong>Location:</strong> {pet.location}</p> */}
          <p className="mt-2"><strong>Status:</strong> {pet.status}</p>
          <p className="mt-2"><strong>Personality:</strong> {pet.description}</p>

          {/* Adopt Me Button */}
          <Link to={`/adopt/${pet.name}`}>
            <button className="mt-6 bg-pink-500 text-white py-3 px-6 rounded-full hover:bg-pink-600 
            transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg
            animate-bounce focus:outline-none focus:ring-4 focus:ring-pink-300">
              🐾 Adopt Me 🐾
            </button>
          </Link>

          {/* Contact Form */}
          <ContactForm id={pet.id} /> {/* Pass id to ContactForm */}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
