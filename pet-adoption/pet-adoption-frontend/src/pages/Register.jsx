import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert('Registration successful');
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="form-input w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-input w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="form-input w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="form-input w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      {/* Login Link */}
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>

      {/* Reset Password Link */}
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Forgot your password?{' '}
          <Link to="/ForgotPassword" className="text-blue-500 hover:underline">
            Reset it here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
