import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QuizPage = () => {
  // Store quiz answers in state
  const [answers, setAnswers] = useState({
    activityLevel: '',
    space: '',
    allergies: '',
    experience: '',
  });

  const [recommendedPet, setRecommendedPet] = useState(null);

  // Handle changes in quiz answers
  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  // Function to calculate the recommended pet
  const calculatePet = () => {
    if (answers.activityLevel === 'High' && answers.space === 'Large') {
      setRecommendedPet('Dog');
    } else if (answers.allergies === 'Yes') {
      setRecommendedPet('Fish');
    } else if (answers.activityLevel === 'Low' && answers.space === 'Small') {
      setRecommendedPet('Cat');
    } else if (answers.activityLevel === 'Medium' && answers.space === 'Medium') {
      setRecommendedPet('Bird');
    } else {
      setRecommendedPet('Rabbit');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Find Out Which Pet is Right for You!</h1>

        {/* Quiz Form */}
        <form className="space-y-6">
          {/* Activity Level Question */}
          <div>
            <label className="block text-xl font-semibold text-gray-700 mb-2">What is your activity level?</label>
            <select
              name="activityLevel"
              value={answers.activityLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Select...</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Space Question */}
          <div>
            <label className="block text-xl font-semibold text-gray-700 mb-2">What kind of living space do you have?</label>
            <select
              name="space"
              value={answers.space}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Select...</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          {/* Allergies Question */}
          <div>
            <label className="block text-xl font-semibold text-gray-700 mb-2">Do you have any pet allergies?</label>
            <select
              name="allergies"
              value={answers.allergies}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Experience with Pets Question */}
          <div>
            <label className="block text-xl font-semibold text-gray-700 mb-2">Have you owned pets before?</label>
            <select
              name="experience"
              value={answers.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none transition"
              onClick={calculatePet}
            >
              Find Out Now!
            </button>
          </div>
        </form>

        {/* Display Recommended Pet */}
        {recommendedPet && (
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold text-green-600 animate-fade-in">We recommend: {recommendedPet}!</h2>
            <p className="mt-4 text-gray-700">
              Based on your answers, we think a {recommendedPet} would be a great match for you.
            </p>
            <Link to="/pets">
              <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500 transition">
                Browse {recommendedPet}s
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
