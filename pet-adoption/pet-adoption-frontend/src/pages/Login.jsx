import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token to localStorage
      setAuth(true); // Update authentication state
      alert('Login successful');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
