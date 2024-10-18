import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Example of what you'd do with form data
    console.log('Form submitted:', formData);
    setSuccessMessage('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' }); // Reset form fields
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Contact Us</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 mb-6 rounded-lg shadow-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-gray-700">
            Your Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message here"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            rows="5"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;