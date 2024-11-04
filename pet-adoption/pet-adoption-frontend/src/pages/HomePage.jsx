import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getAllPets } from "../services/PostServicesPets";
import AdoptionCentersMap from "./AdoptionCentersMap";
import { AuthContext } from "../context/AuthProvider";
import Footer from "../components/Footer"; // Adjust the import path

const PetCard = ({ pet }) => {
  return (
    <Link to={`/pets/${pet._id}`}>
      <div className="relative shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-pulse-on-hover">
        <img
          src={pet.image}
          alt={pet.name}
          className="object-cover h-64 w-full transition-opacity duration-300 hover:opacity-90"
          style={{ filter: "brightness(1.1)" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
          <h2 className="text-xl font-bold text-white">
            {pet.name} - {pet.breed}
          </h2>
        </div>
      </div>
    </Link>
  );
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePets, setVisiblePets] = useState(8);
  const [fadeIn, setFadeIn] = useState(false);
  const [pets, setPets] = useState([]);
  const { token } = useContext(AuthContext); // Access the token from AuthContext

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      const petsData = await getAllPets();
      setPets(petsData);
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.age.toString().includes(searchTerm)
  );

  const loadMorePets = () => {
    setVisiblePets((prev) => prev + 8);
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="relative bg-green-200 py-0 h-[550px] flex items-center justify-center overflow-hidden">
        <div
          className="w-full h-full relative flex justify-center items-center text-center"
          style={{
            backgroundImage: 'url("/cute cat.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h1 className="relative text-5xl font-bold text-white z-10 animate-fadeInAndMove">
            Your New Best Friend Awaits at Pawsome Homes
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </section>

      {/* Pet Listings Section */}
      <section className="max-w-7xl mx-auto px-4 mt-8 " id="pet-list">
        <h2 className="text-2xl font-bold text-white mb-6">All Entries</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPets.slice(0, visiblePets).map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          {visiblePets < filteredPets.length && (
            <button
              onClick={loadMorePets}
              className="btn btn-success animate-bounce hover:bg-green-600 transition duration-500 ease-in-out transform hover:scale-105"
            >
              Load More
            </button>
          )}
        </div>
      </section>

      {/* Combined Section for "Which Pet is Right for You?" and "Suggested Items" */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto text-white flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16 text-center">
          
          {/* Find Your Pet Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
            <h3 className="text-2xl font-bold">Which Pet is Right for You?</h3>
            <div
              className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('https://petstrainingandboarding.com.au/wp-content/uploads/2016/05/choosing-the-right-pup-1.jpg')`,
              }}
            ></div>
            <Link to="/quiz">
              <button className="btn btn-success transition duration-500 ease-in-out transform hover:scale-105 mt-4">
                Find Out Now!
              </button>
            </Link>
          </div>

          {/* Suggested Items Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
            <h3 className="text-2xl font-bold">Suggested items to buy for your new friend</h3>
            <div
              className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEHUiMKXrqszd7ate582QcsgQAfLaVfoZ3Gw&s')`,
              }}
            ></div>
            <Link to="/suggested-items">
              <button className="btn btn-success transition duration-500 ease-in-out transform hover:scale-105 mt-4">
                Find Out Now!
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section with Google Map */}
      <AdoptionCentersMap />
      
      {/* Food Section */}
      <section className="py-12 text-white text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold">The Right Food for Your Pets!</h3>
          <div
            className="w-full h-96 bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/08/13/28/18/1000_F_813281821_ljnOcqB3P5ddBcl3YR4xcZrx3vi9FswC.jpg')",
              backgroundSize: "auto 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          ></div>
          <Link to="/food-recommendation">
            <button className="btn btn-success mt-4 transition duration-500 ease-in-out transform hover:scale-105">
              Find Out Now!
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
