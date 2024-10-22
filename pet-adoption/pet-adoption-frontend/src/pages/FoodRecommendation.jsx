import React, { useState } from 'react';

const FoodRecommendation = () => {
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState(''); // Add size for pets like dogs and cats
  const [healthCondition, setHealthCondition] = useState(''); // Add health conditions
  const [foodRecommendation, setFoodRecommendation] = useState(null);

  // Function to determine food recommendation
  const findFoodRecommendation = () => {
    let recommendation = '';

    if (petType === 'Dog') {
      if (age === 'Puppy') {
        recommendation = 'High-protein puppy food with DHA for development.';
      } else if (age === 'Adult') {
        if (size === 'Small') {
          recommendation = 'Small breed adult dog food rich in protein.';
        } else if (size === 'Medium') {
          recommendation = 'Medium breed dog food with balanced nutrients.';
        } else if (size === 'Large') {
          recommendation = 'Large breed food with joint support and glucosamine.';
        } else {
          recommendation = 'Balanced adult dog food with essential nutrients.';
        }

        if (healthCondition === 'Weight Management') {
          recommendation += ' Look for food labeled for weight management with lower calories.';
        } else if (healthCondition === 'Sensitive Stomach') {
          recommendation += ' Opt for limited-ingredient diets with easily digestible proteins.';
        }
      } else if (age === 'Senior') {
        recommendation = 'Senior dog food with joint support and reduced calories.';
        if (healthCondition === 'Joint Support') {
          recommendation += ' Look for glucosamine and chondroitin in the ingredients.';
        }
      }
    } else if (petType === 'Cat') {
      if (age === 'Kitten') {
        recommendation = 'High-calorie kitten food with taurine for growth.';
      } else if (age === 'Adult') {
        recommendation = 'Balanced adult cat food with plenty of protein.';
        if (healthCondition === 'Urinary Health') {
          recommendation += ' Opt for food that supports urinary tract health.';
        } else if (healthCondition === 'Hairball Control') {
          recommendation += ' Choose food with added fiber for hairball control.';
        }
      } else if (age === 'Senior') {
        recommendation = 'Senior cat food with reduced calories and kidney support.';
      }
    } else if (petType === 'Bird') {
      recommendation = 'Bird seed mix with added fruits and vegetables.';
      if (healthCondition === 'Feather Health') {
        recommendation += ' Look for food with omega fatty acids for feather health.';
      }
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

        {/* Pet Size (only for Dogs and Cats) */}
        {(petType === 'Dog' || petType === 'Cat') && (
          <div>
            <label htmlFor="size" className="block text-lg font-semibold text-gray-700">
              Select your pet's size:
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="">Select...</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        )}

        {/* Pet Health Condition */}
        <div>
          <label htmlFor="healthCondition" className="block text-lg font-semibold text-gray-700">
            Does your pet have any special health conditions?
          </label>
          <select
            id="healthCondition"
            value={healthCondition}
            onChange={(e) => setHealthCondition(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">None</option>
            <option value="Weight Management">Weight Management</option>
            <option value="Sensitive Stomach">Sensitive Stomach</option>
            <option value="Urinary Health">Urinary Health (for cats)</option>
            <option value="Hairball Control">Hairball Control (for cats)</option>
            <option value="Joint Support">Joint Support (for senior pets)</option>
            <option value="Feather Health">Feather Health (for birds)</option>
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
