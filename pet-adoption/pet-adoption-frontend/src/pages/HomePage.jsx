import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa'; // Import Search Icon

// PetCard Component for each pet
const PetCard = ({ pet }) => {
  return (
    <Link to={`/pets/${pet.name}`}>
      <div className="relative shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image Section */}
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="object-cover h-64 w-full" 
          style={{ filter: 'brightness(1.1)' }} // Slight brightness for clarity
        />

        {/* Overlay Section */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4"> {/* Adjusted opacity */}
          <h2 className="text-xl font-bold text-white">{pet.name} - {pet.breed}</h2>
          <p className="text-white text-sm mt-1">{pet.personality}</p>
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

  const pets = [
    // Sample data for pets
    { name: 'Labrador', breed: 'Dog', image: '/Labrador.png' },
    { name: 'Siamese Cat', breed: 'Cat', image: '/Siamese Cat.webp' },
    { name: 'Parrot', breed: 'Bird', image: '/Parrot.jpg' },
    { name: 'Goldfish', breed: 'Fish', image: '/Goldfish.jpg' },
    { name: 'Hedgehog', breed: 'Small Mammal', image: '/Hedgehog.webp' },
    { name: 'Rabbit', breed: 'Small Mammal', image: '/Rabbit.jpg' },
    { name: 'Poodle', breed: 'Dog', image: '/Poodle.webp' },
    { name: 'Persian Cat', breed: 'Cat', image: '/Persian Cat.jpg' },
    { name: 'Cockatoo', breed: 'Bird', image: '/Cockatoo.webp' },
    { name: 'Turtle', breed: 'Reptile', image: '/Turtle.JPG' },
    { name: 'Guinea Pig', breed: 'Small Mammal', image: '/Guinea Pig.jpg' },
    { name: 'Dalmatian', breed: 'Dog', image: '/Dalmatian.jpg' },
    { name: 'Maine Coon', breed: 'Cat', image: '/Maine Coon.jpg' },
    { name: 'Beagle', breed: 'Dog', image: '/Beagle.webp' },
    { name: 'Budgerigar', breed: 'Bird', image: '/Budgerigar.webp' },
    { name: 'Chameleon', breed: 'Reptile', image: '/Chameleon.webp' },
    { name: 'Great Dane', breed: 'Dog', image: '/Great Dane.webp' },
    { name: 'Sphynx Cat', breed: 'Cat', image: '/Sphynx Cat.jpg' },
    { name: 'Hamster', breed: 'Small Mammal', image: '/Hamster.webp' },
    { name: 'Iguana', breed: 'Reptile', image: '/Iguana.jpg' },
    { name: 'Yorkshire Terrier', breed: 'Dog', image: '/Yorkshire Terrier.jpg' },
    { name: 'Macaw', breed: 'Bird', image: '/Macaw.jpg' },
    { name: 'Ferret', breed: 'Small Mammal', image: '/Ferret.jpg' },
    { name: 'Tortoise', breed: 'Reptile', image: '/Tortoise.jpg' }
    // Add more pet objects as needed
  ];

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
  <section className="bg-green-200 py-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold text-green-700">Welcome to Our Pet Adoption Platform</h1>
      <img 
        src="/cute cat.jpg" 
        alt="Cute Pet" 
        className="mx-auto mt-8 rounded-lg shadow-lg h-96 w-full object-cover" 
        style={{ maxWidth: '600px' }} // Optional limit to the max-width
      />
    </div>
  </section>

      {/* Search Bar Section */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
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
            <button onClick={loadMorePets} className="btn btn-primary">Load More</button>
          )}
        </div>
      </section>

      {/* Find Your Pet Section */}
      <section className="bg-yellow-100 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Which Pet is Right for You?</h3>
          <Link to="/quiz">
            <button className="btn btn-success mt-4">Find Out Now!</button>
          </Link>
        </div>
      </section>

      {/* Map Section with Google Map */}
      <section className="bg-yellow-200 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Adoption Centers Near You</h3>
          <div className="h-64 mt-6 rounded-lg overflow-hidden">
            {/* LoadScript wraps the map to ensure Google Maps API is loaded */}
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
