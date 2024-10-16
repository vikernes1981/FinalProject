import React, { useState } from 'react';

const Home = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
    { text: "What should I say next?", sender: "bot" },
    { text: "Here’s a summary of your last conversation", sender: "bot" }
  ]); // Initial bot messages

  const [message, setMessage] = useState('');

  // Function to send message
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" }
    ]);

    // Simulate bot response (You can replace this with a real API call)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Thanks for your message! Here's the response.", sender: "bot" }
      ]);
    }, 1000);

    // Clear the input field
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 h-screen bg-gray-50">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">Dialmate Dashboard</h1>

      {/* Buttons Section */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <button className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* Add icon */}
          </svg>
          <span>Chatbot Support</span>
        </button>

        <button className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* Add icon */}
          </svg>
          <span>Control Panel</span>
        </button>

        <button className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* Add icon */}
          </svg>
          <span>History</span>
        </button>

        <button className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* Add icon */}
          </svg>
          <span>Settings</span>
        </button>
      </div>

      {/* Dynamic Chat Bubbles */}
      <div className="space-y-2 w-full max-w-xs mt-6 overflow-auto h-64">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              msg.sender === "bot"
                ? "bg-gray-200 text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* ChatBot Form */}
      <div className="w-full max-w-xs mt-6">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
