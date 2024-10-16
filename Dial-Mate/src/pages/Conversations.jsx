import React, { useState } from 'react';
import { sendMessageToBot } from '../services/telegramService';

const Conversations = () => {
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState(''); // User's Telegram chat ID
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await sendMessageToBot(chatId, message); // Backend handles TOKEN
      setResponse(data.message);
    } catch (err) {
      setError('Failed to send message to the bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chat with the bot</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          placeholder="Enter your chat ID"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Send
        </button>
      </form>

      {loading && <p className="text-gray-500 mt-4">Sending...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {response && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
          <h2 className="font-semibold">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Conversations;
