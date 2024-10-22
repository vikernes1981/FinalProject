import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation to other pages (Signup, Forgot Password)
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // For showing loading spinner during login
  const navigate = useNavigate(); // To navigate after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to the backend login route
      const response = await axios.post('http://localhost:5000/api/login', formData); // Adjust the baseURL as per your setup
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Set the authentication state to true
      setAuth(true);

      // Navigate to a dashboard or home page after login
      alert('Login successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed: Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value.trim() })}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <Link to="/ForgotPassword" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </form>

      {/* Sign Up Section */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;