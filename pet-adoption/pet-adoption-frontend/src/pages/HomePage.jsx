import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa'; // Import Search Icon
import { getAllPets } from '../services/PostServicesPets';  

// PetCard Component for each pet
const PetCard = ({ pet }) => {
  return (
    <Link to={`/pets/${pet._id}`}>
      <div className="relative shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-pulse-on-hover">
        {/* Image Section */}
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="object-cover h-64 w-full transition-opacity duration-300 hover:opacity-90" 
          style={{ filter: 'brightness(1.1)' }}
        />

        {/* Overlay Section */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
          <h2 className="text-xl font-bold text-white">{pet.name} - {pet.breed}</h2>
          <p className="text-white text-sm mt-1">{pet.description}</p>
        </div>
      </div>
    </Link>
  );
};

// Google Map configuration
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 51.1657,  // Latitude for the center of Germany
  lng: 10.4515,  // Longitude for the center of Germany
};

// Main HomePage Component
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [visiblePets, setVisiblePets] = useState(8); // State to keep track of visible pets
  const [fadeIn, setFadeIn] = useState(false);
  const [pets, setPets] = useState([]); // State to store pets data

  // Trigger fade-in effect on load
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Fetch pets data on component mount
  useEffect(() => {
    const fetchPets = async () => {
      const petsData = await getAllPets();
      setPets(petsData);
    };

    fetchPets();
  }, []);

  // Filter pets based on the search term (name or breed)
  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic to load more pets
  const loadMorePets = () => {
    setVisiblePets(prev => prev + 8); // Show 8 more pets
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="relative bg-green-200 py-0 h-[550px] flex items-center justify-center overflow-hidden">
        <div 
          className="w-full h-full relative flex justify-center items-center text-center"
          style={{
            backgroundImage: 'url("/cute cat.jpg")', // Use the image as a background
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay to darken the background for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Text on top of the background image */}
          <h1 className="relative text-5xl font-bold text-white z-10 animate-fadeInAndMove">
            Welcome to Our Pet Adoption Platform
          </h1>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 mt-6 animate-slideDown">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by pet name or breed..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition duration-300 ease-in-out shadow-sm focus:shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Search Icon */}
        </div>
      </section>

      {/* Pet Listings Section */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">All Entries</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPets.slice(0, visiblePets).map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          {visiblePets < filteredPets.length && (
            <button onClick={loadMorePets} className="btn btn-primary animate-bounce hover:bg-blue-600">
              Load More
            </button>
          )}
        </div>
      </section>

      {/* Find Your Pet Section */}
      <section className="bg-yellow-100 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Which Pet is Right for You?</h3>
          <Link to="/quiz">
            <button className="btn btn-success mt-4 transition duration-500 ease-in-out transform hover:scale-105">
              Find Out Now!
            </button>
          </Link>
        </div>
      </section>

      {/* Map Section with Google Map */}
      <section className="bg-yellow-200 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Adoption Centers Near You</h3>
          <div className="h-64 mt-6 rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              />
            </LoadScript>
          </div>
          <Link to="/map">
            <button className="btn btn-success mt-4">Find Out Now!</button>
          </Link>
        </div>
      </section>

      {/* Food Recommendation Section */}
      <section className="bg-green-200 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold">The Right Food for Your Pets!</h3>
          <Link to="/food-recommendation">
            <button className="btn btn-success mt-4">Find Out Now!</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;