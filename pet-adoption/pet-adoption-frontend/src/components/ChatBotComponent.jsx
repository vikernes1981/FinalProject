import React, { useState } from 'react';
import axios from 'axios';

const ChatBotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await axios.post('http://localhost:5000/chatbot/message', { message: input });
    setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: response.data.message }]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        className="chat-input" 
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="chat-send-button">Send</button>
    </div>
  );
};

export default ChatBotComponent;
