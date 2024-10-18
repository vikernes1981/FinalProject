import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Example pets data
const petsData = [
    { name: 'Labrador', breed: 'Dog', image: '/Labrador.png', age: 3, location: 'New York', status: 'Available', personality: 'Playful, Loyal', description: 'A friendly dog that loves the outdoors and is great with kids.' },
    { name: 'Siamese Cat', breed: 'Cat', image: '/Siamese Cat.webp', age: 2, location: 'Los Angeles', status: 'Adopted', personality: 'Curious, Affectionate', description: 'This Siamese cat enjoys exploring the house and is a great cuddler.' },
    { name: 'Parrot', breed: 'Bird', image: '/Parrot.jpg', age: 1, location: 'San Francisco', status: 'Available', personality: 'Talkative, Energetic', description: 'A colorful parrot that loves to mimic sounds and interact with people.' },
    { name: 'Goldfish', breed: 'Fish', image: '/Goldfish.jpg', age: 1, location: 'Miami', status: 'Available', personality: 'Calm, Peaceful', description: 'A simple yet beautiful pet that adds a peaceful ambiance to your home.' },
    { name: 'Hedgehog', breed: 'Small Mammal', image: '/Hedgehog.webp', age: 2, location: 'Chicago', status: 'Available', personality: 'Shy, Independent', description: 'This hedgehog is shy but very low maintenance. Perfect for quiet homes.' },
    { name: 'Rabbit', breed: 'Small Mammal', image: '/Rabbit.jpg', age: 1, location: 'Boston', status: 'Available', personality: 'Gentle, Social', description: 'A friendly and social rabbit that enjoys being around people.' },
    { name: 'Poodle', breed: 'Dog', image: '/Poodle.webp', age: 4, location: 'Seattle', status: 'Adopted', personality: 'Smart, Active', description: 'A highly intelligent and active poodle that loves learning new tricks.' },
    { name: 'Persian Cat', breed: 'Cat', image: '/Persian Cat.jpg', age: 3, location: 'San Diego', status: 'Available', personality: 'Calm, Affectionate', description: 'This Persian cat enjoys lounging around the house and is great with families.' },
    { name: 'Cockatoo', breed: 'Bird', image: '/Cockatoo.webp', age: 2, location: 'Austin', status: 'Available', personality: 'Social, Energetic', description: 'A social bird that loves attention and interaction with people.' },
    { name: 'Turtle', breed: 'Reptile', image: '/Turtle.JPG', age: 5, location: 'Dallas', status: 'Available', personality: 'Calm, Easy-going', description: 'A low-maintenance pet, this turtle loves swimming and basking in the sun.' },
    { name: 'Guinea Pig', breed: 'Small Mammal', image: '/Guinea Pig.jpg', age: 1, location: 'Phoenix', status: 'Available', personality: 'Friendly, Curious', description: 'This guinea pig loves nibbling on veggies and exploring new spaces.' },
    { name: 'Dalmatian', breed: 'Dog', image: '/Dalmatian.jpg', age: 2, location: 'Denver', status: 'Adopted', personality: 'Energetic, Loyal', description: 'A high-energy dog that loves to run and is incredibly loyal to its owner.' },
    { name: 'Maine Coon', breed: 'Cat', image: '/Maine Coon.jpg', age: 3, location: 'Houston', status: 'Available', personality: 'Friendly, Gentle', description: 'This large, fluffy Maine Coon is gentle and great with children.' },
    { name: 'Beagle', breed: 'Dog', image: '/Beagle.webp', age: 4, location: 'Philadelphia', status: 'Available', personality: 'Curious, Energetic', description: 'An energetic dog that loves to sniff around and explore its surroundings.' },
    { name: 'Budgerigar', breed: 'Bird', image: '/Budgerigar.webp', age: 1, location: 'Orlando', status: 'Available', personality: 'Social, Vocal', description: 'A small, colorful budgerigar that loves chirping and interacting with its owner.' },
    { name: 'Chameleon', breed: 'Reptile', image: '/Chameleon.webp', age: 2, location: 'Las Vegas', status: 'Available', personality: 'Calm, Color-changing', description: 'A fascinating pet with color-changing abilities, perfect for reptile enthusiasts.' },
    { name: 'Great Dane', breed: 'Dog', image: '/Great Dane.webp', age: 3, location: 'Portland', status: 'Available', personality: 'Gentle, Giant', description: 'A gentle giant, the Great Dane is loving, calm, and great with kids.' },
    { name: 'Sphynx Cat', breed: 'Cat', image: '/Sphynx Cat.jpg', age: 4, location: 'San Antonio', status: 'Available', personality: 'Affectionate, Hairless', description: 'A unique, hairless cat that is affectionate and great for people with allergies.' },
    { name: 'Hamster', breed: 'Small Mammal', image: '/Hamster.webp', age: 1, location: 'Charlotte', status: 'Available', personality: 'Curious, Playful', description: 'This little hamster is always active and loves running in its wheel.' },
    { name: 'Iguana', breed: 'Reptile', image: '/Iguana.jpg', age: 5, location: 'Salt Lake City', status: 'Available', personality: 'Calm, Easy-going', description: 'A large iguana that enjoys basking in the sun and is perfect for reptile lovers.' },
    { name: 'Yorkshire Terrier', breed: 'Dog', image: '/Yorkshire Terrier.jpg', age: 2, location: 'Atlanta', status: 'Available', personality: 'Small, Feisty', description: 'A small dog with a big personality. Great for apartments.' },
    { name: 'Macaw', breed: 'Bird', image: '/Macaw.jpg', age: 3, location: 'Tampa', status: 'Available', personality: 'Vocal, Colorful', description: 'A beautiful, colorful macaw that loves to interact and show off its vocal skills.' },
    { name: 'Ferret', breed: 'Small Mammal', image: '/Ferret.jpg', age: 2, location: 'Kansas City', status: 'Available', personality: 'Curious, Playful', description: 'A playful ferret that loves exploring and playing with toys.' },
    { name: 'Tortoise', breed: 'Reptile', image: '/Tortoise.jpg', age: 50, location: 'San Jose', status: 'Available', personality: 'Slow, Steady', description: 'A long-living tortoise that enjoys basking in the sun and requires minimal care.' },
];

  

  const PetDetails = () => {
    const { name } = useParams(); // Get the pet name from the URL
    const pet = petsData.find((pet) => pet.name === decodeURIComponent(name)); // Find the pet by name
  
    if (!pet) {
      return <h2>Pet not found</h2>;
    }
  
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="card shadow-lg rounded-lg overflow-hidden">
            <img src={pet.image} alt={pet.name} className="object-cover h-96 w-full" />
            <div className="p-6">
              <h1 className="text-3xl font-bold">{pet.name}</h1>
              <p className="text-xl">{pet.breed}</p>
              <p className="mt-4">{pet.description}</p>
    
              {/* Additional Pet Details */}
              <p className="mt-4"><strong>Age:</strong> {pet.age} years old</p>
              <p className="mt-2"><strong>Location:</strong> {pet.location}</p>
              <p className="mt-2"><strong>Status:</strong> {pet.status}</p>
              <p className="mt-2"><strong>Personality:</strong> {pet.personality}</p>
    
              {/* Adopt Me Button */}
              <Link to={`/adopt/${pet.name}`}>
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
