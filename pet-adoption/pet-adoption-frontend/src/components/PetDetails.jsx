import React, { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { getPetById } from '../services/PostServicesPets'; 

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
  if (!pet) return <h2>Pet not found</h2>;

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
          <p className="mt-2"><strong>Status:</strong> {pet.status}</p>
          <p className="mt-2"><strong>Personality:</strong> {pet.description}</p>

          {/* Adopt Me Button */}
          <Link to={`/adopt/${pet._id}`}>
            <button className="mt-6 bg-pink-500 text-white py-3 px-6 rounded-full hover:bg-pink-600 
            transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg
            animate-bounce focus:outline-none focus:ring-4 focus:ring-pink-300">
              🐾 Adopt Me 🐾
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
