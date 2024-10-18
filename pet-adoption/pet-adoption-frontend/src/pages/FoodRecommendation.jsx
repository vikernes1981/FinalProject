import React, { useState } from 'react';

const FoodRecommendation = () => {
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState('');
  const [foodRecommendation, setFoodRecommendation] = useState(null);

  // Function to determine food recommendation
  const findFoodRecommendation = () => {
    let recommendation = '';

    if (petType === 'Dog') {
      if (age === 'Puppy') {
        recommendation = 'High-protein puppy food with DHA for development.';
      } else if (age === 'Adult') {
        recommendation = 'Balanced adult dog food with essential nutrients.';
      } else if (age === 'Senior') {
        recommendation = 'Senior dog food with joint support and reduced calories.';
      }
    } else if (petType === 'Cat') {
      if (age === 'Kitten') {
        recommendation = 'High-calorie kitten food with taurine for growth.';
      } else if (age === 'Adult') {
        recommendation = 'Balanced adult cat food with plenty of protein.';
      } else if (age === 'Senior') {
        recommendation = 'Senior cat food with reduced calories and kidney support.';
      }
    } else if (petType === 'Bird') {
      recommendation = 'Bird seed mix with added fruits and vegetables.';
    } else if (petType === 'Fish') {
      recommendation = 'Specialized fish flakes or pellets based on species.';
    } else if (petType === 'Small Mammal') {
      recommendation = 'Pellet-based food with occasional fresh vegetables.';
    } else if (petType === 'Reptile') {
      recommendation = 'Insects and leafy greens, specific to reptile species.';
    } else {
      recommendation = 'Please select a valid pet type and age for recommendations.';
    }

    setFoodRecommendation(recommendation);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Food Recommendation</h2>
      
      <form className="space-y-6">
        {/* Pet Type */}
        <div>
          <label htmlFor="petType" className="block text-lg font-semibold text-gray-700">
            Select your pet type:
          </label>
          <select
            id="petType"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          >
            <option value="">Select...</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Small Mammal">Small Mammal</option>
            <option value="Reptile">Reptile</option>
          </select>
        </div>

        {/* Pet Age */}
        <div>
          <label htmlFor="age" className="block text-lg font-semibold text-gray-700">
            Select your pet's age:
          </label>
          <select
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          >
            <option value="">Select...</option>
            <option value="Puppy">Puppy/Kitten</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={findFoodRecommendation}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Get Recommendation
          </button>
        </div>
      </form>

      {/* Display Food Recommendation */}
      {foodRecommendation && (
        <div className="bg-green-100 text-green-700 p-4 mt-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Recommended Food:</h3>
          <p>{foodRecommendation}</p>
        </div>
      )}
    </div>
  );
};

export default FoodRecommendation;
