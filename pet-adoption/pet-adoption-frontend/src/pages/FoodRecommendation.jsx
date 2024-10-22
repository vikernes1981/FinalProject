import React, { useState } from 'react';

const FoodRecommendation = () => {
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState(''); // Age in years or months
  const [ageInMonths, setAgeInMonths] = useState(''); // Age in months for pets younger than 1 year
  const [size, setSize] = useState(''); // Size for pets like dogs and cats
  const [healthCondition, setHealthCondition] = useState(''); // Health conditions
  const [foodRecommendation, setFoodRecommendation] = useState(null);

  // Function to determine pet's life stage based on age
  const getLifeStage = (petType, age) => {
    age = parseFloat(age); // Ensure age is a number

    if (petType === 'Dog') {
      if (age < 1) return 'Puppy';
      if (age >= 1 && age < 7) return 'Adult';
      return 'Senior'; // Age 7+ for dogs is considered senior
    }
    if (petType === 'Cat') {
      if (age < 1) return 'Kitten';
      if (age >= 1 && age < 10) return 'Adult';
      return 'Senior'; // Age 10+ for cats is considered senior
    }
    // Default for other animals
    return 'Adult'; // Default to adult for simplicity
  };

  // Function to determine food recommendation based on inputs
  const findFoodRecommendation = () => {
    let finalAge = age;

    // If age is less than 1 year, use the value from the months input
    if (age < 1 && ageInMonths) {
      finalAge = (parseFloat(ageInMonths) / 12).toFixed(2); // Convert months to years
    }

    const lifeStage = getLifeStage(petType, finalAge); // Get the life stage based on age
    let recommendation = '';

    // Dog-specific recommendations
    if (petType === 'Dog') {
      if (lifeStage === 'Puppy') {
        recommendation = 'High-protein puppy food with DHA for development.';
      } else if (lifeStage === 'Adult') {
        if (size === 'Small') {
          recommendation = 'Small breed adult dog food rich in protein.';
        } else if (size === 'Medium') {
          recommendation = 'Medium breed dog food with balanced nutrients.';
        } else if (size === 'Large') {
          recommendation = 'Large breed food with joint support and glucosamine.';
        } else {
          recommendation = 'Balanced adult dog food with essential nutrients.';
        }

        // Specific recommendations based on health conditions
        if (healthCondition === 'Weight Management') {
          recommendation += ' Look for food labeled for weight management with lower calories.';
        } else if (healthCondition === 'Sensitive Stomach') {
          recommendation += ' Opt for limited-ingredient diets with easily digestible proteins.';
        } else if (healthCondition === 'Joint Support') {
          recommendation += ' Consider food with added glucosamine and chondroitin to support joints.';
        }
      } else if (lifeStage === 'Senior') {
        recommendation = 'Senior dog food with joint support and reduced calories.';
        if (healthCondition === 'Joint Support') {
          recommendation += ' Look for food with glucosamine and chondroitin for joint support.';
        } else if (healthCondition === 'Weight Management') {
          recommendation += ' Choose a lower-calorie senior diet for weight control.';
        }
      }

    // Cat-specific recommendations
    } else if (petType === 'Cat') {
      if (lifeStage === 'Kitten') {
        recommendation = 'High-calorie kitten food with taurine for growth.';
      } else if (lifeStage === 'Adult') {
        recommendation = 'Balanced adult cat food with plenty of protein.';
        if (healthCondition === 'Urinary Health') {
          recommendation += ' Opt for food that supports urinary tract health with low magnesium levels.';
        } else if (healthCondition === 'Hairball Control') {
          recommendation += ' Choose food with added fiber to help manage hairballs.';
        } else if (healthCondition === 'Sensitive Stomach') {
          recommendation += ' Choose food with easily digestible proteins for a sensitive stomach.';
        }
      } else if (lifeStage === 'Senior') {
        recommendation = 'Senior cat food with reduced calories and kidney support.';
        if (healthCondition === 'Urinary Health') {
          recommendation += ' Look for senior cat food that supports kidney health and reduces urinary issues.';
        }
      }

    // Bird-specific recommendations
    } else if (petType === 'Bird') {
      recommendation = 'Bird seed mix with added fruits and vegetables.';
      if (healthCondition === 'Feather Health') {
        recommendation += ' Look for food with omega fatty acids to promote healthy feathers.';
      }

    // Fish-specific recommendations
    } else if (petType === 'Fish') {
      recommendation = 'Specialized fish flakes or pellets based on species.';

    // Small Mammal-specific recommendations
    } else if (petType === 'Small Mammal') {
      recommendation = 'Pellet-based food with occasional fresh vegetables.';

    // Reptile-specific recommendations
    } else if (petType === 'Reptile') {
      recommendation = 'Insects and leafy greens, specific to reptile species.';
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

        {/* Pet Age (in years) */}
        <div>
          <label htmlFor="age" className="block text-lg font-semibold text-gray-700">
            Enter your pet's age (in years):
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Enter age in years"
            required
            min="0"
          />
        </div>

        {/* Age in months (conditional for pets younger than 1 year) */}
        {age < 1 && (
          <div>
            <label htmlFor="ageInMonths" className="block text-lg font-semibold text-gray-700">
              Enter your pet's age (in months):
            </label>
            <input
              type="number"
              id="ageInMonths"
              value={ageInMonths}
              onChange={(e) => setAgeInMonths(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter age in months"
              min="0"
              max="12"
              required
            />
          </div>
        )}

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
